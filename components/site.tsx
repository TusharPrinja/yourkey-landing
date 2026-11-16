import Link from "next/link";
import type { ReactNode } from "react";
import { SITE, type PaidPackage, FREE_PACKAGE, PAID_PACKAGES, PACKAGE_PRICES, TIERS, TOOL_TILES, WHEN_YOU_NEED_IT, webPlan } from "@/lib/site";
import mark from "@/lib/wordmark.generated.json";
import { MobileMenu, NavLinks, type NavLink } from "./nav-client";

/**
 * The site's shared parts, in the app's Moonlit look (rebuilt 15 November 2026 with app version 1.3.0; his pick of
 * three looks: C under B's sky). The night-plum ground, solid raised cards, one accent, Castoro for the words that
 * matter. Everything is drawn on the server but the phone's menu and the "you are here" on a link
 * (components/nav-client.tsx). The styles are app/globals.css.
 */

const NAV: NavLink[] = [
  { href: "/tools", label: "The practice" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

/** "Your Key" in Castoro with the keyhole lit in the O: the app's own outline, drawn once a page and used by name. */
function WordmarkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <symbol id="wm" viewBox={mark.view}>
        <path d={mark.words} fill="currentColor" />
        <path d={mark.key} fill="#D7B46A" />
      </symbol>
    </svg>
  );
}

export function Wordmark() {
  return (
    <svg className="wm" role="img" aria-label="Your Key">
      <use href="#wm" />
    </svg>
  );
}

/** The top bar. `over` is for the home page, where it lies on the photograph and its buttons are glass. */
export function SiteNav({ over = false }: { over?: boolean }) {
  return (
    <header className={`nav wrap${over ? " over" : ""}`}>
      <Link href="/" aria-label="Your Key, home">
        <Wordmark />
      </Link>
      <NavLinks links={NAV} />
      <div className="nav-right">
        <a href={SITE.appStoreUrl} className={`btn small ${over ? "glass" : "ghost"}`}>Get the app</a>
        <MobileMenu links={NAV} />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <Wordmark />
            <p className="text-[15px] leading-6 text-[var(--muted)]" style={{ maxWidth: "34em", marginTop: 6 }}>
              Your Key uses no AI. Every affirmation, mental picture and spoken session is written and recorded in advance.
            </p>
            <a href={`mailto:${SITE.contact}`} className="inline-link text-[15px]" style={{ alignSelf: "flex-start" }}>{SITE.contact}</a>
          </div>
          <FooterColumn title="Your Key" links={[{ href: "/tools", label: "The practice" }, { href: "/packages", label: "Packages" }, { href: "/pricing", label: "Pricing" }, { href: "/about", label: "About" }]} />
          <FooterColumn title="Help" links={[{ href: "/support", label: "Support" }, { href: "/support#cancel", label: "Manage or cancel" }, { href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }]} />
        </div>
        <div className="foot-note tiny">
          <p>Your Key is a practice, not a promise. © 2026 {SITE.company}. Made in the UK.</p>
          <p>Apple, the Apple logo and iPhone are trademarks of Apple Inc. App Store is a service mark of Apple Inc.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="foot-col">
      <p className="eyebrow">{title}</p>
      {links.map((l) => (
        <Link key={l.href} href={l.href}>{l.label}</Link>
      ))}
    </div>
  );
}

/** The one button that matters on the site: to the App Store. */
export function AppStoreButton({ label = "Download on the App Store" }: { label?: string }) {
  return (
    <a href={SITE.appStoreUrl} className="btn">
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.19 7.3c1.35.07 2.29.74 3.08.8.94-.19 1.84-.87 3.05-.78 1.6.13 2.81.79 3.63 2.11-3.33 2-2.71 6.42.6 7.7-.62 1.62-1.43 3.22-2.5 4.15zM12.03 7.25c-.15-2.23 1.66-4.05 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      {label}
    </a>
  );
}

