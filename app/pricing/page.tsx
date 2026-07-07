import type { Metadata } from "next";
import { SiteNav, SiteFooter, DownloadBadges } from "@/components/site";

/**
 * /pricing — three tiers. Free is generous and listed first (the app is
 * real practice forever, not a paywalled demo). Growth is the "most chosen"
 * highlighted middle tier. Elite is the deep end for the fully committed.
 *
 * All figures per TRUE FACTS in the build brief — do not invent numbers.
 */

export const metadata: Metadata = {
  title: "Pricing — Your Key",
  description:
    "Free forever with real practice, or go deeper with Growth, Elite, or the Inner Circle. Simple monthly and annual plans, cancel anytime in your App Store settings.",
};

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main className="relative flex flex-col">
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center overflow-hidden px-6 py-24 text-center sm:py-32">
          <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Pricing
          </p>
          <h1 className="mb-6 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
            Free is real practice. Paid is going deeper.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            No trial gates, no demo mode. Every tier trains the same formula
            — the difference is depth, quota, and how far the Key follows you
            into your own voice.
          </p>
        </section>

        {/* ─── Tier cards ───────────────────────────────────────────────── */}
        <section className="relative px-6 pb-12">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {/* Free */}
            <div className="flex flex-col rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
                Free
              </p>
              <p className="mb-1 font-display text-4xl font-medium text-white">
                £0
              </p>
              <p className="mb-6 text-sm text-[var(--color-text-dim)]">
                forever, no card required
              </p>

              <ul className="mb-8 flex-1 space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <PricingItem>
                  The full filmed seminar — 11 modules, 71 lessons
                </PricingItem>
                <PricingItem>
                  The Examination — module seals, the Final, your certificate
                </PricingItem>
                <PricingItem>
                  20+ practice tools, with daily quotas
                </PricingItem>
                <PricingItem>
                  The giant Key, your streak, and the Turnings
                </PricingItem>
                <PricingItem>Habit Forge and The Prescription</PricingItem>
              </ul>

              <a
                href="#download"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-[var(--color-gold)]/40 hover:bg-white/10"
              >
                Start free
              </a>
            </div>

            {/* Growth — highlighted */}
            <div className="relative flex flex-col rounded-2xl border-2 border-[var(--color-gold)]/50 bg-[var(--color-card)] p-8 shadow-[0_0_60px_rgba(212,175,55,0.12)] lg:-translate-y-4">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-gold)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-background)]">
                Most chosen
              </span>

              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Growth
              </p>
              <p className="mb-1 font-display text-4xl font-medium text-white">
                £9.99
                <span className="ml-1 text-base font-normal text-[var(--color-text-dim)]">
                  /month
                </span>
              </p>
              <p className="mb-6 text-sm text-[var(--color-text-dim)]">
                or £49.99/year — about £4.17/month
              </p>

              <ul className="mb-8 flex-1 space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <PricingItem>Everything in Free</PricingItem>
                <PricingItem>Deeper daily quotas across every tool</PricingItem>
                <PricingItem>
                  Personalised AI weave in the audio tools — your goal, woven
                  into the script
                </PricingItem>
                <PricingItem>
                  Mastermind follow-up threads, not just single answers
                </PricingItem>
              </ul>

              <a
                href="#download"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition hover:bg-[var(--color-gold-muted)]"
              >
                Choose Growth
              </a>
            </div>

            {/* Elite */}
            <div className="flex flex-col rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[var(--color-text-dim)]">
                Elite
              </p>
              <p className="mb-1 font-display text-4xl font-medium text-white">
                £19.99
                <span className="ml-1 text-base font-normal text-[var(--color-text-dim)]">
                  /month
                </span>
              </p>
              <p className="mb-6 text-sm text-[var(--color-text-dim)]">
                the deep end
              </p>

              <ul className="mb-8 flex-1 space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                <PricingItem>Everything in Growth</PricingItem>
                <PricingItem>The highest quotas in the app</PricingItem>
                <PricingItem>
                  Own-voice modes — tools narrated back to you in your voice
                </PricingItem>
                <PricingItem>
                  Five-mentor councils in the Mastermind
                </PricingItem>
                <PricingItem>Deep analytics on your practice</PricingItem>
              </ul>

              <a
                href="#download"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-[var(--color-gold)]/40 hover:bg-white/10"
              >
                Choose Elite
              </a>
            </div>
          </div>
        </section>

        {/* ─── The Inner Circle ─────────────────────────────────────────── */}
        <section className="relative px-6 py-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 bg-gradient-to-br from-[#0D1133] via-[#1F1A08] to-[#050308] p-8 sm:p-12">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
              🗝 Founding Keepers — first 100, £39.99/mo held forever
            </p>
            <h2 className="mb-3 font-display text-3xl font-medium text-white sm:text-4xl">
              The Inner Circle
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              You don&apos;t get more of the app. You get inducted into it.
            </p>

            <div className="mb-8 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="mb-1 font-medium text-white">🏛️ The Full Council</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  All twelve mentors, every session. Every mind you&apos;ve ever
                  learned from, in the room with you, at once.
                </p>
              </div>
              <div>
                <p className="mb-1 font-medium text-white">✉️ The Monthly Reading</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  A personal letter from the council, every month — written from
                  your goals, your evidence, the rhythm of your practice.
                </p>
              </div>
              <div>
                <p className="mb-1 font-medium text-white">♾️ The Council never closes</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Fifty sessions a day, and your name honoured among the first
                  one hundred Keepers. Once claimed, closed forever.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <p className="font-display text-3xl font-medium text-white">
                £44.99
                <span className="ml-1 text-base font-normal text-[var(--color-text-dim)]">
                  /month · or £37.50/mo billed annually (£449.99)
                </span>
              </p>
              <a
                href="#download"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition hover:bg-[var(--color-gold-muted)]"
              >
                Claim a Founding Seat
              </a>
            </div>
          </div>
        </section>

        {/* ─── Shared plans tease ───────────────────────────────────────── */}
        <section className="relative px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 text-center sm:p-10">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
              For two, or the whole family
            </p>
            <h2 className="mb-4 font-display text-2xl font-medium text-white sm:text-3xl">
              Shared plans are coming to Growth and Elite.
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Practise the formula together — couples and families will be
              able to share a single subscription across their own accounts,
              each with their own goal, their own Key, their own streak.
            </p>
          </div>
        </section>

        {/* ─── FAQ-ish clarifiers ───────────────────────────────────────── */}
        <section className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
                Nothing hidden.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-6">
                <h3 className="mb-2 font-display text-lg text-white">
                  Free is not a demo
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  The whole seminar and The Examination are free forever. What
                  paid tiers add is depth and personalisation, not access to
                  content that&apos;s locked away.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-6">
                <h3 className="mb-2 font-display text-lg text-white">
                  Cancel whenever
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Subscriptions renew automatically until you cancel. Cancel
                  any time in your App Store or Google Play account settings
                  — it takes effect at the end of the period you&apos;ve
                  already paid for.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ────────────────────────────────────────────────── */}
        <section className="relative px-6 pb-24 sm:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
              Start with Free. Upgrade the moment it earns it.
            </h2>
            <DownloadBadges />
            <p className="max-w-xl text-xs leading-relaxed text-[var(--color-text-dim)]">
              Prices shown in GBP. Subscriptions automatically renew until
              cancelled. You can cancel anytime in your App Store or Google
              Play account settings.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function PricingItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 flex-shrink-0 text-[var(--color-gold)]"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
