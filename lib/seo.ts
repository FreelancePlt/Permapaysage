import type { Metadata } from "next";

const baseUrl = "https://www.permapaysage.com";
const defaultOgImage = "/images/og-garden.svg";

export function getAbsoluteUrl(path: string): string {
  if (!path || path === "/") {
    return baseUrl;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
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
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: "Permapaysage - eco-paysagiste a Vallet",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}
