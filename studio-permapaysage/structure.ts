import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Permapaysage')
    .items([
      S.listItem()
        .title('Articles de blog')
        .schemaType('article')
        .child(
          S.documentTypeList('article')
            .title('Articles de blog')
            .defaultOrdering([{field: 'datePublication', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Réalisations')
        .schemaType('realisation')
        .child(
          S.documentTypeList('realisation')
            .title('Réalisations')
            .defaultOrdering([{field: 'dateRealisation', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('FAQ')
        .schemaType('faq')
        .child(
          S.documentTypeList('faq')
            .title('Questions fréquentes')
            .defaultOrdering([{field: 'ordre', direction: 'asc'}]),
        ),
    ])
