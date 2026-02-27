import Image from "next/image";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { StructuredData } from "@/components/shared/structured-data";
import { BASE_URL, buildPageMetadata } from "@/lib/seo";
import { blogPosts, company, metrics, processSteps, projects, services, testimonials } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien",
  description:
    "Permapaysage conçoit, aménage et entretient des jardins écologiques à Vallet, Clisson, Vertou et dans tout le Vignoble Nantais.",
  path: "/",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  image: `${BASE_URL}/images/hero-garden.svg`,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 avenue du General Heurtaux",
    postalCode: "44330",
    addressLocality: "Vallet",
    addressCountry: "FR",
  },
  areaServed: "Vignoble Nantais",
  openingHours: "Mo-Fr 08:00-19:00",
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "LocalBusiness",
    name: company.name,
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

export default function HomePage() {
  return (
    <>
      <StructuredData data={[localBusinessSchema, reviewSchema]} />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-primary/12 absolute top-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl" />
          <div className="bg-secondary/15 absolute top-24 -left-20 h-72 w-72 rounded-full blur-3xl" />
        </div>

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <p className="text-secondary text-xs font-semibold tracking-[0.2em] uppercase">Éco-paysagiste à Vallet</p>
              <h1 className="text-4xl leading-[1.08] tracking-tight md:text-6xl">
                Des jardins vivants, structurés pour durer et faciles à aimer.
              </h1>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">
                Permapaysage conçoit, aménage et entretient des extérieurs sobres, chaleureux et écologiques dans un rayon de 25 km autour de Vallet.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
                >
                  Obtenir un devis gratuit
                </Link>
                <Link
                  href="/realisations"
                  className="border-primary text-primary hover:bg-primary/10 inline-flex h-11 items-center justify-center rounded-sm border px-6 text-sm font-semibold transition-colors"
                >
                  Voir les réalisations
                </Link>
              </div>
              <div className="text-muted-foreground flex flex-wrap gap-6 text-sm">
                <p>
                  <span className="text-foreground font-semibold">{company.rating}</span> sur Google
                </p>
                <p>
                  <span className="text-foreground font-semibold">{company.reviewCount} avis</span> vérifiés
                </p>
                <p>
                  <span className="text-foreground font-semibold">{company.radius}</span>
                </p>
              </div>
            </div>

            <div className="relative animate-in fade-in zoom-in-95 duration-700">
              <div className="bg-card border-border rounded-lg border p-4 shadow-lg">
                <Image
                  src="/images/hero-garden.svg"
                  alt="Perspective maquette d'un jardin paysager écologique"
                  width={1024}
                  height={768}
                  priority
                  className="aspect-[16/11] w-full rounded-md object-cover"
                />
                <div className="mt-4 grid gap-2 text-sm md:grid-cols-3">
                  <p className="bg-background border-border rounded-sm border px-3 py-2">Conception sur mesure</p>
                  <p className="bg-background border-border rounded-sm border px-3 py-2">Matériaux durables</p>
                  <p className="bg-background border-border rounded-sm border px-3 py-2">Entretien écologique</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Trois expertises pour un jardin cohérent"
            description="De la première idée jusqu'au suivi dans le temps, chaque intervention est pensée pour la durabilité et le confort d'usage."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.slug}
                className="bg-card border-border hover:border-primary/40 hover:shadow-md rounded-lg border p-6 transition-all"
              >
                <h3 className="text-2xl leading-tight">{service.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{service.shortDescription}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {service.points.map((point) => (
                    <li key={point} className="text-muted-foreground flex items-start gap-2">
                      <span className="bg-primary mt-2 inline-block h-1.5 w-1.5 rounded-full" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/${service.slug}`} className="text-primary mt-6 inline-flex text-sm font-semibold hover:underline">
                  Découvrir le service
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-card/60 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Processus"
            title="Une méthode claire en 5 étapes"
            description="Un cadre simple pour avancer sereinement, avec une vision long terme du jardin."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="bg-background border-border rounded-md border p-5">
                <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">Étape {index + 1}</p>
                <h3 className="mt-3 text-xl leading-snug">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Chiffres"
            title="Des résultats concrets sur le terrain"
            description="Une expertise construite au fil des saisons et des projets accompagnés dans le Vignoble Nantais."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="border-border bg-card rounded-md border px-6 py-8 text-center">
                <p className="text-primary text-4xl font-semibold tracking-tight">{metric.value}</p>
                <p className="text-muted-foreground mt-2 text-sm">{metric.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-card/50 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Avis clients"
            title="Un niveau de confiance élevée"
            description="Les retours clients confirment la qualité d'exécution, l'écoute et la régularité du suivi."
            action={
              <Link href="/contact" className="text-primary text-sm font-semibold hover:underline">
                Démarrer votre projet
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.author} className="bg-background border-border rounded-md border p-6">
                <blockquote className="text-sm leading-relaxed">&ldquo;{testimonial.content}&rdquo;</blockquote>
                <figcaption className="text-muted-foreground mt-4 text-sm font-medium">{testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Des projets différents, une même exigence"
            description="Chaque jardin est pensé pour son contexte: terrain, usages et relation à la maison."
            action={
              <Link href="/realisations" className="text-primary text-sm font-semibold hover:underline">
                Toutes les réalisations
              </Link>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="bg-card border-border overflow-hidden rounded-lg border">
                <Image
                  src={project.image}
                  alt={`Projet ${project.title} à ${project.city}`}
                  width={900}
                  height={600}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-5">
                  <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{project.category}</p>
                  <h3 className="text-2xl leading-tight">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.summary}</p>
                  <Link href={`/realisations/${project.slug}`} className="text-primary inline-flex text-sm font-semibold hover:underline">
                    Voir le projet
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-card/50 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Blog"
            title="Conseils jardinage, conception et entretien"
            description="Des contenus pratiques pour entretenir un jardin esthétique, écologique et résilient."
            action={
              <Link href="/blog" className="text-primary text-sm font-semibold hover:underline">
                Tous les articles
              </Link>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-background border-border overflow-hidden rounded-lg border">
                <Image
                  src={post.image}
                  alt={`Illustration de l'article ${post.title}`}
                  width={900}
                  height={600}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="space-y-2 p-5">
                  <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{post.category}</p>
                  <h3 className="text-xl leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-primary inline-flex text-sm font-semibold hover:underline">
                    Lire l&apos;article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
