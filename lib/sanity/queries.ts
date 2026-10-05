import { cache } from "react"
import { normalizeCmsEditorialContent } from "@/lib/editorial-content"
import { client } from "./client"
import type { EntretienFormule, SanityCityContent, SitemapDocument } from "./types"

export async function getSitemapDocuments() {
	return client.fetch<SitemapDocument[]>(
		`*[_type in ["article", "realisation"] && publie == true && defined(slug.current) && slug.current != ""] {
			_type,
			"slug": slug.current,
			_updatedAt
		}`,
		{},
		{ next: { revalidate: 60 } },
	).then(normalizeCmsEditorialContent)
}

// --- Articles ---

export async function getArticles() {
	return client.fetch(
		`*[_type == "article" && publie == true] | order(datePublication desc) {
			_id,
			titre,
			slug,
			imagePrincipale,
			resume,
			categorie,
			datePublication,
			dateModification,
			_updatedAt
		}`,
	).then(normalizeCmsEditorialContent)
}

export async function getArticleBySlug(slug: string) {
	return client.fetch(
		`*[_type == "article" && slug.current == $slug && publie == true][0] {
			_id,
			titre,
			slug,
			imagePrincipale,
			resume,
			categorie,
			contenu,
			datePublication,
			dateModification,
			_updatedAt
		}`,
		{ slug },
	).then(normalizeCmsEditorialContent)
}

export async function getArticleSlugs() {
	return client.fetch(
		`*[_type == "article" && publie == true].slug.current`,
	).then(normalizeCmsEditorialContent)
}

// --- Réalisations ---

export async function getRealisations(categorie?: string) {
	const filter = categorie
		? `&& categorie == $categorie`
		: ""
	return client.fetch(
		`*[_type == "realisation" && publie == true ${filter}] | order(dateRealisation desc) {
			_id,
			titre,
			slug,
			resume,
			description,
			aPropos,
			infos,
			categorie,
			ville,
			images,
			avant,
			apres,
			dateRealisation
		}`,
		categorie ? { categorie } : {},
	).then(normalizeCmsEditorialContent)
}

export async function getRealisationBySlug(slug: string) {
	return client.fetch(
		`*[_type == "realisation" && slug.current == $slug && publie == true][0] {
			_id,
			titre,
			slug,
			resume,
			description,
			aPropos,
			infos,
			categorie,
			ville,
			images,
			avant,
			apres,
			dateRealisation
		}`,
		{ slug },
	).then(normalizeCmsEditorialContent)
}

export async function getRealisationSlugs() {
	return client.fetch(
		`*[_type == "realisation" && publie == true].slug.current`,
	).then(normalizeCmsEditorialContent)
}

// --- FAQ ---

export async function getFaq(categorie?: string) {
	const filter = categorie
		? `&& categorie == $categorie`
		: ""
	return client.fetch(
		`*[_type == "faq" && publie == true ${filter}] | order(ordre asc) {
			_id,
			question,
			reponse,
			categorie,
			ordre
		}`,
		categorie ? { categorie } : {},
	).then(normalizeCmsEditorialContent)
}

// Optional singleton; missing or unavailable pricing never blocks the service page.
export async function getEntretienFormules(): Promise<EntretienFormule[]> {
  try {
    const content = await client.fetch<{ formules?: EntretienFormule[] } | null>(
      `*[_type == "entretienFormules" && _id == "entretien-formules" && publie == true][0] {
        formules[] { _key, nom, description, prixDepart }
      }`, {}, { next: { revalidate: 60 } },
    ).then(normalizeCmsEditorialContent)
    return Array.isArray(content?.formules) ? content.formules.slice(0, 3) : []
  } catch {
    return []
  }
}

export const getCityContent = cache(async (slug: string): Promise<SanityCityContent | null> => {
  try {
    return await client.fetch<SanityCityContent | null>(
      `*[_type == "pageVille" && slug.current == $slug && publie == true][0] {
        _id, paragrapheLocal, distanceDepuisVallet, delaiIntervention, coordonnees,
        realisations[]-> { _id, titre, slug, resume, description, categorie, ville, images, avant, apres, publie },
        avisLocal { auteur, texte, source, date }, faqLocale[] { question, reponse }
      }`, { slug }, { next: { revalidate: 60 } },
    ).then(normalizeCmsEditorialContent)
  } catch {
    return null
  }
});
