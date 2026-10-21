/**
 * lib/studioLock.ts — the Studio's password (21 October 2026), used by proxy.ts.
 *
 * Tushar: "can we make it so that the Studio is private, even more private? For example, no one can even
 * see anything without a login, or maybe like a little password". The Studio is a static file
 * (public/studio/index.html), so proxy.ts answers every request for /studio with the page below until the
 * browser holds a cookie signed here, and the cookie is only given for the right password. The password
 * lives only in Vercel, as STUDIO_PASSWORD: this repository is public, so it never appears in it. It also
 * signs the cookie, so changing it signs every phone out. With no password set, or one under twelve
 * characters, the Studio stays shut for everybody.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export const STUDIO_COOKIE = "yk_studio";
/** One sign-in lasts the filming weeks on that phone. */
export const STUDIO_DAYS = 90;
export const MIN_PASSWORD = 12;

const sign = (password: string, message: string) =>
  createHmac("sha256", `yk-studio:${password}`).update(message).digest("base64url");

const same = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** The password Vercel holds, or null when there is none fit to use (the Studio then stays shut). */
export function studioPassword(env: Record<string, string | undefined> = process.env): string | null {
  const password = env.STUDIO_PASSWORD ?? "";
  return password.length >= MIN_PASSWORD ? password : null;
}

/** True when what was typed is the password. Both are signed first, so the compare takes the same time
 *  whatever was typed. */
export function passwordMatches(typed: string, password: string): boolean {
  return same(sign(password, `typed:${typed}`), sign(password, `typed:${password}`));
}

/** The cookie's value: when it ends, and the password's signature over that. */
export function studioCookie(password: string, now = Date.now()): string {
  const until = now + STUDIO_DAYS * 86_400_000;
  return `${until}.${sign(password, `open-until:${until}`)}`;
}

/** True for a cookie this password signed that has not ended. */
export function cookieOpens(value: string | undefined, password: string, now = Date.now()): boolean {
  const [until, mac, ...rest] = (value ?? "").split(".");
  const end = Number(until);
  return !rest.length && !!mac && Number.isFinite(end) && end > now && same(mac, sign(password, `open-until:${until}`));
}

export type LockNote = "ask" | "wrong" | "shut" | "locked";

const NOTES: Record<LockNote, string> = {
  ask: "",
  wrong: "That isn't the password. Try again.",
  shut: "The Studio is shut until its password is set in Vercel (STUDIO_PASSWORD, at least 12 characters), then the site is redeployed.",
  locked: "Locked on this phone. The password opens it again.",
};

/** The page anybody sees at /studio without the cookie: nothing of the Studio, only the password box. */
export function lockPage(note: LockNote): string {
  const said = NOTES[note];
  const canTry = note !== "shut";
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<meta name="theme-color" content="#050607">
<title>Your Key Studio</title>
<style>
:root { --bg: #f1f2ef; --surface: #ffffff; --fg: #15171a; --muted: #586067; --line: #d7dad8; --tally: #c42d2a; color-scheme: light; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #050607; --surface: #101315; --fg: #f2f1ec; --muted: #9aa1a8; --line: #24282c; --tally: #e5484d; color-scheme: dark; }
}
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; min-height: 100dvh; display: grid; place-items: center; padding: 24px 16px;
  background: var(--bg); color: var(--fg); font: 17px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
main { width: 100%; max-width: 380px; }
.kicker { margin: 0 0 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; color: var(--tally); }
h1 { margin: 0 0 8px; font-size: 30px; line-height: 1.15; }
p { margin: 0 0 20px; color: var(--muted); }
label { display: block; margin: 0 0 6px; font-weight: 700; }
input[type=password] { width: 100%; height: 52px; padding: 0 14px; border: 1px solid var(--line); border-radius: 12px;
  background: var(--surface); color: var(--fg); font: inherit; }
input[type=password]:focus { outline: 2px solid var(--tally); outline-offset: 1px; }
button { width: 100%; height: 52px; margin-top: 14px; border: 0; border-radius: 12px; background: var(--tally); color: #fff;
  font: inherit; font-weight: 700; cursor: pointer; }
.note { margin: 16px 0 0; color: var(--fg); }
.away { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
</style>
</head>
<body>
<main>
  <p class="kicker">YOUR KEY STUDIO</p>
  <h1>Private</h1>
  <p>Enter the password to open the Studio.</p>
  ${canTry ? `<form method="post" action="/studio">
    <input class="away" type="text" name="username" autocomplete="username" value="Your Key Studio" tabindex="-1" aria-hidden="true" readonly>
    <label for="password">Password</label>
    <input id="password" type="password" name="password" autocomplete="current-password" required autofocus>
    <button type="submit">Open the Studio</button>
  </form>` : ""}
  ${said ? `<p class="note" role="status">${said}</p>` : ""}
</main>
</body>
</html>`;
}
