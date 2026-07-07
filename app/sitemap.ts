import type { MetadataRoute } from "next";

/**
 * app/sitemap.ts — Next.js App Router convention, served at /sitemap.xml.
 * Lists every public marketing route so search engines can discover and
 * index the full 6-page (+legal) IA. Static site, so a plain array is
 * enough — no need to generate this from a CMS or database.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yourkey.app";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/seminar`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/mastermind`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
