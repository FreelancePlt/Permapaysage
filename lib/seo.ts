import type { Metadata } from "next";

import { type BlogPost, company, type Project } from "@/lib/site-data";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.permapaysage.com";
export const SITE_NAME = company.name;
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const DEFAULT_KEYWORDS = [
  "Permapaysage",
  "paysagiste Vallet",
  "eco paysagiste Vallet",
  "paysagiste Vignoble Nantais",
  "conception jardin",
  "amenagement paysager",
  "entretien jardin",
  "jardin ecologique",
  "permaculture Vallet",
];

type MetadataType = "website" | "article";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: MetadataType;
  category?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type WebPageSchemaInput = {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage";
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string | string[];
};

function dedupeKeywords(keywords: string[] = []) {
  return [...new Set([...DEFAULT_KEYWORDS, ...keywords])];
}

function buildRobotsMetadata(noIndex = false): NonNullable<Metadata["robots"]> {
  return {
    index: !noIndex,
    follow: true,
    nocache: noIndex,
    googleBot: {
      index: !noIndex,
      follow: true,
      noimageindex: noIndex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function buildImageObject(imagePath: string, alt: string) {
  return {
    url: getAbsoluteUrl(imagePath),
    width: 1200,
    height: 630,
    alt,
  };
}

export function getAbsoluteUrl(path: string): string {
  if (!path || path === "/") {
    return BASE_URL;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE_PATH,
  type = "website",
  category = "Jardin et paysagisme",
  noIndex = false,
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const absoluteUrl = getAbsoluteUrl(path);
  const imageObject = buildImageObject(image, title);
  const sharedKeywords = dedupeKeywords(keywords);

  return {
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: company.founder, url: BASE_URL }],
    creator: company.founder,
    publisher: company.legalName,
    category,
    keywords: sharedKeywords,
    referrer: "strict-origin-when-cross-origin",
    alternates: {
      canonical: absoluteUrl,
      languages: {
        "fr-FR": absoluteUrl,
        "x-default": absoluteUrl,
      },
    },
    robots: buildRobotsMetadata(noIndex),
    openGraph: {
      type,
      locale: "fr_FR",
      url: absoluteUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [imageObject],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [company.founder],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: `@${company.instagram.split("/").pop()}`,
      images: [imageObject.url],
    },
    other: {
      "geo.region": "FR-44",
      "geo.placename": company.city,
      "business:contact_data:locality": company.city,
      "business:contact_data:postal_code": company.postalCode,
      "business:contact_data:country_name": "France",
    },
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  type = "WebPage",
}: WebPageSchemaInput) {
  const absoluteUrl = getAbsoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name: title,
    description,
    inLanguage: "fr-FR",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: "fr-FR",
    description: company.description,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: company.legalName,
    alternateName: SITE_NAME,
    url: BASE_URL,
    logo: getAbsoluteUrl("/Logo.png"),
    email: company.email,
    telephone: company.phone,
    sameAs: company.sameAs,
    founder: {
      "@type": "Person",
      name: company.founder,
    },
  };
}

export function buildLocalBusinessSchema(path = "/", areaServed?: string | string[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: company.legalName,
    description: company.description,
    url: getAbsoluteUrl(path),
    image: getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH),
    logo: getAbsoluteUrl("/Logo.png"),
    telephone: company.phone,
    email: company.email,
    priceRange: "$$",
    areaServed: areaServed ?? "Vignoble Nantais",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.rating.replace(",", ".").replace("/5", ""),
      reviewCount: company.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: company.sameAs,
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
  areaServed = "Vignoble Nantais",
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    areaServed,
    url: getAbsoluteUrl(path),
    provider: {
      "@id": `${BASE_URL}/#localbusiness`,
    },
  };
}

export function buildFaqSchema(
  items: Array<{
    question: string;
    answer: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema(post: BlogPost) {
  const articleUrl = getAbsoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    mainEntityOfPage: articleUrl,
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "fr-FR",
    image: [getAbsoluteUrl(post.image)],
    wordCount: post.content.join(" ").split(/\s+/).filter(Boolean).length,
    author: {
      "@type": "Person",
      name: company.founder,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

export function buildBlogIndexSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/blog#blog`,
    url: getAbsoluteUrl("/blog"),
    name: "Blog Permapaysage",
    description:
      "Conseils de conception, d'aménagement paysager durable et d'entretien écologique autour de Vallet.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      image: getAbsoluteUrl(post.image),
    })),
  };
}

export function buildItemListSchema(
  items: Array<{
    name: string;
    path: string;
  }>,
  itemListOrder = "https://schema.org/ItemListOrderAscending",
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: getAbsoluteUrl(item.path),
    })),
  };
}

export function buildProjectSchema(project: Project) {
  const projectUrl = getAbsoluteUrl(`/realisations/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#project`,
    url: projectUrl,
    name: project.title,
    description: project.summary,
    image: [getAbsoluteUrl(project.image)],
    about: project.category,
    contentLocation: {
      "@type": "Place",
      name: project.city,
    },
    creator: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}
