import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

/* The app's three faces (yourkey-app/app/_layout.tsx): Manrope for the interface, Fraunces for the
   taught voice, Space Grotesk for numbers and kickers. */
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Your Key — your goal, spoken back to you as already real",
    template: "%s · Your Key",
  },
  description: SITE.description,
  openGraph: {
    title: "Your Key",
    description: SITE.description,
    url: SITE.url,
    siteName: "Your Key",
    images: [{ url: "/app-icon.png", width: 1024, height: 1024 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Your Key",
    description: SITE.description,
    images: ["/app-icon.png"],
  },
  icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
  other: { "apple-itunes-app": `app-id=${SITE.appStoreId}` },
};

export const viewport: Viewport = {
  themeColor: "#120E19",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
