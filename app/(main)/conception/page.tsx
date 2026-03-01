import { EarIcon, FileTextIcon, PencilLineIcon, RulerIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
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
import { services, conceptionSteps } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Conception de jardin écologique à Vallet — Permapaysage",
  description:
    "Conception de jardin écologique à Vallet: diagnostic du terrain, plan paysager sur mesure et approche permaculture.",
  path: "/conception",
  keywords: [
    "conception jardin Vallet",
    "plan paysager Vallet",
    "paysagiste conception Clisson",
    "jardin permaculture Loire-Atlantique",
  ],
});

const stepIcons = [EarIcon, RulerIcon, PencilLineIcon, FileTextIcon];

export default function ConceptionPage() {
  const service = services.find((item) => item.slug === "conception");

  if (!service) {
    notFound();
  }

  const schemas = [
    buildWebPageSchema({
      title: "Conception de jardin écologique à Vallet — Permapaysage",
      description:
        "Conception de jardin écologique à Vallet: diagnostic du terrain, plan paysager sur mesure et approche permaculture.",
      path: "/conception",
    }),
    buildLocalBusinessSchema("/conception"),
    buildServiceSchema({
      name: service.title,
      description: service.longDescription,
      path: "/conception",
      serviceType: "Conception de jardin",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Conception", path: "/conception" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />
      <ServicePageSection
        service={service}
        image="/photos-entretien/apres/ap-03.jpg"
        eyebrow="Conception"
        subtitle="Nous dessinons des jardins écologiques sur mesure, utiles au quotidien et lisibles dans le temps. Chaque projet repose sur les principes de la permaculture et une co-construction avec vous."
        extraSectionTitle="Ce que vous obtenez"
        extraPoints={[
          "Un plan adapté à votre mode de vie",
          "Une vision claire des priorités par phase",
          "Des choix végétaux et matériaux robustes",
        ]}
      />

      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-96 w-96 -translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">Processus</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight text-white md:text-4xl">
                Comment se déroule une conception ?
              </h2>
              <p className="mt-4 text-white/70 md:text-lg">
                Notre processus étape par étape pour co-construire le jardin qui vous ressemble.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-[48px] hidden h-px bg-white/15 lg:block" aria-hidden />
            {conceptionSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <Reveal key={step.title} delay={idx * 100}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 text-white backdrop-blur-sm">
                      {Icon && <Icon size={28} weight="duotone" />}
                    </div>
                    <p className="text-xs font-bold tracking-[0.16em] uppercase text-secondary">Étape {idx + 1}</p>
                    <h3 className="mt-2 text-lg font-medium text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Exemples</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">Plans & Croquis</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Quelques exemples de nos propositions d&apos;aménagement et palettes végétales.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Jardin structuré et tondu", image: "/photos-entretien/apres/ap-04.jpg" },
              { label: "Haie taillée en ligne", image: "/photos-entretien/apres/ap-02.jpg" },
              { label: "Pelouse et massifs entretenus", image: "/photos-entretien/apres/ap-08.jpg" },
            ].map((item, idx) => (
              <Reveal key={item.label} delay={idx * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image src={item.image} alt={item.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
