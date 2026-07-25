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
Last updated: July 2026

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

Our core infrastructure (Google Firebase Authentication, Firestore database, and Cloud Functions) runs in Google Cloud's United States region (us-central1). Personalised audio files are stored with Cloudflare (R2 object storage) with a United States–based backup in Firebase Storage. This means your personal data is transferred to and processed in the United States.

Where personal data is transferred outside the UK/EEA, we rely on recognised safeguards: our processors (Google, Microsoft, Cloudflare, Sentry, RevenueCat) are certified under the EU–US / UK–US Data Privacy Framework and/or process data under Standard Contractual Clauses and the UK International Data Transfer Addendum as part of their standard data-processing terms. Copies of the relevant mechanisms are available from each processor, or from us on request.

4. THIRD-PARTY PROCESSORS

We use the following third-party services to operate Your Key:

  Firebase / Google (Authentication, Database & Functions, USA): Your account credentials and app data are stored securely using Google Firebase. Firebase is governed by Google's Privacy Policy (policies.google.com/privacy).

  Microsoft Azure OpenAI Service (AI Content Generation): The goals and descriptions you enter, along with your Mastermind council conversation history, are sent to Microsoft Azure OpenAI Service to generate affirmations, visualisation scripts, and mentor responses. Microsoft processes this data within the Azure tenancy under the Azure OpenAI data-protection terms — data is NOT used to train OpenAI's foundation models and is NOT shared with OpenAI directly. We do not send your name or email address to Azure — only the goal content you explicitly enter into the App. Microsoft Azure is governed by the Microsoft Privacy Statement (privacy.microsoft.com).

  Microsoft Azure Speech Services (Text-to-Speech): Visualisation scripts and personalised audio clips are voiced by Microsoft Azure Neural TTS. Only the text being voiced is transmitted; no personal identifiers are sent. Covered by the same Microsoft Privacy Statement above.

  Cloudflare R2 (Audio Storage): Your personalised visualisation audio files are stored in Cloudflare R2. Cloudflare receives only the audio content and file paths; no personal identifiers. Cloudflare R2 is governed by their Privacy Policy (cloudflare.com/privacypolicy).

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
Last updated: July 2026

1. ACCEPTANCE OF TERMS

Your Key is operated by Your Key App Ltd, a company registered in England and Wales (company number 17047088, registered office: 1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom) ("Your Key App Ltd", "we", "us", "our"). "Your Key" and the key device are trading names and trade marks of Your Key App Ltd.

By downloading, installing, or using the Your Key application ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App. We reserve the right to update these terms at any time, and your continued use of the App following any changes constitutes acceptance of the revised terms.

2. DESCRIPTION OF SERVICE

Your Key is a personal development application built on the law-of-attraction and self-improvement tradition. The App provides: personalised AI-generated affirmations built around your goals; guided audio visualisation sessions narrated by AI; educational content on manifestation, success philosophy, and subconscious-focused practice; structured practice tools (including journalling, breathwork, visualisation, and night-time routines); and AI features that apply the published concepts of historical self-improvement teachers to your goals.

Your Key is a practice framework, not a promise. Personal outcomes — financial, professional, relational, or otherwise — depend on many factors outside the App, including your own actions and circumstances. We make no representation or guarantee that you will achieve any particular goal, income, relationship, health improvement, or other outcome by using the App, and testimonials or illustrative stories within the App are not a promise of results.

3. USER ACCOUNTS & AGE REQUIREMENTS

(a) The App is for adults. To create an account, join a household, or purchase any subscription, you must be at least 18 years of age. Every member of a Couples or Family household must also be 18 or over.

(b) Users under 18 are not permitted to use the App, and we do not knowingly collect personal data from anyone under 18 (see the Privacy Policy, section 7). If you believe someone under 18 has created an account, contact us at hello@yourkey.app and we will promptly delete it and all associated data.

