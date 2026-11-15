import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton, ComingTag, PackagesList, Page, PageHead, Plans, Section } from "@/components/site";
import { BILLING, PACKAGE_PRICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Your Key is free to start. Your Key Pro and Your Key Max go further, and each skill package is its own subscription, in the app with a free week for new subscribers, or on this website. Quitting is free.",
  alternates: { canonical: "https://yourkey.app/pricing" },
};

/**
 * The UK prices the app shows before purchase (yourkey-app: lib/revenueCat.ts PRICES_GBP, lib/web/packagePages.ts).
 * Three plans since app version 1.3.0: Your Key Free, Pro and Max. No couples or family plan, no Elite.
 * The App Store shows each reader the price in their own currency, and that is the price they pay.
 */
export default function PricingPage() {
  return (
    <Page>
      <PageHead
        title="Free to start. Go further when you want to."
        lede="Every app price here is the UK price the app shows before you buy. The App Store shows yours in your own currency, and nothing is charged until you confirm it there."
      />

      <Section title="The plans.">
        <Plans />
        <p className="tiny" style={{ fontSize: 14.5 }}>
          Your Key Pro and Your Key Max are bought in the app, with a free week for new subscribers where the app offers one.
        </p>
        <div className="cta" style={{ marginTop: 4 }}>
          <AppStoreButton label="Get Your Key" />
        </div>
      </Section>

      <Section
        title="One skill at a time, or all four with Your Key Max."
        lede={
          <>
            Each paid package is its own subscription: {PACKAGE_PRICES.webMonthly} a month or {PACKAGE_PRICES.webYearly} a
            year on this website, or {PACKAGE_PRICES.appMonthly} a month or {PACKAGE_PRICES.appYearly} a year in the app,
            with a free week for new subscribers. Quitting Addictions is free, always.
          </>
        }
      >
        <ComingTag />
        <PackagesList both />
      </Section>

      <Section title="How paying works." narrow>
        <div className="card prose stack" style={{ gap: 16 }}>
          <p>{BILLING}</p>
          <p>
            A free week, where it is offered, is shown before you start with the date it ends, and the app reminds you two
            days before. Cancel before then and nothing is charged.
          </p>
          <p>
            Packages bought on this website are sold through Link, a Stripe service, and renew each month or year until you
            cancel. There is no free week on the website. Cancel at link.com or from the Packages tab in the app, and ask
            within 14 days of your first payment for a full refund of it.
          </p>
          <Link href="/support#cancel" className="link" style={{ alignSelf: "flex-start" }}>How to cancel</Link>
        </div>
      </Section>

      <Section title="What Your Key is, and is not." narrow>
        <p className="lede">
          Your Key is a practice framework, not a promise. Individual results vary, and it is not medical, psychological or
          financial advice.
        </p>
      </Section>
    </Page>
  );
}
