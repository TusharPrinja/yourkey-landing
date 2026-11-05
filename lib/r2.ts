/**
 * lib/r2.ts — the Studio's private bucket on Cloudflare R2 (5 November 2026).
 *
 * Tushar: "My Google drive storage is full ... Is there a way we can make it take it to r2 from the studio instead?
 * Where it's still private not public, and where I can check after each take that it landed there?"
 *
 * The bucket has no public address: nothing in it can be fetched without a signature. The keys live only in the
 * website's environment (R2_ENDPOINT, R2_STUDIO_BUCKET, R2_STUDIO_ACCESS_KEY_ID, R2_STUDIO_SECRET_ACCESS_KEY), never
 * in this public repository and never in the page. The Studio asks app/studio/r2/route.ts, behind the Studio's
 * password, for short-lived signed addresses, and the phone sends each take straight to R2 in 8 MiB pieces (a
 * multipart upload), so a dropped connection loses one piece at most and a take of any size gets through.
 *
 * Only these names can be written: a take ("Law of Attraction/A00.01 take 2.mp4"), its marks beside it as JSON,
 * and the Studio's log. Nothing can be deleted from here.
 */

import { AwsClient } from "aws4fetch";

export const FOLDERS = ["Sales", "Time", "Communication", "Leadership", "Quitting", "Law of Attraction"] as const;
export type Folder = (typeof FOLDERS)[number];
export const LOG_KEY = "Studio log.txt";

/** Every piece but the last is this size (R2 needs at least 5 MiB). */
export const PART = 8 * 1024 * 1024;
/** How long a signed address works. A piece takes seconds, and each batch is signed when it is about to go. */
export const SIGNED_FOR_SECONDS = 3600;

const TAKE_NAME = /^[A-Z]\d{2}\.\d{2} take \d{1,3}\.(mp4|webm|mov)$/;
export const isFolder = (name: unknown): name is Folder => typeof name === "string" && (FOLDERS as readonly string[]).includes(name);
export const isTakeName = (name: unknown): name is string => typeof name === "string" && TAKE_NAME.test(name);
const isTakeKey = (key: string) => {
  const slash = key.indexOf("/");
  return slash > 0 && isFolder(key.slice(0, slash)) && isTakeName(key.slice(slash + 1));
};
/** A take's key, or null for anything that isn't one. */
export const takeKey = (folder: unknown, name: unknown) => (isFolder(folder) && isTakeName(name) ? `${folder}/${name}` : null);
export const checkedTakeKey = (key: unknown) => (typeof key === "string" && isTakeKey(key) ? key : null);

export interface Bucket {
  client: AwsClient;
  base: string;
}

