export type Endpoint = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  auth: "none" | "device" | "personal" | "device or personal";
  summary: string;
  body?: string;
  response: string;
};

export type EndpointGroup = { title: string; intro: string; endpoints: Endpoint[] };

export const apiGroups: EndpointGroup[] = [
  {
    title: "Devices",
    intro:
      "Device tokens belong to one device. Send a heartbeat every 60 seconds while the device is in use; if none arrives for the device's timeout (5 minutes by default), it shows as offline.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/heartbeat",
        auth: "device",
        summary: "Report that this device is on, and what it's doing. Fields you've hidden for the device are accepted but never shown.",
        body: `{
  "state": "active",            // "active" | "idle" | "locked"
  "activity": {
    "app": "Figma",             // optional, max 80 chars
    "title": "Checkout v2"      // optional, max 160 chars
  },
  "battery": { "level": 82, "charging": false },
  "message": "Rendering…"       // optional, max 140 chars
}`,
        response: `{ "ok": true, "device": { "id": "dev_…", "name": "MacBook Pro" }, "interval": 60 }`,
      },
      {
        method: "POST",
        path: "/v1/heartbeat/offline",
        auth: "device",
        summary: "Mark the device offline straight away, for example when it shuts down or the user signs out.",
        response: `{ "ok": true }`,
      },
    ],
  },
  {
    title: "Linking a device",
    intro:
      "Apps get a device token without the user typing a password, using the device authorization flow from RFC 8628. Show the user_code, send the user to verification_uri, and poll for the token.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/device-codes",
        auth: "none",
        summary: "Start linking. Codes expire after 10 minutes.",
        body: `{ "name": "MacBook Pro", "kind": "laptop", "platform": "macos" }`,
        response: `{
  "device_code": "…",
  "user_code": "WDJB-MJHT",
  "verification_uri": "https://portal.is-up.to/link",
  "verification_uri_complete": "https://portal.is-up.to/link?code=WDJB-MJHT",
  "expires_in": 600,
  "interval": 5
}`,
      },
      {
        method: "POST",
        path: "/v1/device-codes/token",
        auth: "none",
        summary:
          'Poll no faster than interval. Returns 400 with "authorization_pending" until the user approves, "slow_down" if polling too fast, and "expired_token" or "access_denied" when it\'s over.',
        body: `{ "device_code": "…" }`,
        response: `{
  "token": "iut_d_…",
  "device": { "id": "dev_…", "name": "MacBook Pro" },
  "page": { "username": "alex", "url": "https://alex.is-up.to" }
}`,
      },
    ],
  },
  {
    title: "Status",
    intro: "Your status is the line under your name. An until time clears it automatically.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/presence",
        auth: "device or personal",
        summary: "Read your current status.",
        response: `{ "state": "busy", "text": "Heads down", "emoji": null, "until": "2026-09-29T15:00:00Z" }`,
      },
      {
        method: "PUT",
        path: "/v1/presence",
        auth: "device or personal",
        summary: 'Replace your status. Send state "auto" to let device activity decide.',
        body: `{
  "state": "busy",   // "auto" | "available" | "busy" | "away" | "dnd" | "sleeping" | "offline"
  "text": "Heads down",
  "emoji": "🎧",
  "until": "2026-09-29T15:00:00Z"
}`,
        response: `{ "state": "busy", "text": "Heads down", "emoji": "🎧", "until": "2026-09-29T15:00:00Z" }`,
      },
    ],
  },
  {
    title: "Schedule",
    intro: "Times are ISO 8601 with an offset or Z. Private events appear on your page as busy blocks without a title.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/events?from=…&to=…",
        auth: "device or personal",
        summary: "List events that overlap a range. The range can be at most 62 days.",
        response: `{ "events": [ { "id": "evt_…", "title": "Design review", "starts_at": "…", "ends_at": "…", "kind": "meeting", "visibility": "public" } ] }`,
      },
      {
        method: "POST",
        path: "/v1/events",
        auth: "device or personal",
        summary: "Create an event.",
        body: `{
  "title": "Design review",
  "starts_at": "2026-09-29T15:00:00+01:00",
  "ends_at": "2026-09-29T16:00:00+01:00",
  "kind": "meeting",        // "busy" | "meeting" | "focus" | "travel" | "sleep" | "away" | "free"
  "visibility": "public",   // "public" | "private"
  "location": "Zoom",
  "notes": "Optional"
}`,
        response: `{ "id": "evt_…", … }`,
      },
      {
        method: "PATCH",
        path: "/v1/events/{id}",
        auth: "device or personal",
        summary: "Update any fields of an event you created.",
        response: `{ "id": "evt_…", … }`,
      },
      {
        method: "DELETE",
        path: "/v1/events/{id}",
        auth: "device or personal",
        summary: "Delete an event.",
        response: `{ "ok": true }`,
      },
    ],
  },
  {
    title: "Services and incidents",
    intro: "Personal tokens can do everything you can do in the portal. Use them from CI to open incidents during deploys.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/services",
        auth: "personal",
        summary: "List services with their current status.",
        response: `{ "services": [ { "id": "svc_…", "name": "API", "status": "operational" } ] }`,
      },
      {
        method: "PATCH",
        path: "/v1/services/{id}",
        auth: "personal",
        summary: "Set a service's status by hand. Monitored services go back to automatic after the next successful check.",
        body: `{ "status": "degraded" }   // "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance"`,
        response: `{ "id": "svc_…", "status": "degraded" }`,
      },
      {
        method: "POST",
        path: "/v1/incidents",
        auth: "personal",
        summary: "Open an incident with its first update.",
        body: `{
  "title": "Elevated API errors",
  "status": "investigating",   // "investigating" | "identified" | "monitoring" | "resolved"
  "impact": "major",           // "none" | "minor" | "major" | "critical"
  "message": "Some requests are failing with 502 errors.",
  "services": ["svc_…"]
}`,
        response: `{ "id": "inc_…", … }`,
      },
      {
        method: "POST",
        path: "/v1/incidents/{id}/updates",
        auth: "personal",
        summary: "Post an update. Setting status to resolved closes the incident.",
        body: `{ "status": "resolved", "message": "Error rates are back to normal." }`,
        response: `{ "id": "upd_…", … }`,
      },
    ],
  },
  {
    title: "Public data",
    intro: "These endpoints need no token and are cached for up to 15 seconds.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/pages/{username}",
        auth: "none",
        summary: "Everything shown on a page, as JSON. Hidden fields and private event titles are never included.",
        response: `{ "username": "alex", "presence": { … }, "services": [ … ], "devices": [ … ], "events": [ … ] }`,
      },
      {
        method: "GET",
        path: "/v1/usernames/{username}",
        auth: "none",
        summary: "Check whether a username can be registered.",
        response: `{ "username": "alex", "available": false, "reason": "That username is taken." }`,
      },
    ],
  },
];
