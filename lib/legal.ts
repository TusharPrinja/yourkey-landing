/**
 * Legal text — Privacy Policy + Terms of Service.
 *
 * COPIED VERBATIM from manifest-app/constants/privacy.ts and terms.ts.
 *
 * ⚠️ KEEP IN SYNC: when these are updated in the iOS/Android app, mirror the
 * same edits here. The two sources need to match because Apple's App Store
 * listing links to the web URLs (yourkey.app/privacy + yourkey.app/terms)
 * but the in-app legal screens render from the manifest-app constants.
 *
 * If they diverge, Apple review can flag it — they cross-check.
 */

export const PRIVACY_POLICY = `PRIVACY POLICY
Last updated: April 2026

1. INFORMATION WE COLLECT

When you use Your Key, we collect the following information:

  - Account information: your email address and display name when you create an account.
  - Goal data: the goals, intentions, and descriptions you enter into the App. This content is central to the service and is used to generate your personalised AI content.
  - Usage data: information about how you use the App, including features accessed and session frequency, to help us improve the service.
  - Device information: basic technical data such as your device platform and operating system version.

We do not collect payment card details. All billing is handled directly by Apple (App Store) or Google (Play Store).

2. HOW WE USE YOUR INFORMATION

We use your information to: provide, operate, and maintain Your Key service; personalise AI-generated affirmations, guided visualisations, and coaching responses based on the goals you have entered; monitor and improve App performance and user experience; communicate important updates about your account or changes to the service.

3. THIRD-PARTY PROCESSORS

We use the following third-party services to operate Your Key:

  Firebase / Google (Authentication & Database): Your account credentials and app data are stored securely using Google Firebase. Firebase is governed by Google's Privacy Policy (policies.google.com/privacy).

  Microsoft Azure (AI Content Generation): The goals and descriptions you enter, along with your Mastermind conversation history, are sent to the Microsoft Azure OpenAI Service — together with Microsoft Azure Speech Services for text-to-speech narration — to generate affirmations, visualisation scripts, and Mastermind responses. Microsoft processes this data subject to the Microsoft Products and Services Data Protection Addendum. We do not send your name or email address to Azure — only the goal content you explicitly enter into the App.

  RevenueCat (Subscription Management): If you subscribe to Growth or Elite, RevenueCat processes subscription events, entitlements, and purchase receipts on our behalf. RevenueCat receives your anonymised user ID (not your email or display name) and subscription status, solely to keep your paid entitlements in sync across your devices. RevenueCat is governed by their Privacy Policy (revenuecat.com/privacy).

  Sentry (Error Monitoring, EU region): When the app encounters a crash or unexpected error, Sentry receives a stack trace, device model, operating system version, and app version so we can diagnose and fix the issue. We do NOT send your email, display name, goals, or any content you have entered into the App. Error data is stored in Sentry's EU (Frankfurt) region and retained for a limited period. Sentry is governed by their Privacy Policy (sentry.io/privacy).

4. DATA RETENTION

We retain your account data for as long as your account remains active. If you request deletion of your account and associated data, we will process your request and delete all personal data within 30 days.

5. YOUR RIGHTS (GDPR)

If you are located in the United Kingdom or the European Economic Area, you have the following rights under the UK GDPR and EU GDPR:

  - Right of Access: request a copy of the personal data we hold about you.
  - Right to Rectification: request correction of any inaccurate personal data.
  - Right to Erasure: request deletion of your personal data ("right to be forgotten").
  - Right to Data Portability: request your data in a structured, commonly used format.
  - Right to Object: object to the processing of your personal data in certain circumstances.

To exercise any of these rights, contact us at: hello@yourkey.app. We will respond within 30 days of receiving your request.

6. NO SELLING OF DATA

We do not sell, rent, trade, or otherwise transfer your personal data to third parties for advertising or marketing purposes. Your data is used solely to provide and improve Your Key service.

7. CHILDREN

Your Key is intended exclusively for users aged 18 and over. We do not knowingly collect personal data from individuals under the age of 18. If you believe a minor has created an account, please contact us at hello@yourkey.app and we will promptly delete the account and all associated data.

8. COOKIES & ANALYTICS

Your Key does not use third-party advertising cookies. The App may collect anonymised usage analytics to help us understand how users engage with features and to improve the service. This data is not linked to your personal identity and is not shared with third parties for advertising purposes.

9. CONTACT

If you have any questions about this Privacy Policy, wish to exercise your data rights, or want to request account deletion, please contact us at: hello@yourkey.app`;

