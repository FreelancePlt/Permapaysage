import {defineField, defineType} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'Cliquez sur "Generate" pour créer automatiquement l\'URL à partir du titre',
      options: {
        source: 'titre',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagePrincipale',
      title: 'Image principale',
      type: 'image',
      description: 'L\'image affichée en haut de l\'article et dans la liste du blog',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Décrivez l\'image en quelques mots (important pour le référencement)',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resume',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      description: 'Court résumé affiché dans la liste des articles (2-3 phrases)',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Permaculture', value: 'permaculture'},
          {title: 'Aménagement', value: 'amenagement'},
          {title: 'Entretien', value: 'entretien'},
          {title: 'Conseils jardinage', value: 'conseils'},
          {title: 'Biodiversité', value: 'biodiversite'},
          {title: 'Actualités', value: 'actualites'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contenu',
      title: 'Contenu de l\'article',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Titre de section', value: 'h2'},
            {title: 'Sous-titre', value: 'h3'},
            {title: 'Citation', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Gras', value: 'strong'},
              {title: 'Italique', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Lien',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                ],
              },
            ],
          },
          lists: [
            {title: 'Liste à puces', value: 'bullet'},
            {title: 'Liste numérotée', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: 'Décrivez l\'image en quelques mots',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'legende',
              title: 'Légende',
              type: 'string',
              description: 'Texte affiché sous l\'image (optionnel)',
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'datePublication',
      title: 'Date de publication',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publie',
      title: 'Publié',
      type: 'boolean',
      description: 'Décochez pour masquer l\'article du site sans le supprimer',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'dateDesc',
      by: [{field: 'datePublication', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'categorie',
      media: 'imagePrincipale',
      publie: 'publie',
    },
    prepare({title, subtitle, media, publie}) {
      const categories: Record<string, string> = {
        permaculture: 'Permaculture',
        amenagement: 'Aménagement',
        entretien: 'Entretien',
        conseils: 'Conseils jardinage',
        biodiversite: 'Biodiversité',
        actualites: 'Actualités',
      }
      return {
        title: `${publie === false ? '[Brouillon] ' : ''}${title}`,
        subtitle: categories[subtitle] || subtitle,
        media,
      }
    },
  },
})
