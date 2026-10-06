import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { urlFor } from "@/lib/sanity/image";
import { getRealisations } from "@/lib/sanity/queries";
import type { Realisation } from "@/lib/sanity/types";

export const metadata = buildPageMetadata({
  title: "Réalisations jardin — Permapaysage",
  description:
    "Découvrez des réalisations paysagères à Vallet, Clisson et dans le Vignoble Nantais: conception, aménagement et entretien.",
  path: "/realisations",
  keywords: [
    "realisations paysagiste Vallet",
    "projets jardin Clisson",
    "amenagement exterieur avant apres",
    "portfolio paysagiste Vignoble Nantais",
  ],
});

const categorieLabels: Record<string, string> = {
  conception: "Conception",
  amenagement: "Aménagement",
  terrasse: "Terrasse",
  cloture: "Clôture",
  massif: "Massif",
  entretien: "Entretien",
};

export const revalidate = 60;

export default async function RealisationsPage() {
  const realisations: Realisation[] = await getRealisations();

  const items = realisations.map((r) => ({
    slug: r.slug.current,
    title: r.titre,
    category: categorieLabels[r.categorie] || r.categorie,
    city: r.ville || "",
    summary: r.resume || r.description,
    image: r.images?.[0]
      ? urlFor(r.images[0]).width(900).height(600).url()
      : "/placeholder.jpg",
    imageAlt: r.images?.[0]?.alt || r.titre,
  }));

  const schemas = [
    buildWebPageSchema({
      title: "Réalisations jardin — Permapaysage",
      description:
        "Découvrez des réalisations paysagères à Vallet, Clisson et dans le Vignoble Nantais: conception, aménagement et entretien.",
      path: "/realisations",
      type: "CollectionPage",
    }),
    buildItemListSchema(
      items.map((item) => ({
        name: item.title,
        path: `/realisations/${item.slug}`,
      })),
    ),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Réalisations", path: "/realisations" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Projets de jardins réalisés"
            description="Une sélection de chantiers représentatifs, du premier croquis jusqu'au rendu final."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/realisations/${item.slug}`}
                className="bg-card border-border group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
              >
                <article>
                  <div className="overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={900}
                      height={600}
                      className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                      {item.category}
                    </p>
                    <h2 className="text-2xl leading-tight">{item.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.summary}
                    </p>
                    <span className="text-primary inline-flex items-center gap-1 text-sm font-semibold">
                      Voir le détail
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection
        eyebrow="Votre projet commence ici"
        title="Arrêtez de rêver du jardin des autres."
        description="Vous venez de voir ce qu'un terrain peut devenir quand on allie la force du bois, la noblesse de la pierre et le respect du vivant. Et si votre jardin était notre prochaine réussite ? Ne laissez plus les contraintes techniques ou le manque de temps freiner votre vision. Nous transformons vos doutes en un plan d'action concret."
        points={[
          "Analyse de faisabilité immédiate.",
          "Priorisation de vos besoins (vie, jeu, détente).",
          "Zéro stress : nous gérons la complexité, vous gardez le plaisir.",
        ]}
        ctaText="Je lance ma transformation avec Permapaysage"
      />
    </>
  );
}
