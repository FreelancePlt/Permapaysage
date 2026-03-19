import {defineField, defineType} from 'sanity'

export const realisation = defineType({
  name: 'realisation',
  title: 'Réalisation',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre du projet',
      type: 'string',
      description: 'Ex: "Terrasse bois et massifs à Clisson"',
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
      name: 'resume',
      title: 'Résumé court',
      type: 'text',
      rows: 2,
      description: 'Résumé affiché dans la liste des réalisations (1-2 phrases)',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description du projet',
      type: 'text',
      rows: 4,
      description: 'Décrivez le projet réalisé, les matériaux utilisés, les défis relevés...',
      validation: (rule) => rule.required().max(1000),
    }),
    defineField({
      name: 'aPropos',
      title: 'À propos du projet',
      type: 'text',
      rows: 4,
      description: 'Texte complémentaire sur l\'approche, la philosophie du projet',
    }),
    defineField({
      name: 'infos',
      title: 'Informations clés',
      type: 'array',
      description: 'Infos affichées en grille (ex: Surface → 350 m², Matériau → Bois local)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'valeur',
              title: 'Valeur',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'valeur'},
          },
        },
      ],
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Conception', value: 'conception'},
          {title: 'Aménagement', value: 'amenagement'},
          {title: 'Terrasse', value: 'terrasse'},
          {title: 'Clôture', value: 'cloture'},
          {title: 'Massif', value: 'massif'},
          {title: 'Entretien', value: 'entretien'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ville',
      title: 'Ville',
      type: 'string',
      description: 'Ville où le projet a été réalisé (utile pour le référencement local)',
    }),
    defineField({
      name: 'images',
      title: 'Photos du projet',
      type: 'array',
      description: 'Ajoutez les photos du projet (la première sera utilisée comme image principale)',
      of: [
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
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'avant',
      title: 'Photo avant (optionnel)',
      type: 'image',
      description: 'Photo du terrain/jardin avant les travaux',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'apres',
      title: 'Photo après (optionnel)',
      type: 'image',
      description: 'Photo du résultat final',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'dateRealisation',
      title: 'Date de réalisation',
      type: 'date',
      options: {
        dateFormat: 'MM/YYYY',
      },
    }),
    defineField({
      name: 'publie',
      title: 'Publié',
      type: 'boolean',
      description: 'Décochez pour masquer la réalisation du site sans la supprimer',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Date de réalisation (récent)',
      name: 'dateDesc',
      by: [{field: 'dateRealisation', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'ville',
      media: 'images.0',
      publie: 'publie',
    },
    prepare({title, subtitle, media, publie}) {
      return {
        title: `${publie === false ? '[Masqué] ' : ''}${title}`,
        subtitle: subtitle ? `📍 ${subtitle}` : undefined,
        media,
      }
    },
  },
})
