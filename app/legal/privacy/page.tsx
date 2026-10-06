import type { Metadata } from "next";
import { ProsePage } from "@/components/prose-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy policy" updated="September 29, 2026">
      <p>
        is-up.to exists to publish information you choose to share. This page explains what we collect, what becomes public, and what stays private.
      </p>

      <h2>What we collect</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Why</th>
            <th scope="col">Public?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email address and password hash</td>
            <td>Signing in, account emails</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Page content, services, incidents, schedule</td>
            <td>Showing your page</td>
            <td>Yes, except events you mark private</td>
          </tr>
          <tr>
            <td>Device reports (online state, app in use, battery)</td>
            <td>Showing device status</td>
            <td>Only the fields you enable per device</td>
          </tr>
          <tr>
            <td>Uptime check results</td>
            <td>Service history</td>
            <td>Yes, as daily summaries</td>
          </tr>
          <tr>
            <td>IP address and user agent of signed-in sessions</td>
            <td>Security and the session list in your settings</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell personal data or use it for advertising.</li>
        <li>We don&apos;t put tracking cookies on your page. The only cookie we set is the sign-in cookie on the portal.</li>
        <li>Device apps never send data you haven&apos;t enabled. Window titles are off by default.</li>
      </ul>

      <h2>Where it&apos;s stored</h2>
      <p>is-up.to runs entirely on Cloudflare. Data is stored in Cloudflare D1 and Workers KV, and email is sent through Cloudflare Email Service.</p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Device activity history: 7 days.</li>
        <li>Uptime history: 90 days of daily summaries.</li>
        <li>Account data: until you delete your account, then removed within 30 days, including from backups.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can export or delete your data from the portal. For anything else, including access or correction requests, email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </ProsePage>
  );
}
