import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TERMS_OF_SERVICE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service — Your Key",
  description:
    "The rules of using Your Key — subscription, acceptable use, IP, AI disclaimer, governing law (England & Wales).",
};

export default function TermsPage() {
  return <LegalPage title="Terms of Service" body={TERMS_OF_SERVICE} />;
}

/**
 * Shared legal-page renderer (duplicated from privacy/page.tsx — kept inline
 * for both pages so adding a new legal page doesn't require importing from a
 * sibling). If a third legal page lands, lift this into lib/LegalPage.tsx.
 */
function LegalPage({ title, body }: { title: string; body: string }) {
  const lines = body.split("\n");
  const lastUpdatedLine = lines.find((l) => l.startsWith("Last updated:")) ?? "";
  const contentStart = lines.findIndex(
    (l) => !l.trim() || (!l.startsWith("Last updated:") && l !== title.toUpperCase()),
  );
  const content =
    contentStart >= 0 ? lines.slice(contentStart).join("\n").trim() : body;

  return (
    <main className="relative flex min-h-screen flex-col">
      <header className="border-b border-white/5 px-6 py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="Your Key"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-display text-lg text-white">Your Key</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          Legal
        </p>
        <h1 className="mb-3 font-display text-4xl font-medium text-white sm:text-5xl">
          {title}
        </h1>
        <p className="text-sm text-[var(--color-text-dim)]">{lastUpdatedLine}</p>
      </div>

      <article className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {content}
        </div>
      </article>

      <footer className="mt-auto border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
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
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <a
              href="mailto:hello@yourkey.app"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              hello@yourkey.app
            </a>
            <Link
              href="/privacy"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-gold)]"
            >
              Terms
            </Link>
          </div>
          <p className="text-xs text-[var(--color-text-dim)]">
            © 2026 Your Key App Ltd
          </p>
        </div>
      </footer>
    </main>
  );
}
