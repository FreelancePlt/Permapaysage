import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
  getAbsoluteUrl,
  BASE_URL,
} from "@/lib/seo";
import { urlFor } from "@/lib/sanity/image";
import {
  getRealisationBySlug,
  getRealisationSlugs,
  getRealisations,
} from "@/lib/sanity/queries";
import type { Realisation } from "@/lib/sanity/types";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const categorieLabels: Record<string, string> = {
  conception: "Conception",
  amenagement: "Aménagement",
  terrasse: "Terrasse",
  cloture: "Clôture",
  massif: "Massif",
  entretien: "Entretien",
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: string[] = await getRealisationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;

  const realisation: Realisation | null = await getRealisationBySlug(slug);
  if (!realisation) {
    return buildPageMetadata({
      title: "Projet — Permapaysage",
      description: "Projet introuvable.",
      path: `/realisations/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${realisation.titre} — Permapaysage`,
    description: realisation.resume || realisation.description,
    path: `/realisations/${realisation.slug.current}`,
    image: realisation.images?.[0]
      ? urlFor(realisation.images[0]).width(1200).height(630).url()
      : undefined,
    category:
      categorieLabels[realisation.categorie] || realisation.categorie,
    keywords: [
      realisation.titre,
      realisation.ville || "",
      categorieLabels[realisation.categorie] || realisation.categorie,
    ].filter(Boolean),
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const realisation: Realisation | null = await getRealisationBySlug(slug);

  if (!realisation) {
    notFound();
  }

  const r = realisation;
  const mainImage = r.images?.[0];
  const galleryImages = r.images?.slice(1) || [];
  const category = categorieLabels[r.categorie] || r.categorie;

  const allRealisations: Realisation[] = await getRealisations();
  const others = allRealisations.filter(
    (other) => other.slug.current !== r.slug.current,
  );

  const schemas = [
    buildWebPageSchema({
      title: `${r.titre} — Permapaysage`,
      description: r.resume || r.description,
      path: `/realisations/${r.slug.current}`,
    }),
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${getAbsoluteUrl(`/realisations/${r.slug.current}`)}#project`,
      url: getAbsoluteUrl(`/realisations/${r.slug.current}`),
      name: r.titre,
      description: r.resume || r.description,
      image: mainImage
        ? [urlFor(mainImage).width(1200).height(900).url()]
        : [],
      about: category,
      ...(r.ville && {
        contentLocation: { "@type": "Place", name: r.ville },
      }),
      creator: { "@id": `${BASE_URL}/#organization` },
    },
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Réalisations", path: "/realisations" },
      { name: r.titre, path: `/realisations/${r.slug.current}` },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {mainImage && (
                <Image
                  src={urlFor(mainImage).width(1200).height(900).url()}
                  alt={mainImage.alt || r.titre}
                  width={1200}
                  height={900}
                  priority
                  className="aspect-4/3 w-full rounded-lg object-cover"
                />
              )}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((img, i) => (
                    <Image
                      key={img.asset._ref}
                      src={urlFor(img).width(400).height(400).url()}
                      alt={img.alt || `${r.titre} — vue ${i + 2}`}
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-24">
              <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                {category}
              </p>
              <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">
                {r.titre}
              </h1>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
                {r.resume || r.description}
              </p>

              {r.infos && r.infos.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {r.infos.map((info) => (
                    <div
                      key={info.label}
                      className="bg-muted/50 rounded-lg px-4 py-3"
                    >
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        {info.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {info.valeur}
                      </p>
                    </div>
                  ))}
                </div>
              )}

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
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl leading-tight tracking-tight md:text-3xl">
                Le projet en détail
              </h2>
              <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
                {r.description}
              </p>
            </div>
            {r.aPropos && (
              <div>
                <h2 className="text-2xl leading-tight tracking-tight md:text-3xl">
                  À propos du projet
                </h2>
                <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
                  {r.aPropos}
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="text-2xl leading-tight tracking-tight md:text-3xl">
              Autres réalisations
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug.current}
                  href={`/realisations/${other.slug.current}`}
                  className="bg-card border-border group flex overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                >
                  <div className="w-2/5 shrink-0 overflow-hidden">
                    {other.images?.[0] && (
                      <Image
                        src={urlFor(other.images[0])
                          .width(400)
                          .height(300)
                          .url()}
                        alt={other.images[0].alt || other.titre}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-2 p-5">
                    <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">
                      {categorieLabels[other.categorie] || other.categorie}
                    </p>
                    <h3 className="text-lg font-semibold leading-tight">
                      {other.titre}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {other.resume || other.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        eyebrow="Votre projet commence ici"
        title="Arrêtez de rêver du jardin des autres."
        description="Vous venez de voir ce qu'un terrain peut devenir quand on allie la force du bois, la noblesse de la pierre et le respect du vivant. Et si votre jardin était notre prochaine réussite ? Ne laissez plus les contraintes techniques ou le manque de temps freiner votre vision. Nous transformons vos doutes en un plan d'action concret."
        points={[
          "Analyse de faisabilité immédiate.",
          "Priorisation de vos besoins (vie, jeu, détente).",
          "Zéro stress : nous gérons la complexité, vous gardez le plaisir.",
        ]}
        ctaText="Je lance ma transformation avec Permapaysage →"
      />
    </>
  );
}
