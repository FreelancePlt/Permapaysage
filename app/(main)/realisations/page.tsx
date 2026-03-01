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
import { projects } from "@/lib/site-data";

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

export default function RealisationsPage() {
  const schemas = [
    buildWebPageSchema({
      title: "Réalisations jardin — Permapaysage",
      description:
        "Découvrez des réalisations paysagères à Vallet, Clisson et dans le Vignoble Nantais: conception, aménagement et entretien.",
      path: "/realisations",
      type: "CollectionPage",
    }),
    buildItemListSchema(
      projects.map((project) => ({
        name: project.title,
        path: `/realisations/${project.slug}`,
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
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/realisations/${project.slug}`}
                className="bg-card border-border group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
              >
                <article>
                  <div className="overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Projet ${project.title} à ${project.city}`}
                      width={900}
                      height={600}
                      className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                      {project.category}
                    </p>
                    <h2 className="text-2xl leading-tight">{project.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.summary}
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
      <CtaSection />
    </>
  );
}
