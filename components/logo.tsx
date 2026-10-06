import Link from "next/link";
import { icon } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 rounded-md text-lg font-bold", className)} aria-label="is-up.to home">
      <img src={icon("icon.svg")} alt="" width={28} height={28} className="size-7" />
      <span className="tracking-tight voice-casual">is-up.to</span>
    </Link>
  );
}
