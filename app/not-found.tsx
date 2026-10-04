import Link from "next/link";
import { Page, PageHead } from "@/components/site";

export default function NotFound() {
  return (
    <Page>
      <PageHead kicker="Not found" title="That page is not here." lede="It may have moved when the site was rebuilt.">
        <div className="flex flex-wrap gap-5 text-[15px] font-semibold text-[var(--color-amethyst)]">
          <Link href="/">Home →</Link>
          <Link href="/packages">The packages →</Link>
          <Link href="/support">Support →</Link>
        </div>
      </PageHead>
    </Page>
  );
}
