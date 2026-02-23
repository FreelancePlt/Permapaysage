import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildPageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Blog — Conseils jardinage et permaculture | Permapaysage",
  description:
    "Retrouvez les conseils Permapaysage sur la conception de jardin, l'aménagement durable et l'entretien écologique.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog"
          title="Conseils jardinage et permaculture"
          description="Une base de contenus pratiques pour mieux comprendre les choix de conception et d'entretien de votre jardin."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-card border-border overflow-hidden rounded-lg border">
              <Image
                src={post.image}
                alt={`Illustration de l'article ${post.title}`}
                width={900}
                height={600}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="space-y-3 p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <span className="text-secondary font-semibold tracking-[0.14em] uppercase">{post.category}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl leading-tight">{post.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary inline-flex text-sm font-semibold hover:underline">
                  Lire l&apos;article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
