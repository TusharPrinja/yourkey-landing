/**
 * lib/site.ts — every fact the website states, in one place (rebuilt 2026-10-04).
 *
 * The rule is the app's: nothing here that the app does not do, and no promise about what will
 * happen to the reader. Prices are the UK prices the app shows before purchase (yourkey-app
 * app/premium.tsx, lib/web/packagePages.ts); the App Store shows each reader the price in their own
 * currency. The free practice is described in the App Store listing's own words
 * (yourkey-app docs/launch/listing-packages-release.md), which the app's claims check reads. The
 * package cards are generated from the app (lib/packages.generated.json), never typed here.
 */

import generated from "./packages.generated.json";

export const SITE = {
  url: "https://yourkey.app",
  appStoreId: "6790191980",
  appStoreUrl: "https://apps.apple.com/app/id6790191980",
  contact: "hello@yourkey.app",
  company: "Your Key App Ltd",
  description:
    "Your goal, in your own words, at the centre of a daily practice: visualisations that speak it back to you as already real, affirmations written for it, and identity work around it. Private on your iPhone. Free to start.",
  /**
   * The five packages ship in the next App Store version. Until it is live, every place that offers
   * them says so ("in the next update"), so the site is never ahead of the store. Flip on launch day.
   */
  packagesLive: false,
};

export type PaidPackage = (typeof generated.paid)[number];
export const PAID_PACKAGES: PaidPackage[] = generated.paid;
export const FREE_PACKAGE = generated.free;
export const PACKAGE_PRICES = generated.prices;

/** The daily practice, in the listing's words. */
export const PRACTICE: { name: string; body: string }[] = [
  { name: "Visualisation", body: "A guided fulfilled scene shaped around your goal and spoken aloud. Enter it morning and night." },
  { name: "Affirmations", body: "Present-tense, first-person practice specific to your goal. Hear the lines, read them, or record them in your own voice." },
  { name: "The Mastermind", body: "Ask a question and receive an answer grounded in Your Key’s authored practice library, fitted to your situation on your device." },
  { name: "Identity Blueprint", body: "Seven, twenty-one or sixty-six days of structured identity practice." },
];

export const TOOLKIT: string[] = [
  "Dream Programming", "Revision", "Subliminal Mode", "EFT tapping", "Future Self Letter", "Scripting",
  "Gratitude", "Blessings", "Habit Forge", "Three-six-nine", "Breathwork", "Vision Board", "Camera Mirror",
  "The Vibration Raiser", "The Magnet",
];

/** The plans, in the listing's words, with the UK monthly price the app shows. */
export const TIERS: { id: string; name: string; price: string | null; per?: string; body: string; paid?: "gold" }[] = [
  {
    id: "free",
    name: "Free",
    price: null,
    body: "Personalised affirmations, visualisation, Dream Programming, Subliminal Mode, EFT, Camera Mirror, the Mastermind, the first seven Identity Blueprint days, and the always-open writing, breathing, gratitude and Vision Board tools. Usage limits apply to selected tools.",
  },
  {
    id: "growth",
    name: "Growth",
    price: "£9.99",
    per: "a month",
    body: "Longer sessions, higher limits, Future Self Letter, Revision, fifty Mastermind sessions and fifty follow-up turns a day, the twenty-one-day Identity Blueprint, Vision Board Action Layer and The Downstream.",
  },
  {
    id: "elite",
    name: "Elite",
    price: "£19.99",
    per: "a month",
    body: "The highest limits, the full sixty-six-day Identity Blueprint, an uncapped on-device Mastermind, Unblock Your Manifestations, and the complete Elite practice.",
  },
  {
    id: "inner-circle",
    name: "Inner Circle",
    price: "£44.99",
    per: "a month, or £224.99 a year",
    body: "Everything in Elite and all four paid packages, plus The Monthly Reading and the Inner Circle Exclusive tools presented in the app.",
    paid: "gold",
  },
];

export const HOUSEHOLD = "Couples plans start at £14.99 a month and Family plans at £19.99 a month, for eligible households.";

export const PRIVACY_PLAINLY =
  "The core personalisation and voice generation run on your device. Your own-voice recordings remain on your device. Account and goal data, and what you save in a package, are stored on our secured service so your account can function across sessions. The Downstream, a paid tool, sends the text required for that request through our authenticated Azure service for processing. A Mastermind or Invisible Council question may look up its topic, a word or two, on Wikipedia. We do not sell your data or share it with advertisers. Apple takes payment in the app and Stripe takes payment on this website, so we never see your full card details.";

export const RESULTS =
  "Your Key is a practice framework, not a promise. Individual results vary, and we do not guarantee any life, financial, health or relationship outcome. It is not medical, psychological or financial advice and is no substitute for professional care.";

export const BILLING =
  "Subscriptions bought in the app renew automatically until cancelled and are managed through your Apple ID. Live prices, billing periods and plan availability are shown before purchase, in your own currency. Restore Purchases is on the plan screen.";
