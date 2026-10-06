import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docContent } from "@/components/docs-content";
import { ProsePage } from "@/components/prose-page";
import { docs, type DocSlug } from "@/lib/docs";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary, alternates: { canonical: `/docs/${doc.slug}` } };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();
  const Content = docContent[doc.slug as DocSlug];

  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-0 md:grid-cols-[13rem_1fr] md:px-8">
      <nav aria-label="Docs" className="px-5 pt-10 md:sticky md:top-16 md:self-start md:px-0 md:pt-20">
        <ul className="flex gap-1 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/docs/${d.slug}`}
                aria-current={d.slug === doc.slug ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm whitespace-nowrap text-ink-soft hover:text-foreground",
                  d.slug === doc.slug && "bg-accent font-semibold text-foreground",
                )}
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ProsePage title={doc.title}>
        <p className="text-lg text-ink-soft">{doc.summary}</p>
        <Content />
      </ProsePage>
    </div>
  );
}
