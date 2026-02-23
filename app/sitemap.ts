import type { MetadataRoute } from "next";

import { blogPosts, cityPages, projects } from "@/lib/site-data";

const baseUrl = "https://www.permapaysage.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/conception",
    "/amenagement",
    "/entretien",
    "/blog",
    "/realisations",
    "/contact",
    "/mentions-legales",
    "/cgv",
    "/politique-cookies",
  ];

  const now = new Date();

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articleEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/realisations/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const cityEntries = cityPages.map((cityPage) => ({
    url: `${baseUrl}/${cityPage.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...projectEntries, ...cityEntries];
}
