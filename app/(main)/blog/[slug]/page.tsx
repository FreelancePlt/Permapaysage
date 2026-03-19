import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import {
	buildBreadcrumbSchema,
	buildPageMetadata,
	buildWebPageSchema,
} from "@/lib/seo";
import { urlFor } from "@/lib/sanity/image";
import { getArticleBySlug, getArticleSlugs } from "@/lib/sanity/queries";
import type { Article } from "@/lib/sanity/types";
import { company } from "@/lib/site-data";
import { portableTextComponents } from "@/lib/sanity/portable-text";

const CATEGORIES: Record<string, string> = {
	permaculture: "Permaculture",
	amenagement: "Aménagement",
	entretien: "Entretien",
	conseils: "Conseils jardinage",
	biodiversite: "Biodiversité",
	actualites: "Actualités",
};

type BlogArticlePageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const slugs: string[] = await getArticleSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
	const { slug } = await params;
	const article: Article | null = await getArticleBySlug(slug);

	if (!article) {
		return buildPageMetadata({
			title: "Article — Permapaysage",
			description: "Article introuvable.",
			path: `/blog/${slug}`,
			noIndex: true,
		});
	}

	const categoryLabel = CATEGORIES[article.categorie] ?? article.categorie;

	return buildPageMetadata({
		title: `${article.titre} — Permapaysage`,
		description: article.resume,
		path: `/blog/${article.slug.current}`,
		image: urlFor(article.imagePrincipale).width(1200).height(630).url(),
		type: "article",
		category: categoryLabel,
		publishedTime: article.datePublication,
		modifiedTime: article.datePublication,
		keywords: [
			`blog ${categoryLabel.toLowerCase()}`,
			`${categoryLabel.toLowerCase()} Vallet`,
			"conseils jardin durable",
			article.titre,
		],
	});
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
	const { slug } = await params;
	const article: Article | null = await getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const categoryLabel = CATEGORIES[article.categorie] ?? article.categorie;

	const schemas = [
		buildWebPageSchema({
			title: `${article.titre} — Permapaysage`,
			description: article.resume,
			path: `/blog/${article.slug.current}`,
		}),
		buildBreadcrumbSchema([
			{ name: "Accueil", path: "/" },
			{ name: "Blog", path: "/blog" },
			{ name: article.titre, path: `/blog/${article.slug.current}` },
		]),
	];

	return (
		<>
			<StructuredData data={schemas} />
			<article className="py-16 md:py-24">
				<Container className="max-w-3xl">
					<p className="text-secondary text-xs font-semibold tracking-[0.16em] uppercase">{categoryLabel}</p>
					<h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">{article.titre}</h1>
					<p className="text-muted-foreground mt-3 text-sm">
						{new Date(article.datePublication).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
					</p>

					<Image
						src={urlFor(article.imagePrincipale).width(1200).height(800).url()}
						alt={article.imagePrincipale.alt}
						width={1200}
						height={800}
						className="border-border mt-8 aspect-[16/10] w-full rounded-lg border object-cover"
					/>

					<div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
						<PortableText value={article.contenu} components={portableTextComponents} />
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
