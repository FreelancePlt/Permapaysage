import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { blogPosts, company } from "@/lib/site-data";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${article.title} — Permapaysage`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
    type: "article",
    category: article.category,
    publishedTime: article.publishedAt,
    modifiedTime: article.publishedAt,
    keywords: [
      `blog ${article.category.toLowerCase()}`,
      `${article.category.toLowerCase()} Vallet`,
      "conseils jardin durable",
      article.title,
    ],
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = blogPosts.find((post) => post.slug === slug);

  if (!article) {
    notFound();
  }

  const schemas = [
    buildWebPageSchema({
      title: `${article.title} — Permapaysage`,
      description: article.excerpt,
      path: `/blog/${article.slug}`,
    }),
    buildBlogPostingSchema(article),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: article.title, path: `/blog/${article.slug}` },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />
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

          <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>
              Article rédigé par {company.founder} pour {company.name}.
            </p>
          </div>
        </Container>
      </article>
    </>
  );
}
