import type { PortableTextBlock } from "next-sanity"

export interface SanityImage {
	_type: "image"
	asset: {
		_ref: string
		_type: "reference"
	}
	hotspot?: {
		x: number
		y: number
		height: number
		width: number
	}
	alt: string
	legende?: string
}

export interface Article {
	_id: string
	titre: string
	slug: { current: string }
	imagePrincipale: SanityImage
	resume: string
	categorie: string
	contenu: PortableTextBlock[]
	datePublication: string
}

export interface Realisation {
	_id: string
	titre: string
	slug: { current: string }
	resume: string
	description: string
	aPropos?: string
	infos?: { label: string; valeur: string }[]
	categorie: string
	ville?: string
	images: SanityImage[]
	avant?: SanityImage
	apres?: SanityImage
	dateRealisation?: string
}

export interface Faq {
	_id: string
	question: string
	reponse: string
	categorie: string
	ordre: number
}
