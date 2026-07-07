import type { Metadata } from "next";
import { PRIVACY_POLICY } from "@/lib/legal";
import { SiteNav, SiteFooter } from "@/components/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Your Key",
  description:
    "How Your Key collects, uses, and protects your data. GDPR-aligned, with clear rights and contact for data requests.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" body={PRIVACY_POLICY} />;
}

/**
 * Shared legal-page renderer used by both /privacy and /terms.
 * Lives here (and duplicated by /terms/page.tsx) for now — small enough that
 * the duplication is cheaper than another file.
 */
function LegalPage({ title, body }: { title: string; body: string }) {
  // Strip the title + "Last updated" from the body since the header surfaces
  // them. Falls back to raw body if the format ever changes.
  const lines = body.split("\n");
  const lastUpdatedLine = lines.find((l) => l.startsWith("Last updated:")) ?? "";
  const contentStart = lines.findIndex(
    (l) => !l.trim() || (!l.startsWith("Last updated:") && l !== title.toUpperCase()),
  );
  const content =
    contentStart >= 0 ? lines.slice(contentStart).join("\n").trim() : body;

  return (
    <main className="relative flex min-h-screen flex-col">
      <SiteNav />

      {/* Page header */}
      <div className="px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[var(--color-gold)]">
          Legal
        </p>
        <h1 className="mb-3 font-display text-4xl font-medium text-white sm:text-5xl">
          {title}
        </h1>
        <p className="text-sm text-[var(--color-text-dim)]">{lastUpdatedLine}</p>
      </div>

      {/* Body — pre-line preserves the original linebreaks while letting
          Tailwind handle margins/leading for readability */}
      <article className="mx-auto w-full max-w-3xl px-6 pb-24">
        <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {content}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
