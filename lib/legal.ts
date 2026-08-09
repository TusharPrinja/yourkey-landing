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
Last updated: August 2026

Your Key is operated by Your Key App Ltd, a company registered in England and Wales (company number 17047088, registered office: 1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom). Your Key App Ltd is the data controller for the personal data described in this policy.

1. INFORMATION WE COLLECT

When you use Your Key, we collect the following information:

  - Account information: your email address and display name when you create an account.
  - Goal data: the goals, intentions, and descriptions you enter into the App. This content is central to the service and is used to generate your personalised AI content.
  - Inner-work data (sensitive by nature): the goals and reflections you write can touch on your health, your relationships, your finances, and how you feel about yourself — for example, The Reprogramming asks you to describe a limiting belief, a memory connected to it, and how you would rewrite it. Because this may reveal sensitive information (including information about your health or emotional life), we ask for your explicit, separate consent — shown to you in the App before this content is processed, and kept apart from your acceptance of these terms — as our lawful basis for processing it (Article 9 UK & EU GDPR). It is used solely to run the features for you, is never used for advertising or profiling, and is deleted with your account. You can withdraw this consent at any time by deleting your account (Profile → Delete Account), which erases all of your data.
  - Voice recordings: features such as Subliminal Mode, the Night Session, and the Deep Track invite you to record your own voice. These recordings are stored ON YOUR DEVICE ONLY — they are never uploaded to our servers, and deleting the App deletes them.
  - Usage data: information about how you use the App, including features accessed and session frequency, to help us improve the service.
  - Device information: basic technical data such as your device platform and operating system version.

We do not collect payment card details. All billing is handled directly by Apple (App Store) or Google (Play Store).

2. HOW WE USE YOUR INFORMATION

We use your information to: provide, operate, and maintain Your Key service; personalise AI-generated affirmations, guided visualisations, and Mastermind council responses based on the goals you have entered; monitor and improve App performance and user experience; communicate important updates about your account or changes to the service.

3. WHERE YOUR DATA LIVES & INTERNATIONAL TRANSFERS

Our core infrastructure runs on Microsoft Azure in the United Kingdom (UK South region): Azure Cosmos DB stores your account and app data, and Azure Functions provides sign-in and the services the app calls. Your personalised audio is generated and stored on your device. Cloudflare R2 delivers downloadable model files and Academy videos that contain no personal data.

Most AI writing and voice generation runs entirely on your device. The paid-plan Downstream tool is the sole cloud-AI exception: when you use it, the goal and context entered for that request pass through our authenticated service to Microsoft Azure OpenAI Service. Section four explains that limited flow. Some additional processing takes place outside the UK through our error-monitoring and subscription providers (Sentry and RevenueCat). The safeguards described below apply to those transfers.

Where personal data is transferred outside the UK/EEA, we rely on recognised safeguards: our processors (Microsoft, Cloudflare, Sentry, RevenueCat) are certified under the EU–US / UK–US Data Privacy Framework and/or process data under Standard Contractual Clauses and the UK International Data Transfer Addendum as part of their standard data-processing terms. Copies of the relevant mechanisms are available from each processor, or from us on request.

4. THIRD-PARTY PROCESSORS

We use the following third-party services to operate Your Key:

  Microsoft Azure (Authentication, Database & Functions): Your account credentials and app data are stored in the United Kingdom using Azure Cosmos DB, with sign-in provided by our own service on Azure Functions. Microsoft is governed by the Microsoft Privacy Statement (privacy.microsoft.com/privacystatement).

  ON-DEVICE AI (Content Generation & Voice): Your affirmations, visualisation scripts, guidance and spoken audio are written and voiced by AI models that run on your phone. The models are downloaded to your device once, and this content is then processed locally.

  DOWNSTREAM CLOUD-AI EXCEPTION: The Downstream (a paid-plan tool that builds a practical action plan around your goal) sends the text needed for that request — the goal and context you enter into that tool — to our own authenticated service, which passes it to Microsoft Azure OpenAI Service for processing. Microsoft processes it under the Azure OpenAI data-protection terms: it is not used to train AI models and is not shared with OpenAI the company. We do not send your name or email address with the request. Content entered elsewhere in the App remains outside this request. Microsoft Azure is governed by the Microsoft Privacy Statement (privacy.microsoft.com).

  Cloudflare R2 (Content Delivery): Cloudflare R2 delivers the App's downloadable content to your device — the AI model pack and the Academy course videos. These downloads carry no personal identifiers and nothing you have written. Your personalised audio is generated and stored on your device, not in R2. Cloudflare is governed by their Privacy Policy (cloudflare.com/privacypolicy).

  RevenueCat (Subscription Management): If you subscribe to a paid plan, RevenueCat processes subscription events, entitlements, and purchase receipts on our behalf. RevenueCat receives your anonymised user ID (not your email or display name) and subscription status, solely to keep your paid entitlements in sync across your devices. RevenueCat is governed by their Privacy Policy (revenuecat.com/privacy).

  Sentry (Error Monitoring): When the app encounters a crash or unexpected error, Sentry receives a stack trace, device model, operating system version, and app version so we can diagnose and fix the issue. We configure Sentry so that it does NOT receive your email, display name, goals, or any content you have entered into the App (identifying details and console content are stripped or disabled before sending). Error data is retained for a limited period. Sentry is governed by their Privacy Policy (sentry.io/privacy).

