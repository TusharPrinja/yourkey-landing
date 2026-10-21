/**
 * lib/studioLock.ts — the Studio's password (21 October 2026), used by proxy.ts.
 *
 * Tushar: "can we make it so that the Studio is private, even more private? For example, no one can even
 * see anything without a login, or maybe like a little password", then "Is there a way you can put in a
 * password and save it to repo?". This repository is public, so the password itself can never be in it.
 * What is in it is the password's fingerprint, made on his phone by his private Studio Password page:
 * PBKDF2 with SHA-256, 600,000 rounds and its own random salt, then SHA-256 once more. The password is
 * five random words (about 64 bits), so the fingerprint can't be turned back into it or guessed, and he
 * never has to send the password to anybody.
 *
 * The Studio is a static file (public/studio/index.html), so proxy.ts answers every request for /studio
 * with the page below until the browser holds the cookie given for the right password. The cookie holds
 * the PBKDF2 key, which only the password makes; its SHA-256 is the fingerprint, so the server checks it
 * without keeping any secret. A new password (a new fingerprint here) signs every phone out. With no
 * fingerprint set, the Studio stays shut for everybody.
 */

import { createHash, pbkdf2, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

/** His one fixed password's fingerprint, the password saved in his Passwords app (21 October 2026). Empty: the
 *  Studio is shut. */
export const STUDIO_FINGERPRINT = "studio-v1$600000$abZpmQufuJo-dTay_XEr0g$_mQrxjmKKCvQ6zgypbC_IAh7CYC2sLID2Chfk2XF1AQ";

export const STUDIO_COOKIE = "yk_studio";
/** One sign-in lasts the filming weeks on that phone. */
export const STUDIO_DAYS = 90;

const derive = promisify(pbkdf2);
const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest();

export interface Fingerprint {
  rounds: number;
  salt: Buffer;
  digest: Buffer;
}

/** The fingerprint's parts, or null for anything that isn't one the page makes (the Studio then stays shut). */
export function readFingerprint(text: string = STUDIO_FINGERPRINT): Fingerprint | null {
  const parts = text.trim().split("$");
  if (parts.length !== 4 || parts[0] !== "studio-v1" || !/^\d+$/.test(parts[1])) return null;
  const rounds = Number(parts[1]);
  const salt = Buffer.from(parts[2], "base64url");
  const digest = Buffer.from(parts[3], "base64url");
  if (rounds < 100_000 || rounds > 10_000_000 || salt.length < 16 || digest.length !== 32) return null;
  return { rounds, salt, digest };
}

/** What was typed, the way the password is written: lower case, no spaces round it, the words joined by
 *  single dashes. A phone's capital, a space for a dash or a long dash changes none of the words, so it
 *  never makes the right password wrong. */
export const tidy = (typed: string) =>
  typed.trim().toLowerCase().replace(/[\s\u2010-\u2015\u2212_]+/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "");

/** The cookie for a typed password when it is the right one, else null. */
export async function keyFor(typed: string, fingerprint: Fingerprint): Promise<string | null> {
  const key = await derive(tidy(typed), fingerprint.salt, fingerprint.rounds, 32, "sha256");
  return timingSafeEqual(sha256(key), fingerprint.digest) ? `k1.${key.toString("base64url")}` : null;
}

/** True for a cookie the right password made. */
export function cookieOpens(value: string | undefined, fingerprint: Fingerprint): boolean {
  const [tag, key, ...rest] = (value ?? "").split(".");
  if (tag !== "k1" || !key || rest.length) return false;
  const bytes = Buffer.from(key, "base64url");
  return bytes.length === 32 && timingSafeEqual(sha256(bytes), fingerprint.digest);
}

export type LockNote = "ask" | "wrong" | "shut" | "locked";

const NOTES: Record<LockNote, string> = {
  ask: "",
  wrong: "That isn't the password. Try again.",
  shut: "The Studio is shut until its password is set.",
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
.field { position: relative; }
#password { width: 100%; height: 52px; padding: 0 76px 0 14px; border: 1px solid var(--line); border-radius: 12px;
  background: var(--surface); color: var(--fg); font: inherit; }
#password:focus { outline: 2px solid var(--tally); outline-offset: 1px; }
.show { position: absolute; top: 6px; right: 6px; width: auto; height: 40px; margin: 0; padding: 0 14px;
  background: transparent; color: var(--fg); border: 1px solid var(--line); border-radius: 9px; font-size: 15px; }
.hint { margin: 8px 0 0; font-size: 15px; }
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
    <div class="field">
      <input id="password" type="password" name="password" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" required autofocus>
      <button type="button" class="show" id="show" aria-controls="password">Show</button>
    </div>
    <p class="hint">Five words joined by dashes.</p>
    <button type="submit">Open the Studio</button>
  </form>
  <script>
  document.getElementById("show").addEventListener("click", function () {
    var box = document.getElementById("password"), hidden = box.type === "password";
    box.type = hidden ? "text" : "password";
    this.textContent = hidden ? "Hide" : "Show";
  });
  </script>` : ""}
  ${said ? `<p class="note" role="status">${said}</p>` : ""}
</main>
</body>
</html>`;
}