export const TERMS_OF_SERVICE = `TERMS OF SERVICE
Last updated: April 2026

1. ACCEPTANCE OF TERMS

By downloading, installing, or using Your Key application ("Your Key", "the App", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App. We reserve the right to update these terms at any time, and your continued use of the App following any changes constitutes acceptance of the revised terms.

2. DESCRIPTION OF SERVICE

Your Key is an AI-powered personal development application designed to help users achieve their goals through the principles of the law of attraction. The App provides: personalised AI-generated affirmations built around your goals; guided audio visualisation sessions narrated by AI; educational content on manifestation, success philosophy, and subconscious reprogramming; and an AI coaching service. All AI content is generated dynamically based on the goals and intentions you provide.

3. USER ACCOUNTS

You must be at least 18 years of age to create an account and use Your Key. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree not to create more than one account per person, impersonate any other person, or register an account using false or misleading information. You must notify us immediately if you become aware of any unauthorised use of your account.

4. SUBSCRIPTION & BILLING

Your Key offers a free tier with limited daily usage and two paid subscription plans:

  - Growth Plan: £9.99 per month
  - Elite Plan: £19.99 per month

Annual subscription options are available at a reduced rate. All subscriptions are billed through the Apple App Store or Google Play Store and are subject to their respective billing terms. You may cancel your subscription at any time through your device's app store settings. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months or unused portions of a subscription period. Pricing is subject to change with reasonable notice.

5. ACCEPTABLE USE

You agree not to: create fake accounts or use the App for fraudulent or deceptive purposes; scrape, copy, or reproduce any content from Your Key for commercial use without prior written consent; resell, sublicence, or redistribute any content, features, or functionality of the App; use the App in any manner that violates applicable laws or regulations; attempt to reverse engineer, decompile, or otherwise access the App's underlying source code or infrastructure; interfere with the security or integrity of the App or its servers.

6. INTELLECTUAL PROPERTY

All content within Your Key is the intellectual property of Tushar Prinja and is protected by applicable copyright and intellectual property law. This includes, without limitation: all educational lessons, modules, and written content authored by Tushar Prinja; all branding, design, visual elements, and user interface components; the AI coaching system, its configuration, and all associated prompts; and the App's overall structure, features, and functionality. AI-generated affirmations, visualisation scripts, and coaching responses are produced for your personal use only and may not be reproduced, shared, or distributed for commercial purposes.

7. AI-GENERATED CONTENT DISCLAIMER

Affirmations, guided visualisations, identity-blueprint content, and Mastermind responses are generated by artificial intelligence (Microsoft Azure OpenAI Service — primarily GPT-4o-class models — together with Microsoft Azure Speech Services for text-to-speech narration). While we design our systems with quality and safety in mind, AI-generated output may be imperfect, occasionally inaccurate, internally inconsistent, or unsuited to your individual circumstances. AI-generated content is provided for personal-development and motivational purposes only. Your Key does not guarantee any specific outcome from use of AI-generated content and is not responsible for decisions you make based on it.

8. NO MEDICAL ADVICE

Your Key is a personal development app and is NOT a substitute for professional medical, psychological, or psychiatric advice, diagnosis, or treatment. The content, affirmations, visualisations, and coaching provided within Your Key are intended solely for personal growth, motivation, and goal achievement. If you are experiencing mental health difficulties, emotional distress, depression, anxiety, or any other psychological or psychiatric condition, please consult a qualified healthcare professional immediately. Do not disregard or delay seeking professional medical advice because of anything you have read, heard, or experienced within Your Key.

9. LIMITATION OF LIABILITY

To the fullest extent permitted by applicable law, Tushar Prinja and Your Key shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of the App. Our total cumulative liability for any claim arising from or related to these terms or your use of the App shall not exceed the total amount you have paid in subscription fees in the twelve months immediately preceding the claim.

10. GOVERNING LAW

These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.

11. CONTACT

If you have any questions or concerns about these Terms of Service, please contact us at: hello@yourkey.app`;
