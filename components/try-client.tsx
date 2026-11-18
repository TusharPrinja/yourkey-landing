"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The two parts of the home page that need the browser (18 November 2026, from the growth audit, his "Build it"):
 *
 * TryIt: a real two-minute visualisation from the app, played on the page before anyone downloads anything. The six
 * files in public/try/ are the app's own recordings of a two-minute session for six goals, joined by yourkey-app
 * scripts/attract/hear-session.ts (no new recording, nothing generated). One plays at a time.
 *
 * AndroidAsk: "On Android? Get told when it's out." Opens in place; the email goes to app/api/android/route.ts and is
 * kept for that one message (the privacy policy says so).
 */

export const TRY_GOALS = [
  // The app's own names for each goal (yourkey-app lib/attract/areas.ts).
  { id: "money-more-income", area: "Money", goal: "More income" },
  { id: "love-the-right-person", area: "Love", goal: "The right person" },
  { id: "work-dream-job", area: "Work", goal: "Your dream job" },
  { id: "self-confidence", area: "Yourself", goal: "Confidence with people" },
  { id: "body-fit", area: "Body", goal: "Fit and strong" },
  { id: "home-dream-home", area: "Home", goal: "Your dream home" },
] as const;

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function TryIt() {
  const [pick, setPick] = useState<(typeof TRY_GOALS)[number]>(TRY_GOALS[0]);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);

  // A new goal starts from the beginning, paused until pressed.
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    a.pause();
    a.load();
    setPlaying(false);
    setT(0);
  }, [pick]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => setPlaying(false));
    else a.pause();
  };

  return (
    <div className="try">
      <div className="try-player">
        <div className="try-photo" />
        <div className="try-shade" />
        <div className="try-row">
          <button type="button" className="try-play" onClick={toggle} aria-label={playing ? "Pause" : `Play: ${pick.goal}`}>
            {playing ? <span className="pause" aria-hidden /> : <span className="tri" aria-hidden />}
          </button>
          <div className="try-words">
            <b className="serif">{pick.goal}</b>
            <span>{pick.area} · 2-minute visualisation{d ? ` · ${playing || t ? `${mmss(t)} of ` : ""}${mmss(d)}` : ""}</span>
          </div>
        </div>
        <div className="try-bar" aria-hidden><i style={{ width: d ? `${(t / d) * 100}%` : 0 }} /></div>
        <audio
          ref={audio}
          src={`/try/${pick.id}.mp3`}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setD(e.currentTarget.duration)}
        />
      </div>
      <div className="chips" role="group" aria-label="Choose what you want most">
        {TRY_GOALS.map((g) => (
          <button key={g.id} type="button" className={`chip pick${g.id === pick.id ? " on" : ""}`} aria-pressed={g.id === pick.id} onClick={() => setPick(g)}>
            {g.area}
          </button>
        ))}
      </div>
      <p className="tiny">Close your eyes once it starts. Headphones help.</p>
    </div>
  );
}

export function AndroidAsk() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "email" | "failed">("idle");

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const site = (new FormData(e.currentTarget).get("site") as string) ?? "";
    setState("sending");
    try {
      const res = await fetch("/api/android", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, site }) });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      setState(res.ok && out.ok ? "done" : out.error === "email" ? "email" : "failed");
    } catch {
      setState("failed");
    }
  };

  if (!open) {
    return (
      <button type="button" className="inline-link as-link" onClick={() => setOpen(true)}>
        On Android? Get told when it&apos;s out.
      </button>
    );
  }
  if (state === "done") {
    return <p className="android-done">Done. We&apos;ll email you once, on the day Your Key is on Android. Nothing else.</p>;
  }
  return (
    <form className="android" onSubmit={send} noValidate>
      <label htmlFor="android-email">Your email, for one message: the day it&apos;s on Android.</label>
      <div className="android-row">
        <input id="android-email" type="email" inputMode="email" autoComplete="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn" disabled={state === "sending"}>{state === "sending" ? "…" : "Tell me"}</button>
      </div>
      {/* For robots only: hidden from people and from screen readers. */}
      <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
      {state === "email" ? <p className="android-err">That email doesn&apos;t look right. Check it and try again.</p> : null}
      {state === "failed" ? <p className="android-err">That didn&apos;t go through. Try again in a moment.</p> : null}
      <p className="tiny">We keep it for that one email, then delete it. <a className="inline-link" href="/privacy">Privacy</a></p>
    </form>
  );
}
