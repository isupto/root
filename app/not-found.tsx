import Link from "next/link";
import { Dot } from "@/components/status-primitives";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <p className="voice-mono text-ink-soft">404</p>
      <h1 className="mt-3 flex items-center gap-4 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold">
        <Dot tone="idle" className="size-4" />
        This page is offline
      </h1>
      <p className="mt-5 max-w-lg text-lg text-ink-soft">
        The address may be mistyped, or the page may have moved. Looking for someone&apos;s page? Try{" "}
        <span className="voice-mono">theirname.is-up.to</span>.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Go to the homepage
      </Link>
    </div>
  );
}
