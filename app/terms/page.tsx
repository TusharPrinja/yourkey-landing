import type { Metadata } from "next";
import { TERMS_OF_SERVICE } from "@/lib/legal";
import { EARLIER_TERMS, EARLIER_TITLE } from "@/lib/legal-earlier";
import { LegalPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms for using Your Key: subscriptions and billing, website purchases, acceptable use, and governing law.",
  alternates: { canonical: "https://yourkey.app/terms" },
};

export default function TermsPage() {
  return <LegalPage title="Terms of Service" body={TERMS_OF_SERVICE} earlier={{ title: EARLIER_TITLE, body: EARLIER_TERMS }} />;
}
