import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, ComingTag, Page, PageHead, Section } from "@/components/site";
import { BILLING, HOUSEHOLD, PACKAGE_PRICES, PAID_PACKAGES, TIERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Your Key is free to start. Growth, Elite and Inner Circle go further, and each skill package is its own subscription, in the app with a free week for new subscribers, or on this website. Quitting is free.",
  alternates: { canonical: "https://yourkey.app/pricing" },
};

/**
 * The UK prices the app shows before purchase (yourkey-app: app/premium.tsx, lib/web/packagePages.ts).
 * The App Store shows each reader the price in their own currency, and that is the price they pay.
 */
export default function PricingPage() {
  return (
    <Page>
      <PageHead
        kicker="Pricing"
        title="Free to start. Go further when you want to."
        lede="Every app price here is the UK price the app shows before you buy. The App Store shows yours in your own currency, and nothing is charged until you confirm it there."
      />

      <Section kicker="Your Key" title="The plans." wide>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className="glass flex flex-col gap-4 p-6"
              style={t.paid === "gold" ? { borderColor: "rgba(201,162,39,0.45)", background: "rgba(201,162,39,0.06)" } : undefined}
            >
              <p className="kicker" style={{ color: t.paid === "gold" ? "var(--color-gold)" : "var(--color-amethyst)" }}>{t.name}</p>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="num text-[36px] leading-none text-[var(--color-ink)]">{t.price ?? "Free"}</span>
                {t.per ? <span className="text-[14px] text-[var(--color-mute)]">{t.per}</span> : null}
              </p>
              <p className="text-[15px] leading-6 text-[var(--color-soft)]">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="text-[14.5px] leading-6 text-[var(--color-mute)]">{HOUSEHOLD}</p>
      </Section>

      <Section
        kicker="The packages"
        title="One skill at a time, or all four with Inner Circle."
        lede={
          <>
            Each paid package is its own subscription: {PACKAGE_PRICES.appMonthly} a month or {PACKAGE_PRICES.appYearly} a year
            in the app, with a free week for new subscribers, or {PACKAGE_PRICES.webMonthly} a month or {PACKAGE_PRICES.webYearly} a
            year on this website. Quitting Addictions is free, always.
          </>
        }
        wide
      >
        <div className="flex items-center gap-3"><ComingTag /></div>
        <div className="glass divide-y divide-[var(--hair)] overflow-hidden">
          {PAID_PACKAGES.map((p) => (
            <Link key={p.id} href={p.href} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-[var(--glass-hi)] sm:px-6">
              <span className="flex flex-col">
                <span className="kicker" style={{ color: p.kicker }}>{p.name}</span>
                <span className="mt-1 text-[15px] text-[var(--color-soft)]">{p.headline}</span>
              </span>
              <span className="flex flex-col gap-0.5 sm:items-end">
                <span className="num text-[15px] text-[var(--color-ink)]">{PACKAGE_PRICES.appMonthly}/month · {PACKAGE_PRICES.appYearly}/year <span className="text-[var(--color-mute)]">in the app</span></span>
                <span className="num text-[15px] text-[var(--color-ink)]">{PACKAGE_PRICES.webMonthly}/month · {PACKAGE_PRICES.webYearly}/year <span className="text-[var(--color-mute)]">on this website</span></span>
              </span>
            </Link>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <span className="flex flex-col">
              <span className="kicker" style={{ color: "var(--color-quitting)" }}>Quitting Addictions</span>
              <span className="mt-1 text-[15px] text-[var(--color-soft)]">For stopping something, or cutting down.</span>
            </span>
            <span className="num text-[15px] text-[var(--color-quitting)]">Free</span>
          </div>
        </div>
      </Section>

      <Section kicker="Billing" title="How paying works.">
        <div className="glass flex flex-col gap-4 p-6 sm:p-8">
          <p className="text-[16px] leading-7 text-[var(--color-soft)]">{BILLING}</p>
          <p className="text-[16px] leading-7 text-[var(--color-soft)]">
            A free week, where it is offered, is shown before you start with the date it ends, and the app reminds you two
            days before. Cancel before then and nothing is charged.
          </p>
          <p className="text-[16px] leading-7 text-[var(--color-soft)]">
            Packages bought on this website are sold through Link, a Stripe service, and renew each month or year until you
            cancel. There is no free week on the website. Cancel at link.com or from the Packages tab in the app, and ask
            within 14 days of your first payment for a full refund of it.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <AppStoreButton label="Get Your Key" />
            <Link href="/support#cancel" className="text-[15px] font-semibold text-[var(--color-amethyst)] underline-offset-4 hover:underline">
              How to cancel →
            </Link>
          </div>
        </div>
      </Section>

      <Section kicker="In plain words" title="What Your Key is, and is not.">
        <p className="max-w-3xl text-[15.5px] leading-7 text-[var(--color-soft)]">
          Your Key is a practice framework, not a promise. Individual results vary, and it is not medical, psychological or
          financial advice.
        </p>
      </Section>
    </Page>
  );
}
