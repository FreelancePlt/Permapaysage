import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { cityPages, services } from "@/lib/site-data";

type CityPageProps = {
  params: Promise<{ citySlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPages.map((cityPage) => ({ citySlug: cityPage.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const { citySlug } = await params;
  const cityPage = cityPages.find((item) => item.slug === citySlug);

  if (!cityPage) {
    return buildPageMetadata({
      title: "Paysagiste a Vallet — Permapaysage",
      description: "Permapaysage intervient autour de Vallet.",
      path: `/${citySlug}`,
    });
  }

  return buildPageMetadata({
    title: `Paysagiste a ${cityPage.city} — Conception et amenagement | Permapaysage`,
    description: `${cityPage.intro} Services: conception, amenagement et entretien des exterieurs.`,
    path: `/${cityPage.slug}`,
  });
}

export default async function CitySeoPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const cityPage = cityPages.find((item) => item.slug === citySlug);

  if (!cityPage) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Permapaysage",
    areaServed: cityPage.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vallet",
      postalCode: "44330",
      addressCountry: "FR",
    },
    url: `https://www.permapaysage.com/${cityPage.slug}`,
  };

  return (
    <>
      <StructuredData data={schema} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl space-y-5">
            <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Page locale</p>
            <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Paysagiste a {cityPage.city}</h1>
            <p className="text-muted-foreground text-base leading-relaxed md:text-lg">{cityPage.intro}</p>
            <div className="bg-card border-border rounded-md border p-5 text-sm">
              <p>
                Distance depuis Vallet: <span className="text-foreground font-semibold">{cityPage.distance}</span>
              </p>
              <p className="text-muted-foreground mt-2">Intervention sur rendez-vous, du lundi au vendredi.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.slug} className="bg-card border-border rounded-md border p-5">
                <h2 className="text-xl leading-tight">{service.title}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{service.shortDescription}</p>
                <Link href={`/${service.slug}`} className="text-primary mt-4 inline-flex text-sm font-semibold hover:underline">
                  Voir le service
                </Link>
              </article>
            ))}
          </div>

          <div className="bg-primary text-primary-foreground mt-12 rounded-lg p-7 md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl leading-tight">Un projet de jardin a {cityPage.city} ?</h2>
              <p className="mt-2 text-sm text-primary-foreground/90">Demandez un devis gratuit avec un retour rapide.</p>
            </div>
            <Link
              href="/contact"
              className="bg-background text-foreground mt-5 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold md:mt-0"
            >
              Contacter Permapaysage
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
