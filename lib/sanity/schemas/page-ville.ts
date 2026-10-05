import { defineArrayMember, defineField, defineType } from "sanity";

export const pageVille = defineType({
	name: "pageVille",
	title: "Page commune",
	type: "document",
	fields: [
		defineField({ name: "ville", title: "Commune", type: "string" }),
		defineField({
			name: "slug",
			title: "URL de la page",
			type: "slug",
			description:
				"Reprendre le slug existant du site, par exemple paysagiste-vallet.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "publie",
			title: "Publié",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "paragrapheLocal",
			title: "Présentation locale",
			type: "text",
			rows: 5,
			description:
				"Uniquement les informations vérifiées du terrain, des contraintes et des usages locaux.",
		}),
		defineField({
			name: "distanceDepuisVallet",
			title: "Distance depuis Vallet",
			type: "string",
			description:
				"Facultatif. Distance vérifiée et unité, sans estimation inventée.",
		}),
		defineField({
			name: "delaiIntervention",
			title: "Délai d’intervention",
			type: "string",
			description: "Facultatif. Renseigner uniquement une information validée.",
		}),
		defineField({
			name: "coordonnees",
			title: "Centre de la carte de la commune",
			type: "geopoint",
		}),
		defineField({
			name: "realisations",
			title: "Réalisations liées à la commune",
			type: "array",
			of: [
				defineArrayMember({ type: "reference", to: [{ type: "realisation" }] }),
			],
		}),
		defineField({
			name: "avisLocal",
			title: "Témoignage local",
			type: "object",
			description:
				"Témoignage fourni avec une attribution à cette commune vérifiée ; laisser vide sinon.",
			fields: [
				defineField({ name: "auteur", title: "Auteur", type: "string" }),
				defineField({
					name: "texte",
					title: "Témoignage",
					type: "text",
					rows: 4,
				}),
				defineField({
					name: "source",
					title: "Lien source",
					type: "url",
					validation: (rule) => rule.uri({ scheme: ["https"] }),
				}),
				defineField({ name: "date", title: "Date, si connue", type: "date" }),
			],
		}),
		defineField({
			name: "faqLocale",
			title: "Questions locales",
			type: "array",
			validation: (rule) => rule.max(3),
			of: [
				defineArrayMember({
					type: "object",
					name: "questionLocale",
					fields: [
						defineField({
							name: "question",
							title: "Question",
							type: "string",
						}),
						defineField({
							name: "reponse",
							title: "Réponse vérifiée",
							type: "text",
							rows: 4,
						}),
					],
					preview: { select: { title: "question" } },
				}),
			],
		}),
	],
	preview: { select: { title: "ville", subtitle: "slug.current" } },
});
