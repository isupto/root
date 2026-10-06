import Link from "next/link";
import { apiGroups, type Endpoint } from "@/lib/api-reference";
import type { DocSlug } from "@/lib/docs";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const methodTone: Record<Endpoint["method"], string> = {
  GET: "text-info",
  POST: "text-up",
  PUT: "text-busy",
  PATCH: "text-busy",
  DELETE: "text-down",
};

const authLabel: Record<Endpoint["auth"], string> = {
  none: "No token",
  device: "Device token",
  personal: "Personal token",
  "device or personal": "Device or personal token",
};

function GettingStarted() {
  return (
    <>
      <ol>
        <li>
          <a href={`${site.portalUrl}/sign-up`}>Create an account</a> and pick a username. Your page is live straight away at{" "}
          <code>username.is-up.to</code>.
        </li>
        <li>
          In the portal, open <strong>Page</strong> to set your name, photo, bio and links, and choose which sections appear: status, services,
          devices, schedule and links.
        </li>
        <li>
          Add services to monitor under <strong>Services</strong>, link devices under <strong>Devices</strong>, and add events under{" "}
          <strong>Schedule</strong>.
        </li>
        <li>
          Open <strong>Appearance</strong> to pick a theme, colours, fonts and layout. Changes show on your page as soon as you save.
        </li>
      </ol>
      <h2>Usernames</h2>
      <p>
        Usernames are 3 to 32 characters: lowercase letters, numbers and single hyphens, starting and ending with a letter or number. Some names are
        reserved, such as <code>www</code>, <code>api</code>, <code>status</code> and common brand names. You can change your username once every 30
        days; the old one is held for you for 30 days after.
      </p>
    </>
  );
}

function Monitoring() {
  return (
    <>
      <p>
        Each monitored service is checked from Cloudflare&apos;s network on your plan&apos;s interval: every 5 minutes on Free, every minute on Pro. A
        check is an HTTP request to the URL you set.
      </p>
      <h2>When a service changes status</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Result</th>
            <th scope="col">Status shown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Expected status code, faster than the slow threshold</td>
            <td>Operational</td>
          </tr>
          <tr>
            <td>Expected status code, but slower than the slow threshold</td>
            <td>Degraded</td>
          </tr>
          <tr>
            <td>Wrong status code, timeout or connection error, twice in a row</td>
            <td>Major outage</td>
          </tr>
        </tbody>
      </table>
      <p>Requiring two failures avoids alerting on a single dropped packet. Services without a URL are updated by hand or through the API.</p>
      <h2>Incidents and maintenance</h2>
      <p>
        Open an incident to explain what&apos;s happening. Each update has a status (investigating, identified, monitoring, resolved) and a message.
        Maintenance windows are scheduled incidents: the affected services show as under maintenance for the window you set.
      </p>
      <h2>History</h2>
      <p>
        The bars on your page show the last 90 days. Each bar is one day, coloured by the worst status that day, and the percentage is the share of
        successful checks.
      </p>
    </>
  );
}

function Devices() {
  return (
    <>
      <h2>Link a device</h2>
      <ol>
        <li>
          Install the is-up.to app and choose <strong>Link this device</strong>. It shows a code like <code>WDJB-MJHT</code>.
        </li>
        <li>
          On any signed-in browser, open <a href={`${site.portalUrl}/link`}>portal.is-up.to/link</a>, enter the code and approve.
        </li>
        <li>The app starts reporting within a minute.</li>
      </ol>
      <p>
        For scripts and devices without a screen, create a device in the portal and copy its token instead. Tokens are shown once; if you lose one,
        rotate it.
      </p>
      <h2>What a device shares</h2>
      <p>Each device has its own switches. By default:</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Online or offline</td>
            <td>Shown</td>
          </tr>
          <tr>
            <td>App in use</td>
            <td>Shown</td>
          </tr>
          <tr>
            <td>Window title</td>
            <td>Hidden</td>
          </tr>
          <tr>
            <td>Battery level</td>
            <td>Shown</td>
          </tr>
        </tbody>
      </table>
      <h2>Offline</h2>
      <p>
        A device is offline when it hasn&apos;t sent a heartbeat for its timeout, 5 minutes by default. Apps also send an offline signal when they
        quit, so it usually changes straight away.
      </p>
    </>
  );
}

