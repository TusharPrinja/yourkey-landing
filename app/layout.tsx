import type { Metadata, Viewport } from "next";
import { Castoro } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

/* The app's own face for the words that matter: Castoro, regular and italic, never bold
   (yourkey-app constants/moonlit.ts). Everything else is the device's own font, as in the app. */
const castoro = Castoro({ variable: "--font-castoro", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Your Key: the Law of Attraction, as a daily practice",
    template: "%s · Your Key",
  },
  description: SITE.description,
  openGraph: {
    title: "Your Key",
    description: SITE.description,
    url: SITE.url,
    siteName: "Your Key",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Key",
    description: SITE.description,
    images: ["/og.jpg"],
  },
  icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
  other: { "apple-itunes-app": `app-id=${SITE.appStoreId}` },
};

export const viewport: Viewport = {
  themeColor: "#120C14",
  colorScheme: "dark",
  viewportFit: "cover",
};

/**
 * The sky follows the visitor's clock, as Home does in the app (yourkey-app components/moonlit/SkyHeader.tsx:
 * dawn from 5, the afternoon from 11, dusk from 17, night from 21). The server cannot know their hour, so the
 * page is sent with dusk and this one line names the real hour on <html> before anything is painted
 * (node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md, "Themes"). The stylesheet
 * shows that hour's photograph and greeting, and asks for no other photograph. With scripts off, it is dusk.
 */
const SKY = `(function(){try{var h=new Date().getHours();document.documentElement.setAttribute("data-sky",h>=5&&h<11?"dawn":h>=11&&h<17?"golden":h>=17&&h<21?"dusk":"night")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" data-sky="dusk" suppressHydrationWarning className={`${castoro.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SKY }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
