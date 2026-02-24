import Image from "next/image";
import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { services, amenagementTypes } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Aménagement paysager durable à Vallet — Permapaysage",
  description:
    "Aménagement paysager durable à Vallet: terrasses bois, clôtures naturelles et massifs végétalisés pensés pour durer.",
  path: "/amenagement",
});

export default function AmenagementPage() {
  const service = services.find((item) => item.slug === "amenagement");

  if (!service) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Amenagement paysager",
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
        image="/images/service-amenagement.svg"
        eyebrow="Aménagement"
        subtitle="Nous réalisons des extérieurs structurés avec des matériaux nobles et des finitions sobres, toujours adaptés à votre terrain."
        extraSectionTitle="Types d'aménagements"
        extraPoints={[
          "Terrasses bois et circulations extérieures",
          "Clôtures naturelles et limites paysagères",
          "Massifs, plantations et mise en scène végétale",
        ]}
      />

      <section className="bg-secondary/30 py-14 md:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">Nos types de réalisations</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Des aménagements durables, pensés pour s&apos;intégrer parfaitement à votre environnement.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {amenagementTypes.map((type, idx) => (
              <div key={idx} className="bg-background group overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
                <div className="bg-muted relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-xl font-medium">{type.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">Avant / Après</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Découvrez la transformation de quelques-uns de nos chantiers.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col gap-4">
                <div className="bg-muted relative flex aspect-video w-full overflow-hidden rounded-lg border">
                  <div className="bg-background/90 text-foreground absolute left-3 top-3 z-10 rounded-full px-3 py-1 font-semibold text-xs backdrop-blur-sm shadow-sm">
                    Avant
                  </div>
                  <div className="border-border bg-secondary text-secondary-foreground flex h-full w-1/2 items-center justify-center border-r text-sm">
                    Visuel {item} Avant
                  </div>

                  <div className="bg-primary text-primary-foreground absolute right-3 top-3 z-10 rounded-full px-3 py-1 font-semibold text-xs shadow-sm">
                    Après
                  </div>
                  <div className="flex h-full w-1/2 items-center justify-center text-muted-foreground text-sm">
                    Visuel {item} Après
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-lg">Chantier exemple {item}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Transformation d&apos;espace extérieur (à venir)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
