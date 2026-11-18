import { createHash } from "node:crypto";
import { bucket, putText } from "@/lib/r2";

/**
 * app/api/android/route.ts — "On Android? Get told when it's out" (18 November 2026, his yes: "Build it please, and
 * yes, let's do it", with the privacy line).
 *
 * A visitor's email is kept for one message: the day Your Key is on Google Play. It goes to the private bucket the
 * Studio uses (no public address), one small file per address, named by a hash of it so the same address twice is
 * one entry. Nothing else is kept: no name, no address of their device. The privacy policy says so, and that the
 * list is deleted once that one email has gone.
 */

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/;

export async function POST(request: Request): Promise<Response> {
  let body: { email?: unknown; site?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "email" }, { status: 400 });
  }
  // A field no person sees: a form-filling robot fills it, and is thanked and ignored.
  if (typeof body.site === "string" && body.site) return Response.json({ ok: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL.test(email)) return Response.json({ error: "email" }, { status: 400 });
  const b = bucket();
  if (!b) return Response.json({ error: "failed" }, { status: 503 });
  const id = createHash("sha256").update(email).digest("hex").slice(0, 32);
  let refused: unknown;
  try {
    refused = await putText(b, `Android list/${id}.json`, JSON.stringify({ email, asked: new Date().toISOString() }), "application/json");
  } catch {
    refused = true;
  }
  if (refused) return Response.json({ error: "failed" }, { status: 502 });
  return Response.json({ ok: true });
}
