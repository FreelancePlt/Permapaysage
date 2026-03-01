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
    background_color: "#f6f1e8",
    theme_color: "#254239",
    lang: "fr-FR",
    orientation: "portrait",
    icons: [
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
