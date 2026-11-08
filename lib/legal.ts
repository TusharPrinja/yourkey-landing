/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Mirrored VERBATIM from manifest-app/constants/privacy.ts + terms.ts by
 * manifest-app/scripts/sync-legal-to-website.ts. Apple cross-checks the web
 * policy (yourkey.app/privacy + /terms) against the in-app legal screens,
 * and GDPR Art.13 transparency applies to this public copy.
 *
 * To update: edit the manifest-app constants, then run (in manifest-app):
 *   npx tsx scripts/sync-legal-to-website.ts
 * and commit+push this repo.
 */

export const PRIVACY_POLICY = `PRIVACY POLICY
Last updated: November 2026

Your Key is operated by Your Key App Ltd, a company registered in England and Wales (company number 17047088, registered office: 1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom). Your Key App Ltd is the data controller for the personal data described in this policy.

1. INFORMATION WE COLLECT

When you use Your Key, we collect the following information:

  - Account information: your email address and display name when you create an account, in the App or on our website.
  - Goal data: what you choose to work on (for example, "Money, more income"), and the goals, statements and descriptions you enter into the App. We use them to choose the affirmations, guided visualisations and other written content that fit you, and to keep what you write for you.
  - Inner-work data (personal by nature): what you write in the tools, such as your scripts and letters, your gratitude journal, the worries you put down and the moments you revise, can touch on your relationships, your finances and how you feel about yourself, and sometimes your health. It is kept in your account only so the tools can show it back to you, is never read by anyone else, never used for advertising or profiling, never sent to any AI, and is deleted with your account. You can delete any entry in the App, or everything by deleting your account (Profile → Delete Account).
  - Package data (sensitive where it concerns your health): what you save inside a package, such as the people and conversations in Communication or the plans in Time. In the free Quitting package this includes the habit you are changing, whether you are stopping or cutting down, the urges and slips you log, your plans and reasons, and the people you list. That is information about your health, so we process it only with the explicit permission you give separately from our Terms, only to run the package for you, and never for advertising, profiling or sale. It is stored in your account in the United Kingdom and deleted when you delete your account.
  - Voice recordings: features such as the Night Session and Affirmations invite you to record your own voice. These recordings are stored ON YOUR DEVICE ONLY — they are never uploaded to our servers, and deleting the App deletes them.
  - Your calendar (Time Mastery, only if you allow it): Time reads today's events on your phone so the blocks it plans never land on a meeting, and adds a block to your calendar only when you tap to add it. Your calendar is read on your phone and is never sent to us or to anyone else.
  - Screen Time (only if you turn on blocking): blocking in Time Mastery and Quitting Addictions uses Apple's Screen Time. You choose the apps and websites in Apple's own picker. The App receives only sealed tokens from Apple, never the names of the apps or what you do in them, and nothing about them leaves your phone.
  - Usage data: information about how you use the App, including features accessed and session frequency, to help us improve the service.
  - Device information: basic technical data such as your device platform and operating system version.
  - Problem reports: if you report a problem in the App, we keep what you write with your account, together with the package it came from, the app version and your device's platform and system version, and we email a copy to our own support inbox so we can fix it. The copy carries your account number, never your email address or name.

We do not collect payment card details. Billing in the App is handled directly by Apple (App Store) or Google (Play Store). If you buy a package on our website, the payment is taken by Link, a Stripe service, and we receive the email address you paid with and a record of the purchase (see section 4).

2. HOW WE USE YOUR INFORMATION

We use your information to: provide, operate, and maintain Your Key service; choose the written affirmations, guided visualisations and other content that fit what you are working on; keep what you write so the App can show it back to you; monitor and improve App performance and user experience; communicate important updates about your account or changes to the service.

3. WHERE YOUR DATA LIVES & INTERNATIONAL TRANSFERS

Our core infrastructure runs on Microsoft Azure in the United Kingdom (UK South region): Azure Cosmos DB stores your account and app data, and Azure Functions provides sign-in and the services the app calls. Cloudflare R2 delivers the App's recorded audio and course videos, which contain no personal data.

Your Key uses no AI. Every affirmation, guided visualisation, lesson and spoken session is written and recorded in advance, and nothing you write is sent to any AI service. Some additional processing takes place outside the UK through our error-monitoring, subscription and website-payment providers (Sentry, RevenueCat and Stripe). The safeguards described below apply to those transfers.

Where personal data is transferred outside the UK/EEA, we rely on recognised safeguards: our processors (Microsoft, Cloudflare, Sentry, RevenueCat, Stripe) are certified under the EU–US / UK–US Data Privacy Framework and/or process data under Standard Contractual Clauses and the UK International Data Transfer Addendum as part of their standard data-processing terms. Copies of the relevant mechanisms are available from each processor, or from us on request.

4. THIRD-PARTY PROCESSORS

We use the following third-party services to operate Your Key:

  Microsoft Azure (Authentication, Database & Functions): Your account credentials and app data are stored in the United Kingdom using Azure Cosmos DB, with sign-in provided by our own service on Azure Functions. Microsoft is governed by the Microsoft Privacy Statement (privacy.microsoft.com/privacystatement).

  Cloudflare R2 (Content Delivery): Cloudflare R2 delivers the App's recorded audio and course videos to your device. These downloads carry no personal identifiers and nothing you have written. Cloudflare is governed by their Privacy Policy (cloudflare.com/privacypolicy).

  RevenueCat (Subscription Management): If you subscribe to a paid plan, RevenueCat processes subscription events, entitlements, and purchase receipts on our behalf. For purchases in the App, RevenueCat receives your anonymised user ID (not your email or display name) and subscription status, solely to keep your paid entitlements in sync across your devices. For a package bought on our website, RevenueCat also receives your account's user ID and the email address you enter at checkout, so that the package is in your account when you sign in to the App. RevenueCat is governed by their Privacy Policy (revenuecat.com/privacy).

  Stripe and Link (Website Payments): If you buy a package on our website, it is sold through Link, a Stripe service, and Stripe acts as merchant of record. Stripe receives what you enter at checkout, such as your email address, card details and billing country, and uses it to take the payment, send your receipts, run your subscription and prevent fraud, under its own privacy policy (link.com/privacy and stripe.com/privacy). We receive the email address you paid with and the purchase record (the package, plan, amount and status), and use them to give you the package, answer your questions and make refunds. We never see your full card details.

  Sentry (Error Monitoring): When the app encounters a crash or unexpected error, Sentry receives a stack trace, device model, operating system version, and app version so we can diagnose and fix the issue. We configure Sentry so that it does NOT receive your email, display name, goals, or any content you have entered into the App (identifying details and console content are stripped or disabled before sending). Error data is retained for a limited period. Sentry is governed by their Privacy Policy (sentry.io/privacy).

5. DATA RETENTION

We retain your account data for as long as your account remains active. If you request deletion of your account and associated data, we will process your request and delete all personal data within 30 days. In practice, the in-app "Delete Account" flow completes the cascade within ~60 seconds and you will receive a receipt ID for your records. You may keep this receipt ID and email hello@yourkey.app if you have any questions about your deletion.

For accounting compliance (UK Companies Act 2006), we retain anonymised financial records (transaction timestamps, amounts, product SKU — with no UID, email, or device identifiers) for the legally required period (currently 6 years). All other data is permanently deleted. Stripe keeps its own records of website purchases under its own legal duties and privacy policy; deleting your account does not remove those or cancel a website purchase.

6. YOUR RIGHTS (UK GDPR / EU GDPR)

If you are located in the United Kingdom or the European Economic Area, you have the following rights:

  - Right of Access: request a copy of the personal data we hold about you.
  - Right to Rectification: request correction of any inaccurate personal data.
  - Right to Erasure: request deletion of your personal data ("right to be forgotten").
  - Right to Data Portability: request your data in a structured, commonly used format.
  - Right to Object: object to the processing of your personal data in certain circumstances.
  - Right to Withdraw Consent: where processing is based on your consent (such as inner-work data), you may withdraw it at any time by deleting the relevant content or your account.

To exercise any of these rights, contact us at: hello@yourkey.app. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner's Office (ico.org.uk).

7. CHILDREN

Your Key is an 18+ app. Every account holder and every household member must be 18 or over. We do not permit users under 18 and we do not knowingly collect personal data from anyone under 18. If you believe someone under 18 has created an account, contact us at hello@yourkey.app and we will promptly delete the account and all associated data.

8. COOKIES & ANALYTICS

Your Key does not use third-party advertising cookies. The App may collect anonymised usage analytics to help us understand how users engage with features and to improve the service. This data is not linked to your personal identity and is not shared with third parties for advertising purposes.

9. NO SELLING OF DATA

We do not sell, rent, trade, or otherwise transfer your personal data to third parties for advertising or marketing purposes. Your data is used solely to provide and improve Your Key service.

10. CONTACT

Your Key App Ltd
Company number 17047088 (England and Wales)
1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom
hello@yourkey.app

If you have any questions about this Privacy Policy, wish to exercise your data rights, or want to request account deletion, please contact us at the email address above.`;

