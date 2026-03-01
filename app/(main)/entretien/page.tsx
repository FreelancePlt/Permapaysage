import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { entretienFaq, services, interventionCities } from "@/lib/site-data";

const avantApresGallery = [
  { title: "Taille de haie", avant: "/photos-entretien/avant/av-02.jpg", apres: "/photos-entretien/apres/ap-02.jpg" },
  { title: "Tonte complète", avant: "/photos-entretien/avant/av-04.jpg", apres: "/photos-entretien/apres/ap-04.jpg" },
  { title: "Tonte et haie", avant: "/photos-entretien/avant/av-05.jpg", apres: "/photos-entretien/apres/ap-05.jpg" },
  { title: "Remise en état du jardin", avant: "/photos-entretien/avant/av-08.jpg", apres: "/photos-entretien/apres/ap-08.jpg" },
];

export const metadata = buildPageMetadata({
  title: "Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage",
  description:
    "Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
  path: "/entretien",
  keywords: [
    "entretien jardin Vallet",
    "jardinier Vallet",
    "taille haie Clisson",
    "credit impot entretien jardin",
  ],
});

export default function EntretienPage() {
  const service = services.find((item) => item.slug === "entretien");

  if (!service) {
    notFound();
  }

  const schemas = [
    buildWebPageSchema({
      title: "Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage",
      description:
        "Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
      path: "/entretien",
    }),
    buildLocalBusinessSchema("/entretien"),
    buildServiceSchema({
      name: service.title,
      description: service.longDescription,
      path: "/entretien",
      serviceType: "Entretien des espaces verts",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildFaqSchema(entretienFaq),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Entretien", path: "/entretien" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      <ServicePageSection
        service={service}
        image="/photos-entretien/apres/ap-05.jpg"
        eyebrow="Entretien"
        subtitle="Avec Le Jardinier du Vignoble, votre jardin reste net, vivant et cohérent tout au long de l'année."
        extraSectionTitle="Prestations courantes"
        extraPoints={[
          "Tonte, taille, désherbage et débroussaillage",
          "Scarification et nettoyage des allées",
          "Entretien écologique, sans phytosanitaire",
        ]}
      />

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 shadow-xl md:flex md:items-center md:justify-between md:p-12">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  Avantage fiscal
                </div>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  Jusqu&apos;à 50 % de crédit d&apos;impôt sur l&apos;entretien
                </h2>
                <p className="text-sm leading-relaxed text-white/80 md:text-base">
                  Les prestations d&apos;entretien courant sont éligibles selon les conditions légales en vigueur
                  (service à la personne réalisé via Le Jardinier du Vignoble).
                </p>
              </div>
              <div className="relative z-10 mt-8 shrink-0 md:ml-8 md:mt-0">
                <Link
                  href="https://lejardinierduvignoble.fr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  Le Jardinier du Vignoble
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 md:mt-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Transformations</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Avant / Après</h2>
                <p className="text-muted-foreground mt-4 md:text-lg">
                  Découvrez le résultat de nos interventions d&apos;entretien sur le terrain.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {avantApresGallery.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 100}>
                  <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
                    <div className="relative flex aspect-video w-full overflow-hidden">
                      <div className="absolute left-3 top-3 z-10 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
                        Avant
                      </div>
                      <div className="relative h-full w-1/2 overflow-hidden border-r border-border">
                        <Image src={item.avant} alt={`Avant — ${item.title}`} fill className="object-cover" />
                      </div>
                      <div className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        Après
                      </div>
                      <div className="relative h-full w-1/2 overflow-hidden">
                        <Image src={item.apres} alt={`Après — ${item.title}`} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-y-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-white shadow-sm" />
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm font-medium">{item.title}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
                <p className="text-muted-foreground mt-4 md:text-lg">
                  Tout ce que vous devez savoir sur nos prestations d&apos;entretien.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto mt-10 max-w-3xl">
                <FaqAccordion items={entretienFaq} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-card py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Zone d&apos;intervention</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Nos communes d&apos;intervention</h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Nous intervenons régulièrement dans ces communes du Vignoble Nantais (et jusqu&apos;à 25 km autour de Vallet).
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
              {interventionCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Link
                href="https://lejardinierduvignoble.fr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                En savoir plus sur Le Jardinier du Vignoble
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
