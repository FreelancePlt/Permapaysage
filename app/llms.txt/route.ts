import { NextResponse } from "next/server";

export function GET() {
  const content = [
    "# llms.txt for permapaysage.com",
    "Site: Permapaysage",
    "Language: fr",
    "Domain: https://www.permapaysage.com",
    "Description: Eco-paysagiste a Vallet, conception, amenagement et entretien de jardins durables.",
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
