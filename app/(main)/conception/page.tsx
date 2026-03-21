import {
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { getFaq } from "@/lib/sanity/queries";
import type { Faq } from "@/lib/sanity/types";
import { services } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Conception de jardin écologique à Vallet — Permapaysage",
  description:
    "Conception de jardin écologique à Vallet: diagnostic du terrain, plan paysager sur mesure et approche permaculture.",
  path: "/conception",
  keywords: [
    "conception jardin Vallet",
    "plan paysager Vallet",
    "paysagiste conception Clisson",
    "jardin permaculture Loire-Atlantique",
  ],
});

const pricingOffers = [
  {
    title: "Visite conseil",
    features: [
      "1 diagnostic pour comprendre votre jardin",
      "1h d'échanges sur l'entretien, les plantes, l'aménagement...",
      "Des propositions concrètes et inspirantes",
    ],
    price: "150 € TTC",
    cta: "Réserver ma visite conseil",
    href: "/contact?objet=visite-conseil",
    highlighted: false,
  },
  {
    title: "Votre jardin de rêve",
    features: [
      "Tout de l'offre Visite conseil",
      "1 plan paysager 2D",
      "1 plan de plantation",
      "La possibilité de modifier le projet",
    ],
    price: "À partir de 1 000 €",
    cta: "Démarrer mon projet",
    href: "/contact?objet=conception",
    highlighted: true,
  },
  {
    title: "Étude complète",
    features: [
      "Tout de l'offre Votre jardin de rêve",
      "Livret d'accompagnement de A à Z pour réaliser vous-même votre projet",
    ],
    price: "À partir de 2 500 €",
    cta: "Demander un devis",
    href: "/contact?objet=conception",
    highlighted: false,
  },
];

export default async function ConceptionPage() {
  const service = services.find((item) => item.slug === "conception");

  if (!service) {
    notFound();
  }

  const sanityFaqs: Faq[] = await getFaq("conception");
  const faqItems = sanityFaqs.map((f) => ({ question: f.question, answer: f.reponse }));

  const schemas = [
    buildWebPageSchema({
      title: "Conception de jardin écologique à Vallet — Permapaysage",
      description:
        "Conception de jardin écologique à Vallet: diagnostic du terrain, plan paysager sur mesure et approche permaculture.",
      path: "/conception",
    }),
    buildLocalBusinessSchema("/conception"),
    buildServiceSchema({
      name: service.title,
      description: service.longDescription,
      path: "/conception",
      serviceType: "Conception de jardin",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Conception", path: "/conception" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      {/* ── BLOC 1 : HERO ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                Conception
              </div>
              <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
                Conception de jardins écologiques
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Spécialiste de l&apos;aménagement paysager dans le Vignoble Nantais (44), nous créons votre jardin sur mesure. Alliez esthétique et biodiversité grâce à des solutions durables inspirées de la permaculture pour valoriser votre extérieur en Loire-Atlantique.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact?objet=visite-conseil"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
                >
                  Je veux des conseils
                  <ArrowRightIcon size={18} weight="bold" />
                </Link>
                <Link
                  href="/contact?objet=conception"
                  className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white/40 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60"
                >
                  Mon jardin sur mesure
                </Link>
              </div>
            </div>
            <div className="animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/photos-entretien/apres/ap-03.jpg"
                  alt="Conception de jardin écologique par Permapaysage"
                  width={1024}
                  height={768}
                  className="aspect-4/3 w-full rounded-xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── BLOC 2 : OFFRES TARIFAIRES ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Nos offres</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Choisissez la formule adaptée à votre projet
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricingOffers.map((offer, idx) => (
              <Reveal key={offer.title} delay={idx * 100}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl border-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    offer.highlighted
                      ? "border-primary bg-white shadow-xl"
                      : "border-border bg-card"
                  }`}
                >
                  {offer.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                      Populaire
                    </span>
                  )}
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  <ul className="mt-6 flex-1 space-y-3">
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <CheckCircleIcon size={18} weight="fill" className="mt-0.5 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <p className="text-2xl font-bold text-primary">{offer.price}</p>
                    <Link
                      href={offer.href}
                      className={`mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all hover:shadow-lg ${
                        offer.highlighted
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      {offer.cta}
                      <ArrowRightIcon size={16} weight="bold" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── BLOC 3 : NOTRE APPROCHE ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <article className="rounded-2xl border border-border bg-background p-8 md:p-10">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Notre approche</p>
                <h2 className="mt-3 text-3xl leading-tight tracking-tight">Approche</h2>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">{service.longDescription}</p>
                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm md:text-base">
                      <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={100}>
              <article className="rounded-2xl border border-border bg-background p-8 md:p-10">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Résultats</p>
                <h2 className="mt-3 text-3xl leading-tight tracking-tight">Ce que vous obtenez</h2>
                <ul className="mt-6 space-y-3">
                  {[
                    "Un plan adapté à votre mode de vie",
                    "Une vision claire des priorités par phase",
                    "Des choix végétaux et matériaux robustes",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm md:text-base">
                      <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-secondary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?objet=conception"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Parler de votre projet
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── BLOC 4 : PLANS & CROQUIS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Exemples</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">Plans & Croquis</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Quelques exemples de nos propositions d&apos;aménagement et palettes végétales.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Jardin structuré et tondu", image: "/photos-entretien/apres/ap-04.jpg" },
              { label: "Haie taillée en ligne", image: "/photos-entretien/apres/ap-02.jpg" },
              { label: "Pelouse et massifs entretenus", image: "/photos-entretien/apres/ap-08.jpg" },
            ].map((item, idx) => (
              <Reveal key={item.label} delay={idx * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image src={item.image} alt={item.label} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── BLOC 5 : FAQ CONCEPTION ── */}
      {faqItems.length > 0 && (
        <section className="bg-card py-20 md:py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
                <p className="text-muted-foreground mt-4 md:text-lg">
                  Les réponses aux questions que vous vous posez sur la conception de jardin.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto mt-10 max-w-3xl">
                <FaqAccordion items={faqItems} />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── BLOC 6 : CTA FINAL ── */}
      <CtaSection
        eyebrow="Lancer votre projet"
        title="Prêt à transformer votre extérieur ?"
        description="Discutons de votre projet d'aménagement paysager dans le vignoble nantais. Bénéficiez d'un diagnostic expert pour valider la faisabilité technique et budgétaire de votre jardin. Nous transformons vos idées en un plan d'action concret, durable et chiffré."
        ctaText="Demander mon étude personnalisée"
      />
    </>
  );
}
