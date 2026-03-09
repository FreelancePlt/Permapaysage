import {
  ArrowRightIcon,
  ClockIcon,
  CompassIcon,
  GlobeIcon,
  HandsClappingIcon,
  HeartIcon,
  LeafIcon,
  NavigationArrowIcon,
  PlantIcon,
  RecycleIcon,
  StarIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  BASE_URL,
  buildItemListSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildPageMetadata,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/seo";
import { blogPosts, company, metrics, projects, services, testimonials } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien",
  description:
    "Permapaysage conçoit, aménage et entretient des jardins écologiques à Vallet, Clisson, Vertou et dans tout le Vignoble Nantais.",
  path: "/",
  keywords: [
    "paysagiste Vallet",
    "amenagement jardin Vallet",
    "jardin durable Clisson",
    "entretien jardin Vertou",
  ],
});

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@id": `${BASE_URL}/#localbusiness`,
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
  author: {
    "@type": "Person",
    name: testimonials[0]?.author,
  },
  reviewBody: testimonials[0]?.content,
};

const serviceIcons = [CompassIcon, RecycleIcon, LeafIcon];
const serviceImages: Record<string, string> = {
  conception: "/services/conception-jardin.png",
  amenagement: "/services/amenagements-exterieurs.png",
  entretien: "/services/entretien-espaces-verts.png",
};
const metricIcons = [UsersIcon, PlantIcon, ClockIcon];

