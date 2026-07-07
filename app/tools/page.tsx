import type { Metadata } from "next";
import {
  SiteNav,
  SiteFooter,
  DownloadBadges,
  MentorDisclaimer,
} from "@/components/site";

/**
 * /tools — all 22 tools, grouped into four practice families.
 * The Magnet leads as the keystone (featured card, not grouped).
 * ACT-AS-IF-LIVE: DownloadBadges only CTA, href="#" placeholders.
 */
export const metadata: Metadata = {
  title: "The Tools — 22 Ways to Turn the Key",
  description:
    "The Magnet, Vibration Raiser, Mastermind Council and nineteen more — twenty-two manifestation tools grounded in twelve canon mentors and peer-reviewed psychology, free inside Your Key.",
};

type Tool = { title: string; body: string };

const DAILY_CORE: Tool[] = [
  {
    title: "Guided Visualization",
    body: "Sensory-immersive scripts personalised to your exact goal. A settling audio underlay eases the brain into a receptive state before the words even begin.",
  },
  {
    title: "Daily Affirmations",
    body: "Personalised lines matched to your goal — narrated, or recorded in your own voice. Autosuggestion, done properly, done daily.",
  },
  {
    title: "Gratitude Journal",
    body: "Three lines, every day, in the tense that matters. Gratitude is not the reward for manifesting — it is the mechanism.",
  },
  {
    title: "369 Method",
    body: "Write it three times, six times, nine times. The old ritual, timed and tracked so it actually happens instead of staying an idea.",
  },
  {
    title: "Breathwork",
    body: "A short guided pattern that drops your nervous system out of resistance and into the state every other tool in this list depends on.",
  },
];

const DEEP_WORK: Tool[] = [
  {
    title: "Mastermind Council",
    body: "Bring a block or a question. The council of twelve mentors answers in their own register — the principle Hill called the Master Mind, on demand.",
  },
  {
    title: "Identity Blueprint",
    body: "You attract what you ARE, not what you want. A day-by-day programme that rebuilds the identity your goal actually belongs to.",
  },
  {
    title: "Scripting",
    body: "Write the scene as if it already happened — present tense, full detail. The subconscious cannot tell a vivid script from a memory.",
  },
  {
    title: "Vision Board",
    body: "Build the board that used to take scissors and a corkboard. Images, words, and your goal statement — arranged to be seen daily.",
  },
  {
    title: "EFT Tapping",
    body: "Tap through the resistance a goal surfaces instead of pretending it isn't there. Denial delays; tapping clears.",
  },
  {
    title: "The Prescription",
    body: "Name what you actually want, right now, in your own words. Receive the exact tool stack built for that specific ask — no browsing required.",
  },
];

const NIGHT_TOOLS: Tool[] = [
  {
    title: "Subliminal Mode",
    body: "Custom scripts for deep subconscious uptake, playing quietly under your own music while you work, walk, or drift off.",
  },
  {
    title: "Dream Programming",
    body: "The state-akin-to-sleep Neville taught, engineered for tonight. Set the instruction before you drop off; the night shift does the rest.",
  },
  {
    title: "Revision",
    body: "Rewrite today in imagination before you sleep. Neville's revision technique, narrated or recorded in your own voice.",
  },
];

const GUIDANCE_TRACKING: Tool[] = [
  {
    title: "Vibration Raiser",
    body: "A short ritual that lifts your emotional state up the scale before the real practice begins — because the broadcast matters more than the words.",
  },
  {
    title: "Future Self Letter",
    body: "A letter written to you, from the version of you who already has it. Read on the days the goal feels far away.",
  },
  {
    title: "Camera Mirror",
    body: "Speak your affirmation to your own face. Confrontation, not comfort — and the fastest way to notice when you don't yet believe it.",
  },
  {
    title: "The Downstream",
    body: "A short reset for the moments resistance spikes mid-day — the practice for when you can't wait for tonight's ritual.",
  },
  {
    title: "Habit Forge",
    body: "James Clear's Four Laws, built as a ritual: make it obvious, attractive, easy, satisfying — tracked to the sixty-sixth rep, where it stops being effort.",
  },
  {
    title: "Practice Depth",
    body: "A quiet read on how deep, not just how often — because a hollow streak and a felt one look identical from the outside.",
  },
  {
    title: "Evidence Library",
    body: "Every sign, coincidence and small win, logged in one place. Resistance forgets. This is where proof lives so you don't have to argue with doubt from memory.",
  },
];

export default function ToolsPage() {
  return (
    <main className="relative flex flex-col">
      <SiteNav />

      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="aurora-glow pointer-events-none absolute inset-0 -z-10" />

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          The Tools
        </p>
        <h1 className="mb-6 max-w-4xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
          Twenty-two tools.
          <br />
          Every one earns its place.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          Nothing here overlaps. Each tool moves a specific variable in the
          formula — Resistance down, Consistency up, Emotion elevated,
          gratitude held — and every one is personalised to the goal you set
          on day one.
        </p>

        <DownloadBadges />
      </section>

      {/* ─── The Magnet — featured keystone ─────────────────────────────── */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[var(--color-gold)]/30 bg-gradient-to-br from-[var(--color-card)] to-[var(--color-card-hover)] p-10 sm:p-14">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
              The keystone
            </p>
            <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
              The Magnet
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              Visualisation, spoken affirmation, scripting, body state and
              gratitude — five channels into the subconscious, compounded
              into a single daily session. If you only ever open one tool in
              this app, this is the one built to carry the whole formula on
              its own.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Daily Core ─────────────────────────────────────────────────── */}
      <ToolGroup
        eyebrow="Daily Core"
        heading="The five you'll actually use every day."
        tools={DAILY_CORE}
      />

      {/* ─── The Deep Work ──────────────────────────────────────────────── */}
      <ToolGroup
        eyebrow="The Deep Work"
        heading="For rebuilding the identity underneath the goal."
        tools={DEEP_WORK}
      />

      {/* ─── Night Tools ────────────────────────────────────────────────── */}
      <ToolGroup
        eyebrow="Night Tools"
        heading="The subconscious does its best work while you sleep."
        tools={NIGHT_TOOLS}
      />

      {/* ─── Guidance & Tracking ────────────────────────────────────────── */}
      <ToolGroup
        eyebrow="Guidance & Tracking"
        heading="The instruments that keep the practice honest."
        tools={GUIDANCE_TRACKING}
      />

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            Free to begin
          </p>
          <h2 className="mb-6 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            Every tool starts on the free tier.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            Daily quotas, real practice, no trial clock. Growth and Elite
            simply go deeper — wider quotas, a personalised weave through your
            own goal, and modes that speak in your own recorded voice.
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

/* ─── Reusable section sub-component ────────────────────────────────────── */

function ToolGroup({
  eyebrow,
  heading,
  tools,
}: {
  eyebrow: string;
  heading: string;
  tools: Tool[];
}) {
  return (
    <section className="relative px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 transition hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-card-hover)]"
            >
              <h3 className="mb-3 font-display text-xl font-medium text-white">
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {tool.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
