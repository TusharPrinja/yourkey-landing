import type { Metadata } from "next";
import {
  SiteNav,
  SiteFooter,
  DownloadBadges,
  MentorDisclaimer,
} from "@/components/site";

export const metadata: Metadata = {
  title: "About — Your Key",
  description:
    "The story behind Your Key: a solo British founder, years inside the canon and peer-reviewed psychology, a formula, an 11-module seminar, and every tool built around it.",
};

const CANON = [
  "Wallace Wattles",
  "James Allen",
  "Napoleon Hill",
  "Neville Goddard",
  "Earl Nightingale",
  "Joseph Murphy",
  "Bob Proctor",
  "Abraham-Hicks",
  "William Walker Atkinson",
  "Charles Haanel",
  "Jim Rohn",
  "Brian Tracy",
];

export default function AboutPage() {
  return (
    <main className="relative flex flex-col">
      <SiteNav />

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          About
        </p>
        <h1 className="mx-auto mb-6 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
          One person, one formula, one door.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          Your Key was not built by a company. It was built by one person who
          could not find a single place that treated manifestation as
          something rigorous — and decided to build it himself.
        </p>
      </section>

      {/* ─── The story ──────────────────────────────────────────────────── */}
      <section className="relative px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            The story
          </p>
          <h2 className="mb-8 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            Built solo, from the inside out.
          </h2>
          <div className="space-y-6 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            <p>
              Your Key is built by a young British founder who spent years
              living inside two worlds that rarely speak to each other: the
              full canon of manifestation literature — Wattles, Allen, Hill,
              Goddard, Nightingale, Murphy, Proctor, Abraham-Hicks, Atkinson,
              Haanel, Rohn, Tracy — and the peer-reviewed psychology of habit,
              belief and emotional state. Most people treat those two worlds
              as enemies. He treated them as two descriptions of the same
              mechanism.
            </p>
            <p>
              Out of that came a formula — <span className="font-mono text-white">T&nbsp;=&nbsp;R&nbsp;/&nbsp;f(C·E·g)</span> —
              a plain statement of what actually shortens the distance between
              wanting something and having it. Not a slogan. Something you
              could build a curriculum on, and then build software on top of
              the curriculum.
            </p>
            <p>
              So he filmed the seminar himself — eleven modules, face to
              camera, at the whiteboard, no slides to hide behind — and then
              engineered every tool in the app as a direct extension of a
              single lesson inside it. Nothing in Your Key exists because a
              roadmap said to build it. Every tool exists because a specific
              lesson demanded a specific practice.
            </p>
            <p>
              He teaches the same material in public, in shorter form, on
              TikTok and YouTube — the app is simply where the full version
              lives, with the tools attached.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The philosophy ─────────────────────────────────────────────── */}
      <section className="relative px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The philosophy
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
              Three convictions the whole app is built on.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-4 font-display text-xl font-medium text-white">
                You attract what you ARE
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Not what you wish for. Not what you visualise once and forget.
                Identity is upstream of circumstance — so the app is built to
                change who you are becoming, not just what you are asking for.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-4 font-display text-xl font-medium text-white">
                Practice over consumption
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Watching a video changes nothing. Reading a book changes
                nothing on its own. The seminar teaches the mechanism — the
                tools are where the mechanism is actually practised, daily,
                until it becomes who you are.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-4 font-display text-xl font-medium text-white">
                No leaderboards
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                There is no ranking against strangers. The only competition
                built into Your Key is against the person you were yesterday —
                measured honestly, by the Key in your own hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The canon ──────────────────────────────────────────────────── */}
      <section className="relative px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The canon
            </p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
              Twelve teachers. One tradition.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              Every lesson, every tool, and the Mastermind Council all draw
              from the same twelve names — never invented, never paraphrased
              beyond recognition, always attributed.
            </p>
          </div>

          <div className="mb-10 grid gap-3 sm:grid-cols-3 md:grid-cols-4">
            {CANON.map((name) => (
              <div
                key={name}
                className="rounded-xl border border-white/5 bg-[var(--color-card)] px-5 py-4 text-center text-sm text-[var(--color-text-secondary)]"
              >
                {name}
              </div>
            ))}
          </div>

          <MentorDisclaimer />
        </div>
      </section>

      {/* ─── Contact + Download ─────────────────────────────────────────── */}
      <section className="relative px-6 py-24 text-center sm:py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          Get in touch
        </p>
        <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
          Questions, feedback, anything at all.
        </h2>
        <p className="mb-10 text-base text-[var(--color-text-secondary)] sm:text-lg">
          <a
            href="mailto:hello@yourkey.app"
            className="text-[var(--color-gold)] transition hover:opacity-80"
          >
            hello@yourkey.app
          </a>
        </p>
        <DownloadBadges />
      </section>

      <SiteFooter />
    </main>
  );
}
