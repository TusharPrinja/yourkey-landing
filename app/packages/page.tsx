import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, ComingTag, FreeCard, PackageCard, Page, PageHead, Section } from "@/components/site";
import { FREE_PACKAGE, PAID_PACKAGES, PACKAGE_PRICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "The packages",
  description:
    "Sales, Time, Communication and Leadership Mastery, and Quitting Addictions: five skills, each its own world inside Your Key, for a complete beginner and for somebody who has done it for years.",
  alternates: { canonical: "https://yourkey.app/packages" },
};

/**
 * Who each package is for, as the app serves them on 2026-10-04: the kinds a member chooses in
 * setup, named the way setup names them. If a kind is added in the app, it is added here.
 */
const REACH: { id: string; name: string; accent: string; who: string; kinds: string[] }[] = [
  {
    id: "sales", name: "Sales Mastery", accent: "var(--color-sales)",
    who: "Whether you sell for a living or never have, one buyer at a time or to many at once.",
    kinds: ["One buyer at a time: calls, meetings, the shop floor", "To many at once: posts, ads, a page, an app or a shop", "A first sale, for somebody learning"],
  },
  {
    id: "time", name: "Time Mastery", accent: "var(--color-time)",
    who: "Any kind of week, with its own examples and lines.",
    kinds: ["A job", "Shifts", "Your own business", "A job and a side project", "Study", "Caring", "Between jobs", "Retired, or every hour your own"],
  },
  {
    id: "communication", name: "Communication Mastery", accent: "var(--color-communication)",
    who: "One person is enough. Eight relationships, each with its own lines.",
    kinds: ["A partner", "Dating, or someone new", "Family", "Your children", "Friends", "Someone at work", "Customers and the public", "Yourself"],
  },
  {
    id: "leadership", name: "Leadership Mastery", accent: "var(--color-leadership)",
    who: "With a team, or with no title at all.",
    kinds: ["A team, managers or a business", "At work, before the title", "Yourself", "At home", "Among friends", "A club or community"],
  },
  {
    id: "quitting", name: "Quitting Addictions", accent: "var(--color-quitting)",
    who: "Stopping, or cutting down. Free, always, with the help services in your country.",
    kinds: ["Alcohol", "Sleeping tablets", "Nicotine", "Cannabis", "Cocaine or speed", "Opioids", "Gambling", "Gaming", "Shopping or spending", "Pornography", "The phone", "Social media", "Something else"],
  },
];

export default function PackagesPage() {
  return (
    <Page>
      <PageHead
        title="Five skills, each its own world inside Your Key."
        lede={
          <>
            Each package has its own home, daily tools, guided voice sessions and a course, and starts by asking
            where you are starting from. Four are subscriptions at {PACKAGE_PRICES.webMonthly} a month or{" "}
            {PACKAGE_PRICES.webYearly} a year on this website, or {PACKAGE_PRICES.appMonthly} a month or{" "}
            {PACKAGE_PRICES.appYearly} a year in the app, with a free week for new subscribers. Quitting is free.
            Your Key Max includes all four.
          </>
        }
      >
        <div className="cta">
          <AppStoreButton label="Get Your Key" />
          <ComingTag />
        </div>
      </PageHead>

      <Section title="Start with the one you need most.">
        <div className="grid-2 worlds">
          {PAID_PACKAGES.map((p) => <PackageCard key={p.id} p={p} />)}
          <FreeCard p={FREE_PACKAGE} />
        </div>
      </Section>

      <Section
        title="Everybody, not only the people with the job title."
        lede="Setup asks who you are in it, and every example, line and lesson after that is written for that life."
      >
        <div className="stack" style={{ gap: 14 }}>
          {REACH.map((r) => (
            <div key={r.id} className="card reach">
              <div className="stack" style={{ gap: 8 }}>
                <p className="text-[14px] font-semibold" style={{ color: r.accent }}>{r.name}</p>
                <p className="text-[16px] leading-7">{r.who}</p>
                {r.id !== "quitting" ? (
                  <Link href={`/${r.id}`} className="text-[14px] font-semibold underline-offset-4 hover:underline" style={{ color: r.accent, alignSelf: "flex-start" }}>
                    Inside {r.name}
                  </Link>
                ) : null}
              </div>
              <ul className="chips" style={{ alignContent: "flex-start" }}>
                {r.kinds.map((k) => <li key={k} className="chip soft">{k}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Every line, written and checked before you see it." narrow>
        <div className="card prose stack">
          <p>
            Nothing in a package is made up on the spot. Every daily line, spoken session, example and lesson is written
            in full and checked before it ships: figures carry their source, nothing promises you a result, and the lines
            you say to yourself say what you want rather than what you are moving away from.
          </p>
          <p>
            The courses are built on published research, and a lesson that gives a figure names where it comes from. Quitting puts safety first: it asks what you
            are working on before anything else, and where stopping suddenly is dangerous it says so and points you to a doctor.
          </p>
        </div>
      </Section>
    </Page>
  );
}
