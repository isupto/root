import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/pricing", "/docs", ...docs.map((d) => `/docs/${d.slug}`), "/legal/terms", "/legal/privacy", "/legal/acceptable-use"];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
