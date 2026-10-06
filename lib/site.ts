export const site = {
  name: "is-up.to",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://is-up.to",
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.is-up.to",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://api.is-up.to",
  staticUrl: process.env.NEXT_PUBLIC_STATIC_URL ?? "https://static.is-up.to",
  userDomain: "is-up.to",
  cnameTarget: "domains.is-up.to",
  contactEmail: "hello@is-up.to",
  abuseEmail: "abuse@is-up.to",
  github: "https://github.com/isupto",
} as const;

export const icon = (file: string) => `${site.staticUrl}/icon/${file}`;