export const TERMS_OF_SERVICE = `TERMS OF SERVICE
Last updated: November 2026

1. ACCEPTANCE OF TERMS

Your Key is operated by Your Key App Ltd, a company registered in England and Wales (company number 17047088, registered office: 1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom) ("Your Key App Ltd", "we", "us", "our"). "Your Key" and the key device are trading names and trade marks of Your Key App Ltd.

By downloading, installing, or using the Your Key application ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App. We reserve the right to update these terms at any time, and your continued use of the App following any changes constitutes acceptance of the revised terms.

2. DESCRIPTION OF SERVICE

Your Key is a personal development application built on the law-of-attraction and self-improvement tradition. The App provides affirmations, guided audio visualisations, educational content and structured practice tools, all written and recorded in advance. The App uses no AI.

Your Key is a practice framework, not a promise. Personal outcomes depend on many factors, including your actions and circumstances. We make no representation or guarantee that you will achieve any particular goal, income, relationship, health improvement, or other outcome by using the App. Testimonials and illustrative stories are not promises of results.

3. USER ACCOUNTS & AGE REQUIREMENTS

The App is for adults. To create an account, join a household, or purchase any subscription, you must be at least 18 years of age. Every member of a Couples or Family household must also be 18 or over.

Users under 18 are not permitted to use the App. If you believe someone under 18 has created an account, contact hello@yourkey.app.

You are responsible for maintaining the confidentiality of your account credentials and for activity under your account. Notify us at hello@yourkey.app if you become aware of unauthorised account use.

4. SUBSCRIPTIONS & BILLING

Your Key offers a free tier and paid subscriptions. Current prices, billing periods, annual options, household options, and any eligible introductory offers are displayed in the App, or on our website for packages bought there, before purchase.

Paid subscriptions renew automatically until cancelled. Subscriptions bought in the App are billed through the applicable app store and are subject to its billing terms. You may cancel them in your device's subscription settings; cancellation takes effect at the end of the current billing period. Nothing in these terms affects your non-waivable statutory rights or refund rights available through the app store.

Packages bought on our website (yourkey.app) are sold through Link, a Stripe service. Stripe acts as merchant of record for these purchases: it takes the payment, sends your receipts, and its own terms apply to the payment. The charge appears on your statement as LINK.COM* YOURKEY. The price is charged when you buy and then at the start of each billing period, until you cancel; there is no free trial on the website. You may cancel at any time in the Recurring section of your Link account at link.com, or from the Packages tab in the App; cancellation takes effect at the end of the current billing period. Deleting your Your Key account does not cancel a website purchase. If you ask within 14 days of your first payment for a package, we will refund that payment in full, once per person (not again for the same card, email or account): email hello@yourkey.app. This is in addition to your statutory rights.

5. ACCEPTABLE USE

You agree to use the App lawfully and to respect its security, content, infrastructure, and intellectual property. You must not create deceptive accounts, scrape or commercially redistribute App content, interfere with the service, or attempt to access source code or protected infrastructure unlawfully.

6. INTELLECTUAL PROPERTY

App content, branding, design, educational material, configuration, and functionality belong to Your Key App Ltd or its licensors and are protected by applicable law. The packages teach methods in our own words and name no teacher. Our free seminars credit the teachers, authors and researchers whose ideas they discuss; book titles and method names mentioned there are trade marks of their owners, used only to identify their work. None of those people, their estates or their publishers has reviewed, endorsed, sponsored or is affiliated with Your Key. The App's content is provided for your personal use and may not be commercially reproduced or redistributed without permission.

7. THE APP'S CONTENT

Everything the App says, shows and plays is written and recorded in advance by Your Key. Nothing is generated by AI, on your device or anywhere else, and nothing you write is sent to any AI service. What you enter is stored in your account so the App can show it back to you, as described in the Privacy Policy.

The App's content is provided for personal development, education, and motivation. It is not medical, psychological, psychiatric, legal, financial, investment, tax, or other professional advice.

8. QUOTATIONS

Where the App or its store materials quote a named historical author, the quotation is brief, verbatim, and credited for honest provenance. No estate, publisher, or other rights-holder of any quoted author has reviewed, endorsed, sponsored, or is affiliated with Your Key, and the App speaks only in Your Key's own voice, never as, or for, any teacher or public figure.

9. PRACTICE SAFETY

Your Key is not a substitute for professional care. Health-adjacent practices are intended to sit alongside appropriate care. Consult a qualified professional for advice relevant to your circumstances.

The Quitting package is a free self-help tool for adults who have decided to change a habit. It is not a medical device and not treatment: it does not diagnose, treat or monitor any medical or mental health condition, it does not manage withdrawal, and it does not replace a doctor, pharmacist or specialist service. Stopping some substances suddenly, including alcohol after heavy daily drinking and benzodiazepines, can be dangerous; speak to a doctor or a local service before you change how much you use. If you are in danger, call your local emergency number.

Practise breathwork in a safe setting. Avoid breath-retention practices while driving, standing, or in or near water. Seek professional guidance first where a health condition may make the practice unsuitable.

10. LIMITATION OF LIABILITY

To the fullest extent permitted by law, Your Key App Ltd is not liable for indirect, incidental, special, consequential, or punitive damages arising from App use. Our total cumulative liability for a claim related to the App will not exceed subscription fees paid in the preceding twelve months. Nothing excludes liability that cannot lawfully be excluded or affects non-waivable consumer rights.

11. GOVERNING LAW

These Terms are governed by the laws of England and Wales. Consumers elsewhere retain protections afforded by mandatory laws in their country of residence.

12. CONTACT

Your Key App Ltd
Company number 17047088 (England and Wales)
1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom
hello@yourkey.app`;
