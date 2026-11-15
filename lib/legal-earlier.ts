/**
 * lib/legal-earlier.ts — what the privacy policy and the terms say to someone whose app is older than 1.3.0.
 *
 * WRITTEN BY HAND, AND ON THE WEBSITE ONLY. lib/legal.ts is the app's own policy and terms, mirrored word for word
 * (Apple cross-checks the two), and from version 1.3.0 they say the app uses no AI. That is true of 1.3.0. It is not
 * true of the 1.2.0 app, which people keep on their phones until they update: it writes and voices some content with
 * models on the phone, its paid Downstream tool sends what is typed into it to Azure OpenAI, and its Mastermind looks
 * a topic up on Wikipedia. A public policy has to describe what really happens to the reader's data (UK GDPR,
 * Article 13), whichever version they hold, so these pages carry a short note for the older versions under the
 * mirrored text. The app's own copy never needs it: an app at 1.3.0 or later has none of these tools.
 *
 * Every sentence here is carried over from the policy and terms that were live for 1.2.0 (October and September 2026),
 * shortened, with nothing new claimed. Take this file out once nobody is left on a version before 1.3.0.
 */

export const EARLIER_TITLE = "If your app is older than version 1.3.0";

export const EARLIER_PRIVACY = `Version 1.3.0 of the App removes every tool that used AI. If the App on your phone is an earlier version, it still has those tools, and three things differ from the policy above.

ON-DEVICE AI: In those versions, some affirmations, visualisation scripts, guidance and spoken audio are written and voiced by AI models that run on your phone. The models are downloaded to your device once, through Cloudflare R2, in a download that carries no personal identifiers and nothing you have written. That content is then processed on your device.

DOWNSTREAM: This paid-plan tool sends the text needed for a request, the goal and context you enter into that tool, to our own authenticated service, which passes it to Microsoft Azure OpenAI Service for processing. Microsoft processes it under the Azure OpenAI data-protection terms: it is not used to train AI models and is not shared with OpenAI the company. We do not send your name or email address with the request. Content entered elsewhere in the App remains outside this request. Microsoft Azure is governed by the Microsoft Privacy Statement (privacy.microsoft.com).

WIKIPEDIA LOOKUPS: When you ask the Mastermind or the Invisible Council something, the App may look up the topic, a word or two, on Wikipedia, to quote a fact rather than guess one. Only that topic is sent, never your goal, your name or what you wrote. Wikipedia (the Wikimedia Foundation, in the United States) receives the topic and your device's internet address, as with any website visit. Wikimedia is governed by its Privacy Policy (foundation.wikimedia.org/wiki/Policy:Privacy_policy).

Once the App on your phone is version 1.3.0 or later, these tools are gone and the policy above describes everything the App does.`;

export const EARLIER_TERMS = `Version 1.3.0 of the App removes every tool that used AI. If the App on your phone is an earlier version, it still has those tools, and these terms apply to them as well.

ON-DEVICE MODELS: In those versions, most personalised generation and speech run on your device using downloaded open-weight models. Those models remain subject to their authors' applicable terms and licences. Their providers have not reviewed, endorsed, or approved Your Key.

AI-GENERATED CONTENT: In those versions, affirmations, guided visualisations, spoken sessions and Mastermind responses are generated on your device. The optional paid Downstream tool is the exception: when you choose to use it, the goal text submitted to that tool is processed through Your Key's authenticated Azure service to create an action plan, as the Privacy Policy describes.

AI-generated output may be imperfect, inaccurate, internally inconsistent, or unsuited to your circumstances. It is provided for personal development, education, and motivation. It is not medical, psychological, psychiatric, legal, financial, investment, tax, or other professional advice. It is provided for your personal use and may not be commercially reproduced or redistributed without permission. AI-generated responses speak only in Your Key's own voice. They never speak as, or for, any teacher or public figure.

Once the App on your phone is version 1.3.0 or later, these tools are gone and this note no longer applies to you.`;
