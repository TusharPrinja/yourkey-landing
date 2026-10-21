/**
 * proxy.ts — runs before every request for /studio (Next.js 16's name for middleware).
 *
 * The Studio's lock (21 October 2026): without the cookie lib/studioLock.ts signs, /studio, its files and
 * its address with /index.html all answer with the password page, so the Studio itself is never sent.
 * The right password sets the cookie on that phone for 90 days; /studio/lock takes it off again.
 */

import { NextResponse, type NextRequest } from "next/server";
import { STUDIO_COOKIE, STUDIO_DAYS, cookieOpens, lockPage, passwordMatches, studioCookie, studioPassword, type LockNote } from "@/lib/studioLock";

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
  const password = studioPassword();
  const { pathname } = request.nextUrl;

  if (pathname === "/studio/lock") {
    const res = lock(password ? "locked" : "shut", 200);
    res.cookies.set({ name: STUDIO_COOKIE, value: "", maxAge: 0, ...cookieAt });
    return res;
  }

  if (request.method === "POST" && pathname === "/studio") {
    if (!password) return lock("shut", 503);
    const form = await request.formData().catch(() => null);
    const typed = form?.get("password");
    if (typeof typed !== "string" || !passwordMatches(typed, password)) {
      await new Promise((resolve) => setTimeout(resolve, WRONG_WAIT_MS));
      return lock("wrong", 401);
    }
    const res = keepPrivate(NextResponse.redirect(new URL("/studio", request.url), 303));
    res.cookies.set({ name: STUDIO_COOKIE, value: studioCookie(password), maxAge: STUDIO_DAYS * 86_400, ...cookieAt });
    return res;
  }

  if (request.method !== "GET" && request.method !== "HEAD") return keepPrivate(new NextResponse(null, { status: 405 }));
  if (!password) return lock("shut", 503);
  if (!cookieOpens(request.cookies.get(STUDIO_COOKIE)?.value, password)) return lock("ask", 401);
  return keepPrivate(NextResponse.next());
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
