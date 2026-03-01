import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/seo";
import { blogPosts, cityPages, projects } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/conception",
    "/amenagement",
    "/entretien",
    "/blog",
    "/realisations",
    "/contact",
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

  const articleEntries = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.72,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${BASE_URL}/realisations/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const cityEntries = cityPages.map((cityPage) => ({
    url: `${BASE_URL}/${cityPage.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.74,
  }));

  return [...staticEntries, ...articleEntries, ...projectEntries, ...cityEntries];
}
