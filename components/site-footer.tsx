import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#services", label: "Service status" },
      { href: "/#devices", label: "Device status" },
      { href: "/#schedule", label: "Schedule" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/api", label: "API reference" },
      { href: "/docs/custom-domains", label: "Custom domains" },
      { href: site.github, label: "GitHub" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/acceptable-use", label: "Acceptable use" },
      { href: `mailto:${site.contactEmail}`, label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-ink-soft">Status pages for people and the things they run.</p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold tracking-normal voice-linear">{column.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-soft hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-ink-soft sm:px-8">© {new Date().getFullYear()} is-up.to</div>
    </footer>
  );
}
