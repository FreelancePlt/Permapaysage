import Link from "next/link";

import { ContactForm } from "@/components/shared/contact-form";
import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { StructuredData } from "@/components/shared/structured-data";
import { BASE_URL, buildPageMetadata } from "@/lib/seo";
import { company, interventionCities } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Contactez Permapaysage — Devis gratuit paysagiste Vallet",
  description:
    "Contactez Permapaysage pour un devis gratuit : conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
  path: "/contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Permapaysage",
    url: `${BASE_URL}/contact`,
    about: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.phone,
      email: company.email,
    },
  };

  return (
    <>
      <StructuredData data={contactSchema} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Contact</p>
              <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Parlons de votre projet paysager</h1>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">
                Remplissez le formulaire ci-dessous ou contactez-nous directement. Nous vous répondons sous 48 heures.
              </p>

              <div className="bg-card border-border rounded-lg border p-6">
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Téléphone</dt>
                    <dd className="mt-1 font-medium">{company.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="mt-1 font-medium">{company.email}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Adresse</dt>
                    <dd className="mt-1 font-medium">{company.address}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Horaires</dt>
                    <dd className="mt-1 font-medium">{company.businessHours}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>

      <section className="bg-card/50 py-14 md:py-20">
        <Container>
          <h2 className="text-3xl leading-tight tracking-tight">Zone d&apos;intervention autour de Vallet</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
            Nous intervenons dans un rayon de 25 km autour de Vallet, au c&#339;ur du Vignoble Nantais.
          </p>
          <div className="border-border bg-background mt-6 overflow-hidden rounded-lg border">
            <InterventionMapLazy />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {interventionCities.map((city) => (
              <span key={city} className="border-border bg-background rounded-full border px-3 py-1 text-xs">
                {city}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm">
            Besoin d&apos;une vérification rapide de zone ? Appelez directement le{" "}
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-primary font-semibold">
              {company.phone}
            </a>
            .
          </p>
          <Link href="/mentions-legales" className="text-primary mt-4 inline-flex text-sm font-semibold hover:underline">
            Consulter les mentions légales
          </Link>
        </Container>
      </section>
    </>
  );
}
