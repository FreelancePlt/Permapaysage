import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildProjectSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { projects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${project.title} — Permapaysage`,
    description: project.summary,
    path: `/realisations/${project.slug}`,
    image: project.image,
    category: project.category,
    keywords: [
      "realisations paysagiste",
      project.city,
      project.category,
      project.title,
    ],
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <StructuredData
        data={[
          buildWebPageSchema({
            title: `${project.title} — Permapaysage`,
            description: project.summary,
            path: `/realisations/${project.slug}`,
          }),
          buildProjectSchema(project),
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
            { name: project.title, path: `/realisations/${project.slug}` },
          ]),
        ]}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <Image
                src={project.image}
                alt={`Vue principale du projet ${project.title}`}
                width={1200}
                height={900}
                priority
                className="aspect-4/3 w-full rounded-lg object-cover"
              />
              <div className="grid grid-cols-3 gap-3">
                {project.gallery.map((img, i) => (
                  <Image
                    key={img}
                    src={img}
                    alt={`${project.title} — vue ${i + 2}`}
                    width={400}
                    height={400}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                {project.category}
              </p>
              <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
                {project.summary}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {project.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="bg-muted/50 rounded-lg px-4 py-3"
                  >
                    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                      {h.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{h.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
              >
                Démarrer un projet similaire
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl leading-tight tracking-tight md:text-3xl">
              À propos du projet
            </h2>
            <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
              {project.description}
            </p>
          </div>
        </Container>
      </section>

      {otherProjects.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="text-2xl leading-tight tracking-tight md:text-3xl">
              Autres réalisations
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/realisations/${p.slug}`}
                  className="bg-card border-border group flex overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                >
                  <div className="w-2/5 shrink-0 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`Projet ${p.title}`}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 p-5">
                    <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                      {p.category}
                    </p>
                    <h3 className="text-lg font-semibold leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection />
    </>
  );
}
