/**
 * app/studio/r2/route.ts — the Studio's door to its private R2 bucket (5 November 2026).
 *
 * Only a phone holding the Studio's cookie (the password, lib/studioLock.ts) gets an answer; proxy.ts checks it
 * first and this checks it again. The Studio sends one JSON request at a time, { op, ... }:
 *   status            whether R2 is set up and answers with its keys (R2's own word when it doesn't)
 *   probe             a signed address for a few bytes, so the phone can check the bucket lets it send (CORS)
 *   start             a take's upload begins, its marks written beside it as JSON
 *   sign              signed addresses for the next pieces, which the phone sends straight to R2
 *   parts             the pieces R2 already holds, so a take picks up where it stopped
 *   complete          the pieces joined, and R2 asked what it now holds: the size the phone checks
 *   head              what R2 holds under a take's name (the check, asked again at any time)
 *   abort             an upload given up
 *   list              a seminar's takes in R2, with their sizes and times
 *   log               the Studio's log, written as "Studio log.txt"
 * Nothing here deletes a take, and nothing answers with a key.
 */

import type { NextRequest } from "next/server";
import { STUDIO_COOKIE, cookieOpens, readFingerprint } from "@/lib/studioLock";
import {
  LOG_KEY,
  PART,
  R2Error,
  abortUpload,
  bucket,
  checkBucket,
  checkedTakeKey,
  completeUpload,
  headObject,
  isFolder,
  listParts,
  listTakes,
  putText,
  signCheck,
  signParts,
  startUpload,
  takeKey,
} from "@/lib/r2";

const PRIVATE = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" };
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: PRIVATE });

const MAX_TAKE = 50e9;
const MAX_LOG = 300_000;
const MAX_MARKS = 20_000;
const uploadIdOf = (v: unknown) => (typeof v === "string" && v.length > 0 && v.length < 1024 ? v : null);
const partNo = (v: unknown) => (Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 10_000 ? (v as number) : null);

export async function POST(request: NextRequest): Promise<Response> {
  const fingerprint = readFingerprint();
  if (!fingerprint || !cookieOpens(request.cookies.get(STUDIO_COOKIE)?.value, fingerprint)) return reply({ error: "locked" }, 401);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply({ error: "bad" }, 400);
  }
  const b = bucket();
  if (body.op === "status") {
    if (!b) return reply({ ready: false, part: PART, said: "R2 isn’t set up on the website yet." });
    // The keys and the bucket's name, tried for real: R2's own word when they don't work.
    const problem = await checkBucket(b);
    return reply(problem ? { ready: false, part: PART, said: `R2 said ${problem}: check the bucket name and the keys in Vercel.` } : { ready: true, part: PART });
  }
  if (!b) return reply({ error: "not-set-up", said: "R2 isn’t set up on the website yet." }, 503);

  try {
    switch (body.op) {
      case "start": {
        const key = takeKey(body.folder, body.name);
        const type = typeof body.type === "string" && /^video\/[\w.+-]+(;.*)?$/.test(body.type) ? body.type.split(";")[0] : null;
        const size = Number(body.size);
        const marks = JSON.stringify(body.marks ?? {});
        if (!key || !type || !(size > 0 && size <= MAX_TAKE) || marks.length > MAX_MARKS) return reply({ error: "bad" }, 400);
        await putText(b, `${key}.json`, marks, "application/json");
        const uploadId = await startUpload(b, key, type);
        return reply({ key, uploadId, part: PART });
      }
      case "sign": {
        const key = checkedTakeKey(body.key);
        const uploadId = uploadIdOf(body.uploadId);
        const parts = Array.isArray(body.parts) ? body.parts.map(partNo) : [];
        if (!key || !uploadId || !parts.length || parts.length > 12 || parts.some((n) => n === null)) return reply({ error: "bad" }, 400);
        return reply({ urls: await signParts(b, key, uploadId, parts as number[]) });
      }
      case "parts": {
        const key = checkedTakeKey(body.key);
        const uploadId = uploadIdOf(body.uploadId);
        if (!key || !uploadId) return reply({ error: "bad" }, 400);
        const parts = await listParts(b, key, uploadId);
        return reply(parts ? { parts } : { gone: true });
      }
      case "complete": {
        const key = checkedTakeKey(body.key);
        const uploadId = uploadIdOf(body.uploadId);
        const parts = Array.isArray(body.parts)
          ? body.parts.map((p) => {
              const n = partNo((p as { n?: unknown })?.n);
              const etag = (p as { etag?: unknown })?.etag;
              return n && typeof etag === "string" && etag.length < 200 ? { n, etag } : null;
            })
          : [];
        if (!key || !uploadId || !parts.length || parts.some((p) => !p)) return reply({ error: "bad" }, 400);
        await completeUpload(b, key, uploadId, parts as { n: number; etag: string }[]);
        const held = await headObject(b, key);
        if (!held) return reply({ error: "r2", said: "R2 doesn’t hold the take after joining it." }, 502);
        return reply({ size: held.size, at: held.at });
      }
      case "head": {
        const key = checkedTakeKey(body.key);
        if (!key) return reply({ error: "bad" }, 400);
        const held = await headObject(b, key);
        return reply(held ? { size: held.size, at: held.at } : { missing: true });
      }
      case "abort": {
        const key = checkedTakeKey(body.key);
        const uploadId = uploadIdOf(body.uploadId);
        if (!key || !uploadId) return reply({ error: "bad" }, 400);
        await abortUpload(b, key, uploadId);
        return reply({ ok: true });
      }
      case "probe":
        return reply({ url: await signCheck(b) });
      case "list": {
        if (!isFolder(body.folder)) return reply({ error: "bad" }, 400);
        return reply({ takes: await listTakes(b, body.folder) });
      }
      case "log": {
        if (typeof body.text !== "string" || body.text.length > MAX_LOG) return reply({ error: "bad" }, 400);
        await putText(b, LOG_KEY, body.text);
        return reply({ ok: true });
      }
      default:
        return reply({ error: "bad" }, 400);
    }
  } catch (e) {
    const status = e instanceof R2Error && e.status >= 400 && e.status < 600 ? e.status : 502;
    return reply({ error: "r2", said: e instanceof Error ? e.message.slice(0, 160) : "R2 didn’t answer." }, status === 404 ? 404 : status >= 500 ? 502 : status);
  }
}
