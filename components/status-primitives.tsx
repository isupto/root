import type { Tone } from "@/lib/demo";
import { cn } from "@/lib/utils";

const toneColor: Record<Tone, string> = {
  up: "var(--up)",
  busy: "var(--busy)",
  down: "var(--down)",
  info: "var(--info)",
  idle: "var(--idle)",
};

export function toneVar(tone: Tone) {
  return toneColor[tone];
}

export function Dot({ tone, live = false, className }: { tone: Tone; live?: boolean; className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2.5 shrink-0", className)} aria-hidden>
      {live ? (
        <span className="absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden" style={{ background: toneColor[tone] }} />
      ) : null}
      <span className="relative inline-flex size-full rounded-full" style={{ background: toneColor[tone] }} />
    </span>
  );
}

export function UptimeBars({ days, label }: { days: Tone[]; label: string }) {
  const bad = days.filter((d) => d !== "up").length;
  return (
    <div
      role="img"
      aria-label={`${label}: ${days.length - bad} of ${days.length} days without issues`}
      className="flex h-7 min-w-0 items-stretch gap-px sm:gap-[2px]"
    >
      {days.map((tone, i) => (
        <span key={i} className="min-w-px flex-1 rounded-[1px]" style={{ background: toneColor[tone], opacity: tone === "up" ? 0.8 : 1 }} />
      ))}
    </div>
  );
}
