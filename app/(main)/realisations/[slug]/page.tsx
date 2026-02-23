import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return buildPageMetadata({
      title: "Projet — Permapaysage",
      description: "Projet introuvable.",
      path: `/realisations/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${project.title} — Permapaysage`,
    description: project.summary,
    path: `/realisations/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{project.category}</p>
            <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">{project.title}</h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-base leading-relaxed md:text-lg">{project.summary}</p>
            <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2">
              <p className="bg-card border-border rounded-sm border px-3 py-2">Localisation: {project.city}</p>
              <p className="bg-card border-border rounded-sm border px-3 py-2">Approche: durabilite et biodiversite</p>
              <p className="bg-card border-border rounded-sm border px-3 py-2">Materiaux: nobles et robustes</p>
              <p className="bg-card border-border rounded-sm border px-3 py-2">Suivi: entretien saisonnier possible</p>
            </div>
            <Link
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
            >
              Demarrer un projet similaire
            </Link>
          </div>

          <div className="space-y-4">
            <Image
              src={project.image}
              alt={`Vue principale du projet ${project.title}`}
              width={1200}
              height={900}
              className="border-border aspect-[4/3] w-full rounded-lg border object-cover"
            />
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/project-detail-01.svg"
                alt={`Perspective detaillee du projet ${project.title}`}
                width={700}
                height={700}
                className="border-border aspect-square w-full rounded-md border object-cover"
              />
              <Image
                src="/images/project-detail-02.svg"
                alt={`Amenagement secondaire du projet ${project.title}`}
                width={700}
                height={700}
                className="border-border aspect-square w-full rounded-md border object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
