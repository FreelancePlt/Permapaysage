import { client } from "./client"

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
			datePublication
		}`,
	)
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
			datePublication
		}`,
		{ slug },
	)
}

export async function getArticleSlugs() {
	return client.fetch(
		`*[_type == "article" && publie == true].slug.current`,
	)
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
	)
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
	)
}

export async function getRealisationSlugs() {
	return client.fetch(
		`*[_type == "realisation" && publie == true].slug.current`,
	)
}

// --- Avis ---

export async function getAvis() {
	return client.fetch(
		`*[_type == "avis" && publie == true] | order(date desc) {
			_id,
			nom,
			texte,
			note,
			date,
			serviceRendu
		}`,
	)
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
	)
}
