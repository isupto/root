import { Check } from "lucide-react";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { plans } from "@/lib/plans";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "is-up.to is free for a personal page. Pro adds your own domain, more devices and one-minute checks.",
  alternates: { canonical: "/pricing" },
};

const faq = [
  {
    q: "Can I switch plans later?",
    a: "Yes. If you move to Free, nothing is deleted: devices and services beyond the Free limits stop updating until you upgrade again or remove some.",
  },
  {
    q: "What happens to my custom domain if I move to Free?",
    a: "Visitors to your domain are redirected to yourname.is-up.to, so links you've shared keep working.",
  },
  {
    q: "Where are checks run from?",
    a: "From Cloudflare's network. A service is only marked down after consecutive failed checks, which avoids false alarms from a single blip.",
  },
  {
    q: "Can I use it for a company status page?",
    a: "Yes. Turn off the device and schedule sections and you have a service status page with incidents and maintenance windows.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-24">
      <h1 className="max-w-2xl text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold">Free for one person. Pro when it&apos;s work.</h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">Prices in US dollars. Pay yearly and get two months free.</p>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          const featured = plan.id === "pro";
          return (
            <section
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={cn(
                "flex flex-col rounded-2xl border p-7 sm:p-9",
                featured ? "border-primary bg-card shadow-lg shadow-primary/10" : "bg-card/60",
              )}
            >
              <h2 id={`plan-${plan.id}`} className="text-2xl font-extrabold">
                {plan.name}
              </h2>
              <p className="mt-1 text-ink-soft">{plan.blurb}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold voice-casual">${plan.price.monthly}</span>
                <span className="text-ink-soft">{plan.price.monthly ? "per month" : "forever"}</span>
              </p>
              {plan.price.yearly ? (
                <p className="text-sm text-ink-soft">or ${plan.price.yearly} per year</p>
              ) : (
                <p className="text-sm text-ink-soft">No card needed</p>
              )}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${site.portalUrl}/sign-up${featured ? "?plan=pro" : ""}`}
                className={cn(buttonVariants({ size: "lg", variant: featured ? "default" : "outline" }), "mt-9")}
              >
                {plan.cta}
              </a>
            </section>
          );
        })}
      </div>

      <section className="mt-24 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl font-extrabold">
          Questions
        </h2>
        <div className="mt-6 divide-y border-y">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-2xl leading-none text-ink-soft transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
