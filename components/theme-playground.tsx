"use client";

import { useState } from "react";
import { PagePreview } from "@/components/page-preview";
import { previewThemes } from "@/lib/preview-themes";
import { cn } from "@/lib/utils";

export function ThemePlayground() {
  const [active, setActive] = useState(previewThemes[1].id);
  const theme = previewThemes.find((t) => t.id === active) ?? previewThemes[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">
      <fieldset className="space-y-2">
        <legend className="mb-3 text-sm text-ink-soft">Try a starting point</legend>
        {previewThemes.map((t) => (
          <label
            key={t.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
              active === t.id ? "border-primary bg-accent" : "border-transparent hover:bg-muted",
            )}
          >
            <input type="radio" name="preview-theme" value={t.id} checked={active === t.id} onChange={() => setActive(t.id)} className="sr-only" />
            <span className="flex overflow-hidden rounded-md border" aria-hidden>
              <span className="size-6" style={{ background: t.bg }} />
              <span className="size-6" style={{ background: t.accent }} />
            </span>
            <span className="font-medium">{t.label}</span>
          </label>
        ))}
        <p className="pt-3 text-sm text-ink-soft">
          Then change anything: colours, fonts, corner radius, section order, and which sections show at all. Pro plans can add custom CSS.
        </p>
      </fieldset>
      <PagePreview theme={theme} />
    </div>
  );
}
