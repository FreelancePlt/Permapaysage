import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  LeafIcon,
  PercentIcon,
  ShieldCheckIcon,
  StarIcon,
  WalletIcon,
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
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
} from "@/lib/seo";
import {
  entretienFaq,
  entretienGaranties,
  entretienPrestations,
  interventionCities,
  services,
} from "@/lib/site-data";

const avantApresGallery = [
  { title: "Taille de haie", avant: "/photos-entretien/avant/av-02.jpg", apres: "/photos-entretien/apres/ap-02.jpg" },
  { title: "Tonte complète", avant: "/photos-entretien/avant/av-04.jpg", apres: "/photos-entretien/apres/ap-04.jpg" },
  { title: "Tonte et haie", avant: "/photos-entretien/avant/av-05.jpg", apres: "/photos-entretien/apres/ap-05.jpg" },
  { title: "Remise en état du jardin", avant: "/photos-entretien/avant/av-08.jpg", apres: "/photos-entretien/apres/ap-08.jpg" },
];

const garantieIcons = [StarIcon, WalletIcon, ClockIcon];

export const metadata = buildPageMetadata({
  title: "Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage",
  description:
    "Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
  path: "/entretien",
  keywords: [
    "entretien jardin Vallet",
    "jardinier Vallet",
    "taille haie Clisson",
    "credit impot entretien jardin",
  ],
});

export default function EntretienPage() {
  const service = services.find((item) => item.slug === "entretien");

  if (!service) {
    notFound();
  }

  const schemas = [
    buildWebPageSchema({
      title: "Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage",
      description:
        "Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
      path: "/entretien",
    }),
    buildLocalBusinessSchema("/entretien"),
    buildServiceSchema({
      name: service.title,
      description: service.longDescription,
      path: "/entretien",
      serviceType: "Entretien des espaces verts",
      areaServed: "Vallet et Vignoble Nantais",
    }),
    buildFaqSchema(entretienFaq),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Entretien", path: "/entretien" },
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
                <LeafIcon size={14} weight="fill" />
                Entretien
              </div>
              <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
                {service.title}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Avec Le Jardinier du Vignoble, votre jardin reste net, vivant et cohérent tout au long de l&apos;année.
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
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                  <PercentIcon size={16} weight="bold" />
                  Crédit d&apos;impôt de 50 %
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                  <WalletIcon size={16} />
                  CB, virement, CESU, E-CESU
                </span>
              </div>
            </div>
            <div className="animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/photos-entretien/apres/ap-05.jpg"
                  alt="Jardin entretenu par Permapaysage — pelouse tondue et haies taillées"
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

      {/* ── PRESTATIONS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Nos prestations</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Un entretien complet, adapté à votre jardin
              </h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Des solutions ponctuelles ou des contrats annuels pour les particuliers de Vallet, Clisson, Gorges et tout le Sud-Loire.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entretienPrestations.map((prestation, idx) => (
              <Reveal key={prestation.title} delay={idx * 80}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <span className="absolute right-6 top-5 font-serif text-[40px] font-bold leading-none text-primary/6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <LeafIcon size={22} weight="duotone" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{prestation.title}</h3>
                  <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">{prestation.description}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={entretienPrestations.length * 80}>
              <Link
                href="/contact"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-primary p-7 transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10" />
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <ArrowRightIcon size={22} weight="bold" className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Un autre besoin ?</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                    Décrivez-nous votre projet, on trouve la solution adaptée à votre jardin.
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                  Demander un devis
                  <ArrowRightIcon size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CRÉDIT D'IMPÔT ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-3xl text-center">
              <PercentIcon size={40} weight="duotone" className="mx-auto mb-6 text-white/60" />
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Votre jardinier à moitié prix
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
                Que vous soyez imposable ou non, l&apos;État finance 50 % de l&apos;entretien de votre jardin. C&apos;est simple, automatique, et nous gérons tout pour vous.
              </p>
              <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
                  <Image src="/logos/unipros.png" alt="Membre UNIPROS" width={48} height={48} className="h-8 w-auto shrink-0" />
                  <span className="text-sm font-medium text-white/90">Membre UNIPROS</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal delay={100}>
              <article className="h-full rounded-xl border border-white/15 bg-white/10 p-8 text-left backdrop-blur-sm transition-all duration-200 hover:bg-white/14">
                <CheckCircleIcon size={28} weight="duotone" className="mb-4 text-white/60" />
                <h3 className="font-serif text-lg font-semibold text-white">Le Remboursement Annuel</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Vous réglez 100 % de la prestation par chèque, CB ou virement. L&apos;année suivante, les impôts vous déduisent ou vous remboursent 50 % de la somme.
                </p>
              </article>
            </Reveal>
            <Reveal delay={200}>
              <article className="relative h-full rounded-xl border-2 border-secondary bg-white/15 p-8 text-left backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
                <span className="absolute -top-3 right-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
                  Recommandé
                </span>
                <CheckCircleIcon size={28} weight="duotone" className="mb-4 text-secondary" />
                <h3 className="font-serif text-lg font-semibold text-white">Le Paiement Instantané Urssaf</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Ne payez que 50 % dès la facture ! Grâce à ce service gratuit de l&apos;Urssaf, l&apos;avantage fiscal est déduit en temps réel. Zéro avance de trésorerie.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3">
                <StarIcon size={18} weight="fill" className="text-yellow-400" />
                <span className="text-base font-semibold text-white lg:text-lg">
                  Pour 200 €, vous ne payez que 100 €
                </span>
              </div>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 text-sm font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  Activer mes 50 % de réduction
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── GARANTIES ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <ShieldCheckIcon size={24} weight="duotone" className="text-primary" />
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Nos engagements</p>
              </div>
              <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                Notre priorité : votre bonheur au jardin
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {entretienGaranties.map((garantie, idx) => {
              const Icon = garantieIcons[idx];
              return (
                <Reveal key={garantie.title} delay={idx * 100}>
                  <article className="group flex h-full flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {Icon && <Icon size={28} weight="duotone" />}
                    </div>
                    <h3 className="text-xl font-semibold leading-snug">{garantie.title}</h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{garantie.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── AVANT / APRÈS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Transformations</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Avant / Après</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Découvrez le résultat de nos interventions d&apos;entretien sur le terrain.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {avantApresGallery.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
                  <div className="relative flex aspect-video w-full overflow-hidden">
                    <div className="absolute left-3 top-3 z-10 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
                      Avant
                    </div>
                    <div className="relative h-full w-1/2 overflow-hidden border-r border-border">
                      <Image src={item.avant} alt={`Avant — ${item.title}`} fill className="object-cover" />
                    </div>
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Après
                    </div>
                    <div className="relative h-full w-1/2 overflow-hidden">
                      <Image src={item.apres} alt={`Après — ${item.title}`} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-y-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-white shadow-sm" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Tout ce que vous devez savoir sur nos prestations d&apos;entretien.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl">
              <FaqAccordion items={entretienFaq} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── ZONE D'INTERVENTION ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Zone d&apos;intervention</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Nos communes d&apos;intervention</h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Nous intervenons régulièrement dans ces communes du Vignoble Nantais (et jusqu&apos;à 25 km autour de Vallet).
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
              {interventionCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Link
                href="https://lejardinierduvignoble.fr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                En savoir plus sur Le Jardinier du Vignoble
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
