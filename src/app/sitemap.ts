import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";

const BASE = "https://isc-expo.net";
const locales = ["en", "ar"] as const;

const staticPaths = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/visit", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/register", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of locales) {
    for (const { path, priority, changeFrequency } of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${BASE}/${locale}/blog/${post.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
