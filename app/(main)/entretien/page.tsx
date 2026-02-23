import Link from "next/link";
import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { entretienFaq, services } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Entretien de jardin a Vallet — Credit d'impot 50 % | Permapaysage",
  description:
    "Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
  path: "/entretien",
});

export default function EntretienPage() {
  const service = services.find((item) => item.slug === "entretien");

  if (!service) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entretienFaq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={faqSchema} />

      <ServicePageSection
        service={service}
        image="/images/service-entretien.svg"
        eyebrow="Entretien"
        subtitle="Avec Le Jardinier du Vignoble, votre jardin reste net, vivant et coherent tout au long de l'annee."
        extraSectionTitle="Prestations courantes"
        extraPoints={[
          "Tonte, taille, desherbage et debroussaillage",
          "Scarification et nettoyage des allees",
          "Entretien ecologique, sans phytosanitaire",
        ]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="bg-secondary text-secondary-foreground rounded-lg p-7 md:flex md:items-end md:justify-between md:p-9">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase">Service a la personne</p>
              <h2 className="text-3xl leading-tight tracking-tight">Jusqu&apos;a 50 % de credit d&apos;impot sur l&apos;entretien</h2>
              <p className="text-sm leading-relaxed md:text-base">
                Les prestations d&apos;entretien sont eligibles selon les conditions legales en vigueur.
              </p>
            </div>
            <Link
              href="https://lejardinierduvignoble.fr"
              target="_blank"
              rel="noreferrer"
              className="bg-background text-foreground mt-6 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold md:mt-0"
            >
              Voir Le Jardinier du Vignoble
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {entretienFaq.map((faq) => (
              <article key={faq.question} className="bg-card border-border rounded-md border p-5">
                <h3 className="text-lg leading-snug">{faq.question}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
