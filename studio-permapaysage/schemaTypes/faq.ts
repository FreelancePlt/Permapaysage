import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reponse',
      title: 'Réponse',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      description: 'Sur quelle page afficher cette FAQ ?',
      options: {
        list: [
          {title: 'Général', value: 'general'},
          {title: 'Conception', value: 'conception'},
          {title: 'Aménagement', value: 'amenagement'},
          {title: 'Entretien', value: 'entretien'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les questions avec un nombre plus petit s\'affichent en premier',
      initialValue: 0,
    }),
    defineField({
      name: 'publie',
      title: 'Publié',
      type: 'boolean',
      description: 'Décochez pour masquer cette question du site',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{field: 'ordre', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'categorie',
      publie: 'publie',
    },
    prepare({title, subtitle, publie}) {
      const categories: Record<string, string> = {
        general: 'Général',
        conception: 'Conception',
        amenagement: 'Aménagement',
        entretien: 'Entretien',
      }
      return {
        title: `${publie === false ? '[Masqué] ' : ''}${title}`,
        subtitle: categories[subtitle] || subtitle,
      }
    },
  },
})
