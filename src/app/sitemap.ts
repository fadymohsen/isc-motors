import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { SITE_URL as BASE } from "@/lib/site";

const locales = ["en", "ar"] as const;

const staticPaths = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/visit", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/register", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" as const },
];

// Each URL lists its English/Arabic counterparts so search engines pair the two versions.
function languages(path: string) {
  return {
    en: `${BASE}/en${path}`,
    ar: `${BASE}/ar${path}`,
    "x-default": `${BASE}/en${path}`,
  };
}

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
        alternates: { languages: languages(path) },
      });
    }

    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languages(path) },
      });
    }
  }

  return entries;
}
