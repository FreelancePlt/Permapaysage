import {defineField, defineType} from 'sanity'

export const avis = defineType({
  name: 'avis',
  title: 'Avis client',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom du client',
      type: 'string',
      description: 'Ex: "Jean Dupont"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      description: 'Le texte de l\'avis tel que laissé par le client',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'number',
      description: 'Note sur 5',
      options: {
        list: [
          {title: '5 étoiles', value: 5},
          {title: '4 étoiles', value: 4},
          {title: '3 étoiles', value: 3},
          {title: '2 étoiles', value: 2},
          {title: '1 étoile', value: 1},
        ],
      },
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'date',
      title: 'Date de l\'avis',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'serviceRendu',
      title: 'Service rendu',
      type: 'string',
      description: 'Quel service a été rendu à ce client ? (optionnel)',
      options: {
        list: [
          {title: 'Conception', value: 'conception'},
          {title: 'Aménagement', value: 'amenagement'},
          {title: 'Entretien', value: 'entretien'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'publie',
      title: 'Publié',
      type: 'boolean',
      description: 'Décochez pour masquer cet avis du site',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'texte',
      note: 'note',
      publie: 'publie',
    },
    prepare({title, subtitle, note, publie}) {
      const stars = '⭐'.repeat(note || 0)
      return {
        title: `${publie === false ? '[Masqué] ' : ''}${title}`,
        subtitle: `${stars} — ${subtitle?.substring(0, 60)}...`,
      }
    },
  },
})
