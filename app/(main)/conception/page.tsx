import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { services, conceptionSteps } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Conception de jardin écologique à Vallet — Permapaysage",
  description:
    "Conception de jardin écologique à Vallet: diagnostic du terrain, plan paysager sur mesure et approche permaculture.",
  path: "/conception",
});

export default function ConceptionPage() {
  const service = services.find((item) => item.slug === "conception");

  if (!service) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Conception de jardin",
    provider: {
      "@type": "LocalBusiness",
      name: "Permapaysage",
    },
    areaServed: "Vallet et Vignoble Nantais",
  };

  return (
    <>
      <StructuredData data={schema} />
      <ServicePageSection
        service={service}
        image="/images/service-conception.svg"
        eyebrow="Conception"
        subtitle="Nous dessinons des jardins écologiques sur mesure, utiles au quotidien et lisibles dans le temps."
        extraSectionTitle="Ce que vous obtenez"
        extraPoints={[
          "Un plan adapté à votre mode de vie",
          "Une vision claire des priorités par phase",
          "Des choix végétaux et matériaux robustes",
        ]}
      />

      <section className="bg-secondary/30 py-14 md:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">Comment se déroule une conception ?</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Notre processus étape par étape pour co-construire le jardin qui vous ressemble.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {conceptionSteps.map((step, idx) => (
              <div key={idx} className="bg-background relative flex flex-col items-center rounded-lg border p-6 text-center shadow-sm">
                <div className="bg-primary text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">Plans & Croquis</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              À venir : quelques exemples de nos propositions d&apos;aménagement et palettes végétales.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-muted flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border">
                <span className="text-muted-foreground text-sm">visuel {item} à venir</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
