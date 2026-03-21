import {
  ArrowRightIcon,
  CompassIcon,
  LeafIcon,
  MapPinIcon,
  RecycleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { GoogleReviews } from "@/components/shared/google-reviews";
import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  BASE_URL,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
  getAbsoluteUrl,
} from "@/lib/seo";
import { cityPages, company, projects, services } from "@/lib/site-data";

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
      title: "Paysagiste à Vallet — Permapaysage",
      description: "Permapaysage intervient autour de Vallet.",
      path: `/${citySlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Paysagiste à ${cityPage.city} — Conception et aménagement | Permapaysage`,
    description: `Permapaysage, votre éco-paysagiste à ${cityPage.city} (${cityPage.distance} de Vallet). Conception, aménagement et entretien de jardins écologiques en Loire-Atlantique.`,
    path: `/${cityPage.slug}`,
    keywords: [
      `paysagiste ${cityPage.city}`,
      `amenagement jardin ${cityPage.city}`,
      `entretien jardin ${cityPage.city}`,
      `conception jardin ${cityPage.city}`,
    ],
  });
}

const serviceIcons = [CompassIcon, RecycleIcon, LeafIcon];
const serviceImages: Record<string, string> = {
  conception: "/services/conception-jardin.png",
  amenagement: "/services/entretien-espaces-verts.png",
  entretien: "/services/amenagements-exterieurs.png",
};

export default async function CitySeoPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const cityPage = cityPages.find((item) => item.slug === citySlug);

  if (!cityPage) {
    notFound();
  }

  const localProjects = projects.filter(
    (p) => p.city.toLowerCase() === cityPage.city.toLowerCase(),
  );

  const landscapingBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: company.name,
    description: `Éco-paysagiste à ${cityPage.city} — Conception, aménagement et entretien de jardins écologiques.`,
    url: getAbsoluteUrl(`/${cityPage.slug}`),
    telephone: `+33${company.phone.replace(/\s/g, "").slice(1)}`,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: "Vallet",
      postalCode: "44330",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: cityPage.city,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: String(company.reviewCount),
    },
  };

  const schemas = [
    buildWebPageSchema({
      title: `Paysagiste à ${cityPage.city} — Conception et aménagement | Permapaysage`,
      description: `Permapaysage, votre éco-paysagiste à ${cityPage.city} (${cityPage.distance} de Vallet). Conception, aménagement et entretien de jardins écologiques en Loire-Atlantique.`,
      path: `/${cityPage.slug}`,
    }),
    landscapingBusinessSchema,
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: cityPage.city, path: `/${cityPage.slug}` },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-125 w-125 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
              <MapPinIcon size={14} weight="fill" />
              {cityPage.city} · {cityPage.distance} de Vallet
            </div>
            <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
              Paysagiste à {cityPage.city} — Conception, aménagement et entretien
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {cityPage.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
              >
                Obtenir un devis gratuit
                <ArrowRightIcon size={18} weight="bold" />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white/40 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60"
              >
                Voir les réalisations
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Nos services à {cityPage.city}</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Trois expertises pour votre jardin
              </h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                De la conception à l&apos;entretien, nous intervenons à {cityPage.city} et dans tout le Vignoble Nantais.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <Reveal key={service.slug} delay={idx * 100}>
                  <Link href={`/${service.slug}`} className="group block h-full">
                    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl">
                      <div className="relative overflow-hidden bg-[#F7F5F0]">
                        <Image
                          src={serviceImages[service.slug]}
                          alt={`${service.title} à ${cityPage.city}`}
                          width={600}
                          height={400}
                          className="aspect-4/3 w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative flex flex-1 flex-col p-8">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          {Icon && <Icon size={24} weight="duotone" />}
                        </div>
                        <h3 className="text-2xl leading-tight">{service.title}</h3>
                        <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">{service.shortDescription}</p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
                          Découvrir
                          <ArrowRightIcon size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── RÉALISATIONS LOCALES ── */}
      {localProjects.length > 0 && (
        <section className="bg-card py-20 md:py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Réalisations à {cityPage.city}</p>
                <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                  Nos projets à {cityPage.city}
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {localProjects.slice(0, 3).map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 100}>
                  <Link href={`/realisations/${project.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="relative overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={900}
                          height={600}
                          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl leading-tight line-clamp-1">{project.title}</h3>
                        <p className="text-muted-foreground mt-2 flex-1 text-sm line-clamp-2">{project.summary}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                          Voir le projet
                          <ArrowRightIcon size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── AVIS CLIENTS ── */}
      <GoogleReviews />

      {/* ── ZONE D'INTERVENTION ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
                Zone d&apos;intervention
              </p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Intervention à {cityPage.city} et alentours
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <InterventionMapLazy />
              </div>
              <div className="space-y-6">
                <p className="text-base leading-relaxed md:text-lg">
                  Basés à Vallet, nous intervenons à <strong>{cityPage.city}</strong> ({cityPage.distance}) pour la conception, l&apos;aménagement et l&apos;entretien de jardins dans le Vignoble Nantais.
                </p>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Distance</p>
                      <p className="mt-1 font-semibold">{cityPage.distance} de Vallet</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Code postal</p>
                      <p className="mt-1 font-semibold">{cityPage.postalCode}</p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm italic">
                  Vous êtes plus loin ? Contactez-nous pour vérifier si nous pouvons intervenir.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Demander un devis
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA FINAL ── */}
      <CtaSection
        title={`Votre jardin à ${cityPage.city} mérite un expert. Parlons-en.`}
        description={`Échangeons sur votre projet paysager à ${cityPage.city}. Premier rendez-vous et diagnostic offerts.`}
        ctaText="Contacter Permapaysage"
      />
    </>
  );
}
