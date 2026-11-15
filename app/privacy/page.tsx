import type { Metadata } from "next";
import { PRIVACY_POLICY } from "@/lib/legal";
import { EARLIER_PRIVACY, EARLIER_TITLE } from "@/lib/legal-earlier";
import { LegalPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Your Key collects, uses and protects your data, your rights, and how to reach us about them.",
  alternates: { canonical: "https://yourkey.app/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" body={PRIVACY_POLICY} earlier={{ title: EARLIER_TITLE, body: EARLIER_PRIVACY }} />;
}
