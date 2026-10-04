import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, Page, PageHead, Section } from "@/components/site";
import { PRACTICE, TIERS, TOOLKIT } from "@/lib/site";

export const metadata: Metadata = {
  title: "The practice",
  description:
    "Everything in the Your Key practice: a guided visualisation of your goal, affirmations written for it, the Mastermind, the Identity Blueprint, and the toolkit around them.",
  alternates: { canonical: "https://yourkey.app/tools" },
};

export default function ToolsPage() {
  const free = TIERS.find((t) => t.id === "free")!;
  return (
    <Page>
      <PageHead
        kicker="The practice"
        title="Everything you do with your goal, every day."
        lede="Four parts make the daily practice, and a toolkit sits around them. The plan you are on decides how long the sessions run and how far the programmes go."
      >
        <AppStoreButton />
      </PageHead>

      <Section kicker="The daily practice" title="Four parts, morning and night." wide>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRACTICE.map((p) => (
            <div key={p.name} className="glass flex flex-col gap-2 p-6">
              <h3 className="text-[19px] font-bold">{p.name}</h3>
              <p className="text-[15.5px] leading-7 text-[var(--color-soft)]">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="The toolkit" title="Around the practice." wide>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT.map((t) => (
            <li key={t} className="glass px-5 py-4 text-[15.5px] font-semibold">{t}</li>
          ))}
        </ul>
      </Section>

      <Section kicker="Free" title="What the free plan includes.">
        <div className="glass flex flex-col gap-3 p-6 sm:p-8">
          <p className="text-[16px] leading-7 text-[var(--color-soft)]">{free.body}</p>
          <Link href="/pricing" className="text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
            Compare the plans →
          </Link>
        </div>
      </Section>
    </Page>
  );
}
