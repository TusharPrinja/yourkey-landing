import type { Metadata } from "next";
import Link from "next/link";
import { Faq, Page, PageHead, Section } from "@/components/site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with Your Key: how to manage or cancel a subscription bought in the app or on the website, refunds, restoring a purchase, your account and your data.",
  alternates: { canonical: "https://yourkey.app/support" },
};

/**
 * Every answer here is what the Terms and the app say (lib/legal.ts §4; yourkey-app: the Packages
 * tab's manage row, lib/packageTrial.ts). If either changes, this page changes with it.
 */
function Block({ id, about, title, children }: { id: string; about: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="card stack" style={{ scrollMarginTop: 24 }}>
      <p className="eyebrow">{about}</p>
      <h2 className="serif h3">{title}</h2>
      <div className="prose stack">{children}</div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <Page>
      <PageHead
        title="Help, in plain words."
        lede={
          <>
            Write to <a className="inline-link" href={`mailto:${SITE.contact}`}>{SITE.contact}</a> and
            a person reads it. The answers below cover most of what people ask.
          </>
        }
      />

      <Section>
        <div className="grid-2">
          <Block id="cancel" about="Manage or cancel" title="Bought in the app">
            <p>
              Subscriptions bought in the app are billed by Apple. Open Settings on your iPhone, tap your name, then
              Subscriptions, and choose Your Key. A package can also be managed from the Packages tab in the app.
            </p>
            <p>Cancelling stops the next renewal. You keep what you paid for until the end of the current period.</p>
          </Block>

          <Block id="website" about="Manage or cancel" title="Bought on this website">
            <p>
              Plans and packages bought on yourkey.app are sold through Link, a Stripe service, which takes the payment and
              sends the receipt. The charge shows on your statement as <span className="num text-[var(--text)]">LINK.COM* YOURKEY</span>.
            </p>
            <p>
              Cancel any time in the Recurring section of your Link account at link.com, signed in with the email you paid
              with. A package can also be cancelled from the Packages tab in the app. It takes effect at the end of the
              current period. Deleting your Your Key account does not cancel it.
            </p>
          </Block>

          <Block id="refunds" about="Refunds" title="If you want your money back">
            <p>
              For a plan or a package bought on this website: ask within 14 days of your first payment and we refund that
              payment in full. Email <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
            </p>
            <p>
              For anything bought in the app, Apple handles refunds: ask at reportaproblem.apple.com. Your statutory rights
              are not affected either way.
            </p>
          </Block>

          <Block id="restore" about="A new phone" title="Restoring what you bought">
            <p>
              Sign in with the same account and tap Restore Purchases on the plans page, or on the package&apos;s own page.
              Your subscription follows your Apple ID, and what you saved in a package follows your account.
            </p>
          </Block>

          <Block id="account" about="Your account" title="Your data, and deleting it">
            <p>
              You can delete your account from inside the app. What you wrote is removed with it, apart from the anonymised
              financial records the law requires us to keep.
            </p>
            <p>
              Your own-voice recordings stay on your phone. The <Link href="/privacy">privacy policy</Link> sets
              out everything we hold and why.
            </p>
          </Block>

          <Block id="safety" about="If it is urgent" title="Your Key is not an emergency service">
            <p>
              If you or somebody else is in danger, call your local emergency number. Quitting Addictions, free inside the
              app, has a help screen with the services in your country.
            </p>
          </Block>
        </div>
      </Section>

      <Section title="Quick answers." narrow>
        <Faq
          items={[
            { q: "Is the free week charged?", a: "No. A free week, where it is offered in the app, is shown before you start with the date it ends, and the app reminds you two days before. Cancel before then and nothing is charged. There is no free week on the website." },
            { q: "Does Your Key Max include the packages?", a: "Yes. Your Key Max includes all four paid packages. If you already have Your Key Max, the packages are open to you." },
            { q: "I joined Your Key Max. Am I still paying for Your Key Pro, or for a package?", a: "You may be. Your Key Max includes Your Key Pro and all four paid packages, but it is its own subscription, so anything you were already paying for keeps running until you cancel it. If you took Max inside the app while on Pro inside the app, Apple ends Pro for you. Otherwise cancel what Max now includes: in your iPhone's Settings if you bought it in the app, at link.com if you bought it on this website." },
            { q: "Can I use Your Key on Android?", a: "Your Key is on iPhone, from the App Store." },
            { q: "Something is not working.", a: <>Email <a className="inline-link" href={`mailto:${SITE.contact}`}>{SITE.contact}</a> with what you pressed and what happened. A screenshot helps.</> },
          ]}
        />
      </Section>
    </Page>
  );
}
