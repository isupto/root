"use client";

import { Check, Loader2, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const USERNAME = /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/;

type Availability =
  { state: "idle" } | { state: "checking" } | { state: "available" } | { state: "unavailable"; reason: string } | { state: "unknown" };

function localProblem(name: string): string | null {
  if (name.length < 3) return "Use at least 3 characters.";
  if (name.length > 32) return "Use 32 characters or fewer.";
  if (!USERNAME.test(name)) return "Use lowercase letters, numbers and single hyphens. Start and end with a letter or number.";
  if (name.includes("--")) return "Hyphens can't be next to each other.";
  return null;
}

export function ClaimForm({ className, autoFocus = false }: { className?: string; autoFocus?: boolean }) {
  const inputId = useId();
  const hintId = useId();
  const [name, setName] = useState("");
  const [check, setCheck] = useState<Availability>({ state: "idle" });

  const problem = name ? localProblem(name) : null;

  useEffect(() => {
    if (!name || problem) {
      setCheck({ state: "idle" });
      return;
    }
    const controller = new AbortController();
    setCheck({ state: "checking" });
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`${site.apiUrl}/v1/usernames/${encodeURIComponent(name)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const body = (await res.json()) as { available: boolean; reason?: string };
        setCheck(body.available ? { state: "available" } : { state: "unavailable", reason: body.reason ?? "That name is taken." });
      } catch (error) {
        if ((error as Error).name !== "AbortError") setCheck({ state: "unknown" });
      }
    }, 350);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [name, problem]);

  const blocked = !!problem || check.state === "unavailable";
  const message =
    problem ??
    (check.state === "available"
      ? `${name}.is-up.to is available.`
      : check.state === "unavailable"
        ? check.reason
        : check.state === "unknown"
          ? "Couldn't check right now. You can still continue."
          : "Your page will live here. You can add your own domain later.");

  return (
    <form
      action={`${site.portalUrl}/sign-up`}
      method="get"
      className={cn("w-full max-w-xl", className)}
      onSubmit={(event) => {
        if (!name || blocked) event.preventDefault();
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Choose your username
      </label>
      <div
        className={cn(
          "flex items-center rounded-xl border bg-card p-1.5 shadow-sm transition-colors focus-within:border-primary",
          blocked && "border-destructive focus-within:border-destructive",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center pl-3 text-base voice-mono sm:text-lg">
          <input
            id={inputId}
            name="username"
            value={name}
            onChange={(event) => setName(event.target.value.toLowerCase().replace(/\s+/g, "-").slice(0, 32))}
            placeholder="yourname"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus={autoFocus}
            aria-invalid={blocked || undefined}
            aria-describedby={hintId}
            className="w-full min-w-0 bg-transparent py-2 outline-none placeholder:text-ink-soft/60"
            style={{ width: `${Math.max(name.length, 8) + 0.2}ch`, maxWidth: "100%" }}
          />
          <span className="shrink-0 text-ink-soft">.is-up.to</span>
        </div>
        <Button type="submit" size="lg" disabled={!name || blocked} className="shrink-0">
          Claim it
        </Button>
      </div>
      <p id={hintId} aria-live="polite" className="mt-2 flex min-h-6 items-center gap-1.5 pl-1 text-sm text-ink-soft">
        {check.state === "checking" ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : null}
        {check.state === "available" ? <Check className="size-3.5 text-up" aria-hidden /> : null}
        {blocked ? <X className="size-3.5 text-destructive" aria-hidden /> : null}
        <span className={cn(blocked && "text-destructive")}>{message}</span>
      </p>
    </form>
  );
}
