import Image from "next/image";

/**
 * yourkey.app landing page — permanent brand home.
 *
 * Pre-launch state: hero CTA = "Join the waitlist" (email → Firestore).
 * Post-launch state: hero CTA swaps to App Store + Play Store buttons.
 *
 * All content verified against:
 *   - data/lessons.ts (12 modules, ~130 lessons)
 *   - docs/Learn Tab Lesson Outlines.md (formula, 12 mentors)
 *   - app/ directory (22 features confirmed)
 */
export default function Home() {
  return (
    <main className="relative flex flex-col">
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* Aurora gradient backdrop — subtle, not loud */}
        <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/logo.png"
            alt="Your Key"
            width={140}
            height={140}
            priority
            className="drop-shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          />
        </div>

        {/* Wordmark */}
        <p className="mb-6 font-sans text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          Your Key
        </p>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          The science of manifestation,
          <br className="hidden sm:block" />{" "}
          <span className="text-[var(--color-gold)]">in your pocket.</span>
        </h1>

        {/* Subheadline */}
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg md:text-xl">
          AI-personalized practices grounded in 12 canon mentors and
          peer-reviewed psychology — built around the formula{" "}
          <span className="font-mono text-white">T = R / f(AVEg)</span>.
        </p>

        {/* Hero CTA placeholder — currently no email capture (decided 2026-05-04
            to avoid email follow-up debt; pre-launch traffic ~0). At APP LAUNCH,
            slot <DownloadButtons /> here with Apple + Google Play badges linking
            to actual store URLs. See memory/project_website_launch_swap.md for
            the full launch-day swap checklist. Until then, the rich content
            below + scroll indicator is the implicit CTA. */}

        {/* Scroll indicator — gentle bounce so users know there's more below */}
        <a
          href="#why"
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[var(--color-text-dim)] transition hover:text-[var(--color-gold)]"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </section>

      {/* ─── 3 Pillars — what makes Your Key uniquely defensible ────────── */}
      <section id="why" className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              Why Your Key
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              Three pillars no other app combines.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1 — 12 Canon Mentors (CORRECTED LIST) */}
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                01
              </div>
              <h3 className="mb-4 font-display text-2xl font-medium text-white">
                12 Canon Mentors
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Napoleon Hill. Brian Tracy. Jim Rohn. Earl Shoaff. Earl
                Nightingale. Neville Goddard. Bob Proctor. James Allen. Wallace
                Wattles. Joseph Murphy. Abraham-Hicks. Louise Hay.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                Their teachings are woven into every tool, every prompt, every
                lesson — not name-dropped, structurally embedded.
              </p>
            </div>

            {/* Pillar 2 — The Formula (CORRECTED A = AFFIRMATIONS) */}
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                02
              </div>
              <h3 className="mb-4 font-display text-2xl font-medium text-white">
                Built on a formula
              </h3>
              <p className="mb-4 font-mono text-base text-[var(--color-gold)]">
                T = R / f(AVEg)
              </p>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Time-to-manifest equals Resistance divided by the function of{" "}
                <span className="text-white">Affirmations</span>,{" "}
                <span className="text-white">Visualisations</span>,{" "}
                <span className="text-white">Emotion</span>, and{" "}
                <span className="text-white">gratitude</span>.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                Every tool moves a variable in your favour.
              </p>
            </div>

            {/* Pillar 3 — Course (CORRECTED to 12 modules, ~130 lessons) */}
            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                03
              </div>
              <h3 className="mb-4 font-display text-2xl font-medium text-white">
                12-module masterclass
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Over 130 lessons across 12 modules — from the foundations of
                mental science through advanced practice, ending with a
                personal benediction from the founder.
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                Most apps give you tools. We teach you why they work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What's Inside — the tools (EXPANDED to 22 features) ─────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              What&apos;s inside
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              22 tools, every one purposeful.
              <br />
              <span className="text-[var(--color-gold)]">None overlap.</span>
            </h2>
          </div>

          {/* Top tier — the headline tools with full descriptions */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              title="Daily Affirmations"
              body="AI-personalized affirmations matched to your goal, narrated by AI or your own voice. Repetition rewires neural pathways — Murphy + Hill autosuggestion."
            />
            <ToolCard
              title="Guided Visualization"
              body="Sensory-immersive scripts grounded in Wattles. Headphones recommended — binaural beats sync your brain into receptive theta state."
            />
            <ToolCard
              title="Camera Mirror"
              body="Speak your affirmations directly to yourself in a mirror — your own voice or AI narration. Tracy's recorded-voice technique made daily."
            />
            <ToolCard
              title="Subliminal Mode"
              body="Custom subliminal scripts at 0.8x speed for deep subconscious uptake. Plays under your music while you work, walk, or sleep."
            />
            <ToolCard
              title="Future Self Letter"
              body="An AI-written letter to you from your future self at the moment of arrival — in your context, narrated by AI voice."
            />
            <ToolCard
              title="Identity Blueprint"
              body="Who you must become for the goal to be inevitable. Generated from your Definite Chief Aim, refined as you grow into the role."
            />
            <ToolCard
              title="Revision (Goddard)"
              body="Neville Goddard&apos;s revision technique — rewrite the day in your imagination before sleep. Audio in your voice or AI narration."
            />
            <ToolCard
              title="AI Coach"
              body="A pocket conversation with the canon. Bring any block, any doubt, any question — answered in the voice of the most relevant of 12 mentors."
            />
            <ToolCard
              title="Mastermind Council"
              body="Hill&apos;s Master Mind principle, daily. Three mentors weigh in on Growth tier. Five voices on Elite. The full council on demand."
            />
          </div>

          {/* Second tier — compressed list of the rest */}
          <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
              Plus 13 more
            </p>
            <div className="grid gap-x-6 gap-y-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2 md:grid-cols-3">
              <span>Self-Recorded Visualization</span>
              <span>Vision Board</span>
              <span>Scripting</span>
              <span>Gratitude Journal</span>
              <span>369 Method</span>
              <span>Breathwork</span>
              <span>EFT Tapping</span>
              <span>Dream Programming</span>
              <span>Downstream (Action)</span>
              <span>Definite Chief Aim Flow</span>
              <span>Alignment Analytics</span>
              <span>Evidence Log</span>
              <span>Mentor Library</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works — 3 steps ────────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              How it works
            </p>
            <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              Three steps. Daily. Forever.
            </h2>
          </div>

          <div className="space-y-12">
            <Step
              number="1"
              title="Define your goal"
              body="The Definite Chief Aim flow walks you through the questions Hill insisted on a century ago — what, why, by when, who else benefits, how it feels. Your goal becomes precise enough to manifest."
            />
            <Step
              number="2"
              title="Practise daily"
              body="Open the app. Pick a tool. Run it for 3-10 minutes. Every tool is personalized to your goal, grounded in canon mentors, scientifically validated. Track your streak."
            />
            <Step
              number="3"
              title="Watch your alignment rise"
              body="As resistance drops and practice rises, the manifestation curve shortens. The Learn tab teaches the principles. The Practice tab applies them. The Goals tab tracks the arc."
            />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Your Key"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-display text-lg text-white">Your Key</span>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <a
              href="mailto:hello@yourkey.app"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              hello@yourkey.app
            </a>
            <a
              href="/privacy"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Terms
            </a>
          </div>

          <p className="text-xs text-[var(--color-text-dim)]">
            © 2026 Your Key App Ltd
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ─── Reusable section sub-components ───────────────────────────────────── */

function ToolCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
      <h3 className="mb-3 font-display text-xl font-medium text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {body}
      </p>
    </div>
  );
}

function Step({
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
