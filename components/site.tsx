import Image from "next/image";
import Link from "next/link";

/**
 * Shared site chrome — the contract every page imports.
 *
 * SiteNav / SiteFooter / DownloadBadges / MentorDisclaimer. Server components
 * only (no state, no effects) — pure markup + Tailwind, matching the temple
 * register set in app/page.tsx and app/globals.css.
 */

const NAV_LINKS = [
  { href: "/seminar", label: "Seminar" },
  { href: "/tools", label: "Tools" },
  { href: "/mastermind", label: "Mastermind" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[var(--color-background)]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Your Key"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="font-display text-lg text-white">Your Key</span>
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="#download"
            className="whitespace-nowrap rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-sm font-medium text-[var(--color-gold)] transition hover:bg-[var(--color-gold)]/20"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-6 w-full">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Your Key"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-display text-lg text-white">Your Key</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/seminar"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Seminar
            </Link>
            <Link
              href="/tools"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Tools
            </Link>
            <Link
              href="/mastermind"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Mastermind
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              About
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <a
              href="mailto:hello@yourkey.app"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              hello@yourkey.app
            </a>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-[var(--color-text-dim)] transition hover:text-[var(--color-gold)]"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[var(--color-text-dim)] transition hover:text-[var(--color-gold)]"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-[var(--color-text-dim)]">
            © 2026 Your Key App Ltd
          </p>
          <p className="mt-2 text-xs text-[var(--color-text-dim)]">
            Apple and the Apple logo are trademarks of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function DownloadBadges() {
  return (
    <div id="download" className="flex flex-wrap items-center justify-center gap-4">
      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-card)] px-6 py-3 transition hover:border-[var(--color-gold)]/70 hover:bg-[var(--color-card-hover)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--color-gold)]"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.19 7.3c1.35.07 2.29.74 3.08.8.94-.19 1.84-.87 3.05-.78 1.6.13 2.81.79 3.63 2.11-3.33 2-2.71 6.42.6 7.7-.62 1.62-1.43 3.22-2.5 4.15zM12.03 7.25c-.15-2.23 1.66-4.05 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">
            Download on the
          </span>
          <span className="block text-sm font-medium text-white">App Store</span>
        </span>
      </a>

      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-card)] px-6 py-3 transition hover:border-[var(--color-gold)]/70 hover:bg-[var(--color-card-hover)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[var(--color-gold)]"
        >
          <path d="M3.61 1.81c-.31.32-.5.81-.5 1.44v17.5c0 .63.19 1.12.5 1.44l.1.09L13.7 12.7v-.4L3.71 1.72l-.1.09zM16.9 15.9l-3.15-3.15v-.5l3.15-3.15.07.04 3.73 2.12c1.07.6 1.07 1.6 0 2.2l-3.73 2.12-.07.04zM4.5 21.7l9.2-9.2v-.5l-9.2-9.2c-.2.11-.35.32-.4.6v17.5c.05.28.2.49.4.6z" />
        </svg>
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wide text-[var(--color-text-secondary)]">
            Get it on
          </span>
          <span className="block text-sm font-medium text-white">Google Play</span>
        </span>
      </a>
    </div>
  );
}

export function MentorDisclaimer() {
  return (
    <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-[var(--color-text-dim)]">
      The Mastermind is an AI feature that applies the publicly available
      concepts of named teachers in the personal-development tradition. It is
      not the actual teachers, and it is not endorsed by, sponsored by, or
      affiliated with any of them or their estates. AI responses are for
      personal reflection and inspiration only.
    </p>
  );
}
