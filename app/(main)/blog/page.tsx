import { ArrowRightIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBlogIndexSchema,
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { blogPosts } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Blog — Conseils jardinage et permaculture | Permapaysage",
  description:
    "Retrouvez les conseils Permapaysage sur la conception de jardin, l'aménagement durable et l'entretien écologique.",
  path: "/blog",
  keywords: [
    "blog paysagiste",
    "conseils jardin durable",
    "blog jardin Vallet",
    "conseils amenagement exterieur",
  ],
});

export default function BlogPage() {
  const schemas = [
    buildWebPageSchema({
      title: "Blog — Conseils jardinage et permaculture | Permapaysage",
      description:
        "Retrouvez les conseils Permapaysage sur la conception de jardin, l'aménagement durable et l'entretien écologique.",
      path: "/blog",
      type: "CollectionPage",
    }),
    buildBlogIndexSchema(blogPosts),
    buildItemListSchema(
      blogPosts.map((post) => ({
        name: post.title,
        path: `/blog/${post.slug}`,
      })),
    ),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                Blog
              </div>
              <h1 className="mt-4 text-4xl leading-tight tracking-tight text-white md:text-5xl">
                Conseils jardinage et permaculture
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Des contenus pratiques pour mieux comprendre les choix de conception et d&apos;entretien de votre jardin.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      <h2 className="text-xl leading-snug">{post.title}</h2>
                      <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
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
    </>
  );
}
