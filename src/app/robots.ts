import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/admin-2026", "/ar/admin-2026"],
      },
    ],
    sitemap: "https://isc-expo.net/sitemap.xml",
  };
}
