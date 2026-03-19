# Sanity CMS — Documentation technique

## Accès

- **Studio intégré** : `permapaysage.com/studio` (ou `localhost:3000/studio` en dev)
- **Projet Sanity** : ID `ecfagc9w`, dataset `production`
- **Compte** : connecté via GitHub (raphael.plassart@gmail.com)

## Architecture

```
studio-permapaysage/          # Studio standalone (pour deploy indépendant si besoin)
├── schemaTypes/              # Définitions des schemas
│   ├── article.ts
│   ├── realisation.ts
│   ├── avis.ts
│   ├── faq.ts
│   └── index.ts
├── structure.ts              # Navigation personnalisée du studio
├── sanity.config.ts
└── sanity.cli.ts

lib/sanity/                   # Client Next.js
├── schemas/                  # Copie des schemas (utilisée par le studio embarqué)
│   ├── article.ts
│   ├── realisation.ts
│   ├── avis.ts
│   ├── faq.ts
│   └── index.ts
├── structure.ts              # Navigation studio embarqué
├── client.ts                 # Client Sanity (projectId, dataset, apiVersion)
├── image.ts                  # Helper urlFor() pour les images CDN
├── queries.ts                # Toutes les requêtes GROQ
├── types.ts                  # Types TypeScript (Article, Realisation, Avis, Faq)
└── portable-text.tsx         # Composants de rendu pour le contenu riche

sanity.config.ts              # Config du studio embarqué (basePath: /studio)
```

## Schemas

### Article de blog (`article`)

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| titre | string | oui | Max 100 caractères |
| slug | slug | oui | Auto-généré depuis le titre |
| imagePrincipale | image + hotspot | oui | Avec alt obligatoire |
| resume | text | oui | 2-3 phrases, max 300 caractères |
| categorie | string (liste) | oui | Permaculture, Aménagement, Entretien, Conseils jardinage, Biodiversité, Actualités |
| contenu | Portable Text | oui | Titres (h2, h3), paragraphes, citations, gras, italique, liens, images avec légendes, listes |
| datePublication | date | oui | Format DD/MM/YYYY, initialisée à aujourd'hui |
| publie | boolean | non | `true` par défaut, permet de masquer sans supprimer |

### Réalisation (`realisation`)

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| titre | string | oui | Max 100 caractères |
| slug | slug | oui | Auto-généré |
| description | text | oui | Max 500 caractères |
| categorie | string (liste) | oui | Conception, Aménagement, Terrasse, Clôture, Massif, Entretien |
| ville | string | non | Pour le SEO local |
| images | array d'images | oui | Min 1, la première = image principale |
| avant | image | non | Photo avant travaux |
| apres | image | non | Photo après travaux |
| dateRealisation | date | non | Format MM/YYYY |
| publie | boolean | non | `true` par défaut |

### Avis client (`avis`)

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| nom | string | oui | Nom du client |
| texte | text | oui | Le témoignage |
| note | number (liste) | oui | 1 à 5 étoiles, défaut 5 |
| date | date | non | Date de l'avis |
| serviceRendu | string (radio) | non | Conception, Aménagement, Entretien |
| publie | boolean | non | `true` par défaut |

### FAQ (`faq`)

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| question | string | oui | La question |
| reponse | text | oui | La réponse |
| categorie | string (liste) | oui | Général, Conception, Aménagement, Entretien |
| ordre | number | non | Tri ascendant (plus petit = affiché en premier) |
| publie | boolean | non | `true` par défaut |

## Requêtes GROQ disponibles (`lib/sanity/queries.ts`)

| Fonction | Description | Paramètres |
|---|---|---|
| `getArticles()` | Tous les articles publiés, triés par date desc | — |
| `getArticleBySlug(slug)` | Un article par son slug | `slug: string` |
| `getArticleSlugs()` | Liste des slugs (pour generateStaticParams) | — |
| `getRealisations(categorie?)` | Réalisations publiées, filtrables par catégorie | `categorie?: string` |
| `getRealisationBySlug(slug)` | Une réalisation par son slug | `slug: string` |
| `getRealisationSlugs()` | Liste des slugs | — |
| `getAvis()` | Tous les avis publiés, triés par date desc | — |
| `getFaq(categorie?)` | FAQs publiées, filtrables par catégorie, triées par ordre | `categorie?: string` |

## Pages connectées à Sanity

| Page | Source Sanity | Comportement si vide |
|---|---|---|
| `/blog` | `getArticles()` | Message "Aucun article pour le moment" |
| `/blog/[slug]` | `getArticleBySlug()` | 404 |
| `/` (section blog) | `getArticles()` (3 premiers) | Section masquée |

## Contenus pré-injectés

- **5 avis clients** réels (depuis les avis Google existants)
- **5 FAQs** couvrant les catégories Général, Conception, Aménagement, Entretien

## Commandes utiles

```bash
# Lancer le studio embarqué (via Next.js)
npm run dev
# → accéder à http://localhost:3000/studio

# Lancer le studio standalone
cd studio-permapaysage && npm run dev

# Déployer le schema vers le cloud (depuis studio-permapaysage/)
cd studio-permapaysage && ./node_modules/.bin/sanity schema deploy

# Builder le studio standalone
cd studio-permapaysage && npm run build
```

## Pour le client (Jessy)

Le studio à `/studio` permet de :
- **Créer/modifier des articles de blog** avec un éditeur visuel (titres, images, listes, citations)
- **Ajouter des réalisations** avec galerie photos et avant/après
- **Gérer les avis clients** affichés sur le site
- **Modifier les FAQ** par catégorie de service
- **Masquer du contenu** sans le supprimer via le toggle "Publié"
- Chaque contenu modifié doit être **publié** (bouton "Publish") pour apparaître sur le site
