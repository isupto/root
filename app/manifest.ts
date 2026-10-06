import type { MetadataRoute } from "next";
import { icon } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "is-up.to",
    short_name: "is-up.to",
    description: "What you're up to, on one page.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4f8",
    theme_color: "#6d3fd6",
    icons: [
      { src: icon("icon-192x192.png"), sizes: "192x192", type: "image/png" },
      { src: icon("icon-512x512.png"), sizes: "512x512", type: "image/png" },
      { src: icon("icon.svg"), sizes: "any", type: "image/svg+xml" },
    ],
  };
}
