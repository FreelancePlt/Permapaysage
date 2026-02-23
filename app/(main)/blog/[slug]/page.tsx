import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildPageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site-data";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = blogPosts.find((post) => post.slug === slug);

  if (!article) {
    return buildPageMetadata({
      title: "Article — Permapaysage",
      description: "Article introuvable.",
      path: `/blog/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${article.title} — Permapaysage`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = blogPosts.find((post) => post.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Jessy Laderriere",
    },
    publisher: {
      "@type": "Organization",
      name: "Permapaysage",
    },
  };

  return (
    <>
      <StructuredData data={articleSchema} />
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{article.category}</p>
          <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">{article.title}</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")} • {article.readTime}
          </p>

          <Image
            src={article.image}
            alt={`Illustration de l'article ${article.title}`}
            width={1200}
            height={800}
            className="border-border mt-8 aspect-[16/10] w-full rounded-lg border object-cover"
          />

          <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
            {article.content.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground mb-4 text-base leading-relaxed md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </article>
    </>
  );
}
