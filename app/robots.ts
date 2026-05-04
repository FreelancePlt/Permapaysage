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
          "/conditions-generales-de-vente",
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
          "/conditions-generales-de-vente",
          "/politique-cookies",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
