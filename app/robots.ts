import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/mentions-legales",
          "/cgv",
          "/politique-cookies",
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: [
          "/mentions-legales",
          "/cgv",
          "/politique-cookies",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