/** A page section: its sentence in Castoro, an optional lede, then its content. */
export function Section({ id, eyebrow, title, lede, children, narrow = false }: { id?: string; eyebrow?: string; title?: ReactNode; lede?: ReactNode; children?: ReactNode; narrow?: boolean }) {
  return (
    <section id={id} className={`wrap sect${narrow ? " narrow" : ""}`}>
      {(eyebrow || title || lede) && (
        <div className="sect-head">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h2 className="serif h2">{title}</h2> : null}
          {lede ? <p className="lede">{lede}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}

/** "In the next update" until the version carrying the packages is on the App Store. */
export function ComingTag() {
  if (SITE.packagesLive) return null;
  return <span className="chip" style={{ alignSelf: "flex-start" }}>In the next update</span>;
}

/** The app's own screen, cut from its App Store pictures (public/moonlit/screen-<name>.webp). */
export function Phone({ name, alt = "", className = "", eager = false }: { name: string; alt?: string; className?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`phone ${className}`} src={`/moonlit/screen-${name}.webp`} alt={alt} width={516} height={1102} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
}

/** Three of the app's screens, Home in front: what stands in the sky at the top of the home page. */
export function PhoneFan() {
  return (
    <div className="fan" role="img" aria-label="Three screens from the app: a visualisation, Home, and the Night Session">
      <Phone name="visualisation" className="left" eager />
      <Phone name="night-session" className="right" eager />
      <Phone name="home" className="mid" eager />
    </div>
  );
}

/** Every tool on its own photograph, as the app's Attract tab draws them, then the ones for a particular moment. */
export function ToolTiles() {
  return (
    <>
      <div className="tiles">
        {TOOL_TILES.map((t) => (
          <Link key={t.id} href="/tools" className="tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/moonlit/tool-${t.id}.jpg`} alt="" width={720} height={720} loading="lazy" decoding="async" />
            <div>
              <h3 className="serif">{t.name}</h3>
              <p>{t.line}</p>
            </div>
          </Link>
        ))}
      </div>
      <p className="eyebrow" style={{ marginTop: 12 }}>When you need it</p>
      <ul className="chips">
        {WHEN_YOU_NEED_IT.map((t) => <li key={t} className="chip">{t}</li>)}
      </ul>
    </>
  );
}

/**
 * The three plans, in the listing's words. Max carries the one accent, as its door does in the app.
 * `buy` (the pricing page) puts each plan's way in under it: the App Store for all three, and the join page for a
 * plan this website sells (lib/site.ts webPlan), the month first, as the app's own plans page has it.
 */
export function Plans({ buy = false }: { buy?: boolean }) {
  return (
    <div className="plans">
      {TIERS.map((t) => {
        const web = buy ? webPlan(t.id) : null;
        return (
          <article key={t.id} className={`card plan${t.id === "max" ? " max" : ""}`}>
            <p className="plan-name">{t.name}</p>
            <p className="price">
              {t.price ?? "Free"}
              {t.per ? <span>{t.per}</span> : null}
            </p>
            <p className="body">{t.body}</p>
            {buy ? (
              <div className="plan-buy">
                {web ? (
                  <>
                    {/* Plain links: the join page is a generated page, not one of this app's routes, so the
                        browser goes straight there and nothing is fetched ahead for a route that is not one. */}
                    <a href={web.joinMonthly} className="btn">Join for {web.monthly} a month</a>
                    <a href={web.joinYearly} className="link">Or {web.yearly} a year</a>
                    <p className="tiny">On this website: you pay today, with a full refund within 14 days if you ask.</p>
                    <a href={SITE.appStoreUrl} className="link quiet">Or in the app, with 7 days free</a>
                  </>
                ) : t.price ? (
                  <>
                    <a href={SITE.appStoreUrl} className="btn ghost">Get it in the app</a>
                    <p className="tiny">7 days free for new subscribers, then {t.price} a month.</p>
                  </>
                ) : (
                  <>
                    <a href={SITE.appStoreUrl} className="btn ghost">Download the app</a>
                    <p className="tiny">No card, no trial, no end date.</p>
                  </>
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

/** The five packages as one quiet list, each with its own colour. `both` adds the app's price beside the website's. */
export function PackagesList({ both = false }: { both?: boolean }) {
  return (
    <div className="card pkgs">
      {PAID_PACKAGES.map((p) => (
        // A plain link, as for the join page: each package's page is a generated page.
        <a key={p.id} href={p.href} className="pkg">
          <i style={{ background: p.accent }} />
          <span className="who">
            <b>{p.name}</b>
            <em>{p.headline}</em>
          </span>
          <span className="cost">
            <strong>{PACKAGE_PRICES.webMonthly} a month</strong>
            {both ? <>{PACKAGE_PRICES.appMonthly} in the app</> : null}
          </span>
        </a>
      ))}
      <div className="pkg">
        <i style={{ background: FREE_PACKAGE.accent }} />
        <span className="who">
          <b>{FREE_PACKAGE.name}</b>
          <em>For stopping something, or cutting down.</em>
        </span>
        <span className="cost"><strong>Free</strong></span>
      </div>
    </div>
  );
}

/**
 * A package as its own world, as the app's Packages tab draws it: its light from the top corner, its tile, its
 * own colours, and its real Today screen rising from the bottom of the card. Every value comes from the app
 * (lib/packages.generated.json, from yourkey-app's tokens).
 */
function worldStyle(p: { accent: string; accent2: string; kicker: string; onAccent: string; deep: string; glow: string; mark: string }) {
  return {
    ["--a" as string]: p.accent, ["--a2" as string]: p.accent2, ["--k" as string]: p.kicker, ["--on" as string]: p.onAccent,
    ["--deep" as string]: p.deep, ["--glow" as string]: p.glow, ["--mark" as string]: p.mark,
  };
}

function WorldPhone({ src }: { src: string }) {
  return (
    <div className="world-phone" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="world-frame"><img src={src} alt="" width={402} height={874} loading="lazy" decoding="async" /></div>
    </div>
  );
}

function WorldBody({ p }: { p: { name: string; headline: string; forWho: string; inside: string[]; kicker: string } }) {
  return (
    <>
      <h3 className="serif h3">{p.headline}</h3>
      <p className="text-[14.5px] leading-6" style={{ color: p.kicker }}>{p.forWho}</p>
      <ul>
        {p.inside.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </>
  );
}

export function PackageCard({ p }: { p: PaidPackage }) {
  return (
    <a href={p.href} className="world" style={worldStyle(p)}>
      <div className="flex items-center gap-3">
        <span className="world-tile" aria-hidden />
        <p className="world-name" style={{ color: p.kicker }}>{p.name}</p>
      </div>
      <WorldBody p={p} />
      <span className="text-[14px] font-semibold" style={{ color: p.kicker }}>See inside {p.name}</span>
      <WorldPhone src={p.screen} />
    </a>
  );
}

/** Quitting, which costs nothing and never will, on the same footing as the four. */
export function FreeCard({ p }: { p: typeof FREE_PACKAGE }) {
  return (
    <div className="world" style={worldStyle(p)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="world-tile" aria-hidden />
          <p className="world-name" style={{ color: p.kicker }}>{p.name}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ background: "rgba(126,214,195,0.14)", color: p.kicker }}>Free</span>
      </div>
      <WorldBody p={p} />
      <span className="text-[14px] font-semibold" style={{ color: p.kicker }}>{p.price}, in the app</span>
      <WorldPhone src={p.screen} />
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <span aria-hidden>+</span>
          </summary>
          <div className="answer">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/** A page: the top bar (unless the page lays its own on a photograph), the page, the foot. */
export function Page({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  return (
    <>
      <WordmarkDefs />
      {nav ? <SiteNav /> : null}
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}

/** The top of every page but the home page: plain, on the ground. The page's one sentence, and a lede. */
export function PageHead({ eyebrow, title, lede, children }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="wrap page-head">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="serif h1-page">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </section>
  );
}

/**
 * The privacy policy and the terms, read the way the rest of the site reads. The words are the
 * legal mirror in lib/legal.ts, kept in step with the app's own copy; only the setting is new.
 */
export function LegalPage({ title, body }: { title: string; body: string }) {
  const lines = body.split("\n");
  const updated = lines.find((l) => l.startsWith("Last updated:")) ?? "";
  const start = lines.findIndex((l) => !l.trim() || (!l.startsWith("Last updated:") && l !== title.toUpperCase()));
  const content = start >= 0 ? lines.slice(start).join("\n").trim() : body;
  return (
    <Page>
      <PageHead eyebrow="Legal" title={title} lede={updated || undefined} />
      <article className="wrap narrow" style={{ paddingBlock: "20px 56px" }}>
        <div className="card legal">{content}</div>
      </article>
    </Page>
  );
}
