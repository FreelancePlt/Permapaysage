import { NextResponse } from "next/server";

import { BASE_URL } from "@/lib/seo";

export function GET() {
  const content = [
    "# llms.txt for permapaysage.com",
    "Site: Permapaysage",
    "Language: fr",
    `Domain: ${BASE_URL}`,
    "Description: Éco-paysagiste à Vallet, conception, aménagement et entretien de jardins durables.",
    "Primary pages:",
    "- /",
    "- /conception",
    "- /amenagement",
    "- /entretien",
    "- /realisations",
    "- /blog",
    "- /contact",
  ].join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
