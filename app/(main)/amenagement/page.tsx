import {
  ArrowRightIcon,
  ArrowsOutCardinalIcon,
  EarIcon,
  FileTextIcon,
  GridFourIcon,
  HammerIcon,
  PlantIcon,
  SquareIcon,
  StarIcon,
  TreeEvergreenIcon,
  WallIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { GoogleReviews } from "@/components/shared/google-reviews";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import { ZoneIntervention } from "@/components/shared/zone-intervention";
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

export const revalidate = 60;

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

const solutions = [
  {
    title: "Bordure",
    description:
      "Délimitez vos espaces avec précision pour faciliter l'entretien. Nous utilisons des matériaux nobles et durables (pierre locale, bois, acier) pour structurer vos massifs sans plastique.",
    icon: SquareIcon,
  },
  {
    title: "Cheminement",
    description:
      "Optimisez vos accès avec des revêtements drainants et naturels. Nous concevons des circulations fluides qui respectent la perméabilité de vos sols et le cycle de l'eau.",
    icon: ArrowsOutCardinalIcon,
  },
  {
    title: "Clôture",
    description:
      "Sécurisez votre intimité avec des structures robustes en bois local (Douglas, Chêne) ou minéral. Une protection durable et esthétique, sans traitement chimique pour votre jardin.",
    icon: WallIcon,
  },
  {
    title: "Gazon",
    description:
      "Implantation de pelouses rustiques ou prairies fleuries. Nous sélectionnons des mélanges de semences résistants à la sécheresse pour limiter vos factures d'eau et la fréquence de tonte.",
    icon: PlantIcon,
  },
  {
    title: "Terrasse",
    description:
      "Créez un espace de vie extérieur en bois régional. Conception technique sur-mesure privilégiant la longévité des matériaux et une intégration parfaite au relief de votre terrain.",
    icon: GridFourIcon,
  },
  {
    title: "Végétalisation",
    description:
      "Composition de massifs résilients et mellifères. Nous privilégions des essences indigènes du climat océanique pour garantir une croissance saine et une biodiversité active sans intrants.",
    icon: TreeEvergreenIcon,
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

export default async function AmenagementPage() {
  const service = services.find((item) => item.slug === "amenagement");

  const sanityFaqs: Faq[] = await getFaq("amenagement");
  const faqItems = sanityFaqs.map((f) => ({ question: f.question, answer: f.reponse }));

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

      {/* ── BLOC 1 : HERO ── */}
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
                  href="/contact?objet=amenagement"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
                >
                  Embellir mon jardin
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

      {/* ── BLOC 2 : NOS SOLUTIONS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
                Nos solutions
              </p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Des aménagements pensés pour durer
              </h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Chaque intervention est réalisée avec des matériaux nobles et des techniques respectueuses de votre environnement.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, idx) => {
              const Icon = solution.icon;
              return (
                <Reveal key={solution.title} delay={idx * 80}>
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon size={24} weight="duotone" />
                    </div>
                    <h3 className="text-lg font-semibold">{solution.title}</h3>
                    <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── BLOC 3 : LE PARCOURS VERS VOTRE JARDIN ── */}
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

      {/* ── BLOC 4 : AVIS CLIENTS GOOGLE ── */}
      <GoogleReviews />

      {/* ── BLOC 5 : ZONE D'INTERVENTION ── */}
      <ZoneIntervention texte="Nous intervenons dans un rayon de 25 km autour de Vallet pour l'aménagement paysager de vos extérieurs dans le Vignoble Nantais." />

      {/* ── BLOC 6 : NOS RÉALISATIONS ── */}
      <section className="bg-card py-20 md:py-28">
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
                  <article className="overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20">
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

      {/* ── BLOC 7 : FAQ AMÉNAGEMENT ── */}
      {faqItems.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
                <p className="text-muted-foreground mt-4 md:text-lg">
                  Les réponses aux questions que vous vous posez sur l&apos;aménagement paysager.
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

      {/* ── BLOC 8 : CTA FINAL ── */}
      <CtaSection
        eyebrow="Lancer votre projet"
        title="Prêt à redéfinir votre extérieur ?"
        description="Échangeons sur vos envies et les spécificités de votre terrain lors d'un premier rendez-vous à Vallet."
        ctaText="Lancer mon étude personnalisée sous 48h"
      />
    </>
  );
}