export default function HomePage() {
  const homepageSchemas = [
    buildWebsiteSchema(),
    buildOrganizationSchema(),
    buildLocalBusinessSchema("/"),
    buildWebPageSchema({
      title: "Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien",
      description:
        "Permapaysage conçoit, aménage et entretient des jardins écologiques à Vallet, Clisson, Vertou et dans tout le Vignoble Nantais.",
      path: "/",
    }),
    buildItemListSchema(
      services.map((service) => ({
        name: service.title,
        path: `/${service.slug}`,
      })),
    ),
    reviewSchema,
  ];

  return (
    <>
      <StructuredData data={homepageSchemas} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute top-1/2 left-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-2xl" />
        </div>

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                <LeafIcon size={14} weight="fill" />
                Éco-paysagiste à Vallet
              </div>
              <h1 className="text-4xl leading-[1.08] tracking-tight text-white md:text-6xl">
                Des jardins vivants, structurés pour durer et faciles à aimer.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Permapaysage conçoit, aménage et entretient des extérieurs sobres, chaleureux et écologiques dans un rayon de 25 km autour de Vallet.
              </p>
              <div className="flex flex-wrap items-center gap-4">
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
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Link
                  href={company.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <StarIcon size={20} weight="fill" className="text-yellow-400" />
                  <span className="text-base font-bold text-white">{company.rating}</span>
                  <span className="text-sm text-white/70">sur Google · {company.reviewCount} avis vérifiés</span>
                </Link>
                <Link
                  href="#zone-intervention"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <NavigationArrowIcon size={20} className="text-white/80" />
                  <span className="text-base font-bold text-white">25 km</span>
                  <span className="text-sm text-white/70">autour de Vallet</span>
                </Link>
              </div>
            </div>

            <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/photos-entretien/apres/ap-08.jpg"
                  alt="Jardin entretenu par Permapaysage avec pelouse tondue et terrasse bois"
                  width={1024}
                  height={768}
                  priority
                  className="aspect-4/3 w-full rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 z-10 hidden rounded-xl border border-white/20 bg-primary/90 px-5 py-3 shadow-xl backdrop-blur-md md:block">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <LeafIcon size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Approche</p>
                    <p className="text-sm font-semibold">100 % écologique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Nos services</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Trois expertises pour un jardin cohérent
              </h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                De la première idée jusqu&apos;au suivi dans le temps, chaque intervention est pensée pour la durabilité et le confort d&apos;usage.
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
                      <div className="relative overflow-hidden">
                        <Image
                          src={serviceImages[service.slug]}
                          alt={`Illustration ${service.title}`}
                          width={600}
                          height={400}
                          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

      {/* ── LES 3 PILIERS ── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">Notre philosophie</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight text-white md:text-4xl">
                Les 3 piliers de Permapaysage
              </h2>
              <p className="mt-4 text-base text-white/70 md:text-lg">
                Chaque projet s&apos;appuie sur les trois éthiques fondamentales de la permaculture.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: GlobeIcon,
                title: "Prendre soin de la terre",
                description: "Préserver les sols, favoriser la biodiversité et travailler avec les cycles naturels plutôt que contre eux.",
              },
              {
                icon: HeartIcon,
                title: "Prendre soin des hommes",
                description: "Créer des espaces de vie qui nourrissent le bien-être, la santé et le lien entre les personnes.",
              },
              {
                icon: HandsClappingIcon,
                title: "Partager équitablement",
                description: "Restituer l\u2019excédent, partager les savoirs et contribuer à un modèle plus juste et durable.",
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 120}>
                  <article className="group flex h-full flex-col items-center rounded-3xl bg-white/6 px-8 py-10 text-center ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-white transition-colors group-hover:border-white/30 group-hover:bg-white/15">
                      <Icon size={30} weight="duotone" />
                    </div>
                    <h3 className="text-xl font-semibold leading-snug text-white">{pillar.title}</h3>
                    <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/75 md:text-base">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CHIFFRES ── */}
      <section className="relative overflow-hidden bg-card py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Chiffres clés</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                Des résultats concrets sur le terrain
              </h2>
            </div>
          </Reveal>
          <div className="relative mt-14 grid gap-6 sm:grid-cols-3">
            {metrics.map((metric, idx) => {
              const Icon = metricIcons[idx];
              return (
                <Reveal key={metric.label} delay={idx * 100}>
                  <article className="group flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {Icon && <Icon size={24} weight="duotone" />}
                    </div>
                    <p className="text-4xl font-semibold tracking-tight text-primary">{metric.value}</p>
                    <p className="text-muted-foreground mt-2 text-sm">{metric.label}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── AVIS CLIENTS ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Avis clients</p>
                <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                  Ils nous font confiance
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  {company.rating} de moyenne sur {company.reviewCount} avis Google vérifiés.
                </p>
              </div>
              <Link href="/contact" className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
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
                  <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                    <div className="absolute -right-3 -top-3 font-serif text-7xl leading-none text-primary/10" aria-hidden>&ldquo;</div>
                    <div className="relative flex flex-1 flex-col">
                      <div className="mb-4 flex gap-0.5">
                        {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                          <StarIcon key={id} size={18} weight="fill" className="text-secondary" />
                        ))}
                      </div>
                      <blockquote className="flex-1 text-sm leading-relaxed md:text-base">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold ${color.bg} ${color.text}`}>
                          {testimonial.author.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold">{testimonial.author}</span>
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

      {/* ── RÉALISATIONS ── */}
      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Réalisations</p>
                <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                  Des projets différents, une même exigence
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Chaque jardin est pensé pour son contexte : terrain, usages et relation à la maison.
                </p>
              </div>
              <Link href="/realisations" className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
                Toutes les réalisations
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 100}>
                <Link href={`/realisations/${project.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`Projet ${project.title} à ${project.city}`}
                        width={900}
                        height={600}
                        className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <Link
                href="/realisations"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-primary px-8 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Découvrir les autres projets
                <ArrowRightIcon size={16} weight="bold" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── ZONE D'INTERVENTION ── */}
      <section id="zone-intervention" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Zone d&apos;intervention</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
                À votre service dans un rayon de 25 km
              </h2>
              <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Basés à Vallet, nous intervenons dans tout le Vignoble Nantais : Clisson, Vertou, Le Loroux-Bottereau, Aigrefeuille-sur-Maine et alentours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-sm">
              <InterventionMapLazy />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── BLOG ── */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Blog</p>
                <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                  Conseils jardinage et permaculture
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Des contenus pratiques pour concevoir et entretenir un jardin résilient.
                </p>
              </div>
              <Link href="/blog" className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
                Tous les articles
                <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <Reveal key={post.slug} delay={idx * 100}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={`Illustration de l'article ${post.title}`}
                        width={900}
                        height={600}
                        className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                        <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon size={13} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg leading-snug">{post.title}</h3>
                      <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                        Lire l&apos;article
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

      <CtaSection
        title="Votre jardin mérite mieux. Parlons-en."
        description="Chaque projet commence par un échange. Décrivez-nous votre terrain, vos envies et vos contraintes — on s'occupe du reste."
        ctaText="Demander un devis gratuit"
      />
    </>
  );
}
