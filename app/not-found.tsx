import Link from "next/link";
import { Page, PageHead } from "@/components/site";

export default function NotFound() {
  return (
    <Page>
      <PageHead title="That page is not here." lede="It may have moved when the site was rebuilt.">
        <div className="cta" style={{ marginBlock: "6px 80px" }}>
          <Link href="/" className="link">Home</Link>
          <Link href="/tools" className="link">The practice</Link>
          <Link href="/packages" className="link">The packages</Link>
          <Link href="/support" className="link">Support</Link>
        </div>
      </PageHead>
    </Page>
  );
}
