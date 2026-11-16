import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://anyph34.github.io/new-respiratory/sitemap.xml",
    host: "https://anyph34.github.io/new-respiratory",
  };
}
