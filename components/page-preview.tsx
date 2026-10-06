import { Laptop, Server, Smartphone } from "lucide-react";
import type { CSSProperties } from "react";
import { Dot, toneVar, UptimeBars } from "@/components/status-primitives";
import { demoDevices, demoPerson, demoSchedule, demoServices } from "@/lib/demo";
import { previewThemes, type PreviewTheme } from "@/lib/preview-themes";
import { cn } from "@/lib/utils";

const voiceClass = {
  casual: "voice-casual",
  linear: "voice-linear",
  mono: "voice-mono",
} as const;

const deviceIcon = { laptop: Laptop, phone: Smartphone, server: Server } as const;

function fmtHour(h: number) {
  const hour = Math.floor(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display} ${suffix}`;
}

function Section({ title, aside, children, theme }: { title: string; aside?: React.ReactNode; children: React.ReactNode; theme: PreviewTheme }) {
  return (
    <section
      className="p-4 sm:p-5"
      style={{
        background: "var(--pv-surface)",
        borderRadius: "var(--pv-radius)",
        border: "1px solid var(--pv-line)",
      }}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className={cn("text-base font-bold tracking-tight", voiceClass[theme.headingVoice])} style={{ fontFamily: "var(--pv-heading)" }}>
          {title}
        </h3>
        {aside ? (
          <span className="text-xs" style={{ color: "var(--pv-muted)" }}>
            {aside}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function PagePreview({
  theme = previewThemes[0],
  host = "alex.is-up.to",
  className,
}: {
  theme?: PreviewTheme;
  host?: string;
  className?: string;
}) {
  const span = demoSchedule.end - demoSchedule.start;
  const pos = (h: number) => `${((h - demoSchedule.start) / span) * 100}%`;
  const vars = {
    "--pv-bg": theme.bg,
    "--pv-surface": theme.surface,
    "--pv-fg": theme.fg,
    "--pv-muted": theme.muted,
    "--pv-line": theme.line,
    "--pv-accent": theme.accent,
    "--pv-radius": theme.radius,
    "--pv-heading": theme.headingFont,
    background: "var(--pv-bg)",
    color: "var(--pv-fg)",
  } as CSSProperties;

  return (
    <div
      className={cn("overflow-hidden shadow-[0_30px_80px_-40px_rgb(30_26_46/0.45)]", voiceClass[theme.bodyVoice], className)}
      style={{ ...vars, borderRadius: `calc(${theme.radius} + 8px)`, border: "1px solid var(--pv-line)" }}
    >
      <div className="flex items-center gap-2 border-b px-4 py-2.5 text-xs" style={{ borderColor: "var(--pv-line)", color: "var(--pv-muted)" }}>
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full" style={{ background: "var(--pv-line)" }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--pv-line)" }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--pv-line)" }} />
        </span>
        <span className="mx-auto truncate voice-mono">{host}</span>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <header className="flex flex-wrap items-center gap-4">
          <span
            className="grid size-14 place-items-center text-lg font-extrabold voice-casual"
            style={{ background: "var(--pv-accent)", color: "var(--pv-bg)", borderRadius: "var(--pv-radius)" }}
            aria-hidden
          >
            {demoPerson.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p
              className={cn("text-2xl leading-tight font-extrabold tracking-tight", voiceClass[theme.headingVoice])}
              style={{ fontFamily: "var(--pv-heading)" }}
            >
              {demoPerson.name}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
              <Dot tone={demoPerson.presence.tone} live />
              <span className="font-semibold">{demoPerson.presence.label}</span>
              <span style={{ color: "var(--pv-muted)" }}>{demoPerson.presence.until}</span>
            </p>
          </div>
          <p className="w-full text-sm sm:w-auto sm:max-w-xs" style={{ color: "var(--pv-muted)" }}>
            {demoPerson.note}
          </p>
        </header>

        <div className={cn("grid gap-4", theme.layout === "split" && "lg:grid-cols-[1.25fr_1fr]")}>
          <Section title="Services" aside="Last 90 days" theme={theme}>
            <ul className="space-y-3">
              {demoServices.map((service) => (
                <li key={service.name}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{service.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs tabular-nums" style={{ color: "var(--pv-muted)" }}>
                        {service.uptime}
                      </span>
                      <span className="font-medium" style={{ color: toneVar(service.tone) }}>
                        {service.status}
                      </span>
                    </span>
                  </div>
                  <UptimeBars days={service.days} label={`${service.name} uptime`} />
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Devices" theme={theme}>
            <ul className="divide-y" style={{ borderColor: "var(--pv-line)" }}>
              {demoDevices.map((device) => {
                const Icon = deviceIcon[device.kind as keyof typeof deviceIcon];
                return (
                  <li key={device.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0" style={{ borderColor: "var(--pv-line)" }}>
                    <Icon className="size-4 shrink-0" style={{ color: "var(--pv-muted)" }} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <Dot tone={device.tone} />
                        {device.name}
                      </p>
                      <p className="truncate text-xs" style={{ color: "var(--pv-muted)" }}>
                        {device.activity}
                        {device.detail ? `, ${device.detail}` : null}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs" style={{ color: "var(--pv-muted)" }}>
                      {device.seen}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>

        <Section title={`Today, ${demoSchedule.day}`} aside="Times in your timezone" theme={theme}>
          <div className="relative h-12" aria-label="Schedule for today" role="img">
            {demoSchedule.blocks.map((block) => (
              <div
                key={block.title}
                className="absolute inset-y-0 flex items-center overflow-hidden px-2 text-xs font-semibold"
                style={{
                  left: pos(block.from),
                  width: `calc(${pos(block.to)} - ${pos(block.from)} - 3px)`,
                  background: `color-mix(in oklab, ${toneVar(block.tone)} 22%, var(--pv-surface))`,
                  borderLeft: `3px solid ${toneVar(block.tone)}`,
                  borderRadius: `min(var(--pv-radius), 8px)`,
                }}
              >
                <span className="truncate">{block.title}</span>
              </div>
            ))}
            <div className="absolute -inset-y-1 w-0.5" style={{ left: pos(demoSchedule.now), background: "var(--pv-accent)" }} aria-hidden>
              <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full" style={{ background: "var(--pv-accent)" }} />
            </div>
          </div>
          <div className="mt-2 flex justify-between text-[11px] tabular-nums" style={{ color: "var(--pv-muted)" }}>
            {[8, 11, 14, 17, 20].map((h) => (
              <span key={h}>{fmtHour(h)}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
