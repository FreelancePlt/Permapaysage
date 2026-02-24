import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildPageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Réalisations jardin — Permapaysage",
  description:
    "Découvrez des réalisations paysagères à Vallet, Clisson et dans le Vignoble Nantais: conception, aménagement et entretien.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
        <SectionHeading
          eyebrow="Réalisations"
          title="Projets de jardins réalisés"
          description="Une sélection de chantiers représentatifs, du premier croquis jusqu'au rendu final."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.slug} className="bg-card border-border overflow-hidden rounded-lg border">
              <Image
                src={project.image}
                alt={`Projet ${project.title} à ${project.city}`}
                width={900}
                height={600}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="space-y-3 p-5">
                <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{project.category}</p>
                <h2 className="text-2xl leading-tight">{project.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
                <Link href={`/realisations/${project.slug}`} className="text-primary inline-flex text-sm font-semibold hover:underline">
                  Voir le détail
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
      <CtaSection />
    </>
  );
}
