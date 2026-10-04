import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE, type PaidPackage } from "@/lib/site";

/**
 * Shared site chrome and parts (rebuilt 2026-10-04 to the app's design: aubergine ground, glass,
 * amethyst, Manrope / Fraunces / Space Grotesk). Server components only.
 */

const NAV = [
  { href: "/#practice", label: "The practice" },
  { href: "/packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hair)] bg-[var(--color-void)]/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/app-icon.png" alt="" width={30} height={30} className="rounded-[8px]" />
          <span className="text-[16px] font-bold tracking-tight text-[var(--color-ink)]">Your Key</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="text-[14px] font-medium text-[var(--color-soft)] transition-colors hover:text-[var(--color-ink)]">
              {l.label}
            </Link>
          ))}
        </div>
        <a
          href={SITE.appStoreUrl}
          className="shrink-0 rounded-full bg-[var(--color-amethyst)] px-4 py-2 text-[14px] font-bold text-[#120E19] transition-opacity hover:opacity-90"
        >
          Get the app
        </a>
      </nav>
      {/* On a phone the links sit in one scrolling row under the brand. */}
      <div className="flex justify-between gap-3 overflow-x-auto border-t border-[var(--hair)] px-4 py-2.5 sm:justify-start sm:gap-5 md:hidden">
        {NAV.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap text-[13px] font-medium text-[var(--color-soft)]">
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--hair)] bg-[var(--color-recessed)] px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Image src="/app-icon.png" alt="" width={28} height={28} className="rounded-[7px]" />
            <span className="font-bold text-[var(--color-ink)]">Your Key</span>
          </div>
          <p className="max-w-sm text-[14px] leading-6 text-[var(--color-mute)]">
            A daily practice built around your goal, in your own words. On iPhone.
          </p>
          <a href={`mailto:${SITE.contact}`} className="text-[14px] font-medium text-[var(--color-amethyst)]">
            {SITE.contact}
          </a>
        </div>
        <FooterColumn title="Your Key" links={[{ href: "/#practice", label: "The practice" }, { href: "/packages", label: "Packages" }, { href: "/pricing", label: "Pricing" }, { href: "/about", label: "About" }]} />
        <FooterColumn title="Help" links={[{ href: "/support", label: "Support" }, { href: "/support#cancel", label: "Manage or cancel" }, { href: "/privacy", label: "Privacy" }, { href: "/terms", label: "Terms" }]} />
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--hair)] pt-6 text-[12.5px] leading-5 text-[var(--color-faint)]">
        <p>© 2026 {SITE.company}. Made in the UK.</p>
        <p>Apple, the Apple logo and iPhone are trademarks of Apple Inc. App Store is a service mark of Apple Inc.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="kicker text-[var(--color-faint)]">{title}</p>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-[14px] text-[var(--color-soft)] transition-colors hover:text-[var(--color-ink)]">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/** The one button that matters on the site: to the App Store. */
export function AppStoreButton({ label = "Download on the App Store" }: { label?: string }) {
  return (
    <a
      href={SITE.appStoreUrl}
      className="inline-flex items-center gap-3 rounded-[18px] bg-[var(--color-amethyst)] px-6 py-3.5 text-[#120E19] transition-opacity hover:opacity-90"
    >
      <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.19 7.3c1.35.07 2.29.74 3.08.8.94-.19 1.84-.87 3.05-.78 1.6.13 2.81.79 3.63 2.11-3.33 2-2.71 6.42.6 7.7-.62 1.62-1.43 3.22-2.5 4.15zM12.03 7.25c-.15-2.23 1.66-4.05 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      <span className="text-[15.5px] font-bold">{label}</span>
    </a>
  );
}

export function Kicker({ children, color = "var(--color-amethyst)" }: { children: ReactNode; color?: string }) {
  return <p className="kicker" style={{ color }}>{children}</p>;
}

