/**
 * lib/site.ts — every fact the website states, in one place (rebuilt 2026-10-04; for app version 1.3.0, and in the
 * app's Moonlit look, 2026-11-15).
 *
 * The rule is the app's: nothing here that the app does not do, and no promise about what will
 * happen to the reader. Prices are the UK prices the app shows before purchase (yourkey-app
 * lib/revenueCat.ts PRICES_GBP, lib/web/packagePages.ts); the App Store shows each reader the price in their own
 * currency. The practice, the plans and the privacy paragraph are in the App Store listing's own words for 1.3.0
 * (yourkey-app docs/launch/listing-release-1.3.0.md). The package cards are generated from the app
 * (lib/packages.generated.json), never typed here.
 *
 * FOR 1.3.0, AND LIVE ONLY WITH IT. Until 15 November 2026 this file described the 1.2.0 app: Growth, Elite and Inner
 * Circle, the couples and family plans, the Mastermind, and personalisation on the device. Version 1.3.0 has three
 * plans (Your Key Free, Pro and Max), no AI, and nothing called Growth, Elite or Inner Circle. These words go to main
 * the day 1.3.0 is live, on Tushar's go, and not before: until then the live site matches the live app. Max's month
 * is £39.99 from 17 November 2026 (it was £44.99 beside a founding month at £39.99, which he retired).
 */

import generated from "./packages.generated.json";

export const SITE = {
  url: "https://yourkey.app",
  appStoreId: "6790191980",
  appStoreUrl: "https://apps.apple.com/app/id6790191980",
  contact: "hello@yourkey.app",
  company: "Your Key App Ltd",
  description:
    "The Law of Attraction as a daily practice: a few guided minutes each morning and night, built around what you want most. Your statement, guided visualisations, affirmations and a Night Session you fall asleep inside. Free to start.",
  /**
   * The five packages shipped in App Store version 1.2.0, released 22 October 2026. While it was in
   * review, every place that offered them said so ("in the next update"), so the site was never ahead
   * of the store. Flipped on 23 October, with the four package pages selling (yourkey-app
   * lib/web/purchaseLink.ts, WEBSITE_SELLS).
   */
  packagesLive: true,
};

export type PaidPackage = (typeof generated.paid)[number];
export const PAID_PACKAGES: PaidPackage[] = generated.paid;
export const FREE_PACKAGE = generated.free;
export const PACKAGE_PRICES = generated.prices;

/** The daily practice, in the listing's words. Every part is in Your Key Free at its shortest length. */
export const PRACTICE: { name: string; body: string }[] = [
  { name: "Your Statement", body: "Exactly what you want, what you give, a date and your first step, in one sentence you read aloud morning and night." },
  { name: "Visualisation", body: "Your scene, already done, felt from inside. Guided all the way, in 2, 5, 10 or 30 minutes." },
  { name: "Affirmations", body: "Five a day, written for what you want, at the level that feels true today. Say them out loud, and add lines of your own." },
  { name: "The Night Session", body: "Fall asleep inside your scene, then hear your own voice softly as you drift off." },
  { name: "Identity Blueprint", body: "Sixty-six days to become the person who already has it. One small act a day: say it on waking, do it, and close the day at night." },
  { name: "Revision", body: "Replay today’s moment the way it should have gone, before you sleep. Over 300 moments to choose from, from an argument to a fall in the street." },
];

/** The tools around the practice. Unblock is in Your Key Pro and Max; the rest are in every plan. */
export const TOOLKIT: string[] = [
  "Scripting", "Future Self Letter", "The Vibration Raiser", "Gratitude journal", "Vision Board", "Blessing cards",
  "Unblock (in Your Key Pro)", "Why this works, in every tool",
];

/**
 * The six tools the app's Attract tab shows on their own photographs, with its own line for each
 * (yourkey-app components/moonlit/AttractHub.tsx). The photographs are the app's: public/moonlit/tool-<id>.jpg.
 */
export const TOOL_TILES: { id: string; name: string; line: string }[] = [
  { id: "affirmations", name: "Affirmations", line: "Five a day, out loud" },
  { id: "visualisation", name: "Visualisations", line: "2, 5, 10 or 30 minutes" },
  { id: "night-session", name: "The Night Session", line: "Fall asleep inside your scene" },
  { id: "gratitude", name: "Gratitude", line: "Three things a day" },
  { id: "identity-blueprint", name: "Identity Blueprint", line: "Sixty-six days, one act a day" },
  { id: "vision-board", name: "Vision Board", line: "Seen every morning" },
];

/** The tools for a particular moment, as the Attract tab lists them under "When you need it". */
export const WHEN_YOU_NEED_IT: string[] = ["Revision", "Unblock", "The Vibration Raiser", "Scripting", "Future Self Letter", "Blessing cards"];

/** Each part of the daily practice on the photograph its tool opens on in the app. */
export const PRACTICE_PHOTO: Record<string, string> = {
  "Your Statement": "statement",
  Visualisation: "visualisation",
  Affirmations: "affirmations",
  "The Night Session": "night-session",
  "Identity Blueprint": "identity-blueprint",
  Revision: "revision",
};

