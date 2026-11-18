import Link from "next/link";
import { AppStoreButton, ComingTag, Faq, PackagesList, Page, PhoneFan, Plans, Section, SiteNav, ToolTiles } from "@/components/site";
import { AndroidAsk, TryIt } from "@/components/try-client";
import { PACKAGE_PRICES, PLANS_WHERE, PRIVACY_PLAINLY, RESULTS, SITE, homeJsonLd } from "@/lib/site";

/**
 * yourkey.app — the home page, in the app's Moonlit look (rebuilt 15 November 2026 with app version 1.3.0).
 *
 * His pick of three looks: "I like option C ... we keep the C's website and the phone things and everything for C,
 * but we change the very top of C to what is in the top of B." So the top is the sky, a photograph that follows
 * the visitor's clock as Home does in the app, with the app's own screens standing in it; then every tool on its
 * own photograph, the plans, and the packages.
 *
 * Everything here is what the app does today, in the words of its App Store listing for 1.3.0. Nothing on this
 * page promises the reader a result: Your Key is a practice, and the page says so.
 */
export default function Home() {
  return (
    <Page nav={false}>
      {/* What search engines read about the app and these questions (schema.org). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()) }} />
      {/* ─── The sky, the one sentence, and the app ────────────────────────────────────────── */}
      <section className="sky-hero">
        <div className="sky dawn" />
        <div className="sky golden" />
        <div className="sky dusk" />
        <div className="sky night" />
        <div className="sky-shade" />
        <SiteNav over />
        <div className="wrap hero-grid">
          <div className="hero-words">
            {/* The greeting is the hour's, as on the app's Home; the stylesheet shows the one that is true. */}
            <p className="eyebrow">
              <span className="greet dawn">Good morning</span>
              <span className="greet golden">Good afternoon</span>
              <span className="greet dusk">Good evening</span>
              <span className="greet night">Good evening</span>
            </p>
            <h1 className="serif h1">The Law of Attraction, as a daily practice.</h1>
            <p className="lede">
              Choose what you want most, and every tool speaks to it. A few minutes in the morning, a few at night,
              guided all the way.
            </p>
            <div className="cta">
              <AppStoreButton />
              <a href="#try" className="link">▶ Try a 2-minute visualisation now</a>
            </div>
            {/* A div, not a paragraph: the Android box opens inside it as a form. */}
            <div className="tiny">
              Free for as long as you like. No card. On iPhone. <AndroidAsk />
            </div>
            {/* His words, 18 November 2026; the photo is a frame from his own Law of Attraction seminar. */}
            <div className="founder">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/moonlit/tushar.jpg" alt="Tushar, the founder of Your Key" width={60} height={60} />
              <p>
                Your Key is built on the principles of the Law of Attraction, including everything I teach in my seminars.
                <span>Tushar, founder</span>
              </p>
            </div>
          </div>
          <PhoneFan />
        </div>
      </section>

      {/* ─── Try it before you download (the growth audit, 18 November 2026) ───────────────────── */}
      <Section id="try" title="Try it before you download." lede="Two minutes, right here. Choose what you want most and press play.">
        <TryIt />
      </Section>

      {/* ─── Every tool ───────────────────────────────────────────────────────────────────── */}
      <Section id="practice" title="Every tool, ready when you need it.">
        <ToolTiles />
        <Link href="/tools" className="link" style={{ alignSelf: "flex-start", marginTop: 6 }}>Everything in the practice</Link>
      </Section>

      {/* ─── How it works ─────────────────────────────────────────────────────────────────── */}
      <Section title="Three steps, then every day.">
        <ol className="steps">
          {[
            { h: "Choose what you want most", b: "From money to love to your first customers. Then say it exactly: what you want, what you give, a date and your first step, in one sentence you read aloud." },
            { h: "Feel it as already done", b: "Your scene, felt from inside and guided all the way. Five affirmations a day, and a Night Session you fall asleep inside." },
            { h: "Live it, day by day", b: "The Identity Blueprint: one small act a day for sixty-six days. Say it on waking, do it, and close the day at night." },
          ].map((s) => (
            <li key={s.h} className="step">
              <h3>{s.h}</h3>
              <p>{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── The plans ────────────────────────────────────────────────────────────────────── */}
      <Section
        title="Free, for as long as you like."
        lede={`Go further when you want to. ${PLANS_WHERE}`}
      >
        <Plans />
        <Link href="/pricing" className="link" style={{ alignSelf: "flex-start", marginTop: 6 }}>Compare the plans</Link>
      </Section>

      {/* ─── The packages ─────────────────────────────────────────────────────────────────── */}
      <Section
        title="Five packages for five skills."
        lede={
          <>
            Each has its own home, daily tools, course and guided voice sessions. {PACKAGE_PRICES.webMonthly} a month or{" "}
            {PACKAGE_PRICES.webYearly} a year on this website, and {PACKAGE_PRICES.appMonthly} a month in the app with a free
            week for new subscribers. Quitting is free, always.
          </>
        }
      >
        <ComingTag />
        <PackagesList />
        <Link href="/packages" className="link" style={{ alignSelf: "flex-start", marginTop: 6 }}>Who each package is for</Link>
      </Section>

      {/* ─── Privacy ──────────────────────────────────────────────────────────────────────── */}
      <Section title="Your practice stays yours." narrow>
        <div className="card prose stack">
          <p>{PRIVACY_PLAINLY}</p>
          <Link href="/privacy" className="link" style={{ alignSelf: "flex-start" }}>Read the privacy policy</Link>
        </div>
      </Section>

      {/* ─── Questions ────────────────────────────────────────────────────────────────────── */}
      <Section title="Before you download." narrow>
        <Faq
          items={[
            { q: "Is it free?", a: <>Yes. Your Key Free is free for as long as you like, with daily limits on some tools. Your Key Pro and Your Key Max are optional subscriptions, shown with their prices before you buy. <Link className="inline-link" href="/pricing">See the plans</Link>.</> },
            { q: "Do the packages cost extra?", a: <>Each paid package is its own subscription, {PACKAGE_PRICES.appMonthly} a month or {PACKAGE_PRICES.appYearly} a year in the app, with a free week for new subscribers, or {PACKAGE_PRICES.webMonthly} a month or {PACKAGE_PRICES.webYearly} a year on this website. Quitting is free. Your Key Max includes all four. <Link className="inline-link" href="/pricing">See pricing</Link>.</> },
            { q: "Which phones is it on?", a: "iPhone, from the App Store. Android is coming: leave your email at the top of this page and we'll tell you the day it's out." },
            { q: "Is this therapy, or medical advice?", a: RESULTS },
            { q: "How do I cancel?", a: <>In your iPhone&apos;s subscription settings for anything bought in the app, and at link.com for anything bought on this website. <Link className="inline-link" href="/support#cancel">Every way to cancel</Link>.</> },
          ]}
        />
      </Section>

      {/* ─── The last word ────────────────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="band-photo" />
        <div className="band-shade" />
        <div className="wrap band-words">
          <h2 className="serif h2">Start with your goal tonight.</h2>
          <AppStoreButton />
          <p className="tiny">{RESULTS}</p>
        </div>
      </section>
    </Page>
  );
}

export const dynamic = "force-static";
export const metadata = { alternates: { canonical: SITE.url } };
