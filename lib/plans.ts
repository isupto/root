/** Keep in sync with service/lib/plans.ts, which enforces these limits. */
export const plans = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    blurb: "Everything you need for a personal page.",
    features: [
      "yourname.is-up.to",
      "3 devices",
      "5 monitored services, checked every 5 minutes",
      "90 days of uptime history",
      "Schedule and status",
      "Full API access",
    ],
    cta: "Create your page",
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 6, yearly: 60 },
    blurb: "For people whose page is part of their work.",
    features: [
      "Everything in Free",
      "Your own domain, with automatic HTTPS",
      "20 devices",
      "50 monitored services, checked every minute",
      "Calendar feed sync",
      "Custom CSS",
      "Remove the is-up.to footer",
    ],
    cta: "Start with Pro",
  },
] as const;
