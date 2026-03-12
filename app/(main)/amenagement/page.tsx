import {
  ArrowRightIcon,
  EarIcon,
  FileTextIcon,
  HammerIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import { company, services, testimonials } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Aménagement paysager durable à Vallet — Permapaysage",
  description:
    "Aménagement paysager durable à Vallet: terrasses bois, clôtures naturelles et massifs végétalisés pensés pour durer.",
  path: "/amenagement",
  keywords: [
    "amenagement paysager Vallet",
    "terrasse bois Vallet",
    "massifs paysagers Clisson",
    "amenagement exterieur Vignoble Nantais",
  ],
});

const parcoursSteps = [
  {
    number: "1",
    title: "Écoute & Vision",
    description:
      "Nous nous rencontrons chez vous pour comprendre votre mode de vie. Ce diagnostic précis permet de valider la faisabilité de vos envies et de vous proposer un éventail de solutions durables, parfaitement adaptées à votre terre et à votre budget.",
    icon: EarIcon,
  },
  {
    number: "2",
    title: "Co-construction & Engagement",
    description:
      "Vous recevez une étude claire et détaillée, segmentée par espace de vie pour vous garantir la totale maîtrise de votre investissement. Une fois le projet validé ensemble, nous planifions l'intervention pour transformer votre vision en réalité.",
    icon: FileTextIcon,
  },
  {
    number: "3",
    title: "Naissance & Accompagnement",
    description:
      "Nos artisans façonnent votre extérieur avec la noblesse du bois local et de la pierre. Nous restons à vos côtés pendant et après le chantier pour assurer l'évolution harmonieuse de votre jardin et votre entière satisfaction.",
    icon: HammerIcon,
  },
];

const realisationCategories = [
  {
    title: "Cheminement et bordures",
    subtitle: "Bois et métal",
    image: "/photos-entretien/apres/ap-01.jpg",
  },
  {
    title: "Clôtures et terrasses",
    subtitle: "Bois et composite",
    image: "/photos-entretien/apres/ap-09.jpg",
  },
  {
    title: "Massifs, végétalisation et mise en scène",
    subtitle: "",
    image: "/photos-entretien/apres/ap-04.jpg",
  },
];

export default function AmenagementPage() {
  const service = services.find((item) => item.slug === "amenagement");

  const schemas = [
    buildWebPageSchema({
      title: "Aménagement paysager durable à Vallet — Permapaysage",
      description:
        "Aménagement paysager durable à Vallet: terrasses bois, clôtures naturelles et massifs végétalisés pensés pour durer.",
      path: "/amenagement",
    }),
    buildLocalBusinessSchema("/amenagement"),
    buildServiceSchema({
      name: service?.title ?? "Aménagement des extérieurs",
      description:
        service?.longDescription ??
        "Terrasses, clôtures naturelles, circulations et massifs pensés pour durer.",
      path: "/amenagement",
      serviceType: "Aménagement paysager",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Aménagement", path: "/amenagement" },
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
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                Aménagement
              </div>
              <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
                Un jardin qui prend soin de vous
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Redéfinissez votre confort. Nous créons des cadres de vie
                apaisants où le bois et les végétaux dessinent un parcours
                fluide, conçu pour votre détente absolue et celle de vos
                proches.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
                >
                  Obtenir un devis
                  <ArrowRightIcon size={18} weight="bold" />
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white/40 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60"
                >
                  Voir les projets
                </Link>
              </div>
            </div>
            <div className="animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/photos-entretien/apres/ap-09.jpg"
                  alt="Aménagement paysager réalisé par Permapaysage à Vallet"
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

      {/* ── LE PARCOURS VERS VOTRE JARDIN ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
                Notre méthode
              </p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Le parcours vers votre jardin
              </h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                De l&apos;idée à la livraison, nous prenons en charge toute la
                complexité technique pour ne vous offrir que le plaisir de voir
                votre projet prendre vie.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {parcoursSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={idx * 100}>
                  <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                        {step.number}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon size={22} weight="duotone" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium">{step.title}</h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── NOS RÉALISATIONS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
                Réalisations
              </p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Nos réalisations
              </h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Des aménagements durables, pensés pour s&apos;intégrer
                parfaitement à votre environnement.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {realisationCategories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 100}>
                <Link href="/realisations" className="group block">
                  <article className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                          {cat.title}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium">{cat.title}</h3>
                      {cat.subtitle && (
                        <p className="text-muted-foreground mt-1 text-sm">
                          {cat.subtitle}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                        Voir les réalisations
                        <ArrowRightIcon
                          size={14}
                          weight="bold"
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── AVIS CLIENTS ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
                  Avis clients
                </p>
                <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                  Ils nous font confiance
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  {company.rating} de moyenne sur {company.reviewCount} avis
                  Google vérifiés.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              >
                Démarrer votre projet
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, idx) => {
              const colors = [
                { bg: "bg-primary", text: "text-white" },
                { bg: "bg-secondary", text: "text-white" },
                { bg: "bg-primary-light", text: "text-white" },
              ];
              const color = colors[idx % colors.length];
              return (
                <Reveal key={testimonial.author} delay={idx * 100}>
                  <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div
                      className="absolute -right-3 -top-3 font-serif text-7xl leading-none text-primary/10"
                      aria-hidden
                    >
                      &ldquo;
                    </div>
                    <div className="relative flex flex-1 flex-col">
                      <div className="mb-4 flex gap-0.5">
                        {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                          <StarIcon
                            key={id}
                            size={18}
                            weight="fill"
                            className="text-secondary"
                          />
                        ))}
                      </div>
                      <blockquote className="flex-1 text-sm leading-relaxed md:text-base">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold ${color.bg} ${color.text}`}
                        >
                          {testimonial.author.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold">
                          {testimonial.author}
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <Link
                href={company.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Voir tous les avis sur Google
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA FINAL ── */}
      <CtaSection
        eyebrow="Lancer votre projet"
        title="Prêt à redéfinir votre extérieur ?"
        description="Échangeons sur vos envies et les spécificités de votre terrain lors d'un premier rendez-vous à Vallet."
        ctaText="Lancer mon étude personnalisée sous 48h"
      />
    </>
  );
}
