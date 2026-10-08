import type { MetadataRoute } from "next";

import { company } from "@/lib/site-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Permapaysage",
    short_name: "Permapaysage",
    description: company.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#1F4A2E",
    lang: "fr-FR",
    orientation: "portrait",
    icons: [
      {
        src: "/logo.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
