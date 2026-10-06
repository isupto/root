import type { Metadata, Viewport } from "next";
import { Recursive } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { icon, site } from "@/lib/site";
import "./globals.css";

const recursive = Recursive({
  subsets: ["latin"],
  axes: ["CASL", "CRSV", "MONO", "slnt"],
  variable: "--font-recursive",
  display: "swap",
});

const description =
  "One page that shows whether your services are up, whether you're around, and when you're free. Free on yourname.is-up.to, or on your own domain.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "is-up.to — what you're up to, on one page",
    template: "%s — is-up.to",
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: icon("favicon.ico"), sizes: "any" },
      { url: icon("icon.svg"), type: "image/svg+xml" },
    ],
    apple: icon("apple-touch-icon.png"),
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "is-up.to — what you're up to, on one page",
    description,
    images: [{ url: icon("icon-1024x1024.png"), width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "is-up.to",
    description,
    images: [icon("icon-512x512.png")],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#16131f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={recursive.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