(e) You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You agree not to create more than one account per person, impersonate any other person, or register an account using false or misleading information. Notify us immediately at hello@yourkey.app if you become aware of any unauthorised use of your account.

4. SUBSCRIPTIONS & BILLING

Your Key offers a free tier with limited usage and the following paid subscriptions (prices shown are the standard UK monthly prices at the date of these terms; current pricing, annual options, and any introductory offers are always shown in the App before purchase):

  - Growth: £9.99 per month
  - Elite: £19.99 per month
  - Inner Circle: £44.99 per month
  - Couples and Family household plans, as priced in the App

New users may receive a free trial week of Growth features as a welcome gift. This gift does not require a payment method and does not auto-convert into a paid subscription.

Paid subscriptions renew automatically at the end of each billing period until cancelled. All subscriptions are billed through the Apple App Store or Google Play Store and are subject to their billing terms. You may cancel at any time in your device's app store subscription settings; cancellation takes effect at the end of the current billing period. Where you purchase digital content or services for immediate access, you acknowledge that you request immediate performance and that, to the extent permitted by law (including the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013), your statutory cancellation right in respect of that digital content ends once performance has begun. Nothing in these terms affects refund rights you may have from Apple or Google or your non-waivable statutory rights. Pricing is subject to change with reasonable notice.

5. ACCEPTABLE USE

You agree not to: create fake accounts or use the App for fraudulent or deceptive purposes; scrape, copy, or reproduce any content from Your Key for commercial use without prior written consent; resell, sublicence, or redistribute any content, features, or functionality of the App; use the App in any manner that violates applicable laws or regulations; attempt to reverse engineer, decompile, or otherwise access the App's underlying source code or infrastructure; interfere with the security or integrity of the App or its servers.

6. INTELLECTUAL PROPERTY

All content within Your Key is the intellectual property of Your Key App Ltd (or its licensors) and is protected by applicable copyright, trade mark, and other intellectual property law. This includes, without limitation: all educational lessons, modules, and written content; all branding, design, visual elements, and user interface components; the AI mentor council ("Mastermind") system, its configuration, and all associated prompts; and the App's overall structure, features, and functionality. AI-generated affirmations, visualisation scripts, and mentor responses are produced for your personal use only and may not be reproduced, shared, or distributed for commercial purposes.

7. AI-GENERATED CONTENT — GENERAL DISCLAIMER

Affirmations, guided visualisations, identity-blueprint content, and Mastermind responses are generated by artificial intelligence (Microsoft Azure OpenAI Service — primarily GPT-4o-class models — together with Microsoft Azure Speech Services for text-to-speech narration). While we design our systems with quality and safety in mind, AI-generated output may be imperfect, occasionally inaccurate, internally inconsistent, or unsuited to your individual circumstances. AI-generated content is provided for personal-development and motivational purposes only. Your Key does not guarantee any specific outcome from use of AI-generated content and is not responsible for decisions you make based on it.

7A. MENTOR CONCEPTS IN THE MASTERMIND

The "Mastermind" feature within Your Key allows you to ask a question and receive an AI-generated response that APPLIES the published concepts of one of twelve teachers in the self-improvement tradition. As of the date of these Terms, these teachers are: Wallace D. Wattles, James Allen, Napoleon Hill, Neville Goddard, Earl Nightingale, Joseph Murphy, Bob Proctor, Abraham-Hicks (channelled by Esther Hicks), William Walker Atkinson, Charles F. Haanel, Jim Rohn, and Brian Tracy. We reserve the right to add, remove, or substitute teachers without notice.

You acknowledge and agree that:

(a) Each Mastermind response is generated by artificial intelligence and is NOT the actual words, statements, opinions, or advice of the named teacher. The AI does not speak as any teacher and does not imitate any teacher's voice; it explains and applies their published concepts with attribution.

