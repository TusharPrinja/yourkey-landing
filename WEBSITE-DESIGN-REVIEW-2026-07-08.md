# yourkey.app — Website Design Review

Date: 2026-07-08
Scope: full code audit (all 9 routes) + research into billion-pound consumer-app marketing sites, then top-2-3 safe implementations.

---

## (a) Current-state per-page verdicts

The site was substantially rebuilt on 2026-07-06/07 ("shared-chrome pass" / "billion-pound temple pass" per commit history) and is in noticeably good shape — this is not a first-pass audit of a rough site. It already has: a shared `SiteNav`/`SiteFooter`/`DownloadBadges`/`MentorDisclaimer` component contract, consistent navy/gold temple aesthetic, per-page metadata, and six real pages behind a persistent tab nav (`/`, `/seminar`, `/tools`, `/mastermind`, `/pricing`, `/about`, plus `/privacy` and `/terms`).

**Brand check (silver key question):** the site is **not** mistakenly gold-branded. `public/logo.png` is a rendered silver/chrome key on a navy starfield — correct, matches the app icon. What's gold is the *accent/CTA color* (`--color-gold: #D4AF37`), which is pulled directly from the live app's `constants/theme.ts` (`primary: '#D4AF37'`, explicitly commented "Gold palette"). So: silver key artwork + gold UI accent is the actual current brand system in the shipped app, and the site correctly mirrors it. No mismatch to fix. (If Tushar intends to move the *app's* accent color to silver/chrome too, that's an app-side decision that should land in `constants/theme.ts` first — the website's `globals.css` explicitly says it pulls from that file, so it will follow automatically.)

**Home (`/`)** — Strongest page. Hero → Academy stats → 3 Pillars → gamification (Key Remembers) → tools grid → How It Works → final CTA → legal disclaimer. Good narrative arc, appropriate use of the formula as a differentiator. Weaknesses: hero has no device mockup/screenshot of the actual app (just the static key logo, which is brand mark, not product), and the hero's only visual proof the product exists is copy — no screenshot, no video, no App Store rating (can't have a rating pre-launch, see below). CTA cadence is good (hero, final section) but thin in the middle third of the page — a visitor scrolling through Pillars/Gamification/Tools/How-It-Works sees zero download buttons for ~4 sections in a row.

**Seminar (`/seminar`)** — Clean, single-purpose, good use of numbers (11/71/1) as scannable proof-of-substance. The 11-module list is long (11 full rows) — on mobile this is a lot of scrolling for a secondary page. Legitimate page-worthy content (this is the flagship differentiator), correctly earns its own URL rather than being a home-page section.

**Tools (`/tools`)** — Well-organized into 4 families + 1 featured keystone (The Magnet), avoids the wall-of-22-identical-cards problem. Good information scent. Slightly copy-heavy (every card has a full sentence, some two) — for a page whose job is "prove breadth," shorter fragments would scan faster.

**Mastermind (`/mastermind`)** — Correctly and prominently handles the legal/trust risk (AI applying published concepts, not impersonating mentors) — disclaimer appears twice (top area implicitly via body copy, and explicitly via `MentorDisclaimer` at the bottom). This is the highest legal-exposure page on the site and it's handled carefully. Good.

**Pricing (`/pricing`)** — Correct pattern: free listed first and generous, middle tier highlighted ("Most chosen"), FAQ-ish objection handling at the bottom. The "Inner Circle" founding-keepers band is a strong urgency/scarcity device (first 100, held forever) — this is the single best conversion mechanic on the entire site and it's slightly buried mid-page under the 3 standard tiers rather than being called out in nav or hero.

**About (`/about`)** — Founder story is honest and specific (solo builder, years in the canon + peer-reviewed psych) — this is real, usable social proof of a different kind (founder credibility) since the site can't yet use user-count or App Store rating proof. Good page to exist; low priority for a first-time visitor's path to download, correctly placed last in nav order.

**Privacy / Terms** — Present, GDPR-aligned per metadata, shared `LegalPage` renderer, low risk. Fine.

