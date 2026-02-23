import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { services } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Conception de jardin ecologique a Vallet — Permapaysage",
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
        subtitle="Nous dessinons des jardins ecologiques sur mesure, utiles au quotidien et lisibles dans le temps."
        extraSectionTitle="Ce que vous obtenez"
        extraPoints={[
          "Un plan adapte a votre mode de vie",
          "Une vision claire des priorites par phase",
          "Des choix vegetaux et materiaux robustes",
        ]}
      />
    </>
  );
}
