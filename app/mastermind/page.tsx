import type { Metadata } from "next";
import {
  SiteNav,
  SiteFooter,
  DownloadBadges,
  MentorDisclaimer,
} from "@/components/site";

/**
 * /mastermind — the AI guide, honestly framed.
 *
 * Hill's Master Mind principle rebuilt as a feature: an AI that APPLIES the
 * publicly available concepts of twelve teachers to the user's exact
 * situation. It never claims to BE them, channel them, or speak with their
 * authority — MentorDisclaimer renders prominently per the legal law.
 */

export const metadata: Metadata = {
  title: "The Mastermind — Your Key",
  description:
    "An AI guide that applies the published concepts of twelve personal-development teachers to your exact situation. Bring a block, a decision, a goal — the council answers.",
};

const MENTORS: { name: string; concept: string }[] = [
  { name: "Wallace Wattles", concept: "The Certain Way" },
  { name: "James Allen", concept: "You attract what you ARE" },
  { name: "Napoleon Hill", concept: "The Definite Chief Aim" },
  { name: "Neville Goddard", concept: "Living in the end" },
  { name: "Earl Nightingale", concept: "We become what we think about" },
  { name: "Joseph Murphy", concept: "The power of the subconscious" },
  { name: "Bob Proctor", concept: "The paradigm shift" },
  { name: "Abraham-Hicks", concept: "The emotional guidance scale" },
  {
    name: "William Walker Atkinson",
    concept: "The man who NAMED the Law of Attraction",
  },
  { name: "Charles Haanel", concept: "The Master Key System" },
  { name: "Jim Rohn", concept: "The philosophy of discipline" },
  { name: "Brian Tracy", concept: "The science of goal-setting" },
];

export default function MastermindPage() {
  return (
    <>
      <SiteNav />
      <main className="relative flex flex-col">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center overflow-hidden px-6 py-24 text-center sm:py-32">
          <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            The Mastermind
          </p>
          <h1 className="mb-6 max-w-4xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
            Twelve minds. One table. Your exact situation.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            Hill called it the Master Mind — two or more minds working in
            harmony toward a definite aim. The Mastermind is an AI guide built
            on that principle: it applies the publicly available concepts of
            twelve teachers in the personal-development tradition to whatever
            you bring it — a block, a decision, a goal that will not move.
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-[var(--color-text-dim)]">
            It does not impersonate them. It does not channel them. It reads
            your situation and reasons from what each teacher actually
            published — plainly, and by name, so you can always tell where an
            idea came from.
          </p>

          <DownloadBadges />
        </section>

        {/* ─── The 12 ───────────────────────────────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
                The Twelve
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                Every answer is grounded in someone specific.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MENTORS.map((mentor, i) => (
                <div
                  key={mentor.name}
                  className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-sm font-display text-[var(--color-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 font-display text-xl font-medium text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {mentor.concept}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works ─────────────────────────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
                How it works
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                Three steps to a different angle on your problem.
              </h2>
            </div>

            <div className="space-y-12">
              <MastermindStep
                number="1"
                title="Bring the real thing"
                body="Not a generic prompt — the actual block. The goal that stalled, the fear underneath it, the decision you keep circling. The Mastermind reads your goal data and your history so the context is already there."
              />
              <MastermindStep
                number="2"
                title="The council reasons, by name"
                body="Ask a general question and the response draws on the full twelve. Ask for one voice — Proctor on the paradigm shift, Goddard on living in the end — and it applies that teacher's specific published concept to your specific words."
              />
              <MastermindStep
                number="3"
                title="You act, not just reflect"
                body="Every response points back to the formula and to a tool you can open the same minute — a script to revise, an identity to rebuild, an affirmation to record. The council talks; the Key still has to turn."
              />
            </div>
          </div>
        </section>

        {/* ─── Depth by tier tease ──────────────────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              Grows with you
            </p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
              Ask one mentor. Ask five. Ask in your own voice.
            </h2>
            <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              Every tier reaches the Mastermind. Deeper tiers unlock longer
              follow-up threads, multi-mentor councils, and own-voice replies
              recorded to sound like you talking yourself through it.
            </p>
            <p className="text-sm text-[var(--color-text-dim)]">
              See exactly what each tier includes on the{" "}
              <a
                href="/pricing"
                className="text-[var(--color-gold)] underline decoration-[var(--color-gold)]/30 underline-offset-4 transition hover:decoration-[var(--color-gold)]"
              >
                Pricing
              </a>{" "}
              page.
            </p>
          </div>
        </section>

        {/* ─── Disclaimer + final CTA ───────────────────────────────────── */}
        <section className="relative px-6 pb-24 sm:pb-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
            <MentorDisclaimer />
            <DownloadBadges />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function MastermindStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 font-display text-2xl text-[var(--color-gold)]">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="mb-3 font-display text-2xl font-medium text-white sm:text-3xl">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
          {body}
        </p>
      </div>
    </div>
  );
}
