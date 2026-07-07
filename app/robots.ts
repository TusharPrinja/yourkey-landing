import type { MetadataRoute } from "next";

/**
 * app/robots.ts — Next.js App Router convention, served at /robots.txt.
 * Everything on this site is public marketing content — no admin/app
 * routes live here — so we allow all crawlers and just point them at
 * the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yourkey.app/sitemap.xml",
  };
}
