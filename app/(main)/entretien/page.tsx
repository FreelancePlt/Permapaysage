import Link from "next/link";
import { notFound } from "next/navigation";

import { ServicePageSection } from "@/components/sections/service-page";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { entretienFaq, services, interventionCities } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage",
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
        subtitle="Avec Le Jardinier du Vignoble, votre jardin reste net, vivant et cohérent tout au long de l'année."
        extraSectionTitle="Prestations courantes"
        extraPoints={[
          "Tonte, taille, désherbage et débroussaillage",
          "Scarification et nettoyage des allées",
          "Entretien écologique, sans phytosanitaire",
        ]}
      />

      <section className="py-14 md:py-20">
        <Container>
          {/* Crédit d'impôt - Highlighted Block */}
          <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-2xl p-8 shadow-lg md:flex md:items-center md:justify-between md:p-12">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="bg-primary-foreground/20 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                Avantage fiscal
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Jusqu&apos;à 50 % de crédit d&apos;impôt sur l&apos;entretien
              </h2>
              <p className="text-primary-foreground/90 text-sm leading-relaxed md:text-base">
                Les prestations d&apos;entretien courant sont éligibles selon les conditions légales en vigueur
                (service à la personne réalisé via Le Jardinier du Vignoble).
              </p>
            </div>
            <div className="relative z-10 mt-8 shrink-0 md:ml-8 md:mt-0">
              <Link
                href="https://lejardinierduvignoble.fr"
                target="_blank"
                rel="noreferrer"
                className="bg-background text-primary hover:bg-background/90 shadow-sm inline-flex h-12 shrink-0 items-center justify-center rounded-md px-8 text-base font-semibold transition-colors"
              >
                Voir Le Jardinier du Vignoble
              </Link>
            </div>
            {/* Decorative background shape */}
            <div className="bg-primary-foreground/10 absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-24">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {entretienFaq.map((faq) => (
                <article key={faq.question} className="bg-card border-border rounded-xl border p-6 shadow-sm">
                  <h3 className="text-lg font-medium leading-snug">{faq.question}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Communes d'intervention */}
      <section className="bg-secondary/30 py-14 md:py-20 border-t border-border">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Nos communes d&apos;intervention</h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Nous intervenons régulièrement dans ces communes du Vignoble Nantais (et jusqu&apos;à 25 km autour de Vallet).
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {interventionCities.map((city) => (
              <span
                key={city}
                className="bg-background border-border text-foreground hover:bg-muted inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
