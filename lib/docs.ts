export const docs = [
  { slug: "getting-started", title: "Getting started", summary: "Create a page, pick what it shows, and share it." },
  { slug: "monitoring", title: "Service monitoring", summary: "How checks run, when a service counts as down, and incidents." },
  { slug: "devices", title: "Devices and apps", summary: "Link a device, choose what it shares, and what offline means." },
  { slug: "custom-domains", title: "Custom domains", summary: "Serve your page from a domain you own." },
  { slug: "api", title: "API reference", summary: "Send heartbeats, update your status and schedule, post incidents." },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];
