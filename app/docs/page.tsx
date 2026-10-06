import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs",
  description: "Guides and API reference for is-up.to.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndex() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold">Docs</h1>
      <p className="mt-4 text-lg text-ink-soft">Everything you need to set up a page and keep it current.</p>
      <ul className="mt-10 divide-y border-y">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`} className="group block py-5">
              <span className="text-xl font-bold group-hover:text-primary">{doc.title}</span>
              <span className="mt-1 block text-ink-soft">{doc.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