/** A page section: a kicker, a heading in the taught voice, an optional lede, then its content. */
export function Section({ id, kicker, title, lede, children, wide = false }: { id?: string; kicker?: string; title?: ReactNode; lede?: ReactNode; children?: ReactNode; wide?: boolean }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--hair)] px-4 py-16 sm:px-6 sm:py-24">
      <div className={`mx-auto flex flex-col gap-8 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
        {(kicker || title || lede) && (
          <div className="flex max-w-3xl flex-col gap-4">
            {kicker ? <Kicker>{kicker}</Kicker> : null}
            {title ? <h2 className="taught text-[30px] leading-[1.18] sm:text-[40px]">{title}</h2> : null}
            {lede ? <p className="text-[17px] leading-7 text-[var(--color-soft)]">{lede}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** "In the next update" until the version carrying the packages is on the App Store. */
export function ComingTag() {
  if (SITE.packagesLive) return null;
  return (
    <span className="kicker rounded-full border border-[var(--glass-border-hi)] px-2.5 py-1 text-[10.5px] text-[var(--color-mute)]">
      In the next update
    </span>
  );
}

export function PackageCard({ p }: { p: PaidPackage }) {
  return (
    <Link href={p.href} className="glass glass-hover group flex flex-col gap-4 p-6" style={{ ["--a" as string]: p.accent }}>
      {/* The grid this sits in carries the one "In the next update" tag, so the card does not repeat it. */}
      <p className="kicker" style={{ color: p.kicker }}>{p.name}</p>
      <h3 className="taught text-[24px] leading-[1.25]">{p.headline}</h3>
      <p className="text-[14.5px] leading-6" style={{ color: p.kicker }}>{p.forWho}</p>
      <ul className="flex flex-col gap-2 border-t border-[var(--hair)] pt-4">
        {p.inside.map((line) => (
          <li key={line} className="flex gap-2.5 text-[14.5px] leading-6 text-[var(--color-soft)]">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
            {line}
          </li>
        ))}
      </ul>
      <span className="mt-auto text-[14px] font-semibold" style={{ color: p.kicker }}>
        See inside {p.name} →
      </span>
    </Link>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="glass divide-y divide-[var(--hair)] overflow-hidden">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex items-center justify-between gap-4 text-[16px] font-semibold text-[var(--color-ink)]">
            {f.q}
            <span aria-hidden className="text-[var(--color-mute)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="pt-3 text-[15px] leading-6 text-[var(--color-soft)]">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}

/** The top of every page but the home page: a kicker, the page's one sentence, and a lede. */
export function PageHead({ kicker, title, lede, children }: { kicker: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="glow px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        <Kicker>{kicker}</Kicker>
        <h1 className="taught text-[38px] leading-[1.1] sm:text-[56px]">{title}</h1>
        {lede ? <p className="max-w-3xl text-[17.5px] leading-7 text-[var(--color-soft)]">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

/** Quitting, which costs nothing and never will, on the same footing as the four. */
export function FreeCard({ p }: { p: { name: string; headline: string; forWho: string; inside: string[]; price: string } }) {
  return (
    <div className="glass flex flex-col gap-4 p-6" style={{ borderColor: "rgba(126,214,195,0.28)" }}>
      <div className="flex items-center justify-between gap-3">
        <p className="kicker" style={{ color: "var(--color-quitting)" }}>{p.name}</p>
        <span className="kicker rounded-full px-2.5 py-1 text-[10.5px]" style={{ background: "rgba(126,214,195,0.14)", color: "var(--color-quitting)" }}>
          Free
        </span>
      </div>
      <h3 className="taught text-[24px] leading-[1.25]">{p.headline}</h3>
      <p className="text-[14.5px] leading-6" style={{ color: "var(--color-quitting)" }}>{p.forWho}</p>
      <ul className="flex flex-col gap-2 border-t border-[var(--hair)] pt-4">
        {p.inside.map((line) => (
          <li key={line} className="flex gap-2.5 text-[14.5px] leading-6 text-[var(--color-soft)]">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-quitting)" }} />
            {line}
          </li>
        ))}
      </ul>
      <span className="mt-auto text-[14px] font-semibold" style={{ color: "var(--color-quitting)" }}>{p.price}, in the app</span>
    </div>
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
      <PageHead kicker="Legal" title={title} lede={updated || undefined} />
      <article className="px-4 pb-24 sm:px-6">
        <div className="glass mx-auto max-w-3xl whitespace-pre-line p-6 text-[15px] leading-7 text-[var(--color-soft)] [overflow-wrap:anywhere] sm:p-10">
          {content}
        </div>
      </article>
    </Page>
  );
}