/** The bucket, or null until the four settings are in the website's environment. */
export function bucket(): Bucket | null {
  const name = process.env.R2_STUDIO_BUCKET?.trim().replace(/^\/+|\/+$/g, "");
  let endpoint = process.env.R2_ENDPOINT?.trim().replace(/\/+$/, "") ?? "";
  // Pasted as Cloudflare shows it, with or without https:// and with or without the bucket's name on the end.
  if (endpoint && !/^https?:\/\//i.test(endpoint)) endpoint = `https://${endpoint}`;
  if (name && endpoint.toLowerCase().endsWith(`/${name.toLowerCase()}`)) endpoint = endpoint.slice(0, -(name.length + 1));
  const accessKeyId = process.env.R2_STUDIO_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_STUDIO_SECRET_ACCESS_KEY?.trim();
  if (!endpoint || !name || !accessKeyId || !secretAccessKey || !/^https:\/\//.test(endpoint)) return null;
  return { client: new AwsClient({ accessKeyId, secretAccessKey, service: "s3", region: "auto" }), base: `${endpoint}/${name}` };
}

/** The bucket answering with these keys: nothing when it does, else R2's own word for why not (NoSuchBucket,
 *  InvalidAccessKeyId, SignatureDoesNotMatch, AccessDenied…), never a key. */
export async function checkBucket(b: Bucket): Promise<string | null> {
  try {
    const res = await b.client.fetch(`${b.base}?list-type=2&max-keys=1`);
    if (res.ok) return null;
    const text = await res.text().catch(() => "");
    return tags(text, "Code")[0] ?? `HTTP ${res.status}`;
  } catch {
    return "no answer";
  }
}

/** The Studio's own check that this phone can reach the bucket: a signed address for a few bytes, written over each
 *  time, which shows whether the bucket's CORS rule lets the phone send (and read the piece's ETag back). */
export const CHECK_KEY = "Studio check.txt";
export async function signCheck(b: Bucket) {
  const signed = await b.client.sign(new Request(urlOf(b, CHECK_KEY, "X-Amz-Expires=600"), { method: "PUT" }), { aws: { signQuery: true } });
  return signed.url;
}

const pathOf = (key: string) => key.split("/").map(encodeURIComponent).join("/");
const urlOf = (b: Bucket, key: string, query = "") => `${b.base}/${pathOf(key)}${query ? `?${query}` : ""}`;
const tags = (xml: string, name: string) => [...xml.matchAll(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, "g"))].map((m) => m[1]);
const unescapeXml = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export class R2Error extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function said(res: Response): Promise<never> {
  const text = await res.text().catch(() => "");
  const code = tags(text, "Code")[0];
  throw new R2Error(code ? `${code} (${res.status})` : `${res.status}`, res.status);
}

/** A new multipart upload for a take. */
export async function startUpload(b: Bucket, key: string, type: string): Promise<string> {
  const res = await b.client.fetch(urlOf(b, key, "uploads"), { method: "POST", headers: { "Content-Type": type } });
  if (!res.ok) return said(res);
  const id = tags(await res.text(), "UploadId")[0];
  if (!id) throw new R2Error("no upload id", 502);
  return unescapeXml(id);
}

/** Signed addresses for some of a take's pieces, each good for an hour. */
export async function signParts(b: Bucket, key: string, uploadId: string, parts: number[]) {
  return Promise.all(
    parts.map(async (n) => {
      const url = urlOf(b, key, `partNumber=${n}&uploadId=${encodeURIComponent(uploadId)}&X-Amz-Expires=${SIGNED_FOR_SECONDS}`);
      const signed = await b.client.sign(new Request(url, { method: "PUT" }), { aws: { signQuery: true } });
      return { n, url: signed.url };
    }),
  );
}

export interface Part {
  n: number;
  etag: string;
  size: number;
}

/** The pieces R2 holds of an upload, or null when the upload is gone (finished, or given up). */
export async function listParts(b: Bucket, key: string, uploadId: string): Promise<Part[] | null> {
  const out: Part[] = [];
  let marker = 0;
  for (let page = 0; page < 20; page++) {
    const res = await b.client.fetch(urlOf(b, key, `uploadId=${encodeURIComponent(uploadId)}&max-parts=1000${marker ? `&part-number-marker=${marker}` : ""}`));
    if (res.status === 404) return null;
    if (!res.ok) return said(res);
    const xml = await res.text();
    for (const p of tags(xml, "Part")) {
      out.push({ n: Number(tags(p, "PartNumber")[0]), etag: unescapeXml(tags(p, "ETag")[0] ?? ""), size: Number(tags(p, "Size")[0]) });
    }
    if (tags(xml, "IsTruncated")[0] !== "true") break;
    marker = Number(tags(xml, "NextPartNumberMarker")[0]) || 0;
    if (!marker) break;
  }
  return out;
}

/** The pieces joined into the take. */
export async function completeUpload(b: Bucket, key: string, uploadId: string, parts: { n: number; etag: string }[]) {
  const body = `<CompleteMultipartUpload>${[...parts]
    .sort((x, y) => x.n - y.n)
    .map((p) => `<Part><PartNumber>${p.n}</PartNumber><ETag>${escapeXml(p.etag)}</ETag></Part>`)
    .join("")}</CompleteMultipartUpload>`;
  const res = await b.client.fetch(urlOf(b, key, `uploadId=${encodeURIComponent(uploadId)}`), {
    method: "POST",
    headers: { "Content-Type": "application/xml" },
    body,
  });
  if (!res.ok) return said(res);
  const text = await res.text();
  // S3 can answer 200 and still say no inside the body.
  if (/<Error>/.test(text)) throw new R2Error(tags(text, "Code")[0] ?? "complete failed", 502);
}

export async function abortUpload(b: Bucket, key: string, uploadId: string) {
  const res = await b.client.fetch(urlOf(b, key, `uploadId=${encodeURIComponent(uploadId)}`), { method: "DELETE" });
  if (!res.ok && res.status !== 404) return said(res);
}

/** What R2 holds under a key: its size and when it was written, or null when nothing is there. */
export async function headObject(b: Bucket, key: string) {
  const res = await b.client.fetch(urlOf(b, key), { method: "HEAD" });
  if (res.status === 404) return null;
  if (!res.ok) return said(res);
  return { size: Number(res.headers.get("content-length") ?? 0), etag: res.headers.get("etag") ?? "", at: res.headers.get("last-modified") ?? "" };
}

export async function putText(b: Bucket, key: string, text: string, type = "text/plain; charset=utf-8") {
  const res = await b.client.fetch(urlOf(b, key), { method: "PUT", headers: { "Content-Type": type }, body: text });
  if (!res.ok) return said(res);
}

/** Every take in a seminar's folder (not their marks), with its size and when it landed. */
export async function listTakes(b: Bucket, folder: Folder) {
  const takes: { name: string; key: string; size: number; at: string }[] = [];
  let token = "";
  for (let page = 0; page < 50; page++) {
    const query = `list-type=2&prefix=${encodeURIComponent(`${folder}/`)}&max-keys=1000${token ? `&continuation-token=${encodeURIComponent(token)}` : ""}`;
    const res = await b.client.fetch(`${b.base}?${query}`);
    if (!res.ok) return said(res);
    const xml = await res.text();
    for (const c of tags(xml, "Contents")) {
      const key = unescapeXml(tags(c, "Key")[0] ?? "");
      if (!isTakeKey(key)) continue;
      takes.push({ key, name: key.slice(folder.length + 1), size: Number(tags(c, "Size")[0]), at: tags(c, "LastModified")[0] ?? "" });
    }
    token = tags(xml, "IsTruncated")[0] === "true" ? unescapeXml(tags(xml, "NextContinuationToken")[0] ?? "") : "";
    if (!token) break;
  }
  return takes;
}
