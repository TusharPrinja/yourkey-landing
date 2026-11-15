import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, Page, PageHead, Phone, Section } from "@/components/site";
import { PRACTICE, PRACTICE_PHOTO, TIERS, TOOLKIT } from "@/lib/site";

export const metadata: Metadata = {
  title: "The practice",
  description:
    "Everything in the Your Key practice: your statement, guided visualisations, affirmations, the Night Session, the Identity Blueprint, Revision, and the tools around them.",
  alternates: { canonical: "https://yourkey.app/tools" },
};

/** The app's own screens, as its App Store pictures show them (public/moonlit/screen-<name>.webp). */
const SCREENS: { name: string; label: string; alt: string }[] = [
  { name: "home", label: "Home", alt: "Home in the app: the morning practice and your statement" },
  { name: "affirmations", label: "Affirmations", alt: "Affirmations in the app: today's five" },
  { name: "gratitude", label: "Gratitude", alt: "The gratitude journal in the app" },
  { name: "identity-blueprint", label: "Identity Blueprint", alt: "The Identity Blueprint in the app: today's act" },
];

export default function ToolsPage() {
  const free = TIERS.find((t) => t.id === "free")!;
  return (
    <Page>
      <PageHead
        title="Everything you do with your goal, every day."
        lede="Six parts make the daily practice, and more tools sit around them. Nothing is written by AI: every word is written and recorded in advance. The plan you are on decides how long the sessions run and how far the Identity Blueprint goes."
      >
        <div className="cta"><AppStoreButton /></div>
      </PageHead>

      <Section title="Six parts, morning and night.">
        <div className="grid-2 parts">
          {PRACTICE.map((p) => (
            <article key={p.name} className="part">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/moonlit/tool-${PRACTICE_PHOTO[p.name]}.jpg`} alt="" width={720} height={720} loading="lazy" decoding="async" />
              <div>
                <h3 className="serif h3">{p.name}</h3>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="As it looks in the app.">
        <div className="screens">
          {SCREENS.map((s) => (
            <figure key={s.name}>
              <Phone name={s.name} alt={s.alt} />
              <figcaption className="serif">{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Around the practice.">
        <ul className="chips">
          {TOOLKIT.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
      </Section>

      <Section title="What the free plan includes." narrow>
        <div className="card prose stack">
          <p>{free.body}</p>
          <Link href="/pricing" className="link" style={{ alignSelf: "flex-start" }}>Compare the plans</Link>
        </div>
      </Section>
    </Page>
  );
}
