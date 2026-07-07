import Image from "next/image";
import {
  SiteNav,
  SiteFooter,
  DownloadBadges,
  MentorDisclaimer,
} from "@/components/site";

/**
 * yourkey.app — permanent brand home. Rebuilt 2026-07-07 (shared-chrome pass).
 *
 * Register: the temple, not the SaaS page. Deep navy, ornate gold, ceremony
 * language — the same aesthetic as the app itself.
 *
 * Content verified against the shipped app (2026-07-07):
 *  - Formula T = R / f(C·E·g) — canon per the filmed seminar M1.2
 *  - 11-module FILMED seminar (71 lessons) wired via Bunny + The Examination
 *  - Tool list current: The Magnet + Vibration Raiser + Habit Forge +
 *    The Prescription + Practice Depth in; AI Coach deleted (absorbed into
 *    the Mastermind Council, 2026-05-22)
 *
 * Act-as-if-live: the app IS live in every line of copy. Download CTAs run
 * through the shared DownloadBadges component (href="#" — the one seam to
 * swap on launch day).
 */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="relative flex flex-col">
        {/* ─── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
          <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

          {/* The Key — the brand IS the object */}
          <div className="mb-10">
            <Image
              src="/logo.png"
              alt="Your Key"
              width={150}
              height={150}
              priority
              className="drop-shadow-[0_0_40px_rgba(212,175,55,0.35)]"
            />
          </div>

          <p className="mb-6 font-sans text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Your Key
          </p>

          <h1 className="mb-6 max-w-4xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The door was never locked.
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg md:text-xl">
            A filmed manifestation seminar, twenty-two daily practice tools,
            and twelve canon mentors — engineered around one formula:{" "}
            <span className="font-mono text-white">T&nbsp;=&nbsp;R&nbsp;/&nbsp;f(C·E·g)</span>.
          </p>

          <div className="mb-4">
            <DownloadBadges />
          </div>

          <a
            href="#seminar"
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[var(--color-text-dim)] transition hover:text-[var(--color-gold)]"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Enter</span>
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

        {/* ─── The Seminar — the crown jewel ─────────────────────────────── */}
        <section id="seminar" className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The Academy
            </p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
              A full seminar. Filmed. Inside the app.
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Not slides. Not a voice-over. Eleven modules taught face-to-camera
              at the whiteboard — from the Law of Attraction&apos;s mechanics,
              through six doors into the subconscious, to the single word the
              entire canon rests on. Then <span className="text-white">The
              Examination</span>: concept-level tests that seal each module, and
              a Final that proves the teaching lives in you.
            </p>

            <div className="grid gap-6 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
                <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">11</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  modules — foundations, the formula, the subconscious engine
                  room, aligned action, wealth, health, relationships, mistakes,
                  contradictions… and the closing.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
                <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">71</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  filmed lessons, each one grounded in the mentors&apos; own
                  books and peer-reviewed psychology — and each one pointing at
                  a tool you can open the same minute.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
                <p className="mb-2 font-display text-4xl text-[var(--color-gold)]">1</p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Final Examination. Earn all eleven module seals to face it.
                  Pass it, and you haven&apos;t watched a seminar — you&apos;ve
                  absorbed one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3 Pillars ──────────────────────────────────────────────────── */}
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
              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                  01
                </div>
                <h3 className="mb-4 font-display text-2xl font-medium text-white">
                  12 Canon Mentors
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Wallace Wattles. James Allen. Napoleon Hill. Neville Goddard.
                  Earl Nightingale. Joseph Murphy. Bob Proctor. Abraham-Hicks.
                  William Walker Atkinson. Charles Haanel. Jim Rohn. Brian Tracy.
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                  Not name-dropped — structurally embedded in every tool, every
                  lesson, every word the app speaks to you.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                  02
                </div>
                <h3 className="mb-4 font-display text-2xl font-medium text-white">
                  Built on a formula
                </h3>
                <p className="mb-4 font-mono text-base text-[var(--color-gold)]">
                  T = R / f(C·E·g)
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Time-to-manifest equals{" "}
                  <span className="text-white">Resistance</span> divided by the
                  function of <span className="text-white">Consistency</span> of
                  practice, in elevated <span className="text-white">Emotion</span>,
                  held in <span className="text-white">gratitude</span>.
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                  Every tool in the app moves one of those variables in your
                  favour. Nothing is decoration.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-xl font-display text-[var(--color-gold)]">
                  03
                </div>
                <h3 className="mb-4 font-display text-2xl font-medium text-white">
                  The Key itself
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Your streak lives inside a giant ornate key. Practise and it
                  glows. Miss days and it rusts — one turn restores the shine.
                  Thirty days forges the 30th Turning: a hallmark no one
                  else&apos;s key carries.
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-dim)]">
                  No leaderboards. No points. The Key is the avatar — and it
                  remembers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Key Remembers — gamification ──────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-card)] p-8 sm:p-12">
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex justify-center md:justify-start">
                  <Image
                    src="/logo.png"
                    alt="The Key"
                    width={96}
                    height={96}
                    className="drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  />
                </div>
                <div>
                  <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
                    The Key remembers
                  </p>
                  <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
                    Your streak isn&apos;t a number. It&apos;s an object.
                  </h2>
                  <p className="mb-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                    There is no leaderboard, because this was never a
                    competition. There is a giant ornate key, and it is
                    yours alone. Every practice turns it — the metal warms,
                    the engravings catch the light. Neglect it and it rusts;
                    one honest turn brings the shine straight back.
                  </p>
                  <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                    Thirty consecutive turnings forge the{" "}
                    <span className="text-white">30th Turning</span>. Reach
                    sixty-six — the number behaviour science ties to a habit
                    becoming automatic — and you enter{" "}
                    <span className="text-white">Elite Week</span>, the{" "}
                    <span className="text-white">66th Turning</span>. No one
                    else&apos;s key looks like yours. That&apos;s the point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What's Inside — the tools ─────────────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
                What&apos;s inside
              </p>
              <h2 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                Twenty-two tools, every one purposeful.
                <br />
                <span className="text-[var(--color-gold)]">None overlap.</span>
              </h2>
            </div>

            <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ToolCard
                title="The Magnet"
                body="The keystone practice — visualisation, spoken affirmation, scripting, body state and gratitude compounded into one daily session. Five channels into the subconscious at once."
              />
              <ToolCard
                title="Guided Visualization"
                body="Sensory-immersive scripts grounded in Wattles, personalised to your exact goal. Binaural underlay settles the brain into a receptive state."
              />
              <ToolCard
                title="Daily Affirmations"
                body="Personalised affirmations matched to your goal — narrated, or recorded in your own voice. Murphy and Hill's autosuggestion, made daily."
              />
              <ToolCard
                title="Mastermind Council"
                body="Hill's Master Mind principle on demand. Bring any block or question — the council of twelve mentors answers in their own voices."
              />
              <ToolCard
                title="Vibration Raiser"
                body="A pre-practice ritual that lifts your emotional state up the scale before the real work — because the broadcast matters more than the words."
              />
              <ToolCard
                title="Subliminal Mode"
                body="Custom subliminal scripts for deep subconscious uptake. Plays under your music while you work, walk, or fall asleep."
              />
              <ToolCard
                title="Dream Programming"
                body="Goddard's state-akin-to-sleep, engineered. Programme the night shift — your subconscious works while you rest."
              />
              <ToolCard
                title="Revision"
                body="Rewrite the day in imagination before sleep — Goddard's revision technique with audio in your voice or narrated."
              />
              <ToolCard
                title="Identity Blueprint"
                body="You attract what you ARE. A day-by-day programme that rebuilds the identity your goal belongs to — for wealth, health, or love."
              />
            </div>

            <div className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-8">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
                And the rest of the ring
              </p>
              <div className="grid gap-x-6 gap-y-3 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2 md:grid-cols-3">
                <span>Future Self Letter</span>
                <span>Camera Mirror</span>
                <span>Vision Board</span>
                <span>Scripting</span>
                <span>Gratitude Journal</span>
                <span>369 Method</span>
                <span>Breathwork</span>
                <span>EFT Tapping</span>
                <span>The Downstream</span>
                <span>Habit Forge</span>
                <span>The Prescription</span>
                <span>Practice Depth</span>
                <span>Evidence Library</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── How It Works ──────────────────────────────────────────────── */}
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
                title="Forge your goal"
                body="A guided ceremony walks you through the questions Hill insisted on a century ago — what, exactly, and why. Vague goals cannot be delivered. Yours becomes precise enough to manifest."
              />
              <Step
                number="2"
                title="Turn the Key daily"
                body="Open the app. The morning, midday and evening Turnings each recommend the right practice for the hour. Three to ten minutes — every tool personalised to your goal, every practice turning the Key."
              />
              <Step
                number="3"
                title="Shrink the T"
                body="As Resistance drops and Consistency, Emotion and gratitude rise, time-to-manifest shortens — that is the formula doing its work. The seminar teaches why. The tools do it. The Key remembers."
              />
            </div>
          </div>
        </section>

        {/* ─── Final CTA ──────────────────────────────────────────────────── */}
        <section className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
              The door was never locked.
            </h2>
            <p className="mb-10 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Your Key is free to practise, forever — the seminar, The
              Examination, and twenty-plus tools included. Download it and
              turn the Key today.
            </p>
            <DownloadBadges />
          </div>
        </section>

        {/* ─── Mentor disclaimer ──────────────────────────────────────────── */}
        <div className="px-6 pb-16">
          <MentorDisclaimer />
        </div>
      </main>
      <SiteFooter />
    </>
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