function CustomDomains() {
  return (
    <>
      <p>
        Custom domains are part of Pro. You can connect any subdomain you control, such as <code>status.yoursite.com</code>.
      </p>
      <ol>
        <li>
          In the portal, open <strong>Domains</strong> and add the hostname.
        </li>
        <li>
          At your DNS provider, create a <code>CNAME</code> record from that hostname to <code>{site.cnameTarget}</code>. If your DNS is on
          Cloudflare, leave the record as DNS only.
        </li>
        <li>
          We verify the record and issue a certificate. This usually takes a few minutes, and can take up to 24 hours if your DNS provider is slow to
          update.
        </li>
      </ol>
      <h2>Apex domains</h2>
      <p>
        A root domain like <code>yoursite.com</code> can&apos;t have a CNAME at most providers. Use a subdomain, or a provider that supports CNAME
        flattening or ALIAS records.
      </p>
      <h2>If you move to Free</h2>
      <p>
        Visitors to your domain are redirected to <code>username.is-up.to</code>, so shared links keep working.
      </p>
    </>
  );
}

function ApiReference() {
  return (
    <>
      <p>
        The base URL is <code>{site.apiUrl}</code>. Send JSON with <code>Content-Type: application/json</code> and authenticate with{" "}
        <code>Authorization: Bearer &lt;token&gt;</code>.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Starts with</th>
            <th scope="col">Can do</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Device token</td>
            <td>
              <code>iut_d_</code>
            </td>
            <td>Heartbeats for its device, status, schedule</td>
          </tr>
          <tr>
            <td>Personal token</td>
            <td>
              <code>iut_p_</code>
            </td>
            <td>Everything on your page, including services and incidents</td>
          </tr>
        </tbody>
      </table>
      <p>
        Errors return a JSON body like <code>{`{ "error": "invalid_request", "message": "…" }`}</code>. Requests are rate limited per token; a{" "}
        <code>429</code> response includes a <code>Retry-After</code> header.
      </p>
      {apiGroups.map((group) => (
        <section key={group.title} className="space-y-5">
          <h2>{group.title}</h2>
          <p>{group.intro}</p>
          {group.endpoints.map((endpoint) => (
            <div key={`${endpoint.method} ${endpoint.path}`} className="space-y-3 rounded-xl border bg-card p-5">
              <h3 className="flex flex-wrap items-baseline gap-x-3 !pt-0 text-base voice-mono">
                <span className={cn("font-bold", methodTone[endpoint.method])}>{endpoint.method}</span>
                <span className="break-all">{endpoint.path}</span>
              </h3>
              <p className="text-sm text-ink-soft">{authLabel[endpoint.auth]}</p>
              <p>{endpoint.summary}</p>
              {endpoint.body ? (
                <>
                  <p className="text-sm font-semibold">Request body</p>
                  <pre>
                    <code>{endpoint.body}</code>
                  </pre>
                </>
              ) : null}
              <p className="text-sm font-semibold">Response</p>
              <pre>
                <code>{endpoint.response}</code>
              </pre>
            </div>
          ))}
        </section>
      ))}
      <p>
        Looking for something that isn&apos;t here? <Link href={`mailto:${site.contactEmail}`}>Tell us what you&apos;re building</Link>.
      </p>
    </>
  );
}

export const docContent: Record<DocSlug, () => React.ReactNode> = {
  "getting-started": GettingStarted,
  monitoring: Monitoring,
  devices: Devices,
  "custom-domains": CustomDomains,
  api: ApiReference,
};
