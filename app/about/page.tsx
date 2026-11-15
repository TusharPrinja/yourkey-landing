import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, Page, PageHead, Section } from "@/components/site";
import { RESULTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Your Key is an iPhone app for the Law of Attraction as a daily practice, built around what you want most and made in the UK by Your Key App Ltd. What it is, how it is made, and how to reach us.",
  alternates: { canonical: "https://yourkey.app/about" },
};

const BELIEFS: { h: string; b: string }[] = [
  {
    h: "What you want most, first",
    b: "A practice works when it is about one thing. So it starts with what you want most, from money to love to your first customers, and every visualisation, affirmation and identity day speaks to it.",
  },
  {
    h: "Written before you read it",
    b: "Every word in Your Key is written and recorded in advance, and checked before it ships. No AI writes to you and no line is made up on the spot; a figure carries its source, and nothing promises you a result.",
  },
  {
    h: "For everybody",
    b: "Each package asks where you are starting from and who you are in it, so a complete beginner and somebody who has done it for years both find their own way in.",
  },
  {
    h: "Private by default",
    b: "Your own-voice recordings stay on your phone. What you save is stored so your account works across sessions, and it is never sold or shared with advertisers.",
  },
];

export default function AboutPage() {
  return (
    <Page>
      <PageHead
        title="A daily practice, built around what you want."
        lede="Your Key is an iPhone app. You choose what you want most, and it gives you a practice for every day around it, with five packages for the skills that carry a goal: selling, time, communication, leadership, and stopping what holds you back."
      />

      <Section title="Four things that decide how it is made.">
        <div className="grid-2">
          {BELIEFS.map((x) => (
            <div key={x.h} className="card stack" style={{ gap: 8 }}>
              <h3 className="serif h3">{x.h}</h3>
              <p className="text-[15.5px] leading-7 text-[var(--muted)]">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Who we are." narrow>
        <div className="card prose stack">
          <p>
            Your Key is made in the UK by {SITE.company}. Write to us at{" "}
            <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
          </p>
          <p>{RESULTS}</p>
          <p>
            <Link href="/privacy">Privacy policy</Link>
            {" · "}
            <Link href="/terms">Terms</Link>
            {" · "}
            <Link href="/support">Support</Link>
          </p>
        </div>
        <div className="cta" style={{ marginTop: 6 }}><AppStoreButton /></div>
      </Section>
    </Page>
  );
}