/** The plans, in the listing's words, with the UK prices the app shows. */
export const TIERS: { id: string; name: string; price: string | null; per?: string; body: string }[] = [
  {
    id: "free",
    name: "Your Key Free",
    price: null,
    body: "Two 2-minute visualisations a day, five affirmations a day, the gratitude journal, today’s script and today’s letter, the Night Session at 2 minutes, one revision a night, and the first week of the Identity Blueprint. For as long as you like.",
  },
  {
    id: "pro",
    name: "Your Key Pro",
    price: "£9.99",
    per: "a month, or £49.99 a year",
    body: "Every tool at every length, as often as you like: the 5, 10 and 30-minute visualisations, the 5 and 10-minute Night Sessions, the first 21 days of the Identity Blueprint, Unblock, every ready-made script and letter, and as many vision boards as you like.",
  },
  {
    id: "max",
    name: "Your Key Max",
    price: "£39.99",
    per: "a month, or £199.99 a year",
    body: "Everything in Your Key Pro, all 66 days of the Identity Blueprint, and all four paid packages.",
  },
];

/**
 * THE PLANS ON THIS WEBSITE (15 November 2026). Your Key Pro and Your Key Max can be bought here the way a package
 * is: an account on the join page, then the checkout, at the App Store's own UK prices, with no free week and the
 * same full refund within 14 days. Which of the two the website sells today comes from the app
 * (lib/packages.generated.json `plans.sold`, from yourkey-app lib/web/purchaseLink.ts WEBSITE_SELLS_PLANS, where the
 * reason is written): today Your Key Max. A plan not in it is bought in the app, and no page here offers it.
 */
export const WEB_PLANS = generated.plans;
export type WebPlan = (typeof generated.plans.items)[number];
/** This plan's join pages, if the website sells it. */
export const webPlan = (id: string): WebPlan | null =>
  ((generated.plans.sold as string[]).includes(id) ? generated.plans.items.find((p) => p.id === id) ?? null : null);

/**
 * Whether the server turns off, by itself, a website subscription that Your Key Max includes
 * (yourkey-app server/payOnce.ts; the switch is lib/payOnceOn.ts there, and comes here in the generated
 * file). While it is false every page says the older truth: what Max includes keeps running until it is
 * cancelled. The two never mix, so no page promises what is not happening.
 */
export const PAY_ONCE: boolean = generated.plans.payOnce === true;

/** Max and what it includes, on the pricing page. */
export const MAX_AND_THE_REST: string = PAY_ONCE
  ? "Your Key Max includes Your Key Pro and all four paid packages. If you are paying for one of those on this website when you start paying for Max, we turn off its renewal for you and email you, so you pay once. One bought in the app is yours to cancel, in your iPhone's Settings."
  : "Your Key Max includes Your Key Pro and all four paid packages, and each of those keeps running until you cancel it. If you join Max while paying for one of them, cancel that one so you pay once.";

/** "I joined Your Key Max. Am I still paying for Your Key Pro, or for a package?" on the support page. */
export const STILL_PAYING: string = PAY_ONCE
  ? "Not for anything you bought on this website. Once you are paying for Your Key Max we turn off the renewal of a Your Key Pro or a package you bought here, and email you. It is not charged again, and you keep it until the end of the time you paid for. If you took Max inside the app while on Pro inside the app, Apple ends Pro for you. Anything else you bought in the app keeps running until you cancel it in your iPhone's Settings: only you can cancel an Apple subscription, and if you joined Max here we email you how."
  : "You may be. Your Key Max includes Your Key Pro and all four paid packages, but it is its own subscription, so anything you were already paying for keeps running until you cancel it. If you took Max inside the app while on Pro inside the app, Apple ends Pro for you. Otherwise cancel what Max now includes: in your iPhone's Settings if you bought it in the app, at link.com if you bought it on this website.";

const SOLD_HERE = TIERS.filter((t) => webPlan(t.id));
const ONLY_IN_APP = TIERS.filter((t) => t.price && !webPlan(t.id));
const both = (names: string[]) => names.join(" and ");
/** Where the plans are bought, said from what is true today, so the pages never say more than the website does. */
export const PLANS_WHERE: string = !SOLD_HERE.length
  ? "Your Key Pro and Your Key Max are bought in the app, with a free week for new subscribers."
  : !ONLY_IN_APP.length
    ? `${both(SOLD_HERE.map((t) => t.name))} are bought in the app, with a free week for new subscribers, or on this website.`
    : `${both(ONLY_IN_APP.map((t) => t.name))} ${ONLY_IN_APP.length === 1 ? "is" : "are"} bought in the app, and ${both(SOLD_HERE.map((t) => t.name))} in the app or on this website. In the app, new subscribers get a free week.`;

export const PRIVACY_PLAINLY =
  "Your Key uses no AI: every affirmation, mental picture and spoken session is written and recorded in advance. Your own-voice recordings remain on your device. Your account, your goal, and what you save in a package are stored on our secured service in the UK, so they are there on any phone you sign in on. We do not sell your data or share it with advertisers. Apple takes payment in the app and Stripe takes payment on this website, so we never see your full card details.";

export const RESULTS =
  "Your Key is a practice framework, not a promise. Individual results vary, and we do not guarantee any life, financial, health or relationship outcome. It is not medical, psychological or financial advice and is no substitute for professional care.";

export const BILLING =
  "Subscriptions bought in the app renew automatically until cancelled and are managed through your Apple ID. Prices, billing periods and the free week are shown before purchase, in your own currency. Restore Purchases is on the plans page.";

/** What search engines read about the app (schema.org), on the home page. Only facts stated on the page. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "Your Key App Ltd", url: SITE.url, logo: `${SITE.url}/app-icon.png?v=2`, email: "hello@yourkey.app" },
      {
        "@type": "MobileApplication",
        name: "Your Key",
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        url: SITE.url,
        downloadUrl: SITE.appStoreUrl,
        description: "The Law of Attraction as a daily practice: guided visualisations, affirmations, a gratitude journal, the Night Session and the Identity Blueprint, built around what you want most.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      },
    ],
  };
}