**Cross-cutting issues:**
1. **Zero real social proof anywhere on the site.** No App Store rating (can't have one pre-launch — legitimate), but also no press mentions, no "as seen on," no beta-tester quotes, no waitlist/interest count, no founder following numbers (TikTok/YouTube are mentioned in About body copy but not linked or leveraged). Every comparable site leans hard on *some* proof format even pre-scale (see research below).
2. **All download CTAs are dead (`href="#"`).** Correctly flagged in code comments as the one intentional seam for launch day — not a bug, just worth surfacing as the literal single blocker between this site and being live.
3. **No sitemap.xml or robots.txt.** Next.js App Router supports both via `app/sitemap.ts` / `app/robots.ts` — currently absent. Minor SEO gap, cheap to fix.
4. **Homepage has no dedicated `metadata` export** — relies entirely on root layout metadata. Every other page correctly overrides title/description; home matches layout defaults so this isn't broken, just inconsistent with the pattern used elsewhere.
5. **No visual proof of the product** anywhere on any page — no screenshots, no mockup, no clip from the filmed seminar, despite the seminar being filmed and the tools being built. This is the biggest gap relative to every researched competitor.
6. **Google Play badge appears sitewide** (`DownloadBadges`) — worth confirming intent: memory/context indicates this is an iOS app. If Android isn't launching day one, a dead/misleading Play Store badge undermines trust at the exact moment of conversion.

---

## (b) The researched bar

Researched calm.com, headspace.com, duolingo.com, flo.health, plus a 15-site gallery (DesignRush) covering Slack, Canva, Aaptiv, Spendee, Muzzle, and others, and generic 2026 SaaS/app landing page conversion data.

**Hero patterns:**
- Calm: full-bleed mood/scenery imagery, ultra-short CTA ("Try Calm for Free"), the *design itself* performs the calm before any copy is read.
- Headspace: "Be kind to your mind" — benefit-driven headline, pain-named-then-solved structure ("Stressed? Overwhelmed? Can't sleep?" → product → "70 million people already feeling better"), device mockups of the actual app interface in-hero.
- Duolingo: "The free, fun, and effective way to learn a language!" — plain benefit statement, mascot instead of a screenshot, single dominant CTA + secondary "I already have an account."
- Cross-gallery pattern (Slack, Spendee, Aaptiv, Tapcart): large majority put an actual device screenshot or app-in-action GIF/video in the hero. Pure-typography, no-product-visual heroes (like Your Key's current one) are the minority pattern, typically only seen on very early pre-launch waitlist pages.
- Standard headline anatomy across sources: **headline (benefit) → explanation → reveal (the product) → offer (CTA)** — the "HERO" framework. Your Key's homepage headline ("The door was never locked") is evocative brand language, not a benefit statement — it reads as poetry before it reads as product. That's a legitimate choice for a brand this ceremonial/temple-toned, but it means the *subheadline* is carrying 100% of the "what is this" job, which it does reasonably well.

**IA — page count and what earns a page:**
- Headspace is the most page-heavy of the set: 20+ nav items across mega-menus (For You, What We Offer, How We Help, Explore Library, For Business, For Providers, Plans, Resources, About) — but Headspace is a mature multi-product company (B2C + B2B2C + clinical), not a comparable stage to Your Key.
- Duolingo's marketing surface is close to single-purpose: hero + CTA, minimal secondary navigation, because the entire strategy is "get people into the free product," not "explain the product on the website."
- The DesignRush 15-site gallery's explicit conclusion: **"Most use single-page scrolling; rarely multi-page structures."** Generic 2026 SaaS benchmarks reinforce this harder: no-nav pages convert 2-3x higher than pages with full navigation, and single-CTA pages convert at 13.5% vs 10.5% for multi-CTA pages.
- However, the pre-launch/waitlist research (a distinct category — Waitlister, Flowjam, LaunchBoom) is even more extreme: true pre-launch pages are single-page, single-CTA, **email capture only**, zero navigation to escape through. That is a different product stage than Your Key (which has a real, built, about-to-ship app with real depth — seminar, 22 tools, pricing tiers).

**Download-CTA placement/frequency:** every researched site repeats the CTA 3-7+ times (Headspace: 7+, Slack: top+bottom only but with huge whitespace making each one land, gallery pattern: top/middle/bottom minimum). Your Key does this correctly already (CTA present in hero + final section on every page, nav has a persistent "Download" pill).

**Social proof formats pre-launch vs post-launch:**
- Post-launch (Calm, Headspace, Flo): App Store star rating (Flo: 4.9★ from 1M+ reviews), download/user counts ("70 million people"), press logos, B2B logos ("4,000+ organizations"), user testimonials with names/photos.
- Pre-launch (waitlist-stage sites): proof substitutes — waitlist counter ("2,341 people already joined"), founder credibility/story, media mentions if any exist, screenshots/demo video of the actual product, sometimes a countdown to launch.
- Your Key currently has **none** of either category. The About page's founder story is the one piece of real proof-adjacent content on the whole site, and it isn't surfaced anywhere except its own page.

**Footer anatomy:** every researched site's footer is heavier than Your Key's — typically 4+ columns (product links, company, resources/legal, social + app badges), language selector on the bigger players. Your Key's footer is a single clean row (logo, 5 nav links, contact + legal, copyright) — appropriately minimal for the current site size, not a real gap.

**What they DON'T have:** none of the big four clutter the hero with more than one CTA choice; none bury pricing more than one click away; none use stock photography (illustration, product screenshots, or mood-color fields only); none skip an App Store badge in the footer even when it's also in the hero.

### The tabs-vs-scroll answer

**Evidence supports keeping the 6-page tab structure, not collapsing to one long scroll — but tightening what each page does.** Reasoning:

1. The "one-page converts better" research is real but comes from two contexts that don't match Your Key: (i) generic B2B SaaS lead-gen pages optimizing for a single email-capture conversion, and (ii) pre-launch waitlist pages with nothing to show yet. Your Key is neither — it's a consumer app with real, substantial content (a filmed 71-lesson seminar, 22 tools, 3 pricing tiers with a founding-member mechanic) that benefits from room to breathe, the same way Headspace's content library and Flo's health-insight depth earn multi-page treatment even though their *marketing* funnel is tight.
2. The content genuinely justifies separate pages: the Seminar is the flagship differentiator and deserves its own SEO-indexable URL (people will search "Your Key seminar" or arrive from a TikTok clip wanting *just* that). Same for Pricing (people bookmark/return to pricing pages) and Mastermind (highest legal-sensitivity content, benefits from being self-contained with its own disclaimer treatment).
3. The actual risk in the "more pages = more exits" research is **navigation that lets people leave without converting**, not page count itself. Your Key's nav already mitigates this well: every single page ends in a `DownloadBadges` CTA block, and the nav includes a persistent "Download" pill independent of scroll position. That's the mechanism the research says matters, and it's already in place.
4. What the research does argue for, and what Your Key should act on: make sure the **home page** itself is tight enough that a visitor who never clicks a tab still gets the full pitch and a reason to download — treat `/` as if it might be the *only* page they see (true today, since traffic will mostly be TikTok/YouTube → homepage), and treat the other 5 pages as depth for people who want to go deeper before converting. On that test, the current homepage does a reasonably good job already (it summarizes seminar, pillars, tools, and gamification in one scroll) — the gap is proof, not structure.

**Verdict: keep the 6-page IA.** Do not collapse to one-page. Spend the effort on adding proof and a product visual instead — that's what's actually missing relative to the research, not page count.

---

## (c) Recommended IA

Keep as-is: `/`, `/seminar`, `/tools`, `/mastermind`, `/pricing`, `/about`, `/privacy`, `/terms`. This is a sound, appropriately-scoped structure for the content that exists. No page should be cut or merged. One addition worth considering post-launch (not now): a `/press` or `/updates` page once there's real press/media to point to — premature today.

---

## (d) Ranked top-10 improvements (impact × effort)

| # | Improvement | Impact | Effort | Notes |
|---|---|---|---|---|
| 1 | **Add a real product visual to the homepage hero** (screenshot, device mockup, or a still/short clip from the filmed seminar) | Very high | Medium | Single biggest gap vs. every researched competitor. Needs actual app screenshots — can't be done from this repo alone. |
| 2 | **Add a social-proof section pre-launch**: founder credibility (TikTok/YouTube follower count if substantial, or "built by one person over N years"), or a waitlist/interest counter if one exists | High | Low–Medium | Copy-only if using founder credibility; needs a data source if using a live counter. |
| 3 | **Add `app/sitemap.ts` and `app/robots.ts`** | Medium | Very low | Pure code, zero risk, immediate SEO correctness. **Implemented below.** |
| 4 | **Surface the "Inner Circle / Founding Keepers" scarcity mechanic higher** (tease it on the homepage or in nav, not just mid-Pricing-page) | High | Low | Copy/layout only — add a compact homepage section or banner. **Implemented below (lightweight version).** |
| 5 | **Verify Google Play badge intent** — if iOS-only at launch, swap `DownloadBadges` to a single App Store CTA (or keep Play as "coming soon" explicitly labelled) | Medium | Low | Needs a product decision (Android timeline) before implementing — flagged, not implemented. |
| 6 | **Tighten CTA cadence on `/`** — add a mid-page download nudge between Pillars and Tools sections (currently a 4-section gap with no CTA) | Medium | Low | Pure layout — **implemented below.** |
| 7 | **Homepage-specific `metadata` export** instead of inheriting layout defaults, for consistency with every other page | Low | Very low | Cosmetic/consistency only; current fallback isn't broken. |
| 8 | **Shorten Seminar page's 11-module list on mobile** (accordion or 2-column grid past module 6) | Low–Medium | Medium | Needs client interactivity (currently all server components) — bigger lift than it looks. |
| 9 | **Add press/media strip** once any exists (TikTok/YouTube mentions, any write-up) | Medium (later) | Low | Explicitly a **post-revenue/post-traction** item — nothing to put there yet. |
| 10 | **Add App Store rating + real download count** to hero and pricing | Very high (later) | Trivial (later) | Blocked entirely on actually launching — the single highest-leverage future change, zero-effort once available. |

---

## (e) What to add at launch vs. post-revenue

**At launch (do now / do the moment the app is live):**
- Swap every `href="#"` download CTA to the real App Store (and Play Store, if applicable) links — the one intentional seam already flagged in the code comments.
- Add sitemap.ts / robots.ts (done in this pass regardless of launch timing).
- Resolve the Google Play badge question — either real link or remove/relabel.
- Add at least one real product screenshot to the homepage hero.

**Post-revenue / post-traction (do not build now):**
- App Store star rating + review count in hero and pricing.
- Real download/user counts ("X people have turned the Key").
- Press/media logo strip.
- User testimonial quotes with names.
- A `/press` page.
- Multi-mentor B2B-style credibility signals (not applicable to this product, but the pattern from Headspace's "4,000 organizations" — Your Key's equivalent would be aggregate practice stats, e.g., "X million Turnings logged," once meaningful).

---

## What was implemented in this pass

Three low-risk, pure-code, high-value-per-effort changes from the list above:

1. **`app/sitemap.ts` + `app/robots.ts`** (item #3) — standard Next.js App Router route handlers, zero runtime cost, immediate SEO correctness (search engines can now discover and correctly index all 9 routes, and robots.txt correctly points to the sitemap).
2. **Founding Keepers teaser on the homepage** (item #4, lightweight version) — a compact banner-style section added to `/` between "The Key Remembers" and "What's Inside," linking to `/pricing#` so the scarcity mechanic (first 100, held forever) is visible to a visitor who never leaves the homepage, not just people who click through to Pricing.
3. **Mid-page CTA nudge on `/`** (item #6) — a slim `DownloadBadges` placement added after the "3 Pillars" section, closing the 4-section CTA-free gap between the hero and the final-CTA section.

All three are copy/layout/routing changes only, inside this repo, no external dependencies added. `npx next build` passes clean after the changes (see below).
