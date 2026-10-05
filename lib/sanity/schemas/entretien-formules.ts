import { defineArrayMember, defineField, defineType } from "sanity";

export const entretienFormules = defineType({
	name: "entretienFormules",
	title: "Formules d’entretien",
	type: "document",
	fields: [
		defineField({
			name: "publie",
			title: "Publié",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "formules",
			title: "Formules et tarifs indicatifs",
			type: "array",
			description:
				"Compléter deux ou trois formules validées. Les noms et prix absents restent indiqués à venir sur le site.",
			validation: (rule) => rule.max(3),
			of: [
				defineArrayMember({
					type: "object",
					name: "formuleEntretien",
					title: "Formule",
					fields: [
						defineField({
							name: "nom",
							title: "Nom de la formule",
							type: "string",
							validation: (rule) => rule.max(80),
						}),
						defineField({
							name: "description",
							title: "Prestations et fréquence",
							type: "text",
							rows: 3,
						}),
						defineField({
							name: "prixDepart",
							title: "Prix à partir de (€ avant crédit d’impôt)",
							type: "number",
							validation: (rule) => rule.min(0).precision(2),
						}),
					],
					preview: {
						select: { title: "nom" },
						prepare({ title }) {
							return { title: title || "Formule à préciser" };
						},
					},
				}),
			],
		}),
	],
	preview: {
		prepare() {
			return { title: "Formules d’entretien" };
		},
	},
});
