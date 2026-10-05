import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/seo";
import { getSitemapDocuments } from "@/lib/sanity/queries";
import { cityPages } from "@/lib/site-data";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const documents = await getSitemapDocuments();
  const staticPages = [
    "",
    "/conception",
    "/amenagement",
    "/entretien",
    "/blog",
    "/realisations",
    "/contact",
    "/faq",
    "/a-propos",
  ];

  const now = new Date();

  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency:
      path === "" || path === "/blog" || path === "/realisations"
        ? ("weekly" as const)
        : ("monthly" as const),
    priority:
      path === ""
        ? 1
        : path === "/contact"
          ? 0.9
          : path === "/blog" || path === "/realisations"
            ? 0.85
            : 0.8,
  }));

  const contentEntries = documents.map((document) => ({
    url: `${BASE_URL}/${document._type === "article" ? "blog" : "realisations"}/${document.slug}`,
    lastModified: new Date(document._updatedAt),
    changeFrequency: document._type === "article" ? "yearly" as const : "monthly" as const,
    priority: document._type === "article" ? 0.72 : 0.78,
  }));

  const cityEntries = cityPages.map((cityPage) => ({
    url: `${BASE_URL}/${cityPage.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.74,
  }));

  return [...staticEntries, ...contentEntries, ...cityEntries];
}
