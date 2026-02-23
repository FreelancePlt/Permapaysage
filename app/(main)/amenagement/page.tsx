import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { services } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Amenagement paysager durable a Vallet — Permapaysage",
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
        eyebrow="Amenagement"
        subtitle="Nous realisons des exterieurs structures avec des materiaux nobles et des finitions sobres, toujours adaptes a votre terrain."
        extraSectionTitle="Types d'amenagements"
        extraPoints={[
          "Terrasses bois et circulations exterieures",
          "Clotures naturelles et limites paysageres",
          "Massifs, plantations et mise en scene vegetale",
        ]}
      />
    </>
  );
}
