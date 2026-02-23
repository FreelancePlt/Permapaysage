# roadmap.md — Plan du projet Permapaysage

## Phase 1 — Setup & fondations

- [x] Init Next.js 16, Tailwind v4, shadcn/ui, TypeScript strict
- [ ] Configurer la structure de dossiers (voir claude.md)
- [ ] Setup Sanity (projet, schemas, client, types)
- [ ] Configurer dark mode (CSS variables shadcn + toggle)
- [ ] Setup `next/font` (choix typographique à valider)
- [ ] Configurer Web3Forms (formulaire de contact)
- [ ] Variables d'environnement (.env.local)

## Phase 2 — Layout global

- [ ] Header (logo, navigation, CTA "Obtenir un devis", toggle dark mode)
- [ ] Footer (navigation, coordonnées, réseaux sociaux, mentions légales)
- [ ] Navigation mobile (menu burger)
- [ ] Skip to content link
- [ ] Breadcrumbs (toutes les pages sauf accueil)

## Phase 3 — Pages principales

### Accueil
- [ ] Hero (tagline, CTA, image/vidéo)
- [ ] Section services (3 cartes : Conception, Aménagement, Entretien)
- [ ] Section processus (5 étapes)
- [ ] Section chiffres clés (compteurs animés)
- [ ] Section avis clients (carrousel, données Sanity ou Google)
- [ ] Section dernières réalisations (grille, lien vers /realisations)
- [ ] Section derniers articles blog (lien vers /blog)
- [ ] Section CTA contact

### Conception
- [ ] Hero dédié
- [ ] Description du service (approche permaculture, design sur mesure)
- [ ] Processus spécifique conception
- [ ] Galerie réalisations conception
- [ ] CTA contact

### Aménagement
- [ ] Hero dédié
- [ ] Description du service (matériaux, terrasses, clôtures, massifs)
- [ ] Types d'aménagements (sous-sections)
- [ ] Galerie réalisations aménagement
- [ ] CTA contact

### Entretien
- [ ] Hero dédié
- [ ] Description du service (lien avec Le Jardinier du Vignoble)
- [ ] Liste des prestations (tonte, taille, désherbage, etc.)
- [ ] Mention crédit d'impôt 50 %
- [ ] FAQ (données Sanity)
- [ ] CTA contact

### Blog
- [ ] Page liste (grille d'articles, pagination ou infinite scroll)
- [ ] Page article (contenu riche Sanity, table des matières, partage)
- [ ] Catégories / tags
- [ ] Articles liés

### Réalisations
- [ ] Page liste (grille filtrable par catégorie)
- [ ] Page détail (galerie photos avant/après, description, catégorie)

### Contact
- [ ] Formulaire (nom, email, téléphone, type de besoin, message)
- [ ] Intégration Web3Forms
- [ ] Carte Leaflet zone d'intervention (25 km autour de Vallet)
- [ ] Coordonnées + horaires
- [ ] Schema.org ContactPage

## Phase 4 — Pages SEO villes

- [ ] Template dynamique `/paysagiste-[ville]`
- [ ] Contenu unique par ville (pas de duplication)
- [ ] H1 avec nom de ville
- [ ] Services disponibles + distance depuis Vallet
- [ ] Schema.org LocalBusiness avec `areaServed`
- [ ] CTA contact
- [ ] Génération statique (generateStaticParams)
- [ ] Villes prioritaires : Vallet, Clisson, Le Loroux-Bottereau, Haute-Goulaine, Saint-Julien-de-Concelles, Vertou, Gorges, Le Pallet, Mouzillon, La Chapelle-Heulin

## Phase 5 — SEO & technique

- [ ] Sitemap XML (automatique)
- [ ] robots.txt
- [ ] Balises canoniques sur toutes les pages
- [ ] Metadata unique par page (title, description)
- [ ] Open Graph + Twitter Cards
- [ ] Alt sur 100 % des images
- [ ] Structure Hn vérifiée (1 seul H1/page)
- [ ] Schema.org : LocalBusiness, Service, FAQ, Article, Review
- [ ] hreflang fr
- [ ] Analytics (Vercel Analytics ou Plausible)
- [ ] llms.txt (bonus)

## Phase 6 — Sanity schemas

- [ ] Schema `article` (blog)
- [ ] Schema `realisation` (projet/galerie)
- [ ] Schema `avis` (témoignage client)
- [ ] Schema `faq` (question/réponse)
- [ ] Schema `service` (optionnel — si contenus éditables)
- [ ] Sanity Studio accessible (/studio ou externe)
- [ ] Démo client prévue à la livraison

## Phase 7 — Pages légales

- [ ] Mentions légales
- [ ] CGV
- [ ] Politique de cookies
- [ ] Bandeau cookies (consentement RGPD)

## Phase 8 — Tests & optimisation

- [ ] Lighthouse 90+ sur toutes les pages (Performance, A11y, SEO, Best Practices)
- [ ] Test responsive (mobile, tablette, desktop)
- [ ] Test dark mode complet
- [ ] Test formulaire contact (envoi réel)
- [ ] Test navigation clavier
- [ ] Contraste WCAG AA vérifié
- [ ] Core Web Vitals validés
- [ ] Vérification liens morts

## Phase 9 — Déploiement & livraison

- [ ] Déploiement Vercel (preview)
- [ ] Validation client sur preview
- [ ] Ajustements post-validation
- [ ] Pointage DNS OVH → Vercel
- [ ] SSL actif
- [ ] Indexation Google (Search Console)
- [ ] Soumission sitemap
- [ ] Démo Sanity Studio au client
- [ ] Transmission accès (GitHub, Vercel, Sanity)
- [ ] Facture solde

## Jalons

| Jalon | Description |
|---|---|
| **Signature devis** | ✅ 23/02/2026 |
| **Acompte 1/3** | ✅ 23/02/2026 |
| **Maquette / preview** | Livraison au client pour validation |
| **Acompte 2/3** | Mi-parcours |
| **Livraison finale** | Site en ligne, démo Sanity, accès transmis |
| **Solde 1/3** | À la livraison finale |
