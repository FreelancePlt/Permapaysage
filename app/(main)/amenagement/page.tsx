import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { services, amenagementTypes } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Aménagement paysager durable à Vallet — Permapaysage",
  description:
    "Aménagement paysager durable à Vallet: terrasses bois, clôtures naturelles et massifs végétalisés pensés pour durer.",
  path: "/amenagement",
  keywords: [
    "amenagement paysager Vallet",
    "terrasse bois Vallet",
    "massifs paysagers Clisson",
    "amenagement exterieur Vignoble Nantais",
  ],
});

export default function AmenagementPage() {
  const service = services.find((item) => item.slug === "amenagement");

  if (!service) {
    notFound();
  }

  const schemas = [
    buildWebPageSchema({
      title: "Aménagement paysager durable à Vallet — Permapaysage",
      description:
        "Aménagement paysager durable à Vallet: terrasses bois, clôtures naturelles et massifs végétalisés pensés pour durer.",
      path: "/amenagement",
    }),
    buildLocalBusinessSchema("/amenagement"),
    buildServiceSchema({
      name: service.title,
      description: service.longDescription,
      path: "/amenagement",
      serviceType: "Aménagement paysager",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Aménagement", path: "/amenagement" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <ServicePageSection
        service={service}
        image="/photos-entretien/apres/ap-09.jpg"
        eyebrow="Aménagement"
        subtitle="Nous réalisons des extérieurs structurés avec des matériaux nobles et des finitions sobres, toujours adaptés à votre terrain."
        extraSectionTitle="Types d'aménagements"
        extraPoints={[
          "Terrasses bois et circulations extérieures",
          "Clôtures naturelles et limites paysagères",
          "Massifs, plantations et mise en scène végétale",
        ]}
      />

      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Réalisations</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">Nos types de réalisations</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Des aménagements durables, pensés pour s&apos;intégrer parfaitement à votre environnement.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenagementTypes.map((type, idx) => (
              <Reveal key={type.title} delay={idx * 100}>
                <article className="group overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium">{type.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{type.description}</p>
                    <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                      Demander un devis
                      <ArrowRightIcon size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Transformations</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">Avant / Après</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Découvrez la transformation de quelques-uns de nos chantiers.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              { title: "Tonte et entretien complet", description: "Remise en état d'un jardin avec tonte, débroussaillage et nettoyage des abords.", avant: "/photos-entretien/avant/av-08.jpg", apres: "/photos-entretien/apres/ap-08.jpg" },
              { title: "Taille de haie et tonte", description: "Taille raisonnée d'une haie et tonte de la pelouse pour un rendu net et propre.", avant: "/photos-entretien/avant/av-05.jpg", apres: "/photos-entretien/apres/ap-05.jpg" },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
                  <div className="relative flex aspect-video w-full overflow-hidden">
                    <div className="absolute left-4 top-4 z-10 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
                      Avant
                    </div>
                    <div className="relative h-full w-1/2 overflow-hidden border-r border-border">
                      <Image src={item.avant} alt={`Avant — ${item.title}`} fill className="object-cover" />
                    </div>
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Après
                    </div>
                    <div className="relative h-full w-1/2 overflow-hidden">
                      <Image src={item.apres} alt={`Après — ${item.title}`} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-y-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-white shadow-sm" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-12 -translate-y-12 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium">Des matériaux sélectionnés avec soin</h3>
                  <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                    Bois certifiés, pierres locales et végétaux adaptés au climat du Vignoble Nantais. Chaque matériau est choisi pour sa durabilité et sa cohérence avec le projet.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Parler de votre projet
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
