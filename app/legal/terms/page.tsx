import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <ProsePage title="Terms of service" updated="September 29, 2026">
      <p>
        These terms cover your use of is-up.to, including pages on <code>*.is-up.to</code>, pages on custom domains that point to us, the portal at{" "}
        <code>portal.is-up.to</code>, the API at <code>api.is-up.to</code> and our apps. By creating an account you agree to them.
      </p>

      <h2>Your account</h2>
      <p>
        You need to be at least 16 to create an account. Keep your password and device tokens safe: anything done with them is treated as done by you.
        Tell us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> if you think your account has been accessed without permission.
      </p>

      <h2>Usernames and domains</h2>
      <p>
        Usernames are first come, first served, but some names are reserved for our own use or to protect others. We may reclaim a username that
        impersonates a person, brand or organisation, that has been inactive for more than 12 months on the Free plan, or that is used in breach of
        the <Link href="/legal/acceptable-use">acceptable use policy</Link>.
      </p>
      <p>
        You may only connect domains you control. We issue certificates for connected domains through Cloudflare and can disconnect a domain that
        stops pointing to us.
      </p>

      <h2>Your content</h2>
      <p>
        You own what you publish. You give us permission to store, process and display it so we can run the service. You are responsible for what
        appears on your page, including device activity you choose to share.
      </p>

      <h2>Paid plans</h2>
      <p>
        Paid plans are billed in advance, monthly or yearly, and renew automatically until cancelled. Cancelling stops the next renewal; you keep paid
        features until the end of the period you&apos;ve paid for.
      </p>

      <h2>Availability</h2>
      <p>
        We work hard to keep is-up.to running, but we provide it as is and don&apos;t guarantee it will always be available or error free. Uptime
        checks are a best-effort signal and shouldn&apos;t be your only form of monitoring for critical systems.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can delete your account from the portal at any time. We may suspend or close accounts that break these terms, with notice where we
        reasonably can.
      </p>

      <h2>Liability</h2>
      <p>To the extent the law allows, our total liability to you is limited to the amount you paid us in the 12 months before the claim.</p>

      <h2>Changes</h2>
      <p>We&apos;ll email you before material changes take effect. Continuing to use is-up.to after that means you accept the updated terms.</p>
    </ProsePage>
  );
}
