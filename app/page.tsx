import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { ClaimForm } from "@/components/claim-form";
import { HeroSentence } from "@/components/hero-sentence";
import { PagePreview } from "@/components/page-preview";
import { Dot } from "@/components/status-primitives";
import { ThemePlayground } from "@/components/theme-playground";
import { site } from "@/lib/site";

export const revalidate = 3600;

const incident = [
  { status: "Resolved", time: "14:52", text: "Error rates are back to normal. We'll publish a write-up tomorrow.", tone: "up" as const },
  { status: "Monitoring", time: "14:31", text: "A fix is deployed. We're watching error rates.", tone: "info" as const },
  { status: "Identified", time: "14:09", text: "A bad config push to the API gateway. Rolling back now.", tone: "busy" as const },
  { status: "Investigating", time: "13:58", text: "Some API requests are failing with 502 errors.", tone: "down" as const },
];

const privacy = [
  { label: "Online or offline", shown: true },
  { label: "App in use", shown: true },
  { label: "Window title", shown: false },
  { label: "Battery level", shown: true },
];

function QuestionRow({ id, question, children, aside }: { id: string; question: string; children: React.ReactNode; aside: React.ReactNode }) {
  return (
    <div id={id} className="grid scroll-mt-24 gap-8 border-t py-14 md:grid-cols-[1fr_1.1fr] md:gap-14 md:py-20">
      <div className="max-w-md">
        <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">{question}</h2>
        <div className="mt-5 space-y-4 text-lg text-ink-soft">{children}</div>
      </div>
      <div className="md:pt-3">{aside}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8 md:pt-24">
        <HeroSentence />
        <p className="mt-8 max-w-xl text-lg text-ink-soft sm:text-xl">
          One page that answers the three things people keep asking you: is it down, are you around, and when are you free.
        </p>
        <ClaimForm className="mt-8" />
      </section>

      <section aria-label="Example page" className="mx-auto max-w-6xl px-3 pb-8 sm:px-8">
        <PagePreview />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <QuestionRow
          id="services"
          question="Is it down?"
          aside={
            <ol className="relative space-y-5 border-l-2 pl-6" aria-label="Example incident timeline">
              {incident.map((update) => (
                <li key={update.status} className="relative">
                  <Dot tone={update.tone} className="absolute top-2 -left-[31px] size-3 ring-4 ring-background" />
                  <p className="flex items-baseline gap-3">
                    <span className="font-semibold">{update.status}</span>
                    <span className="text-sm text-ink-soft tabular-nums">{update.time}</span>
                  </p>
                  <p className="text-ink-soft">{update.text}</p>
                </li>
              ))}
            </ol>
          }
        >
          <p>Add your sites, APIs and home lab. We check them every minute from Cloudflare&apos;s network and keep 90 days of history.</p>
          <p>When something breaks, post updates people can follow, and schedule maintenance ahead of time.</p>
        </QuestionRow>

        <QuestionRow
          id="devices"
          question="Are you around?"
          aside={
            <div className="rounded-2xl border bg-card p-5">
              <p className="flex items-center gap-2 font-semibold">
                <Dot tone="up" live />
                MacBook Pro
              </p>
              <p className="mt-1 text-sm text-ink-soft">What visitors can see from this device</p>
              <ul className="mt-4 divide-y">
                {privacy.map((item) => (
                  <li key={item.label} className="flex items-center justify-between py-2.5">
                    <span>{item.label}</span>
                    {item.shown ? (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-up">
                        <Check className="size-4" aria-hidden />
                        Shown
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                        <Minus className="size-4" aria-hidden />
                        Hidden
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <p>
            Install the app on your laptop and phone. Each device reports whether it&apos;s on, what you&apos;re using and how much battery is left.
          </p>
          <p>You choose what&apos;s shown per device. Devices that stop reporting go grey on their own.</p>
        </QuestionRow>

        <QuestionRow
          id="schedule"
          question="When are you free?"
          aside={
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-card p-5">
                <p className="text-sm text-ink-soft">Next free</p>
                <p className="mt-1 text-2xl font-bold voice-casual">4:00 – 6:00 PM</p>
                <p className="text-sm text-ink-soft">Today, after Design review</p>
              </div>
              <div className="rounded-2xl border bg-card p-5">
                <p className="text-sm text-ink-soft">For a visitor in Lisbon</p>
                <p className="mt-1 text-2xl font-bold voice-casual">9:00 – 11:00 PM</p>
                <p className="text-sm text-ink-soft">Converted to their timezone</p>
              </div>
              <div className="rounded-2xl border border-dashed p-5 sm:col-span-2">
                <p className="font-semibold">Private events stay private</p>
                <p className="text-sm text-ink-soft">Mark anything as private and visitors only see a busy block, with no title.</p>
              </div>
            </div>
          }
        >
          <p>Block out focus time, travel and sleep, or subscribe to an existing calendar feed so your page stays in sync.</p>
          <p>Visitors see every time in their own timezone.</p>
        </QuestionRow>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-24">
          <div className="max-w-md">
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">Put it on your own domain</h2>
            <p className="mt-5 text-lg text-ink-soft">
              Point a subdomain at us with one DNS record. We issue and renew the certificate for you, usually within a few minutes.
            </p>
            <Link href="/docs/custom-domains" className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
              How custom domains work
            </Link>
          </div>
          <div className="self-center overflow-x-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left text-sm voice-mono sm:text-base">
              <caption className="mb-3 text-left text-sm text-ink-soft voice-linear">Add this record at your DNS provider</caption>
              <thead>
                <tr className="border-b text-ink-soft">
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Type
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Name
                  </th>
                  <th scope="col" className="py-2 pr-4 font-medium">
                    Target
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 pr-4 font-semibold">CNAME</td>
                  <td className="py-4 pr-4">status.yoursite.com</td>
                  <td className="py-4 pr-4 text-primary">{site.cnameTarget}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="customize" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 md:py-24">
        <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">Make it look like yours</h2>
        <p className="mt-5 mb-10 max-w-xl text-lg text-ink-soft">
          Every page is rendered on the server, so it loads fast and looks right in link previews, whatever theme you pick.
        </p>
        <ThemePlayground />
      </section>

      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-24">
          <div className="max-w-md">
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">Update it from anywhere</h2>
            <p className="mt-5 text-lg text-ink-soft">
              Use the desktop and mobile apps, or send updates from your own scripts, shortcuts and CI. Every device gets its own token that you can
              revoke at any time.
            </p>
            <Link href="/docs/api" className="mt-6 inline-block font-semibold text-primary underline-offset-4 hover:underline">
              Read the API reference
            </Link>
          </div>
          <pre className="self-center overflow-x-auto rounded-2xl bg-ink p-5 text-sm leading-relaxed voice-mono text-paper">
            <code>{`curl -X POST ${site.apiUrl}/v1/heartbeat \\
  -H "Authorization: Bearer $ISUPTO_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"activity": {"app": "Figma"},
       "battery": {"level": 82}}'`}</code>
          </pre>
        </div>
      </section>

      <section className="border-t bg-accent/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">Pick your name</h2>
          <p className="mt-4 mb-8 max-w-xl text-lg text-ink-soft">
            Setup takes about a minute. The free plan includes a page, three devices and five monitored services.
          </p>
          <ClaimForm />
        </div>
      </section>
    </>
  );
}
