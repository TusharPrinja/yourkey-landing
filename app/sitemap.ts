import type { MetadataRoute } from "next";

/** app/sitemap.ts — every public page, served at /sitemap.xml (rebuilt 2026-10-04). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yourkey.app";
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") =>
    ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/packages", 0.9, "weekly"),
    // The four package pages (public/packages/*.html, served by next.config.ts's rewrites), listed from
    // the day they sell; until then they were noindex previews.
    page("/sales", 0.9, "weekly"),
    page("/time", 0.9, "weekly"),
    page("/communication", 0.9, "weekly"),
    page("/leadership", 0.9, "weekly"),
    page("/tools", 0.8),
    page("/pricing", 0.8),
    page("/support", 0.7),
    page("/about", 0.6),
    page("/privacy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
  ];
}
