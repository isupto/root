export type Tone = "up" | "busy" | "down" | "info" | "idle";

/** Deterministic pseudo-random history so server and client render the same bars. */
function history(seed: number, days: number, incidents: Record<number, Tone>): Tone[] {
  let state = seed;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  return Array.from({ length: days }, (_, i) => {
    if (incidents[i]) return incidents[i];
    return next() > 0.985 ? "busy" : "up";
  });
}

export const demoPerson = {
  name: "Alex Rivera",
  handle: "alex",
  initials: "AR",
  presence: { tone: "busy" as Tone, label: "Heads down", until: "until 3:00 PM" },
  note: "Shipping the 2.0 release. Slow to reply on chat, email is fine.",
};

export const demoServices = [
  { name: "API", uptime: "99.98%", status: "Operational", tone: "up" as Tone, days: history(7, 90, { 61: "down" }) },
  { name: "Blog", uptime: "100%", status: "Operational", tone: "up" as Tone, days: history(19, 90, {}) },
  {
    name: "Home server",
    uptime: "98.20%",
    status: "Degraded",
    tone: "busy" as Tone,
    days: history(3, 90, { 22: "down", 23: "down", 88: "busy", 89: "busy" }),
  },
];

export const demoDevices = [
  { name: "MacBook Pro", kind: "laptop", tone: "up" as Tone, activity: "Figma", detail: "Checkout v2", seen: "now" },
  { name: "Pixel 9", kind: "phone", tone: "idle" as Tone, activity: "Idle", detail: "82% battery", seen: "4 min ago" },
  { name: "Home NAS", kind: "server", tone: "down" as Tone, activity: "Offline", detail: "Last heartbeat", seen: "2 h ago" },
];

/** Hours on a 24h clock; the preview timeline spans 08:00–20:00. */
export const demoSchedule = {
  day: "Tuesday",
  start: 8,
  end: 20,
  now: 14.2,
  blocks: [
    { title: "Focus", from: 9, to: 12, tone: "busy" as Tone },
    { title: "Lunch", from: 12, to: 13, tone: "idle" as Tone },
    { title: "Design review", from: 15, to: 16, tone: "info" as Tone },
    { title: "Gym", from: 18, to: 19, tone: "idle" as Tone },
  ],
};
