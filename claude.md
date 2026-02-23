# claude.md — Règles du projet Permapaysage

## Projet

Refonte complète du site vitrine **permapaysage.com** pour un éco-paysagiste basé à Vallet (44). Le site remplace un Wix/Odoo existant par un site Next.js moderne, performant, optimisé SEO local, avec back-office Sanity pour l'autonomie du client.

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS v4
- **UI** : shadcn/ui
- **CMS** : Sanity (Studio embarqué ou externe)
- **Déploiement** : Vercel
- **Formulaire** : Web3Forms (même solution que Le Jardinier du Vignoble)
- **Carte** : Leaflet (zone d'intervention)
- **Analytics** : à définir (Vercel Analytics ou Plausible)
- **DNS** : OVH (pointage vers Vercel)

## Documents de référence

| Fichier | Contenu |
|---|---|
| `data.md` | Toutes les données business, textes, services, avis, chiffres clés |
| `roadmap.md` | Tâches et avancement du projet |

## Règles de code

### Qualité

- **Pas de commentaires** dans le code sauf si absolument nécessaire pour expliquer une logique complexe
- Code propre, lisible, auto-documenté via le nommage
- Composants atomiques et réutilisables
- TypeScript strict partout, aucun `any`
- Pas de `console.log` en production
- Imports organisés (React > Next > libs > composants > utils > types)

### Architecture

```
src/
├── app/                    # Pages (App Router)
│   ├── (main)/             # Layout principal
│   │   ├── page.tsx        # Accueil
│   │   ├── conception/
│   │   ├── amenagement/
│   │   ├── entretien/
│   │   ├── blog/
│   │   ├── realisations/
│   │   ├── contact/
│   │   └── [ville]/        # Pages SEO villes
│   ├── studio/             # Sanity Studio (si embarqué)
│   ├── mentions-legales/
│   ├── cgv/
│   ├── politique-cookies/
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn/ui
│   ├── sections/           # Sections de page (Hero, Services, etc.)
│   ├── layout/             # Header, Footer, Navigation
│   └── shared/             # Composants réutilisables
├── lib/
│   ├── sanity/             # Client, queries, types Sanity
│   └── utils.ts
├── styles/
│   └── globals.css
└── types/
```

### Nommage

- Composants : PascalCase (`ServiceCard.tsx`)
- Fichiers utilitaires : camelCase (`formatDate.ts`)
- CSS classes : Tailwind uniquement, pas de CSS custom sauf cas exceptionnel
- Variables d'environnement : `NEXT_PUBLIC_` pour le client, sans préfixe pour le serveur

### Performance

- Images : composant `next/image` systématique, formats WebP/AVIF
- Fonts : `next/font` (pas de Google Fonts externe)
- Lazy loading sur les sections below the fold
- Metadata API de Next.js pour toutes les pages
- Pas de JS inutile côté client (`"use client"` uniquement quand nécessaire)

## SEO — Priorité maximale

Le SEO local est l'objectif principal du site. Chaque décision technique doit servir le référencement.

### Fondamentaux obligatoires

- **Sitemap XML** généré automatiquement (`next-sitemap` ou natif Next.js)
- **robots.txt** configuré correctement
- **Balise canonique** sur chaque page
- **Metadata** unique par page (title < 60 chars, description 120-160 chars)
- **Open Graph** + **Twitter Cards** sur toutes les pages
- **Attributs alt** descriptifs sur 100 % des images
- **Structure Hn** propre : un seul H1 par page, hiérarchie logique
- **Balises hreflang** : `fr`
- **Schema.org** : LocalBusiness, Service, FAQ, Article (blog), Review
- **Google Analytics** ou équivalent
- **Fichier llms.txt** (bonus)

### Pages SEO villes

Pages dédiées par commune d'intervention. Pattern : `/paysagiste-[ville]`

Chaque page doit avoir :
- Contenu unique (pas de duplication)
- H1 avec nom de ville
- Mention de la distance depuis Vallet
- Services disponibles
- Schema.org LocalBusiness avec `areaServed`
- Lien vers le formulaire de contact

### Structure des balises title

- Accueil : `Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien`
- Conception : `Conception de jardin écologique à Vallet — Permapaysage`
- Aménagement : `Aménagement paysager durable à Vallet — Permapaysage`
- Entretien : `Entretien de jardin à Vallet — Crédit d'impôt 50 % | Permapaysage`
- Blog : `Blog — Conseils jardinage et permaculture | Permapaysage`
- Contact : `Contactez Permapaysage — Devis gratuit paysagiste Vallet`
- Ville : `Paysagiste à [Ville] — Conception et aménagement | Permapaysage`

## Dark mode / Light mode

- Thème clair par défaut
- Dark mode disponible via toggle dans le header
- Utiliser les CSS variables de shadcn/ui pour la gestion des thèmes
- Tester le contraste WCAG AA sur les deux modes
- Les images/photos doivent rester lisibles dans les deux modes

## Sanity CMS — Contenus gérables par le client

Le client (non-tech) doit pouvoir modifier en autonomie :

- Articles de blog (titre, contenu riche, image, catégorie, date)
- Réalisations (titre, description, images avant/après, catégorie)
- Avis clients (nom, texte, note, date)
- Textes éditables des pages principales (optionnel, à évaluer)
- FAQ (question + réponse)

## Accessibilité

- Contraste WCAG AA minimum
- Navigation clavier fonctionnelle
- `aria-label` sur les éléments interactifs
- `alt` sur toutes les images
- Skip to content link
- Focus visible

## Contact

- **Client** : Jessy Laderriere — permapaysage.jl@gmail.com — 07 52 62 08 18
- **Dev** : Raphaël Plassart — raphael.plassart@gmail.com — 07 69 89 28 62
