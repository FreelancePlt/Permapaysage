import Link from "next/link";

import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { company, interventionCities } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Contactez Permapaysage — Devis gratuit paysagiste Vallet",
  description:
    "Contactez Permapaysage pour un devis gratuit: conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
  path: "/contact",
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Permapaysage",
    url: "https://www.permapaysage.com/contact",
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
                Cette maquette inclut un formulaire structure pour preparer l&apos;integration Web3Forms. Reponse cible sous 48 h.
              </p>

              <div className="bg-card border-border rounded-lg border p-6">
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Telephone</dt>
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

            <form className="bg-card border-border rounded-lg border p-6 md:p-8" action="#" method="post">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium sm:col-span-1">
                  Nom
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="border-input bg-background h-11 w-full rounded-sm border px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium sm:col-span-1">
                  Telephone
                  <input
                    type="tel"
                    name="phone"
                    placeholder="06 00 00 00 00"
                    className="border-input bg-background h-11 w-full rounded-sm border px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium sm:col-span-2">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="vous@email.fr"
                    className="border-input bg-background h-11 w-full rounded-sm border px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium sm:col-span-2">
                  Type de besoin
                  <select
                    name="projectType"
                    className="border-input bg-background h-11 w-full rounded-sm border px-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selectionnez une option
                    </option>
                    <option value="conception">Conception</option>
                    <option value="amenagement">Amenagement</option>
                    <option value="entretien">Entretien</option>
                    <option value="global">Projet complet</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium sm:col-span-2">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Decrivez votre projet"
                    className="border-input bg-background w-full rounded-sm border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
              >
                Envoyer la demande
              </button>
              <p className="text-muted-foreground mt-3 text-xs">Integration Web3Forms a brancher ensuite avec les variables d&apos;environnement.</p>
            </form>
          </div>
        </Container>
      </section>

      <section className="bg-card/50 py-14 md:py-20">
        <Container>
          <h2 className="text-3xl leading-tight tracking-tight">Zone d&apos;intervention autour de Vallet</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
            Maquette carte: integration Leaflet prevue. Couverture actuelle: 25 km autour de Vallet.
          </p>
          <div className="border-border bg-background mt-6 rounded-lg border p-4">
            <div className="from-primary/25 to-secondary/20 h-72 w-full rounded-md bg-gradient-to-br" aria-label={"Carte de la zone d'intervention"} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {interventionCities.map((city) => (
              <span key={city} className="border-border bg-background rounded-full border px-3 py-1 text-xs">
                {city}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm">
            Besoin d&apos;une verification rapide de zone ? Appelez directement le <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="text-primary font-semibold">{company.phone}</a>.
          </p>
          <p className="text-muted-foreground mt-2 text-xs">
            Le volet RGPD (cookies/consentement) sera raccorde sur la version finale avec tracking analytics.
          </p>
          <Link href="/mentions-legales" className="text-primary mt-4 inline-flex text-sm font-semibold hover:underline">
            Consulter les mentions legales
          </Link>
        </Container>
      </section>
    </>
  );
}
