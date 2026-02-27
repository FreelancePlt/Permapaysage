import type { Metadata } from "next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.permapaysage.com";
const defaultOgImage = "/images/og-garden.svg";

export function getAbsoluteUrl(path: string): string {
  if (!path || path === "/") {
    return BASE_URL;
  }

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const absoluteUrl = getAbsoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
      languages: {
        fr: absoluteUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: `${BASE_URL}${defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: "Permapaysage — Éco-paysagiste à Vallet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}${defaultOgImage}`],
    },
  };
}
