"use client";

import { useEffect, useState } from "react";
import { Dot } from "@/components/status-primitives";
import type { Tone } from "@/lib/demo";

const states: { host: string; doing: string; tone: Tone }[] = [
  { host: "alex.is-up.to", doing: "shipping the 2.0 release", tone: "busy" },
  { host: "mei.is-up.to", doing: "asleep until 8 am", tone: "idle" },
  { host: "status.acme.dev", doing: "all systems normal", tone: "up" },
  { host: "sam.is-up.to", doing: "on a flight to Lisbon", tone: "info" },
  { host: "ops.is-up.to", doing: "fixing the API outage", tone: "down" },
];

export function HeroSentence() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % states.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  const current = states[index];

  return (
    <h1 className="max-w-[18ch] text-[clamp(2.6rem,7.2vw,6rem)] font-extrabold">
      <span className="sr-only">See what anyone is up to, on one page.</span>
      <span aria-hidden className="block">
        <span className="block text-[0.5em] font-medium tracking-tight voice-mono text-ink-soft">
          <span key={`h-${index}`} className="inline-block animate-in duration-500 fade-in">
            {current.host}
          </span>
        </span>
        <span key={`d-${index}`} className="mt-2 flex animate-in items-start gap-[0.3em] duration-500 fade-in slide-in-from-bottom-2">
          <Dot tone={current.tone} live className="mt-[0.42em] size-[0.28em]" />
          <span>{current.doing}</span>
        </span>
      </span>
    </h1>
  );
}
