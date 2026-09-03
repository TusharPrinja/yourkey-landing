import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Inter — clean, modern, what Stripe/Linear use. Workhorse for body text.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Playfair Display — sophisticated serif for headlines. Conveys wisdom + depth,
// matching the manifestation/canon-mentors tone without feeling old.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourkey.app"),
  title: "Your Key — The science of manifestation, in your pocket",
  description:
    "AI-personalized manifestation practices grounded in 12 canon mentors and peer-reviewed psychology. Built around the T = R / f(AVEg) formula.",
  // Open Graph + Twitter card so previews look right when the link is shared.
  openGraph: {
    title: "Your Key — The science of manifestation",
    description:
      "AI-personalized manifestation practices. 12 canon mentors. One formula.",
    url: "https://yourkey.app",
    siteName: "Your Key",
    images: [{ url: "/app-icon.png", width: 1024, height: 1024 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Key — The science of manifestation",
    description:
      "AI-personalized manifestation practices. 12 canon mentors. One formula.",
    images: ["/app-icon.png"],
  },
  icons: {
    icon: "/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