(b) None of the named teachers, nor any of their estates, foundations, publishers, family members, employees, agents, or successors-in-interest (including, without limitation, the Napoleon Hill Foundation, Nightingale-Conant, SUCCESS Magazine, Jim Rohn International, Brian Tracy International, Brian Tracy Solutions, the Proctor Gallagher Institute, Sandy Gallagher, Abraham-Hicks Publications Inc., Esther Hicks, or any publisher of the named teachers' works) has reviewed, endorsed, sponsored, licensed, approved, affiliated with, or is otherwise associated with Your Key, the Mastermind feature, or the AI-generated responses, except where we have publicly stated otherwise in a signed written notice.

(c) The AI synthesises its responses from publicly available teachings of each named teacher, including works currently in the public domain (in particular, the published works of Wallace D. Wattles, James Allen, William Walker Atkinson, Charles F. Haanel, and the public-domain portions of Napoleon Hill's catalogue) and, for authors whose works remain under copyright in some jurisdictions (such as Neville Goddard, whose works are protected in the UK and EU until the end of 2042), from references used for the purpose of educational study, criticism, and review under the fair-dealing exceptions of the UK Copyright, Designs and Patents Act 1988 sections 29 and 30, the United States fair-use doctrine of 17 U.S.C. § 107, and equivalent provisions in other jurisdictions.

(d) The Mastermind is provided for personal reflection, education, and motivation only. It is not intended to be, and must not be relied upon as, medical, psychological, psychiatric, legal, financial, investment, or professional advice of any kind.

(e) If you are a named teacher, the estate of a named teacher, or the holder of rights in the published works of a named teacher, and you wish for that teacher to be removed from the Mastermind, you may contact us at hello@yourkey.app with reasonable proof of your interest, and we will remove the named teacher from the Mastermind feature within seven (7) days of receiving a well-formed request, without admission of liability.

8. NO MEDICAL ADVICE & PRACTICE SAFETY

Your Key is a personal development app and is NOT a substitute for professional medical, psychological, or psychiatric advice, diagnosis, or treatment. The content, affirmations, visualisations, breathwork, and coaching provided within Your Key are intended solely for personal growth, motivation, and goal achievement, and any health-adjacent practice in the App is intended to sit alongside — never instead of — any care you receive. If you are experiencing mental health difficulties, emotional distress, depression, anxiety, or any other psychological or psychiatric condition, please consult a qualified healthcare professional immediately. Do not disregard or delay seeking professional medical advice because of anything you have read, heard, or experienced within Your Key.

Breathwork safety: breath-retention and paced-breathing exercises are not suitable for everyone. Do not practise them while driving, standing, or in or near water, and consult a healthcare professional first if you are pregnant or have a cardiovascular, respiratory, blood-pressure, or seizure-related condition, or a history of fainting.

8A. NO FINANCIAL ADVICE

The App's content frequently concerns goals about money, wealth, business, and career. All such content — including lessons, affirmations, visualisations, Mastermind responses, and action suggestions — is educational and motivational only. Nothing in the App is financial, investment, tax, or business advice; we are not a financial adviser and are not authorised or regulated by the Financial Conduct Authority. Do not make financial decisions based on App content without consulting a qualified professional. You are solely responsible for your financial decisions.

9. LIMITATION OF LIABILITY

To the fullest extent permitted by applicable law, Your Key App Ltd, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of the App. Our total cumulative liability for any claim arising from or related to these terms or your use of the App shall not exceed the total amount you have paid in subscription fees in the twelve months immediately preceding the claim. Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, for fraud, or for any other liability that cannot be excluded by law, and nothing in these terms affects your non-waivable statutory consumer rights.

10. GOVERNING LAW

These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales, except that consumers resident elsewhere retain any protection afforded by mandatory provisions of the law of their country of residence.

11. CONTACT

Your Key App Ltd
Company number 17047088 (England and Wales)
1 Stevenson Road, Hedgerley, Slough SL2 3YD, United Kingdom
hello@yourkey.app

If you have any questions or concerns about these Terms of Service, please contact us at the email address above.`;
