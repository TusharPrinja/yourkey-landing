import type { Metadata } from "next";
import {
  SiteNav,
  SiteFooter,
  DownloadBadges,
  MentorDisclaimer,
} from "@/components/site";

/**
 * /seminar — The Academy. The filmed seminar's dedicated home.
 *
 * 11 modules, 71 filmed lessons, inside the app — plus The Examination
 * (per-module seals + Final + certificate). ACT-AS-IF-LIVE: the app is live
 * throughout; DownloadBadges are the only CTA, href="#" placeholders.
 */
export const metadata: Metadata = {
  title: "The Academy — The Seminar Inside Your Key",
  description:
    "Eleven modules. Seventy-one filmed lessons. The full manifestation seminar, taught face-to-camera and sealed by The Examination — free, inside the app.",
};

const MODULES = [
  {
    n: "01",
    title: "Welcome",
    body: "Why this is real — a century of teachers, the science underneath, and the formula that runs every tool you will ever open in this app.",
  },
  {
    n: "02",
    title: "The Law of Attraction",
    body: "What the tradition teaches happens between a thought and a thing. Ask, believe, receive — and the modern research that echoes what the old teachers taught.",
  },
  {
    n: "03",
    title: "The Subconscious Engine Room",
    body: "Six doors into the part of your mind that quietly runs so much of your life. Autosuggestion, imagination, repetition — the mechanics behind every audio tool in the app.",
  },
  {
    n: "04",
    title: "Aligned Action",
    body: "The discipline the manifestation crowd conveniently skips. Belief without motion is a wish. This module makes the motion inevitable.",
  },
  {
    n: "05",
    title: "Infinite Intelligence",
    body: "Why the universe always delivers something — and how to make sure what it delivers is what you actually asked for.",
  },
  {
    n: "06",
    title: "How to Manifest Wealth",
    body: "Wattles' science of getting rich, Rohn's disciplines, and the identity shift that has to happen before the bank balance does.",
  },
  {
    n: "07",
    title: "How to Manifest Health",
    body: "Body and mind as one instrument. The mentors on vitality, the modern science on stress and the nervous system — combined into a single practice.",
  },
  {
    n: "08",
    title: "How to Manifest Relationships",
    body: "The Law of Attraction applied to the hardest room in the house — love, family, friendship — without losing yourself in someone else's approval.",
  },
  {
    n: "09",
    title: "The Mistakes",
    body: "Every way a sincere person sabotages their own manifestation — named plainly, so you stop making them the moment you close this module.",
  },
  {
    n: "10",
    title: "The Contradictions",
    body: "Twelve mentors do not always agree. This module resolves the apparent conflicts so you stop getting stuck between two teachers who were both right.",
  },
  {
    n: "11",
    title: "The Closing",
    body: "The message the entire seminar has been building to — delivered once, meant to be watched last, and meant to be watched again a year from now.",
  },
];

export default function SeminarPage() {
  return (
    <main className="relative flex flex-col">
      <SiteNav />

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          The Academy
        </p>
        <h1 className="mb-6 max-w-4xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
          A full seminar. Filmed.
          <br />
          Sealed by an exam only you can pass.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          Not slides. Not a voice-over. Eleven modules taught face-to-camera —
          from the mechanics of the Law of Attraction, through six doors into
          the subconscious, to the single message the whole canon rests on.
          Free, inside the app, forever.
        </p>

        <DownloadBadges />
      </section>

      {/* ─── The numbers ────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 text-center">
            <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">
              11
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              modules — the full arc, from foundations to the closing message.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 text-center">
            <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">
              71
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              filmed lessons, each grounded in the mentors&apos; own words and
              modern peer-reviewed science.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 text-center">
            <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">
              1
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              certificate. Earned only after every module seal and the Final
              are behind you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── The teaching arc ───────────────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The teaching arc
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              Eleven modules. One throughline.
            </h2>
          </div>

          <div className="space-y-4">
            {MODULES.map((m) => (
              <div
                key={m.n}
                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)] sm:flex-row sm:items-center sm:gap-8 sm:p-8"
              >
                <div className="flex-shrink-0 font-display text-3xl text-[var(--color-gold)] sm:w-16">
                  {m.n}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-xl font-medium text-white sm:text-2xl">
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Examination ────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The Examination
            </p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              Watching is not the same as knowing.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Every module ends the same way — not with a quiz for its own
              sake, but with a seal. You do not move on because the video
              ended. You move on because you proved the concept lives in you.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-3 font-display text-xl font-medium text-white">
                Eleven seals
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                A concept exam closes each module — sourced entirely from what
                you just watched. Pass it, and the module is sealed for good.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-3 font-display text-xl font-medium text-white">
                The Final
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Earn all eleven seals and the Final unlocks — the full seminar,
                tested at once. This is where you find out what actually
                stuck.
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <h3 className="mb-3 font-display text-xl font-medium text-white">
                The certificate
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Pass the Final and it&apos;s yours. Not a participation badge —
                proof you didn&apos;t just watch a seminar. You absorbed one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Free, inside the app ───────────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            No paywall on the truth
          </p>
          <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            The entire Academy is free. Forever.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            All eleven modules, all seventy-one lessons, every seal, the
            Final, the certificate — none of it sits behind a subscription.
            The formula that runs the rest of the app deserves to be taught in
            full, to everyone who downloads it.
          </p>
          <DownloadBadges />
        </div>
      </section>

      {/* ─── Legal ───────────────────────────────────────────────────────── */}
      <section className="relative px-6 pb-12">
        <div className="mx-auto max-w-3xl">
          <MentorDisclaimer />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
