import Image from "next/image";
import Link from "next/link";
import { AppStoreButton, ComingTag, Faq, FreeCard, Kicker, PackageCard, Page, Section } from "@/components/site";
import { FREE_PACKAGE, PAID_PACKAGES, PACKAGE_PRICES, PRACTICE, PRIVACY_PLAINLY, RESULTS, SITE, TOOLKIT } from "@/lib/site";

/**
 * yourkey.app — the home page (rebuilt 2026-10-04 to the app's own design and words).
 *
 * Everything here is what the app does today, in the words of its App Store listing and its
 * package pages. Nothing on this page promises the reader a result: Your Key is a practice, and
 * the page says so in the same sentence the listing uses.
 */
export default function Home() {
  return (
    <Page>
      {/* ─── The one sentence ─────────────────────────────────────────────────────────────── */}
      <section className="glow px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6">
            <Kicker>Your Key · on iPhone</Kicker>
            <h1 className="taught text-[42px] leading-[1.06] sm:text-[64px]">
              Your goal, spoken back to you as already real.
            </h1>
            <p className="max-w-xl text-[18px] leading-8 text-[var(--color-soft)]">
              Write your goal in your own words. Your Key builds a daily practice around it: a guided
              visualisation, affirmations written for it, and identity work, morning and night. Free to
              start, and private on your phone.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AppStoreButton />
              <Link href="/packages" className="text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
                See the five packages →
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center sm:max-w-[380px]">
            <div aria-hidden className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(154,134,255,0.30) 0%, transparent 65%)" }} />
            <Image src="/app-icon.png" alt="The Your Key app icon" width={220} height={220} priority className="relative w-[130px] rounded-[30px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:w-[220px] sm:rounded-[48px]" />
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────────────────────────────── */}
      <Section kicker="How it works" title="Three steps, then every day." wide>
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            { n: "1", h: "Say what you want", b: "Your goal, in your own words. The whole practice is written around it, so it never reads like somebody else's." },
            { n: "2", h: "Hear it as already real", b: "A guided scene spoken aloud, affirmations in the present tense, and lines you can record in your own voice." },
            { n: "3", h: "Live it, day by day", b: "Identity work for seven, twenty-one or sixty-six days, and the tools for the habits that carry a goal." },
          ].map((s) => (
            <li key={s.n} className="glass flex flex-col gap-3 p-6">
              <span className="num text-[30px] text-[var(--color-amethyst)]">{s.n}</span>
              <h3 className="text-[19px] font-bold">{s.h}</h3>
              <p className="text-[15px] leading-6 text-[var(--color-soft)]">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── The free practice ───────────────────────────────────────────────────────────── */}
      <Section
        id="practice"
        kicker="The practice"
        title="What you get, free."
        lede="The core of Your Key costs nothing. Growth and Elite add longer sessions, higher limits and the longer programmes."
        wide
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {PRACTICE.map((p) => (
            <div key={p.name} className="glass flex flex-col gap-2 p-6">
              <h3 className="text-[18px] font-bold">{p.name}</h3>
              <p className="text-[15px] leading-6 text-[var(--color-soft)]">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="kicker text-[var(--color-faint)]">And the toolkit</p>
          <ul className="flex flex-wrap gap-2">
            {TOOLKIT.map((t) => (
              <li key={t} className="rounded-full border border-[var(--glass-border-hi)] px-3.5 py-1.5 text-[14px] text-[var(--color-soft)]">{t}</li>
            ))}
          </ul>
          <Link href="/tools" className="text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
            Everything in the practice →
          </Link>
        </div>
      </Section>

      {/* ─── The packages ─────────────────────────────────────────────────────────────────── */}
      <Section
        kicker="The packages"
        title="Five skills, each its own world inside the app."
        lede={
          <>
            Sales, time, communication and leadership, each its own subscription at {PACKAGE_PRICES.appMonthly} a month in the
            app, with a free week for new subscribers, or {PACKAGE_PRICES.webMonthly} a month on this website. Quitting is
            free, always. For a complete beginner and for somebody who has done it for years.
          </>
        }
        wide
      >
        <div className="flex items-center gap-3"><ComingTag /></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PAID_PACKAGES.map((p) => <PackageCard key={p.id} p={p} />)}
          <FreeCard p={FREE_PACKAGE} />
        </div>
        <Link href="/packages" className="text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
          Who each package is for →
        </Link>
      </Section>

      {/* ─── Privacy ──────────────────────────────────────────────────────────────────────── */}
      <Section kicker="Privacy, plainly" title="Your practice stays yours.">
        <div className="glass p-6 sm:p-8">
          <p className="text-[16px] leading-7 text-[var(--color-soft)]">{PRIVACY_PLAINLY}</p>
          <Link href="/privacy" className="mt-4 inline-block text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
            Read the privacy policy →
          </Link>
        </div>
      </Section>

      {/* ─── Questions ────────────────────────────────────────────────────────────────────── */}
      <Section kicker="Questions" title="Before you download.">
        <Faq
          items={[
            { q: "Is it free?", a: "Yes. The core practice is free, with usage limits on some tools. Growth, Elite and Inner Circle are optional subscriptions, shown with their prices in the app before you buy." },
            { q: "Do the packages cost extra?", a: <>Each paid package is its own subscription, {PACKAGE_PRICES.appMonthly} a month or {PACKAGE_PRICES.appYearly} a year in the app, with a free week for new subscribers, or {PACKAGE_PRICES.webMonthly} a month or {PACKAGE_PRICES.webYearly} a year on this website. Quitting is free. Inner Circle includes all four. <Link className="text-[var(--color-amethyst)] underline" href="/pricing">See pricing</Link>.</> },
            { q: "Which phones is it on?", a: "iPhone, from the App Store." },
            { q: "Is this therapy, or medical advice?", a: RESULTS },
            { q: "How do I cancel?", a: <>In your iPhone's subscription settings, or from the Packages tab in the app. <Link className="text-[var(--color-amethyst)] underline" href="/support#cancel">Every way to cancel</Link>.</> },
          ]}
        />
      </Section>

      {/* ─── Closing ──────────────────────────────────────────────────────────────────────── */}
      <section className="glow border-t border-[var(--hair)] px-4 py-20 sm:px-6 sm:py-28" style={{ ["--glow" as string]: "rgba(154,134,255,0.18)" }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Image src="/app-icon.png" alt="" width={72} height={72} className="rounded-[18px]" />
          <h2 className="taught text-[34px] leading-[1.15] sm:text-[46px]">Start with your goal tonight.</h2>
          <AppStoreButton />
          <p className="max-w-2xl text-[13px] leading-5 text-[var(--color-faint)]">{RESULTS}</p>
        </div>
      </section>
    </Page>
  );
}

export const dynamic = "force-static";
export const metadata = { alternates: { canonical: SITE.url } };
