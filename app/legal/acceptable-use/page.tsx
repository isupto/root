import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceptable use policy",
  alternates: { canonical: "/legal/acceptable-use" },
};

export default function AcceptableUsePage() {
  return (
    <ProsePage title="Acceptable use policy" updated="September 29, 2026">
      <p>Pages on is-up.to share a domain, so one person&apos;s misuse affects everyone. Don&apos;t use is-up.to to:</p>
      <ul>
        <li>Impersonate a person, company or organisation, including with a username or page that looks official.</li>
        <li>Phish, distribute malware, or link to either.</li>
        <li>Monitor systems you don&apos;t own or have permission to test, or use checks to load-test or attack a target.</li>
        <li>Publish someone else&apos;s personal information or location without their consent.</li>
        <li>Post content that is illegal, harassing, or sexually explicit.</li>
        <li>Get around plan limits, rate limits or the reserved-username list.</li>
      </ul>
      <h2>Reporting abuse</h2>
      <p>
        Email <a href={`mailto:${site.abuseEmail}`}>{site.abuseEmail}</a> with the page address and what&apos;s wrong. We review every report and may
        remove content or suspend accounts without notice when there&apos;s a risk of harm.
      </p>
    </ProsePage>
  );
}