5. DATA RETENTION

We retain your account data for as long as your account remains active. If you request deletion of your account and associated data, we will process your request and delete all personal data within 30 days. In practice, the in-app "Delete Account" flow completes the cascade within ~60 seconds and you will receive a receipt ID for your records. You may keep this receipt ID and email hello@yourkey.app if you have any questions about your deletion.

For accounting compliance (UK Companies Act 2006), we retain anonymised financial records (transaction timestamps, amounts, product SKU — with no UID, email, or device identifiers) for the legally required period (currently 6 years). All other data is permanently deleted.

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
Last updated: August 2026

1. ACCEPTANCE OF TERMS

Your Key is operated by Your Key App Ltd, a company registered in England and Wales (company number 17047088, registered office: 1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom) ("Your Key App Ltd", "we", "us", "our"). "Your Key" and the key device are trading names and trade marks of Your Key App Ltd.

By downloading, installing, or using the Your Key application ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App. We reserve the right to update these terms at any time, and your continued use of the App following any changes constitutes acceptance of the revised terms.

2. DESCRIPTION OF SERVICE

Your Key is a personal development application built on the law-of-attraction and self-improvement tradition. The App provides personalised affirmations, guided audio visualisations, educational content, structured practice tools, and AI-assisted guidance.

Your Key is a practice framework, not a promise. Personal outcomes depend on many factors, including your actions and circumstances. We make no representation or guarantee that you will achieve any particular goal, income, relationship, health improvement, or other outcome by using the App. Testimonials and illustrative stories are not promises of results.

3. USER ACCOUNTS & AGE REQUIREMENTS

The App is for adults. To create an account, join a household, or purchase any subscription, you must be at least 18 years of age. Every member of a Couples or Family household must also be 18 or over.

Users under 18 are not permitted to use the App. If you believe someone under 18 has created an account, contact hello@yourkey.app.

You are responsible for maintaining the confidentiality of your account credentials and for activity under your account. Notify us at hello@yourkey.app if you become aware of unauthorised account use.

4. SUBSCRIPTIONS & BILLING

Your Key offers a free tier and paid subscriptions. Current prices, billing periods, annual options, household options, and any eligible introductory offers are displayed in the App before purchase.

Paid subscriptions renew automatically until cancelled. Subscriptions are billed through the applicable app store and are subject to its billing terms. You may cancel in your device's subscription settings; cancellation takes effect at the end of the current billing period. Nothing in these terms affects your non-waivable statutory rights or refund rights available through the app store.

5. ACCEPTABLE USE

You agree to use the App lawfully and to respect its security, content, infrastructure, and intellectual property. You must not create deceptive accounts, scrape or commercially redistribute App content, interfere with the service, or attempt to access source code or protected infrastructure unlawfully.

6. INTELLECTUAL PROPERTY

App content, branding, design, educational material, configuration, and functionality belong to Your Key App Ltd or its licensors and are protected by applicable law. AI-generated content is provided for your personal use and may not be commercially reproduced or redistributed without permission.

7. ON-DEVICE MODELS AND THIRD-PARTY TERMS

Most personalised generation and speech run on your device using downloaded open-weight models. Those models remain subject to their authors' applicable terms and licences. Their providers have not reviewed, endorsed, or approved Your Key.

8. AI-GENERATED CONTENT AND DATA PROCESSING

Affirmations, guided visualisations, spoken sessions, and Mastermind responses are generated on your device. The optional paid Downstream tool is the exception: when you choose to use it, the goal text submitted to that tool is securely processed through Your Key's authenticated Azure service to create an action plan. Downstream use is optional. Account and goal data may be stored on Your Key's servers for account operation and synchronisation, as described in the Privacy Policy.

AI-generated output may be imperfect, inaccurate, internally inconsistent, or unsuited to your circumstances. It is provided for personal development, education, and motivation. It is not medical, psychological, psychiatric, legal, financial, investment, tax, or other professional advice.

Where the App or its store materials quote a named historical author, the quotation is brief, verbatim, and credited for honest provenance. No estate, publisher, or other rights-holder of any quoted author has reviewed, endorsed, sponsored, or is affiliated with Your Key, and AI-generated responses speak only in Your Key's own voice — they never speak as, or for, any teacher or public figure.

9. PRACTICE SAFETY

Your Key is not a substitute for professional care. Health-adjacent practices are intended to sit alongside appropriate care. Consult a qualified professional for advice relevant to your circumstances.

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
