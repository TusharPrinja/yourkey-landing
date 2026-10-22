/**
 * proxy.ts — runs before every request for /studio (Next.js 16's name for middleware).
 *
 * The Studio's lock (21 October 2026): without the cookie the right password gives (lib/studioLock.ts),
 * /studio, its address with /index.html and anything under it all answer with the password page, so the
 * Studio itself is never sent. The cookie lasts 90 days on that phone; /studio/lock takes it off again.
 */

import { NextResponse, type NextRequest } from "next/server";
import { STUDIO_COOKIE, STUDIO_DAYS, cookieOpens, keyFor, lockPage, readFingerprint, type LockNote } from "@/lib/studioLock";

/** Nothing the Studio sends is kept by a cache or shown to a search engine. */
const PRIVATE: Record<string, string> = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};

const keepPrivate = <T extends Response>(res: T): T => {
  for (const [name, value] of Object.entries(PRIVATE)) res.headers.set(name, value);
  return res;
};

const lock = (note: LockNote, status: number) =>
  keepPrivate(new NextResponse(lockPage(note), { status, headers: { "Content-Type": "text/html; charset=utf-8" } }));

const cookieAt = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/studio" };

/** A wrong password waits a moment before it is answered, so guessing is slow. */
const WRONG_WAIT_MS = 1500;

export async function proxy(request: NextRequest) {
  const fingerprint = readFingerprint();
  const { pathname } = request.nextUrl;

  // Any other spelling of the address (/Studio, /STUDIO/index.html) goes to the one the lock answers. The rewrite
  // in next.config.ts matches /Studio too, and a server that matched it without running this would send the
  // Studio itself (found 22 October 2026 on Next.js 16.4.2's own server; Vercel ran the lock).
  const lower = pathname.toLowerCase();
  if (pathname !== lower) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return keepPrivate(NextResponse.redirect(url, 308));
  }

  if (pathname === "/studio/lock") {
    const res = lock(fingerprint ? "locked" : "shut", 200);
    res.cookies.set({ name: STUDIO_COOKIE, value: "", maxAge: 0, ...cookieAt });
    return res;
  }

  if (request.method === "POST" && pathname === "/studio") {
    if (!fingerprint) return lock("shut", 503);
    const form = await request.formData().catch(() => null);
    const typed = form?.get("password");
    const key = typeof typed === "string" && typed.length <= 200 ? await keyFor(typed, fingerprint) : null;
    if (!key) {
      await new Promise((resolve) => setTimeout(resolve, WRONG_WAIT_MS));
      return lock("wrong", 401);
    }
    const res = keepPrivate(NextResponse.redirect(new URL("/studio", request.url), 303));
    res.cookies.set({ name: STUDIO_COOKIE, value: key, maxAge: STUDIO_DAYS * 86_400, ...cookieAt });
    return res;
  }

  if (request.method !== "GET" && request.method !== "HEAD") return keepPrivate(new NextResponse(null, { status: 405 }));
  if (!fingerprint) return lock("shut", 503);
  if (!cookieOpens(request.cookies.get(STUDIO_COOKIE)?.value, fingerprint)) return lock("ask", 401);
  return keepPrivate(NextResponse.next());
}

export const config = {
  // Every spelling of the address, so none reaches the Studio without the lock.
  matcher: ["/studio", "/studio/:path*", "/([Ss][Tt][Uu][Dd][Ii][Oo](?:/.*)?)"],
};
