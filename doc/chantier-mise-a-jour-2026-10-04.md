# Chantier de mise à jour Permapaysage

Préparation du 4 octobre 2026 ; bilan local actualisé le 5 octobre 2026. Source complète : [brief du client](brief-mise-a-jour-2026-10-04.md). Le brief prévaut sur les anciennes consignes et les anciennes données de `claude.md` et `doc/`.

## État actuel du chantier local

Les étapes techniques 0 à 12 sont terminées localement et leurs recettes sont détaillées ci-dessous. Le bilan et l’audit final des routes ont été vérifiés. Les contenus manquants, clés et réglages externes restent listés à la fin de ce document ; ils ne sont pas présentés comme validés. Tout le travail de cette suite est local : aucun staging, commit, push, déploiement ou écriture de contenu dans Sanity.

Les comptes rendus initiaux et le plan ci-dessous conservent le contexte historique. La consigne actuelle de l’utilisateur de ne pas stage/commit/push prévaut sur leurs anciennes mentions de commits. Les 24 fichiers déjà modifiés avant la refonte ont été préservés ; les listes de chaque lot comparent leurs propres baselines, plutôt que le diff global contre HEAD.

## État initial constaté avant implémentation

- Branche : `mise-a-jour-permapaysage-fr`, créée depuis `main` au commit `e2af080` et renommée à la demande du développeur.
- Dépôt propre avant préparation. Cette préparation ajoute uniquement le brief et ce plan.
- `npm run build` : réussi, TypeScript compris, 39 pages générées. Trois articles et six réalisations Sanity apparaissent dans la sortie du build.
- `npm run lint` : échec préexistant, 5 erreurs et 1 344 avertissements. Deux erreurs concernent les effets React de `CookieBanner.tsx:30` et `contact-form.tsx:44`. Trois erreurs concernent le bundle généré sous `studio-permapaysage/dist/`, actuellement parcouru par ESLint.
- Environnement : Node 26.10.0, npm 12.2.0. Next installé : 16.1.6 ; manifeste et verrou demandent `^16.2.1`. Reconstituer les dépendances depuis le verrou avant le premier lot et revalider.
- Instructions RTK consultées dans `/home/raphael/.claude/RTK.md`. Aucun exécutable `rtk` trouvé dans le PATH ni aux emplacements usuels vérifiés.
- Aucune étape fonctionnelle n'était réalisée lors de cet état initial. Aucun déploiement effectué.

## Remise au vert réalisée le 4 octobre 2026

Les contrôles qualité passent désormais. L'étape 1 du brief est également terminée côté code ; son compte rendu suit ci-dessous.

- Dépendances réinstallées depuis le verrou avec `npm ci --include=dev` : ce shell a `NODE_ENV=production`, donc `npm ci` seul omet ESLint et le plugin PostCSS nécessaires au développement et au build.
- Next.js installé : 16.2.1 ; React : 19.2.4. ESLint aligné sur `^9.39.5`, avec verrou mis à jour : la version 10.1.0 déclenchait une exception dans `react/display-name` après réinstallation. Les quatre plugins React, hooks, accessibilité et imports livrés par `eslint-config-next@16.2.1` déclarent une compatibilité jusqu'à ESLint 9. Cette compatibilité devra être réexaminée lors d'une future mise à jour coordonnée des outils ; npm signale déjà ESLint 9 comme déprécié.
- Seul l'artefact généré `studio-permapaysage/dist/**` a été ajouté aux exclusions ESLint. Les règles React et le lint des sources du Studio restent actifs.
- Bandeau cookies : lecture du cookie par `useSyncExternalStore`, snapshot serveur indéfini pour préserver l'hydratation, notification du changement lors d'un choix. Suppression du double état et du cast forcé. Cookie, durée et consentement GA4 conservés.
- Formulaire : présélection initiale à partir de l'URL, mise à jour conditionnelle lorsque `objet` change, conservation des autres champs et des choix manuels lors d'un changement de paramètre sans rapport avec le besoin.
- Avertissements supprimés : imports inutilisés, export anonyme de configuration du Studio, chargement du script GA4 via `next/script` après hydratation. Initialisation de la file GA4 et consentement par défaut toujours dans l'en-tête.

Références React consultées : [abonnement à un store externe et rendu serveur](https://react.dev/reference/react/useSyncExternalStore), [ajustement conditionnel d'état lors d'un changement d'entrée](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).

### Contrôles effectués

- `npm run lint -- --max-warnings=0` : réussi, aucune erreur et aucun avertissement.
- `npm run build` : réussi avec Next.js 16.2.1, vérification TypeScript et génération de 39 pages.
- Nouvelle installation propre depuis le verrou final avec `npm ci --include=dev`, suivie du lint et du build : réussie. Périmètre ESLint vérifié : bundles générés exclus, sources des schémas du Studio toujours contrôlées.
- Chromium 153, application servie par `next start` : acceptation/refus des cookies, durée 395 jours et attributs, persistance après rechargement, consentement analytics accordé/refusé et consentement inconnu.
- Formulaire : cinq valeurs existantes de `objet`, paramètre absent/inconnu, changements d'URL sans rechargement, conservation du nom/message et des choix manuels, absence de boucle et d'erreur d'hydratation.
- Web3Forms intercepté localement : contenu du payload, succès, retour au formulaire vierge, erreur, conservation de la saisie et possibilité de réessayer. Aucun email réellement envoyé ; la réception sera vérifiée lors de la recette du formulaire.
- `git diff --check` : réussi.

Fichiers de ce lot : `package.json`, `package-lock.json`, `eslint.config.mjs`, `studio-permapaysage/eslint.config.mjs`, `components/shared/CookieBanner.tsx`, `components/shared/contact-form.tsx`, `app/layout.tsx`, `app/(main)/[citySlug]/page.tsx`, `app/(main)/amenagement/page.tsx`, `app/(main)/conception/page.tsx`, `components/layout/footer.tsx`, et les deux documents de préparation. Aucun contenu client supplémentaire requis pour terminer ce lot.

## Étape 1 réalisée le 4 octobre 2026

- Domaine par défaut et `.env.example` sur `https://www.permapaysage.fr`, base normalisée sans slash final. Canonical, OG, JSON-LD et robots suivent la base partagée. Nom d'expéditeur Web3Forms corrigé, ainsi que `llms.txt` et documentation active. Les mentions historiques de l'ancien domaine dans le brief copié et les données ont été reformulées sans URL obsolète, en conservant le sens des demandes de redirection.
- Sitemap asynchrone alimenté par une requête GROQ unique, typée et limitée aux slugs publiés des articles/réalisations et à leur `_updatedAt`. Cette projection dédiée évite de récupérer images et textes complets. Cache de la requête et régénération du sitemap à 60 secondes. FAQ ajoutée, dix pages villes existantes conservées, `/merci` absent. Les quatre nouvelles villes restent prévues à l'étape 9 et `/a-propos` à l'étape 5.
- Carte : URL standard HTTPS des tuiles OSM, attribution « © OpenStreetMap · contributeurs » visible et liée à la licence. Chargement Leaflet différé conservé.
- Réalisations : `SectionHeading` peut rendre un H1, sans changer son H2 par défaut ailleurs. H1 exact « Nos réalisations de jardins dans le Vignoble Nantais ».
- ALT des cartes projets de l'accueil : reprise du titre existant, sans ajouter une deuxième fois la commune.
- Nouveau helper `cityLocation` pour à/au/aux. Utilisé par le gabarit ville, ses métadonnées, contenus, ALT et JSON-LD, ainsi que les liens du footer et le fil d'Ariane. Le fil d'Ariane reprend les vrais noms des communes, avec accents et traits d'union.

### Vérifications de l'étape 1

- `npm run lint -- --max-warnings=0`, `npm run build`, TypeScript et `git diff --check` : réussis.
- Sitemap : 27 URL officielles, dont 3 articles et 6 réalisations correspondant exactement à une lecture indépendante des publications Sanity, 10 villes et `/faq`. Les deux anciens articles inexistants sont absents, ainsi que `/merci`. Dates `_updatedAt` vérifiées et intervalle de régénération de 60 secondes confirmé dans le manifeste Next.
- Les 27 URL du sitemap répondent HTTP 200 en local ; canonical et `og:url` correspondent à leur URL officielle `.fr`.
- Robots, `llms.txt`, images OG de l'accueil et identifiants JSON-LD vérifiés sur `.fr`. Aucune occurrence de l'ancien domaine dans les fichiers texte suivis par Git.
- Helper communes : neuf cas validés, dont Le Pallet, Le Loroux-Bottereau, Le Landreau, Les Sorinières, accents et espaces.
- Chromium : H1, title, description, fil d'Ariane visible et JSON-LD, footer, contenus et ALT vérifiés sur les pages Pallet/Loroux. H1 unique des réalisations et ALT Clisson sans doublon vérifiés.
- Vraies tuiles OSM chargées et attribution visible à 1 440 px et 390 px ; captures inspectées après apparition de la section. Aucun appel CARTO, aucune erreur JavaScript ni erreur d'hydratation détectée.

### Redirections Vercel : action manuelle confirmée

Contrôle public effectué sur `/entretien`, ainsi que sur des variantes avec `?objet=visite` :

| Origine | Comportement observé | Action |
|---|---|---|
| HTTPS `www.permapaysage.fr` | Page servie par Vercel, HTTP 200 | Domaine principal à conserver. |
| HTTPS `permapaysage.fr` | HTTP 307 vers le domaine principal | Remplacer par une redirection permanente 301 ou 308. |
| HTTPS ancien domaine en .com sans www | HTTP 307 vers le domaine principal | Remplacer par une redirection permanente 301 ou 308. |
| HTTPS ancien domaine en .com avec www | HTTP 301 vers le domaine principal | Déjà permanent ; vérifier après publication. |
| HTTP des quatre hôtes | HTTP 308 vers HTTPS du même hôte | HTTPS déjà forcé ; le passage suivant doit également être permanent. |

Les chemins et paramètres contrôlés sont conservés. Ces redirections proviennent de la plateforme, avant le code de l'application ; aucune configuration locale ni outil de gestion Vercel connecté n'est disponible pour changer leur statut. Dans **Project Settings > Domains**, modifier les deux redirections 307 pour cibler `www.permapaysage.fr` en permanent. Vérifier également `NEXT_PUBLIC_SITE_URL=https://www.permapaysage.fr` dans l'environnement de production, puis republier avec les changements du code.

Références officielles consultées : [sitemap Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [politique des tuiles OSM](https://operations.osmfoundation.org/policies/tiles/), [redirections de domaines Vercel](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

Fichiers de l'étape 1 : `.env.example`, `lib/seo.ts`, `lib/cities.ts`, `lib/sanity/queries.ts`, `lib/sanity/types.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/(main)/page.tsx`, `app/(main)/realisations/page.tsx`, `app/(main)/[citySlug]/page.tsx`, `components/shared/section-heading.tsx`, `components/shared/intervention-map.tsx`, `components/shared/contact-form.tsx`, `components/layout/footer.tsx`, `components/layout/breadcrumbs.tsx`, `claude.md`, `doc/data.md`, `doc/sanity.md`, `doc/articles-sanity.md`, `doc/brief-mise-a-jour-2026-10-04.md`, et ce journal. Aucun nouveau `TODO CONTENU` pour cette étape.

## Phase 0 : découverte et modèles disponibles

| Sujet | Référence locale | Constat et modèle à reprendre |
|---|---|---|
| SEO partagé | `lib/seo.ts:5`, `app/layout.tsx:24`, `app/robots.ts` | `BASE_URL`, `getAbsoluteUrl`, `buildPageMetadata`, `buildFaqSchema` et constructeurs JSON-LD déjà présents. Le domaine par défaut est encore en `.com`. |
| Sitemap | `app/sitemap.ts` | Liste statique, articles et réalisations issus de `site-data.ts`, contrairement aux pages détaillées qui interrogent Sanity. FAQ absente. |
| Articles et projets | `lib/sanity/queries.ts:5`, `:19`, `:35`, `:43`, `:67`, `:88` | Reprendre `getArticles`, `getArticleBySlug`, `getArticleSlugs`, `getRealisations`, `getRealisationBySlug`, `getRealisationSlugs`. Ces requêtes filtrent `publie == true`. Typer les résultats et projeter `_updatedAt` lorsque nécessaire. |
| FAQ | `lib/sanity/queries.ts:96`, `lib/sanity/types.ts:46` | `getFaq(categorie?)`, `FaqAccordion` et `buildFaqSchema` disponibles. Les trois services ont déjà une FAQ conditionnelle. |
| Modèles Sanity | `lib/sanity/schemas/index.ts`, `studio-permapaysage/schemaTypes/index.ts` | Deux jeux de schémas, avec `article`, `realisation`, `faq` seulement. Répercuter les ajouts dans les deux Studios. Aucun schéma de page ville. |
| Pages villes | `lib/site-data.ts:586`, `app/(main)/[citySlug]/page.tsx:30` | `CityPage`, tableau `cityPages`, `generateStaticParams`, `dynamicParams = false`. Dix communes, données et projets associés actuellement statiques. |
| Formulaire | `components/shared/contact-form.tsx:25`, `:36`, `:54` | Web3Forms via `fetch`, champs sérialisés en JSON, `useSearchParams`. L'option `visite-conseil` ne correspond pas au futur `objet=visite`. Confirmation sur place aujourd'hui. |
| GA4 | `app/layout.tsx`, `components/shared/GoogleAnalytics.tsx`, `types/gtag.d.ts` | GA4 déjà configuré, avec consentement cookies. Réutiliser `window.gtag` et le mécanisme de consentement ; centraliser les événements. |
| Carte | `components/shared/intervention-map.tsx:57`, `intervention-map-lazy.tsx` | CARTO, attribution désactivée. Leaflet est déjà importé avec `next/dynamic` et `ssr: false`. |
| Avant/après | `components/shared/before-after-slider.tsx:97` | Comparateur avec événements pointeur, rôle slider et clavier. Réutiliser puis vérifier au doigt, au clavier et avec un lecteur d'écran. |
| Hero et animations | `components/shared/hero-carousel.tsx`, `reveal.tsx`, `app/globals.css:87` | Carrousel automatique toutes les 5,5 s ; apparition de 0,7 s. La classe centrale de révélation ne contient pas de flou : vérifier les autres effets avant suppression. |
| Boutons et mobile | `components/ui/button.tsx`, `components/layout/header.tsx:124`, `floating-call-button.tsx` | Bouton générique Base UI avec variantes `cva`. CTA majoritairement écrits en liens séparés. Appel flottant mobile déjà présent, masqué sur Contact. |
| Avis | `components/shared/google-reviews.tsx`, `lib/site-data.ts` | Avis statiques et compteur 32. Cal.com et Google Places ne sont pas intégrés. |
| Médias et polices | `public/`, `app/layout.tsx:2` | Logo PNG de 76 Ko ; polices déjà via `next/font`. Les cinq fichiers hero demandés sont absents de `public/` et de la pièce jointe reçue. |

API autorisées à ce stade : fonctions locales ci-dessus, composants existants, `client.fetch` du client Sanity, helpers SEO et `next/dynamic` déjà utilisés. `doc/sanity.md` décrit un modèle avis et une fonction `getAvis()` qui n'existent pas dans le code : ne pas reprendre ces exemples périmés. Avant toute nouvelle intégration, lire les documentations officielles Cal.com, Google Places New, Next.js pour le cache et OSM pour les tuiles. Consigner les signatures et événements réellement documentés dans le lot concerné.

## Premier travail prévu

### Préparation technique avant l'étape 1

1. Aligner les dépendances locales sur `package-lock.json` avec `npm ci` ; garder le verrou comme référence.
2. Exclure le dossier généré `studio-permapaysage/dist/**` dans la configuration ESLint, sur le modèle de `globalIgnores` déjà utilisé.
3. Corriger les initialisations d'état du bandeau cookies et de la présélection du formulaire en conservant le consentement et le comportement des paramètres URL.
4. Repasser lint et build, vérifier acceptation/refus des cookies et présélection de chaque besoin.

Garde-fous : conserver les règles React ; exclure seulement les artefacts générés ; préserver SSR et hydratation. Livraison locale conformément à la consigne actuelle : aucun staging, commit ni push.

### Étape 1 : corrections techniques prioritaires

1. **Domaine** : mettre `.fr` dans `BASE_URL`, `.env.example`, `llms.txt` et la documentation active. Vérifier que l'environnement Vercel n'impose pas encore une ancienne URL.
2. **Redirections** : préparer une configuration permanente dans Vercel conservant chemin et paramètres, pour les deux domaines `.com`, le `.fr` sans www et HTTP. La gestion effective des domaines dans Vercel reste à vérifier. Cette voie permet aussi de supprimer toutes les occurrences `.com` du code.
3. **Sitemap** : le rendre asynchrone et reprendre `getArticles` et `getRealisations`, déjà utilisés par leurs pages, plutôt que les anciennes listes statiques. Ajouter `/faq`, garder les dix villes existantes ; les quatre autres arriveront à l'étape 9. Ajouter `/a-propos` à l'étape 5. `/merci` restera absent.
4. **Carte** : reprendre `TileLayer` et le chargement différé existants, remplacer CARTO par OSM et réactiver une attribution visible.
5. **Réalisations** : permettre à `SectionHeading` de rendre un H1 sur cette page, avec le texte exact du brief. Le composant produit actuellement un H2.
6. **ALT** : corriger `app/(main)/page.tsx:258`, qui ajoute la ville après un titre contenant déjà « à Clisson ». Le détail Sanity ne rajoute pas actuellement la ville.
7. **Communes** : ajouter un helper partagé à/au/aux et reprendre les noms du tableau des communes dans les H1, métadonnées, ALT, liens et fil d'Ariane, plutôt que reconstituer les noms depuis les slugs.

Fichiers principaux : `lib/seo.ts`, `lib/site-data.ts`, futur helper des communes, `.env.example`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, `app/(main)/page.tsx`, `app/(main)/realisations/page.tsx`, `app/(main)/[citySlug]/page.tsx`, `components/shared/section-heading.tsx`, `intervention-map.tsx`, `components/layout/footer.tsx`, `breadcrumbs.tsx`, documentation active.

Vérification : lint et build ; sitemap avec les trois articles et six projets réellement publiés au moment du contrôle ; absence des deux faux articles ; `/faq` présent ; canonical/OG/robots/JSON-LD sur `.fr` ; un H1 sur `/realisations` ; carte lisible et attribuée ; ALT sans doublon ; « au Pallet », « au Loroux-Bottereau », « au Landreau ». Contrôler aussi les liens internes existants.

Garde-fous : conserver les slugs, ne pas inventer une configuration de domaines non inspectée, ne pas remplacer les titres et ALT Sanity renseignés par le client, ne pas ajouter au sitemap une page qui n'existe pas encore. Livraison locale conformément à la consigne actuelle : aucun staging, commit ni push.

## Plan de référence des lots, dans l’ordre du brief

À chaque étape : documenter les fichiers modifiés, passer lint strict, TypeScript et build, effectuer les contrôles ciblés puis livrer le résultat local sans staging, commit ni push. Le tableau conserve le plan de référence ; les comptes rendus et l’état actuel précisent ce qui a réellement été réalisé et les adaptations nécessaires.

| Étape | Livrable et références à reprendre | Vérifications et garde-fous |
|---|---|---|
| 2. En-tête, CTA, animations | Tokens dans `app/globals.css`, CTA métier réutilisable à partir de `components/ui/button.tsx` et `cva`, variantes par fond. Reprendre Header, Footer, `CtaSection`, appels flottants, Reveal et pages existantes. | Hauteur 52 px, texte 17 px, terracotta/ocre/contour, téléphone international, CTA mobile, safe area, consentement non masqué. Animation 0,3 s désactivée sur mobile et mouvement réduit. Les contrôles du carrousel et liens de navigation gardent leurs libellés utiles. |
| 3. Cal.com et GA4 | Embed officiel différé au clic ; événement de confirmation documenté ; helper d'événements reposant sur GA4 existant. Liens visite vers `/contact?objet=visite` et correspondance de présélection corrigée dans ContactForm. | Chaque emplacement émet le bon clic, aucun double événement. Tester fermeture, focus et réservation ; vérifier la confirmation avec l'événement réellement documenté, sans supposer sa signature. Pas de chargement Cal.com initial lourd ni second GA4. |
| 4. Hero | Reprendre `HeroCarousel` et le hero de `app/(main)/page.tsx`. Textes et ALT exacts du brief, navigation manuelle et swipe. Préparer un contrat de données des avis raccordable à l'étape 6. | Première photo prioritaire, quatre suivantes lazy, responsive, aucun timer automatique. Ne pas attribuer les noms des photos attendues à des photos existantes sans correspondance vérifiée. Placeholder propre si contenu absent. |
| 5. Accueil | Réorganiser les sections ; reprendre GoogleReviews, FaqAccordion, comparateur et CTA. Nouvelle page `/a-propos`, navigation et sitemap. Paires disponibles depuis les réalisations si vérifiées. | Ordre exact, entretien en premier, avis lisibles sur place, logos et quatre chiffres existants, un lien global vers toutes les réalisations. N'afficher dans FAQPage que des réponses réelles visibles ; les contenus non fournis restent des TODO. Contrat des avis raccordé à l'étape 6. |
| 6. Avis Google | Types/parseur `lib/google-reviews.ts` et loader serveur `lib/google-review-summary.ts`, clé privée dans `.env.example`, alimentation hero/confiance/JSON-LD. Adaptation du cache demandé aux règles Places : fetch `no-store`, sans cache persistant des notes/avis ; React dédoublonne seulement pendant le rendu. Sources et justification dans le compte rendu de l’étape 6. | Succès, absence de clé, erreur API, données incomplètes, attribution, lien Google, tri des trois avis disponibles les plus récents. Repli 5,0/37 sans faux avis détaillés. Ne pas promettre une persistance interinstances avec une simple variable mémoire ; vérifier l’absence de reprise d’une ancienne réponse ou de cache persistant. |
| 7. Contact et merci | Reprendre le flux Web3Forms existant, ajouter les champs et obligations du brief, Cal.com et horaires, nouvelle page `/merci` noindex avec événement. | Paramètres URL, validation, payload contenant tous les champs, erreurs, confirmation puis redirection, événement sans double déclenchement. `/merci` exclu du sitemap et de l'indexation ; contrôler les visiteurs arrivant directement et les rechargements. |
| 8. Entretien | Formules éditables via Sanity dans les deux jeux de schémas ; calculateur léger ; avis Val Gasc déjà dans `site-data.ts` ; comparateur existant ; H2 jardinier. | Prix absents correctement signalés, euros et saisie au clavier, preuve locale vérifiée. Vérifier les références fiscales officielles avant rédaction des conditions et liens ; aucune formule, aucun tarif ni avis inventé. |
| 9. Services et villes | Reprendre FAQ et `buildFaqSchema` sur les trois services ; date réelle de mise à jour. Nouveau schéma ville facultatif dans les deux Studios, queries/types et gabarit existant, projets depuis Sanity, carte paramétrable. | Quatorze pages, H1 et FAQ locaux, matching normalisé des communes, fallback correct si CMS vide, contenu local à compléter, sitemap et `generateStaticParams` cohérents. Pas de distances ni de délais inventés. |
| 10. SEO et données structurées | Reprendre helpers `lib/seo.ts`, LocalBusiness global et schéma ville ; avis serveur communs, areaServed/GeoCircle/catalogue ; BlogPosting sur les vrais articles Sanity avec date de modification. Renommer les médias identifiés. | GPS précis du siège à vérifier, mêmes chiffres partout, `.fr` partout, blog auteur/dates, ALT utiles. Ne pas substituer les coordonnées du centre de Vallet à celles de l'adresse ; vérifier les références après renommage des images. |
| 11. Performance | Optimiser logo et nouveaux médias à partir des fichiers reçus ; reprendre les imports différés existants et `next/font`. | Logo < 10 Ko, LCP 80 à 100 Ko max, chargement réel des images cachées du carrousel, bundles Cal.com/Leaflet et polices. Vérifier visuellement les conversions. |
| 12. Recette | Contrôles documentaires, lint/build, routes et sitemap, Hn, accessibilité, GA4/Cal.com/formulaire, Lighthouse et bilan. | Lighthouse mobile cible 90+ sur accueil, entretien, contact, une ville, avec conditions de mesure documentées. Ne pas annoncer un score sans mesure ni un envoi sans contrôle de réception. Fournir fichiers par étape, TODO et actions manuelles. |

## Communes

Pages existantes : Vallet, Clisson, Le Loroux-Bottereau, Haute-Goulaine, Saint-Julien-de-Concelles, Vertou, Gorges, Le Pallet, Mouzillon, La Chapelle-Heulin.

Pages à créer à l'étape 9 : Divatte-sur-Loire, Aigrefeuille-sur-Maine, Gétigné, Le Landreau.

La liste de la zone d'intervention et le tableau des pages villes ne sont pas identiques aujourd'hui. Les faire converger vers les quatorze communes du brief, sans supprimer d'URL existante.

## Dépendances et décisions préparées

- Étapes 4 et 5 avant 6 : préparer des props communes pour les avis et reprendre les données connues uniquement comme données provisoires. L'étape 6 remplacera l'alimentation et utilisera le repli explicitement autorisé 5,0/37. Aucun avis nouveau inventé.
- Étape 3 avant 7 : rendre le paramètre `objet=visite` opérationnel dès l'étape 3 ; les nouveaux champs et `/merci` arrivent à l'étape 7. L'événement `demande_visite` n'est vérifiable qu'avec cette page.
- Étape 1 avant 9 : sitemap des villes existantes d'abord ; enrichissement automatique à chaque création ultérieure.
- Les nouveaux schémas doivent fonctionner avec une base Sanity encore dépourvue des nouveaux documents ; garder un fallback déterministe sans écrire à distance pendant la préparation.
- Charte : blanc sur terracotta `#B5552B` donne environ 4,88:1 par calcul de luminance WCAG ; utiliser le texte sombre prévu sur ocre. Confirmer les autres contrastes avec les couleurs réellement rendues lors de la recette.
- Les commentaires `// TODO CONTENU:` sont demandés explicitement par le client et prévalent sur l'ancienne règle limitant les commentaires.

## Contenus et accès attendus

- Photo de Jessy et de l'équipe, trois photos services, paires avant/après, photo de remplacement du projet de Clisson.
- Réponses aux quatre FAQ de l'accueil, budgets, formules et tarifs Entretien, textes locaux à enrichir.
- Clé serveur `GOOGLE_PLACES_API_KEY` et activation/restriction Places New ; clé publique `NEXT_PUBLIC_WEB3FORMS_KEY` propre au formulaire et contrôle d’un email réel.
- Le calendrier public Cal.com `permapaysage/appel-15-min` a été consulté réellement sans réservation ; les réglages privés du compte, notifications et calendrier connecté restent à contrôler par son propriétaire.
- Accès Vercel et analytics nécessaires pour confirmer les réglages externes et la réception des événements.

Les cinq photos exactes du hero sont maintenant fournies et intégrées. Les contenus encore absents gardent un placeholder propre et un repère `TODO CONTENU:` ; aucun contenu existant validé n’a été remplacé par une invention.

## Actions manuelles à remettre en fin de chantier

1. Vercel : vérifier `NEXT_PUBLIC_SITE_URL=https://www.permapaysage.fr`, domaine principal et remplacer les deux redirections 307 constatées par des redirections permanentes page à page (détail ci-dessus). Ajouter la clé Places à l'étape 6.
2. Google Cloud : activer Places New et restreindre la clé à cette API.
3. GA4 : marquer `demande_visite` et `rdv_appel_confirme` comme conversions après vérification des événements.
4. Search Console : propriété `.fr`, sitemap, réindexation accueil/services, suppression de l'ancien site Odoo selon le brief.
5. Fiches Google et UNEP : vérifier le lien vers `https://www.permapaysage.fr/`.

## Journal des étapes

| Lot | État | Fichiers effectivement modifiés | Contrôles |
|---|---|---|---|
| Préparation | Terminé | `doc/brief-mise-a-jour-2026-10-04.md`, `doc/chantier-mise-a-jour-2026-10-04.md` | Audit du dépôt ; build réussi ; défauts lint préexistants relevés. |
| Remise au vert | Terminée | Fichiers détaillés dans le compte rendu ci-dessus | Lint sans avertissement, build et TypeScript, cookies/GA4, présélections et formulaire simulé dans Chromium. |
| Étape 1 | Terminée côté code ; deux redirections Vercel à rendre permanentes | Fichiers détaillés dans le compte rendu de l'étape 1 | Lint/build/TypeScript, 27 URL HTTP 200, métadonnées, Sanity, carte desktop/mobile, H1 et grammaire. |
| Étape 2 | Terminée | 23 fichiers détaillés dans le compte rendu ci-dessous | Lint strict sans avertissement, build/TypeScript, 27 routes, 135 vues puis 35 contre-vérifications, CTA, clavier, cookies, formulaire simulé et Reveal validés. |
| Étape 3 + photos | Terminée côté code | 24 fichiers listés dans le compte rendu de la suite | 26 contrôles simulés, neuf SDK réel, quatorze photos ; limite Escape tierce documentée, aucun rendez-vous réel. |
| Étapes 4 et 5 | Terminées côté code | 16 fichiers listés dans le compte rendu de l’accueil | 109 contrôles, 40 contre-vérifications, huit interactions et contrôle final des accents ; contenus absents signalés. |
| Étape 6 | Terminée côté code | 17 fichiers listés ci-dessous | 178 contrôles indépendants, contre-revue 25 fixtures ; API simulée, clé réelle absente. |
| Étape 7 | Terminée côté code | Quatre fichiers listés ci-dessous | 33 contrôles navigateur, cinq POST simulés ; aucun email réel. |
| Étape 8 | Terminée côté code | 13 fichiers listés ci-dessous | 26 contrôles navigateur, sept calculs, revues qualité ; prix/formules réels attendus. |
| Étape 9 | Terminée côté code | 20 fichiers listés ci-dessous | 100 contrôles navigateur, quatre contrôles indépendants du helper ; quatorze communes et cartes vérifiées. |
| Étape 10 | Terminée côté code | 64 chemins listés ci-dessous : 28 code/docs et 18 renommages | 108 contrôles navigateur, sept helpers, 18 SHA-256 et redirections permanentes. |
| Étape 11 | Terminée côté code | 20 fichiers listés ci-dessous | 41 contrôles : 32 navigateur et neuf Cal réel ; Lighthouse mobile 91/90/94/93, sans mocks. |
| Étape 12 | Terminée côté code et recette locale | Ce journal uniquement | 36 routes réelles, 159 contrôles, aucune erreur JavaScript ; actions manuelles et contenus restent attendus. |


### Étape 2 réalisée le 5 octobre 2026

La préparation et l'étape 1 ont été intégrées à `main`. Les documents de chantier ont été synchronisés et poussés sur `origin/main` au commit `d8c7176`. L'étape 2 est terminée après revue des sources et recette navigateur finale ; elle fait l'objet du commit distinct `feat: harmoniser les boutons et l’en-tête du site`.

- Tokens crème `#F5EFE3`, ocre `#E0A33A`/survol `#CC8F2A`, encre `#1F2A1F`, terracotta `#B5552B`, blanc, et terracotta sombre `#984522` pour le survol. Les fonds généraux adoptent le crème.
- `CtaButton` centralise les deux actions, leurs libellés et leurs destinations. Variantes `cva` : principale claire, principale sombre, secondaire claire et secondaire sombre ; hauteur 52 px, texte 17 px demi-gras, coins arrondis. Les contrôles cookies, envoi du formulaire et liens de navigation gardent leurs libellés utiles et reprennent les couleurs des variantes lorsqu'ils sont présentés comme boutons.
- Appel : lien direct vers `https://cal.com/permapaysage/appel-15-min`. Visite : `/contact?objet=visite-conseil`, opérationnel avec la présélection existante. L'embed Cal.com, l'alias `objet=visite` et les événements GA4 sont réservés à l'étape 3.
- Header : téléphone `07 52 62 08 18`, `tel:+33752620818`, immédiatement avant le CTA terracotta. Navigation complète à partir de 1280 px pour loger téléphone et CTA ; en dessous, CTA compact à côté du burger. Logo réduit sous 400 px. Offres Conception en trois colonnes à partir de 1024 px pour préserver la largeur des boutons.
- L'appel flottant mobile existant reste disponible hors Contact, devient terracotta et mesure 52 px. Safe areas inférieure et droite prises en compte ; marge de pied de page pour que ses derniers liens restent accessibles. Le consentement garde la priorité d'affichage (`z-50` face à `z-40`) et son propre espace iOS.
- CTA des héros et appels finaux : ocre sur vert et contour crème ; zone : visite terracotta. CTA des autres pages et gabarit service inutilisé harmonisés ; liens vers services, projets, blog et autres destinations internes préservés.
- Apparitions limitées à 0,3 s, sans filtre de flou, désactivées sous 768 px et avec mouvement réduit. Reveal visible par défaut sans JavaScript ou IntersectionObserver ; observer, délai et écouteur média nettoyés. Le changement de préférence rend immédiatement le contenu visible. Les halos décoratifs et arrière-plans floutés statiques restent conservés ; aucune animation de flou n'est introduite. Le comportement du carrousel et son autoplay seront traités à l'étape 4.
- Contrastes calculés : blanc/terracotta 4,88:1 ; blanc/survol 6,54:1 ; encre/ocre 6,72:1 et encre/survol ocre 5,34:1 ; crème/vert 7,99:1. Le texte du contour clair utilise le terracotta sombre pour dépasser AA sur crème (le terracotta normal donne seulement 4,27:1).

La revue a également harmonisé le bouton « Envoyer un autre message » après succès du formulaire : texte terracotta sombre, libellé et fonctionnement conservés.

La recette navigateur a également conduit à deux améliorations du header, validées après reconstruction : le burger expose `aria-expanded` et `aria-controls` vers la navigation mobile identifiée ; Échap ferme le menu visible et rend le focus à son déclencheur, avec un gestionnaire clavier local au header.

#### Vérifications finales de l'étape 2

- `npm run lint -- --max-warnings=0` : réussi, aucune erreur et aucun avertissement. `npm run build` : réussi, TypeScript compris et 39 pages générées. Ces contrôles ont été rejoués après la dernière correction du header. `git diff --check` : réussi.
- Les 27 URL du sitemap répondent HTTP 200 en local et conservent leurs canonical officiels `.fr`.
- Chromium : 135 vues, soit 27 routes aux largeurs 320, 390, 768, 1024 et 1440 px ; aucun débordement horizontal ni libellé de CTA tronqué. Une seconde passe de 35 vues sur sept gabarits a confirmé ces mesures ; les dernières corrections du header ont ensuite été contre-vérifiées au clavier aux cinq largeurs. Captures desktop et mobile inspectées.
- Les quatre variantes de CTA ont été vérifiées avec les couleurs réellement calculées, au repos et au survol : contrastes AA, bordure de 2 px, ombres conformes, hauteur 52 px et texte 17 px.
- Menus : clic, survol, Entrée, Tabulation, Échap et retour du focus validés ; attributs du burger contrôlés aux largeurs 320, 390, 768 et 1024 px, navigation desktop à 1440 px.
- Cookies : acceptation et refus, cookie de 395 jours, persistance après rechargement et accès aux boutons vérifié par hit-test à 320 px.
- Web3Forms intercepté localement : payload, succès, remise à zéro et état d'erreur avec conservation des champs validés ; présélection `visite-conseil` confirmée. Aucun email réellement envoyé.
- Reveal : les 29 blocs sont visibles sur mobile, avec mouvement réduit et sans JavaScript. Sur desktop, apparition de 0,3 s sans filtre, au défilement et lors d'un changement de préférence média, validée.
- Safe areas : règles CSS contrôlées, marge de pied de page de 96 px, bouton flottant de 52 px avec marges inférieure et droite de 20 px complétées par les safe areas. Les 13 liens du footer restent accessibles selon les hit-tests.
- Aucune erreur JavaScript de page ni erreur d'hydratation relevée. Deux incidents externes préexistants ont été observés en local : `_vercel/insights/script.js` répond HTTP 404 hors Vercel et la collecte Google Analytics `region1.google-analytics.com` échoue avec `ERR_CONNECTION_REFUSED`. Ces incidents ne sont pas présentés comme résolus par ce lot.

Fichiers effectivement modifiés dans ce lot (23, nouveau composant compris) :

- Pages (9) : `app/(main)/[citySlug]/page.tsx`, `app/(main)/amenagement/page.tsx`, `app/(main)/conception/page.tsx`, `app/(main)/contact/page.tsx`, `app/(main)/entretien/page.tsx`, `app/(main)/faq/page.tsx`, `app/(main)/page.tsx`, `app/(main)/realisations/[slug]/page.tsx`, `app/(main)/realisations/page.tsx`.
- Styles et bouton générique (2) : `app/globals.css`, `components/ui/button.tsx`.
- Layout et sections (4) : `components/layout/footer.tsx`, `components/layout/header.tsx`, `components/sections/cta.tsx`, `components/sections/service-page.tsx`.
- Composants partagés (7) : `components/shared/CookieBanner.tsx`, `components/shared/contact-form.tsx`, `components/shared/cta-button.tsx` (nouveau), `components/shared/faq-accordion.tsx`, `components/shared/floating-call-button.tsx`, `components/shared/reveal.tsx`, `components/shared/zone-intervention.tsx`.
- Journal (1) : `doc/chantier-mise-a-jour-2026-10-04.md`.

#### Passage à l'étape 3

Les étapes 3 à 12 restent à faire. Les destinations sont centralisées dans `ctaDestinations` de `components/shared/cta-button.tsx` : l'appel utilise actuellement un lien HTTPS normal vers `https://cal.com/permapaysage/appel-15-min`, et la visite utilise `/contact?objet=visite-conseil` jusqu'à l'ajout de l'alias `objet=visite` à l'étape 3. Aucun test de réservation Cal.com n'a été effectué dans ce lot. L'étape 3 doit intégrer l'embed différé, contrôler l'événement officiel de confirmation, le focus et la fermeture, puis instrumenter les clics et confirmations GA4 sans doublon selon le brief.

### Retouches visuelles locales du 5 octobre 2026

Demande complémentaire du développeur après l'étape 2 : améliorer l'harmonie et les détails de **tout le site**, à partir de la structure déjà validée par le client. Cette nouvelle demande adapte les teintes du brief initial. Aucun commit ni push de ces retouches ; l'étape 3 n'a pas commencé.

- Palette partagée : vert forêt `#2B4D3B`, vert profond `#203C2F`, titres `#293D33`, blanc cassé `#FAF9F6`, surfaces `#F2F0E9` et sauge `#EAF0E7`, terre `#A65D43`/survol `#914D36`, miel `#D9AE66`/survol `#CCA05A`. Le crème `#F5EFE3` reste utilisé dans les accents et les encadrements. Texte secondaire `#606D61` pour conserver son contraste sur les différents fonds.
- Titres équilibrés, petits intitulés avec filet fin, encadrements crème des images, ombres plus douces, survols de cartes et zooms réduits. Les boutons gardent 52 px/17 px avec des coins de 10 px et un contour crème moins dominant.
- En-tête : logo à proportions carrées correctes et nom de marque visible à partir de 640 px. Footer, appels finaux, bandeaux des services/villes/blog/contact/FAQ et sections d'avis utilisent la même palette. Suppression des halos décoratifs floutés ; pas d'ajout de médias ou de dépendances.
- Accueil : espacements du premier bloc resserrés, liens de confiance simplifiés, mention écologique en légende de photo, cartes services avec petits repères 01/02/03. Les cartes services des villes reprennent ces détails ; les réalisations et articles reprennent les intitulés et survols communs.
- Ordre des sections, textes métier, photos et fonctionnement du formulaire, menus et carrousel conservés. Les données et URL restent celles des étapes précédentes.
- Validation : lint strict sans avertissement, build/TypeScript avec 39 pages, `git diff --check`. Chromium : 30 routes HTTP 200, 60 vues sur 12 gabarits aux largeurs 320/390/768/1024/1440 px sans débordement ni CTA tronqué ; menus clavier et présélection visite contrôlés. Contre-vérification finale sur huit pages desktop/mobile (16 vues), dimensions et rayon des CTA, captures inspectées, aucun `pageerror`. Les dix combinaisons principales de couleurs de texte testées dépassent 4,5:1, au repos et au survol. Scripts externes de mesure neutralisés dans cette recette purement visuelle ; aucun test d'envoi réel ou de réservation.
- Captures et rapports de recette : `/tmp/permapaysage-harmonie/`. Les modifications sont laissées non committées sur `main`, dont le commit reste `9a3ae01`.

### Refonte locale de l'accueil, étapes 4 et 5, le 5 octobre 2026

À la demande du développeur, l'accueil est refondu avant l'étape 3. Les 24 fichiers de retouches visuelles déjà présents ont été sauvegardés dans `/tmp/permapaysage-home-baseline` avant modification. La palette forêt, terre et miel, les composants et les autres pages sont conservés. Aucun commit, staging ou push dans ce lot.

- Hero : étiquette, H1, sous-titre et trois puces du brief ; CTA avec calendrier et flèche, microtexte demandé. Les cinq nouveaux médias du brief ne sont présents ni dans le dépôt ni dans les pièces jointes accessibles. Les cinq médias existants restent visibles avec des descriptions de leur scène réelle, sans commune supposée, et une légende discrète signale la sélection à venir. Navigation uniquement manuelle, boutons, points et swipe ; seule l'image courante est montée, la première prioritaire et les autres chargées à la demande.
- Confiance : trois avis déjà présents, dépliables sur place lorsque leur texte dépasse l'extrait, les quatre chiffres existants, les logos UNEP et Unipros et un CTA terracotta. Aucun avis n'est qualifié de récent : les dates des avis existants ne sont pas connues. Un contrat TypeScript partagé transmet la même note et le même total au hero, à la confiance et au schéma LocalBusiness : **5,0/5 et 32 avis**, données existantes, sans appel Places ni adoption du repli 37 prévu pour l'étape 6.
- Services : Entretien, Conception, Aménagement, photos réelles vérifiées à la place des illustrations et liens vers les pages et `/contact?objet=entretien|conception|amenagement`. Photo entretien `ap-03.jpg`, terrasse en travertin pour Aménagement, jardin de Clisson référencé dans Sanity pour Conception. Les photos dédiées du client restent attendues. Badge et exemple crédit d'impôt repris du brief sans nouveau tarif.
- Comparaison : aucune des six réalisations Sanity n'a actuellement de paire renseignée. Repli sur `av-05.jpg`/`ap-05.jpg`, même groupe de maisons, haie et bordure arrondie vérifiés visuellement par le parent ; deux cadrages compatibles de 1600 × 1204 pixels ; aucune localisation ajoutée. Le composant préfère une paire complète d'un même projet Sanity lorsqu'elle sera renseignée. Curseur au clavier et au doigt, Début/Fin et poignée maintenue à l'intérieur du cadre même à 0/100 %. Puis trois réalisations publiées dans Sanity, leurs vrais slugs et images ; la photo erronée du repli Clisson n'est pas réutilisée. Nouvelle photo de Clisson toujours attendue. Un seul lien « Voir toutes les réalisations ».
- Quatre étapes de prise de contact ; présentation de Jessy fondée sur les données existantes et les trois valeurs en une phrase. Photo d'équipe indiquée à venir. Les trois longs paragraphes des anciennes valeurs sont transférés intégralement dans `lib/values.ts`, affichés sur la nouvelle page `/a-propos` avec métadonnées, canonical, schéma AboutPage, fil d'Ariane, lien footer et sitemap.
- Zone : carte OSM différée conservée et liste exacte des 14 communes. Les dix pages existantes restent liées ; **Divatte-sur-Loire, Aigrefeuille-sur-Maine, Gétigné et Le Landreau** restent affichées en texte jusqu'à la création de leurs pages à l'étape 9. Aucun lien cassé ni distance inventée.
- FAQ : quatre questions exactes du brief. Une réponse publiée dans Sanity n'est reprise que si la question correspond après normalisation ; sinon, réponse à venir indiquée discrètement, sans budget inventé. Le schéma FAQPage est émis seulement lorsque les quatre réponses sont effectivement renseignées. Le blog reste dans la navigation et le footer.
- Appel final : titre et microtexte du brief, les deux CTA et `tel:+33752620818`. Horaires ajoutés au footer : « Du lundi au vendredi, 8h–19h ».

L'étape 3 (embed Cal.com et suivi GA4), l'étape 6 (API Places, dates et photos des avis), les quatre pages de communes de l'étape 9 et les autres lots restent à faire. Le lien d'appel direct et la présélection visite-conseil existante restent opérationnels.

Contenus encore attendus pour ce lot : les cinq nouveaux médias du hero, les trois photos dédiées aux services, de nouvelles paires avant/après légendées, la nouvelle photo de Clisson, la photo de Jessy et de l'équipe, et les réponses exactes aux quatre questions. Les emplacements portent `TODO CONTENU` dans le code.

Vérifications initiales : `npm run lint -- --max-warnings=0`, TypeScript (`npx tsc --noEmit`), `npm run build` (40 pages, dont `/a-propos`) et `git diff --check` réussis. Les trois paragraphes des valeurs sont identiques au contenu de la baseline ; seize des vingt-quatre fichiers déjà modifiés sont inchangés octet pour octet. Recette navigateur détaillée à compléter après assemblage.

Rectifications après revue : libellé long du CTA hero lorsque la largeur suffit (tablette et grand desktop), libellé court au palier desktop étroit, boutons côte à côte à partir de 640 px ; grille adaptée à partir de 1024 px. FAQ avec identifiants stables, relations ARIA et panneaux fermés masqués aux aides techniques et inertes. Le comparateur prend le focus au début du glissement et expose un focus visible. Les indications de tailles des images du hero, des services, des projets et du comparateur plafonnent à la largeur maximale du Container. La paire locale 05 remplace la paire 03 pour conserver des cadrages compatibles et varier les scènes. La recette globale reste en cours.

Contrôle ciblé des rectifications : lint strict et TypeScript réussis. Une mesure Chromium des proportions et libellés proposés, avec les polices effectivement chargées, confirme des CTA de 52 px et sans texte débordant aux largeurs 320, 768, 1024, 1280 et 1440 px. Le libellé long est affiché à 768, 1280 et 1440 px ; à 1024 px, le bouton d’appel utilise le libellé compact et les deux boutons restent côte à côte. Les tailles d'images plafonnées correspondent à la géométrie du Container : 519 px pour l'image du hero hors cadre, 393 px pour les cartes et 780 px pour le comparateur. Ce contrôle de fit ciblé ne remplace pas la recette navigateur globale en cours.


#### Recette définitive de la refonte de l’accueil

- Première passe navigateur : **109 contrôles, 20 vues**. Contre-recette : **40 contrôles sur huit largeurs de 320 à 1920 px**. Huit interactions souris, tactile réel et clavier réussies ; **aucune erreur JavaScript**. Captures inspectées par le recettiste et le parent.
- Les contrôles couvrent les neuf sections, les textes, les CTA et liens, les avis dépliables, la navigation manuelle du carrousel, le comparateur avant/après, l’accordéon FAQ, les tailles d’images, l’absence de débordement, la page À propos et la cohérence de ses métadonnées et du sitemap. Les boutons du hero affichent le libellé long lorsque la place le permet ; les deux boutons restent côte à côte sur desktop.
- Rapports et captures : [première recette](/tmp/permapaysage-home-recette/report.json), [contre-recette](/tmp/permapaysage-home-recette/final-targeted-report.json), [interactions](/tmp/permapaysage-home-recette/interactions.json). Captures dans `/tmp/permapaysage-home-recette/`.
- Dernière correction éditoriale : les catégories des réalisations sont affichées avec les libellés français accentués du catalogue existant, dont « Aménagement », avec repli conservé pour une catégorie inconnue. Lint ciblé de la page, TypeScript et diffcheck réussis avant reconstruction ; contrôle du rendu de cette dernière correction après reconstruction confié au recettiste.
- Il s’agit d’une recette locale de la refonte. Aucun email réellement envoyé, aucune réservation Cal.com réelle, et aucune validation en production du suivi GA4 ou de l’API Places dans ce lot.

Fichiers de ce lot (**16**, distincts des 24 modifications visuelles déjà présentes au début) :

1. `app/(main)/page.tsx`
2. `app/(main)/a-propos/page.tsx` (nouveau)
3. `app/sitemap.ts`
4. `app/globals.css`
5. `components/layout/breadcrumbs.tsx`
6. `components/layout/footer.tsx`
7. `components/shared/cta-button.tsx`
8. `components/shared/google-reviews.tsx`
9. `components/shared/hero-carousel.tsx`
10. `components/shared/before-after-slider.tsx`
11. `components/shared/faq-accordion.tsx`
12. `components/shared/zone-intervention.tsx`
13. `lib/seo.ts`
14. `lib/google-review-summary.ts` (nouveau)
15. `lib/values.ts` (nouveau)
16. `doc/chantier-mise-a-jour-2026-10-04.md`

À la clôture de cette refonte, les contenus encore attendus comprenaient les cinq photos précises du hero (reçues et intégrées dans la suite, voir étape 3), les trois photos dédiées aux services, de nouvelles paires avant/après et leurs légendes, la nouvelle photo de Clisson, la photo de Jessy et de l’équipe sur le terrain, ainsi que les quatre réponses de la FAQ, dont le budget. Les médias actuels vérifiés constituent des replis explicites et les réponses absentes restent indiquées à venir.

Actions alors prévues, réalisées dans la suite côté code : intégrer le Cal.com différé et les événements GA4 (étape 3) ; recevoir/configurer la clé Google Places et remplacer les avis statiques par des avis datés (étape 6) ; créer les pages de Divatte-sur-Loire, Aigrefeuille-sur-Maine, Gétigné et Le Landreau (étape 9). Les actions manuelles Vercel, Google Cloud, conversions GA4 et Search Console du brief restent à réaliser dans leurs étapes respectives. Aucun staging, commit ni push effectué.

Dernière reconstruction après correction des accents : `npm run build` réussi (40 pages, TypeScript compris), `git diff --check` réussi. Les totaux des rapports ont été relus : 109 contrôles, aucune défaillance, aucune erreur, 20 vues dans `report.json` ; 40 contrôles et aucune erreur dans `final-targeted-report.json` ; huit interactions dans `interactions.json`. Le contrôle ponctuel après redémarrage est réussi : accueil et `/a-propos` répondent HTTP 200 ; les catégories affichées sont « Conception », « Aménagement » et « Aménagement », avec accents corrects. Preuve : [rapport ponctuel final](/tmp/permapaysage-home-recette/category-final-report.json).

### Suite locale : photos définitives du hero et étape 3

L’utilisateur a autorisé la poursuite des lots restants, toujours sans push. Cette première phase conserve toutes les retouches et la refonte déjà présentes ; baseline complète de 32 fichiers modifiés ou nouveaux sauvegardée dans `/tmp/permapaysage-suite-baseline` avant les modifications. Aucun staging, commit ni push.

- Les cinq fichiers reçus dans `/home/raphael/Téléchargements/permapaysage/` sont copiés dans `public/hero/` sous les noms exacts du brief, dans l’ordre demandé, avec les ALT exacts. Les originaux restent intacts. Redimensionnement et compression WebP via sharp, sans retouche du contenu : image LCP de 1200 × 900 pixels et 90 406 octets, quatre autres images au plus 1500 px sans agrandissement. Première image prioritaire avec fetchpriority high, autres images montées seulement à la navigation manuelle. La mention « sélection à venir » et le TODO du hero sont supprimés ; les photos dédiées des cartes services et le portrait restent attendus.
- Les liens CTA restent rendus sur le serveur. Un contrôleur client unique traite leurs clics grâce à `data-cta` et `data-emplacement`. Le script officiel Cal.com est chargé uniquement au clic d’appel, puis le calendrier officiel est intégré dans une boîte de dialogue native, avec fermeture et retour du focus. Lien HTTPS disponible si JavaScript, le script ou le calendrier est indisponible. Pas de nouvelle dépendance npm.
- Visite : destination `/contact?objet=visite`. Le formulaire accepte aussi l’ancien `visite-conseil`, les deux valeurs présélectionnant « Visite conseil » ; les destinations propres aux trois services sont conservées.
- Événements `clic_reserver_appel`, `clic_visite_offerte` et `rdv_appel_confirme`, avec emplacement explicite. Les confirmations ne proviennent que des événements officiels `bookingSuccessful` ou `bookingSuccessfulV2`, confirmés et dédoublonnés par identifiant ; pas de données personnelles ni de champs de réservation transmis à GA4. Les événements personnalisés sont ignorés sans consentement explicite et jamais rejoués après une acceptation tardive.
- Hook préparé pour `demande_visite` : une confirmation de livraison doit être marquée avant la redirection vers `/merci` à l’étape 7, puis consommée une seule fois sur cette page. Une arrivée directe ne constitue pas une confirmation. Le formulaire actuel n’est pas redirigé dans ce lot.

Sources primaires consultées : [présentation officielle des intégrations Cal.com](https://cal.com/embed), [snippet officiel](https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-snippet/src/index.ts), [API de l’embed](https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-core/src/embed.ts), [contrat des événements](https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-core/src/sdk-action-manager.ts), [événements GA4](https://developers.google.com/analytics/devguides/collection/ga4/events), [consentement Google](https://developers.google.com/tag-platform/security/guides/consent). Le bundle officiel `https://app.cal.com/embed/embed.js` est accessible ; plusieurs anciennes URL de documentation Cal.com sont indisponibles.

Validation provisoire : lint strict et TypeScript réussis. Reconstruction et recette simulée des interactions en cours ; aucune réservation et aucun email réels. GA4 conserve sa configuration et son mécanisme de consentement existants. Marquer `demande_visite` et `rdv_appel_confirme` comme événements clés/conversions dans l’administration GA4 reste une action manuelle.

Première recette ciblée de cette phase : 25 contrôles réussis avec un SDK et des réservations explicitement simulés, incluant chargement au clic, confirmations en attente ignorées, dédoublonnage legacy/V2, consentement et absence de rejeu, deux alias de visite, destinations des services, fermeture depuis les contrôles hôtes et retour du focus. Rapport provisoire : `/tmp/permapaysage-phase3/report.json` ; manifeste des cinq images et empreintes des originaux : `/tmp/permapaysage-phase3/images.json`.

La recette a révélé trois points corrigés avant contre-recette : le SDK ne prend en charge que `iframeAttrs.id` et impose initialement « Book a call », donc le titre français est appliqué à l’élément iframe après sa création ; une tentative échouée retire ses callbacks et son iframe avant un réessai sans recharger le SDK ; l’événement officiel `__closeIframe`, lorsqu’il est émis, ferme aussi la boîte hôte et restitue le focus. Le lien de repli utilise le libellé autorisé « Réserver un appel de 15 minutes », suivi de « sur Cal.com », et compte le clic d’appel sous consentement sans réouvrir la boîte.

Limite à vérifier sur l’iframe réelle : Escape pressé dans un document d’origine tierce n’est pas reçu par la page hôte, et les sources du SDK ne montrent pas de relais clavier systématique. Le bouton Fermer reste visible, accessible au clavier ; Shift+Tab depuis le premier contrôle de l’iframe simulée permet de le rejoindre, et Escape depuis les contrôles hôtes ferme la boîte. Aucun script n’est injecté dans l’origine de Cal.com. La contre-recette doit distinguer cette limite de la fermeture via `__closeIframe` effectivement émis.

#### Contretests après corrections de l’étape 3

`npm run lint -- --max-warnings=0`, `npx tsc --noEmit`, `npm run build` (40 pages, TypeScript compris) et `git diff --check` réussis. Sur le build corrigé, **32 contrôles ciblés** réussis avec SDK et réservations simulés : chargement uniquement au clic, une seule instance de script, titre français après création de l’iframe, fermeture via l’événement officiel et restitution du focus, retrait de l’iframe échouée et réessai sans callbacks dupliqués, dédoublonnage des confirmations, absence d’événement hors consentement, absence de rejeu après acceptation, aliases et présélections, destinations des services, lien de repli suivi sans réinterception, aucune erreur JavaScript de page. Ce total inclut la caractérisation explicite de la limite Escape dans l’origine tierce, et ne prétend pas qu’un Escape non relayé y ferme la boîte.

Rapport : [contretests de phase 3](/tmp/permapaysage-phase3/report.json). Le hook préparatoire de conversion visite est testé séparément : [preuve de consommation unique](/tmp/permapaysage-phase3/visit-hook.json), arrivée directe sans marque `false`, succès marqué `true` une seule fois, deuxième consommation `false`. [Manifest des images](/tmp/permapaysage-phase3/images.json) et [liste des fichiers de cette phase](/tmp/permapaysage-phase3/files.json). La recette indépendante sur l’iframe Cal.com réelle reste distincte de ces simulations.

Fichiers de cette phase (**24**, relativement à la baseline suite) :

- Pages/layout : `app/(main)/layout.tsx`, `app/(main)/page.tsx`, `app/(main)/[citySlug]/page.tsx`, `app/(main)/amenagement/page.tsx`, `app/(main)/conception/page.tsx`, `app/(main)/entretien/page.tsx`, `app/(main)/realisations/[slug]/page.tsx`.
- CTA et sections : `components/layout/header.tsx`, `components/sections/cta.tsx`, `components/sections/service-page.tsx`, `components/shared/cta-button.tsx`, `components/shared/google-reviews.tsx`, `components/shared/hero-carousel.tsx`, `components/shared/zone-intervention.tsx`, `components/shared/contact-form.tsx`.
- Nouveaux modules : `components/shared/booking-controller.tsx`, `lib/cal-embed.ts`, `lib/analytics-events.ts`.
- Images : `public/hero/mare-naturelle-terrasse-bois-paysagiste-vallet.webp`, `public/hero/massif-graminees-micro-trefle-paysagiste-clisson.webp`, `public/hero/cloture-chataignier-haie-libre-paysagiste-la-chapelle-heulin.webp`, `public/hero/jardin-massifs-paillage-palmier-paysagiste-le-loroux-bottereau.webp`, `public/hero/plan-amenagement-jardin-paysagiste-vallet-permapaysage.webp`.
- Journal : `doc/chantier-mise-a-jour-2026-10-04.md`.

À compléter hors de cette phase : valider les disponibilités du lien Cal.com et les conversions dans GA4 avec un vrai compte, marquer les deux confirmations comme événements clés, puis raccorder le marqueur visite à la confirmation de livraison et à `/merci` à l’étape 7. Aucun vrai email ou rendez-vous n’a été créé. Les photos dédiées aux services, le portrait, la nouvelle photo de Clisson, les nouvelles paires légendées et les réponses de FAQ restent attendus ; les cinq photos du hero sont désormais fournies et intégrées.

### Étape 6 : avis Google Places, intégration locale

Baseline complète sauvegardée avant ce lot dans `/tmp/permapaysage-phase6-baseline` : 42 fichiers modifiés ou nouveaux et diff de départ. Toutes les modifications des lots précédents sont conservées. Aucun staging, commit, push ni écriture dans Sanity.

- `getGoogleReviewSummary()` effectue exclusivement côté serveur la requête Places (New) du brief, en français, avec les champs `rating,userRatingCount,reviews,googleMapsUri` et une limite d’attente de cinq secondes. La clé `GOOGLE_PLACES_API_KEY`, documentée dans `.env.example`, n’est jamais publique ni journalisée. Le parseur traite un JSON inconnu et valide notes entre 1 et 5, compte entier, URI HTTPS et dates réelles ; les avis sans auteur, texte, date ou source individuelle exploitable sont omis.
- **Adaptation du cache demandé pour respecter les règles Places** : les règles standard Places interdisent de conserver ce contenu hors exceptions explicites. L’exception EEE de stockage temporaire vise les coordonnées, pas les notes ou avis. Aucun cache persistant, fichier, dernier résultat, `unstable_cache` ou Map globale de contenu Google. `fetch` utilise `cache: "no-store"` ; `cache` de React ne dédoublonne que la requête de rendu. Le layout principal est dynamique pour éviter aussi la conservation de contenu Places dans le HTML des pages.
- Sans clé, en cas d’erreur réseau/API, JSON invalide ou réponse inexploitable, le repli fixé par le brief est **5,0/5 et 37 avis**, sans aucun témoignage détaillé ni ancienne réponse API sauvegardée. La clé est actuellement absente : aucune requête Places réelle n’est présentée comme validée.
- Le hero, la bande de confiance et `aggregateRating` utilisent le même résumé. Un seul LocalBusiness est rendu par le layout serveur sur chaque page, avec une identité et une URL racines stables ; les schémas d’entreprise supplémentaires des services, du contact et des communes ont été retirés. Les enrichissements de zone, coordonnées et offres restent dans leurs étapes ultérieures.
- Jusqu’à trois avis affichés par date décroissante **parmi les cinq avis maximum sélectionnés par Google par pertinence**, avec une notice visible sur ce tri et ce filtrage. Dates de publication, mois/année de visite en France si fournis, nom et profil de l’auteur, photo directe sans cache d’optimisation Next.js, lien source individuel et lien de signalement si fourni. Les textes longs se déplient sur place via `details` ; lorsqu’une traduction diffère du texte original, sa provenance et l’original sont accessibles.
- Attribution Google Maps : logo officiel extrait sans modification de l’archive Google, et texte compact non traduisible dans le hero. Une courte section dédiée dans les mentions légales renvoie aux conditions Google Maps ; la politique existante décrit les données publiques affichées, les photos tierces et renvoie à la confidentialité de Google. Ces ajouts ne constituent pas une validation juridique générale.
- Le helper JSON-LD partagé échappe les caractères `<` en `\u003c`, empêchant un texte externe de fermer la balise script tout en préservant la valeur JSON.

Sources primaires : [politiques Places et attributions](https://developers.google.com/maps/documentation/places/web-service/policies), [référence REST des lieux et avis](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places), [conditions de service Google Maps EEE](https://cloud.google.com/terms/maps-platform/eea/maps-service-terms), [archive officielle des logos Google Maps](https://developers.google.com/static/maps/documentation/images/Google_Maps_Attribution_Assets.zip). Conditions publiques et confidentialité : [conditions Google Maps](https://maps.google.com/help/terms_maps/), [confidentialité Google](https://policies.google.com/privacy).

Validation provisoire : **48 contrôles réussis** sur les véritables modules, avec réponses Places explicitement simulées : bornes et types, dates invalides et année bissextile, tri limité à la sélection fournie, attributions, dates françaises, texte original, détails natifs, photos non optimisées, repli sans avis, clé manquante sans appel, `no-store`/masque/langue/en-tête/timeout, erreurs HTTP/réseau/JSON et absence de reprise d’une réponse précédente, schéma commun, échappement de `</script>` avec round-trip JSON. [Rapport](/tmp/permapaysage-phase6/report.json), [fixture](/tmp/permapaysage-phase6/fixture.json), [rendu d’avis simulés](/tmp/permapaysage-phase6/reviews-fixture.html). `npm run lint -- --max-warnings=0`, `npx tsc --noEmit` et `git diff --check` finaux réussis (codes de sortie 0). Reconstruction et recette navigateur encore en cours.

Actions manuelles attendues : activer Places (New) et sa facturation dans Google Cloud, restreindre la clé à cette API et aux conditions d’utilisation de l’environnement serveur, puis définir `GOOGLE_PLACES_API_KEY` dans Vercel et redéployer. Vérifier ensuite la réponse réelle, ses attributions et sa disponibilité. Le lot n’ajoute aucun identifiant secret au dépôt et n’effectue aucune modification de fiche Google.

Fichiers de ce lot (17, comparés à la baseline phase 6) :

- `.env.example`
- `app/(main)/[citySlug]/page.tsx`
- `app/(main)/amenagement/page.tsx`
- `app/(main)/conception/page.tsx`
- `app/(main)/contact/page.tsx`
- `app/(main)/entretien/page.tsx`
- `app/(main)/layout.tsx`
- `app/(main)/mentions-legales/page.tsx`
- `app/(main)/page.tsx`
- `app/(main)/politique-cookies/page.tsx`
- `components/shared/google-reviews.tsx`
- `components/shared/structured-data.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`
- `lib/google-review-summary.ts`
- `lib/google-reviews.ts` (nouveau)
- `lib/seo.ts`
- `public/logos/google-maps.svg` (nouveau)

Manifest : [liste des fichiers de l’étape 6](/tmp/permapaysage-phase6/files.json).

Validation technique finale de l’étape 6 : `npm run lint -- --max-warnings=0`, `npx tsc --noEmit`, `npm run build` et `git diff --check` réussis, codes de sortie 0. Le build confirme les routes du layout principal en rendu serveur à la demande ; il génère 28 entrées pendant sa phase de prérendu. [Commandes et statuts](/tmp/permapaysage-phase6/commands.json). Les 48 contrôles de ce lot restent des simulations explicites ; la recette HTTP et navigateur indépendante du build corrigé est en cours et aucun appel Places réel n’a été validé faute de clé. La revue indépendante du code a identifié puis fait corriger la borne minimale des notes à 1 (contrat officiel 1.0–5.0, type number également pour un avis) ; 25 fixtures indépendantes passent après correction, sans défaut restant signalé.

Recette indépendante finale de l’étape 6 : **178 contrôles réussis**, dont 52 SSR/serveur, 94 navigateur, 31 sur un serveur Next avec Places simulé et un contrôle de frontière sur 59 chunks client ; aucune erreur JavaScript. Une réponse Places simulée 4,8/92 reste cohérente entre hero, confiance et schéma, avec un seul appel serveur par requête de rendu et absence de cache HTML. La contre-revue de 25 fixtures est réussie. [Rapport final indépendant](/tmp/permapaysage-suite-recette/phase6-final-report.json). Ces résultats ne constituent pas une validation de l’API Places réelle : la clé demeure absente.

### Étape 7 : demande de visite et page de confirmation

Baseline de 48 fichiers modifiés ou nouveaux sauvegardée dans `/tmp/permapaysage-phase7-baseline` avant ce lot. Palette et travail antérieur préservés ; aucun staging, commit, push ou envoi réel d’email.

- Formulaire : nom, téléphone, email et commune obligatoires. Téléphone accompagné de l’aide « Pour caler la visite offerte ». Type de besoin facultatif avec Visite conseil et présélections `visite`/`visite-conseil`/services ; surface et délai facultatifs avec les trois choix du brief ; message facultatif avec le placeholder exact. Labels associés à des identifiants stables, aide reliée par `aria-describedby`, erreur annoncée via `role="alert"`, formulaire occupé pendant l’envoi et titres H2.
- Envoi Web3Forms existant conservé côté navigateur : les nouveaux champs `commune`, `gardenSurface` et `timeframe` sont inclus dans le JSON. La véritable valeur du honeypot est lue ; un piège rempli est rejeté localement avant POST ou conversion. Un verrou empêche la réentrance et reste actif après confirmation pendant la navigation. Le succès nécessite simultanément HTTP positif et JSON objet `success === true` ; erreurs réseau, JSON ou API gardent le formulaire et une erreur claire.
- Bouton d’appel Cal.com au-dessus du formulaire, horaires « Du lundi au vendredi, 8h–19h », bouton d’envoi « Demander ma visite offerte ». Une soumission valide déclenche `clic_visite_offerte` avec emplacement `contact`, uniquement sous consentement.
- Après livraison confirmée par le fournisseur, le marqueur préparé à l’étape 3 est posé puis la navigation ouvre `/merci`. La page affiche le texte exact demandé, possède des métadonnées `noindex` et reste hors sitemap. Le contrôleur existant consomme une seule fois le marqueur pour `demande_visite` sous consentement ; une arrivée directe ou un rechargement ne vaut pas livraison confirmée.

Référence du fournisseur : [API Web3Forms, champs personnalisés et réponse de livraison](https://docs.web3forms.com/getting-started/api-reference). La clé d’accès publique propre à Web3Forms reste absente de l’environnement actuel : aucun email réel ni arrivée des champs dans une boîte réelle n’est présenté comme validé. Les réponses de livraison positives de la recette seront des simulations explicites ; configurer la clé et contrôler un email réel restent des actions manuelles.

Validation provisoire : lint strict et TypeScript réussis avant le dernier ajout de rejet local du honeypot ; vérifications finales en cours. Reconstruction unique et recette navigateur indépendante après arrêt coordonné de notre preview 3102. Les résultats définitifs seront ajoutés après cette recette.

Validation technique finale de l’étape 7 : `npm run lint -- --max-warnings=0`, `npx tsc --noEmit`, `npm run build` et `git diff --check` réussis, codes de sortie 0. `/merci` figure dans les routes du build, avec le layout principal dynamique. Les deux revues indépendantes anti-pattern et qualité du code passent ; la recette navigateur des soumissions simulées et conversions reste en cours. [Statuts](/tmp/permapaysage-phase7/commands.json).

Fichiers de ce lot (**4**, comparés à la baseline phase 7) :

- `app/(main)/contact/page.tsx`
- `app/(main)/merci/page.tsx`
- `components/shared/contact-form.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`

[Manifest de l’étape 7](/tmp/permapaysage-phase7/files.json).

Recette navigateur indépendante finale de l’étape 7 : **33 contrôles réussis**, cinq POST Web3Forms simulés, aucune erreur JavaScript. Payload des champs, champs requis/facultatifs, verrouillage, honeypot, réponses positives/négatives et conversions sous consentement contrôlés. Anti-pattern et qualité du code passent ; le parent a inspecté la capture et confirmé la continuité visuelle. [Rapport final](/tmp/permapaysage-suite-recette/phase7-browser-report.json). Aucun email réel n’a été envoyé ; la clé Web3Forms demeure absente et une livraison réelle reste à vérifier après configuration.

### Étape 8 : entretien, formules et estimation fiscale

Baseline de 49 fichiers modifiés ou nouveaux sauvegardée dans `/tmp/permapaysage-phase8-baseline`. Modifications ciblées sur la page Entretien et ses contenus, sans staging, commit, push ni écriture dans le CMS.

- Nouveau document Sanity facultatif `entretienFormules` dans les deux Studios, accessible dans leurs structures sous « Formules d’entretien » avec identifiant `entretien-formules`. Champs de chaque formule : nom, description/prestations et prix de départ avant crédit d’impôt, tous facultatifs ; trois entrées maximum. Publication désactivée par défaut. Query publiée avec revalidation 60 secondes, retour vide si absent/indisponible. Sans contenus client, deux emplacements sobres indiquent noms, prestations et prix à venir ; aucun nom marketing ni tarif inventé.
- Calculateur client léger : saisie en euros avec point ou virgule, conversion en centimes et format français. Les entrées vides, négatives, non finies, partielles ou avec plus de deux décimales ne produisent pas de montant trompeur ; résultat annoncé via `aria-live`, label et aide liés. Pour 200 €, le reste estimé est 100 € ; le crédit est plafonné à 2 500 €, correspondant au plafond annuel de 5 000 € de dépenses de petit jardinage. Au-delà, le résultat indique explicitement le plafond appliqué plutôt qu’un paiement systématique à moitié prix. Le calcul ne connaît pas les droits consommés, les autres dépenses ou aides ; il décrit cette limite et ne promet pas une avance immédiate automatique.
- Les promesses fiscales absolues du bloc existant et de la garantie « Transparence fiscale » sont remplacées par les conditions d’éligibilité, les plafonds, les droits disponibles et l’activation optionnelle de l’avance immédiate. Deux réponses fiscales publiées dans Sanity sont corrigées localement par leurs questions normalisées, sans modifier la production CMS ; les autres réponses sont conservées. Les liens d’autorité impots.gouv.fr et urssaf.fr sont visibles.
- H1 local : « Paysagiste à Vallet : entretien écologique de votre jardin ». Un H2 contient « jardinier », sans changer le titre global du catalogue de services.
- Témoignage fourni de Val Gasc repris sans date ou commune inventées. Le projet réel publié de La Chapelle-Heulin est présenté dans un bloc avec son propre titre et sa photo CMS ; l’avis n’est pas attribué à cette ville. Aucune paire avant/après de ce chantier n’est fournie actuellement : mention compacte et TODO, aucune attribution des images génériques à la commune. Une future paire renseignée sur ce même projet sera prioritaire.

Sources primaires : [crédit d’impôt et plafond spécifique jardinage, impots.gouv.fr](https://www.impots.gouv.fr/particulier/questions/comment-beneficier-du-credit-dimpot-pour-lemploi-dun-salarie-domicile), [périmètre des petits travaux de jardinage](https://www.servicesalapersonne.gouv.fr/tout-savoir-sur-les-services-la-personne/les-26-activites-de-services-la-personne), [avance immédiate Urssaf](https://www.urssaf.fr/accueil/services/services-particuliers/service-avance-immediate.html). Sources vérifiées dans la découverte du parent et relues pour impots.gouv.fr et le portail SAP ; le rechargement Urssaf a expiré lors de ce lot, sans modifier les conditions déjà vérifiées.

Validation provisoire : sept contrôles ciblés du véritable calcul passent, couvrant 200 → 100, virgule/point, conservation du total avec centimes impairs, entrées invalides, zéro, plafond et format euro français. [Rapport du calcul](/tmp/permapaysage-phase8/calculator-report.json). Lint strict, TypeScript et diffcheck réussis ; reconstruction puis recette navigateur/CMS simulé en cours. Pas de publication de tarifs ni de vérification fiscale propre à un foyer réel.

Contenus/actions attendus : renseigner et valider les deux ou trois formules et prix dans Sanity, fournir la paire avant/après du projet de La Chapelle-Heulin, faire valider les contenus fiscaux et l’activation effective de l’avance immédiate pour chaque situation concernée. Les autres TODO des étapes précédentes restent attendus.

Validation technique finale de l’étape 8 : `npm run lint -- --max-warnings=0`, `npx tsc --noEmit`, `npm run build` et `git diff --check` réussis, codes de sortie 0. [Statuts](/tmp/permapaysage-phase8/commands.json). Recette indépendante du navigateur et du contenu CMS simulé en cours.

Fichiers de ce lot (**13**, comparés à la baseline phase 8) :

- `app/(main)/entretien/page.tsx`
- `components/shared/maintenance-credit-calculator.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`
- `lib/maintenance-estimate.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/schemas/entretien-formules.ts`
- `lib/sanity/schemas/index.ts`
- `lib/sanity/structure.ts`
- `lib/sanity/types.ts`
- `lib/site-data.ts`
- `studio-permapaysage/schemaTypes/entretien-formules.ts`
- `studio-permapaysage/schemaTypes/index.ts`
- `studio-permapaysage/structure.ts`

[Manifest de l’étape 8](/tmp/permapaysage-phase8/files.json).

Recette finale indépendante de l’étape 8 : **26 contrôles navigateur réussis**, sept contrôles ciblés du calcul, lint strict, TypeScript et build réussis ; revues anti-pattern et qualité PASS. Le parent a inspecté les captures du calcul et de la preuve locale et confirmé la continuité visuelle. La phrase technique sur l’absence de date/commune du témoignage a été retirée du rendu, sa réserve étant conservée dans ce journal ; lint ciblé et diffcheck passent après cette suppression. Aucun prix publié ni situation fiscale réelle validée.

### Étape 9 : services et quatorze communes

Baseline de 60 fichiers modifiés ou nouveaux sauvegardée dans `/tmp/permapaysage-phase9-baseline` avant ce lot. Aucun staging, commit, push ou document CMS publié/modifié.

- Quatre pages ajoutées sur le gabarit existant : Divatte-sur-Loire, Aigrefeuille-sur-Maine, Gétigné et Le Landreau. Les centres et codes postaux viennent de l’API officielle des communes ; les distances et délais absents ne sont ni calculés ni inventés et leurs encadrés/mentions sont conditionnels. Chaque page possède une introduction de base distincte, fondée sur les services existants, avec TODO pour les informations locales à valider. Les dix contenus antérieurs sont conservés.
- Quatorze communes cohérentes entre pages, `generateStaticParams`, sitemap, accueil, zones des services et footer. Les quatre noms auparavant sans lien à l’accueil disposent maintenant de leur page ; le TODO devenu obsolète est supprimé. Les phrases « au Pallet/au Landreau/au Loroux-Bottereau » utilisent le helper commun de localisation.
- Modèle Sanity facultatif `pageVille` aux deux Studios et dans leurs structures : présentation locale, distance vérifiée, délai, coordonnées, réalisations référencées, témoignage local fourni avec attribution/source/date facultative, trois FAQ. La query utilise le slug paramétré et `publie == true`, avec revalidation de 60 secondes et dédoublonnage React pendant le rendu. Un document absent ou indisponible conserve la page de base.
- Les réalisations affichées proviennent des documents publiés réels : rattachement automatique par commune exacte après normalisation des accents, espaces et ponctuation, fusion des références CMS publiées et dédoublonnage par `_id`. Basse-Goulaine ne correspond pas à Haute-Goulaine. Les photos viennent du projet CMS ; aucune photo générique n’est relocalisée. Un projet sans photo conserve une indication propre plutôt qu’un faux média.
- Trois questions locales sont visibles avec réponses à venir lorsque le client n’a rien renseigné. Les réponses CMS vérifiées non vides sont prioritaires ; seul ce contenu réel visible peut produire un `FAQPage`. Un éventuel témoignage local apparaît uniquement lorsqu’auteur et texte sont renseignés, avec URI HTTPS sûr et date réelle valide si fournie.
- Carte Leaflet toujours différée : centrage sur la commune ou coordonnées CMS valides, `setView` actualisé lors d’une navigation entre communes. Le rayon de 25 km reste fixé au siège, [47.161664, -1.270126], coordonnées vérifiées IGN/BAN, indépendamment du centre de la vue. La commune et le siège ont des libellés distincts.
- Les trois pages services affichent la date éditoriale fixe du 5 octobre 2026 et un `FAQPage` pour leurs FAQ réelles visibles, après filtrage des réponses vides. H1 Aménagement exact : « Aménagement paysager à Vallet : terrasses, clôtures, plantations ».
- Les illustrations des cartes de services sur les communes ont été vues : malgré leurs noms de fichiers inversés, `entretien-espaces-verts.png` représente une terrasse et `amenagements-exterieurs.png` un jardinier taillant un arbuste. Le mapping visuellement correct est conservé ; les ALT indiquent une illustration sans l’attribuer à la commune.

Sources officielles des quatre communes : [API de découpage administratif](https://geo.api.gouv.fr/decoupage-administratif/communes), [géocodage IGN/BAN](https://ignf.github.io/cartes.gouv.fr-documentation/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/geocodage/). Résultats et coordonnées vérifiés dans la découverte `/tmp/permapaysage-suite-decouverte.md` ; ce sont des centres de communes, pas des distances routières.

Validation provisoire : lint strict, TypeScript et diffcheck réussis ; cinq contrôles ciblés du véritable helper couvrent les accents/ponctuations, Basse≠Haute-Goulaine, références publiées/dédoublonnage, références masquées/non résolues et liens HTTPS sûrs. [Rapport](/tmp/permapaysage-phase9/helper-report.json). Reconstruction et recette indépendante des quatorze pages, cartes et contenu CMS simulé en cours.

À compléter : informations locales vérifiées, distances/délais quand confirmés, références de réalisations, témoignages réellement attribués et réponses aux trois FAQ de chaque commune dans Sanity. Aucun sol, distance ou délai supplémentaire n’est présenté comme connu.

Validation technique finale de l’étape 9 : `npm run lint -- --max-warnings=0`, `npx tsc --noEmit`, `npm run build` et `git diff --check` réussis, codes de sortie 0. Le build génère 32 entrées pendant le prérendu, soit quatre de plus avec les nouvelles communes ; le layout principal demeure dynamique. [Statuts](/tmp/permapaysage-phase9/commands.json). La recette indépendante reste en cours.

Fichiers de ce lot (**20**, comparés à la baseline phase 9) :

- `app/(main)/[citySlug]/page.tsx`
- `app/(main)/amenagement/page.tsx`
- `app/(main)/conception/page.tsx`
- `app/(main)/entretien/page.tsx`
- `app/(main)/page.tsx`
- `components/layout/footer.tsx`
- `components/shared/intervention-map.tsx`
- `components/shared/zone-intervention.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`
- `lib/cities.ts`
- `lib/geo.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/schemas/index.ts`
- `lib/sanity/schemas/page-ville.ts`
- `lib/sanity/structure.ts`
- `lib/sanity/types.ts`
- `lib/site-data.ts`
- `studio-permapaysage/schemaTypes/index.ts`
- `studio-permapaysage/schemaTypes/page-ville.ts`
- `studio-permapaysage/structure.ts`

[Manifest de l’étape 9](/tmp/permapaysage-phase9/files.json). Le sitemap et les breadcrumbs existants consomment déjà `cityPages` : leurs liens sont actualisés par les nouvelles données, sans mutation supplémentaire de ces fichiers.

Recette finale de l’étape 9 : **100 contrôles navigateur et quatre contrôles indépendants du helper réussis**, aucune erreur JavaScript, revues anti-pattern et qualité PASS. Le parent a inspecté le rendu des communes et confirmé la continuité visuelle ; lint, TypeScript et build passent. [Rapport navigateur](/tmp/permapaysage-suite-recette/phase9-browser-report.json), [contrôles source/fixtures](/tmp/permapaysage-suite-recette/phase9-source-fixture-report.json). Le lot contient bien 20 fichiers, dont la liste est conservée ci-dessus. Les captures prises avant hydratation de la carte peuvent montrer son placeholder gris ; les contrôles sur l’instance Leaflet réelle passent. Une capture avec attente des tuiles réelles reste prévue à l’étape finale.

### Étape 10 : SEO technique, dates et noms des médias

Baseline de 65 fichiers modifiés ou nouveaux sauvegardée dans `/tmp/permapaysage-phase10-baseline`. Aucun staging, commit, push ou écriture dans Sanity.

- Title et description de l’accueil remplacés par les deux textes exacts du brief, sans changement du H1 visible.
- L’unique `LocalBusiness` du layout principal conserve son identifiant commun et les notes cohérentes de l’étape 6. Il comprend les coordonnées vérifiées du siège, quatorze objets `City`, un `GeoCircle` de 25 000 mètres, le lien `googleMapsUri`, les horaires et un catalogue des trois services avec URL absolues ; `priceRange` vaut `€€`.
- Chaque article CMS publié reçoit un seul `BlogPosting`, auteur Jessy Laderriere, publication réelle et mise à jour réelle. La date éditoriale facultative ajoutée aux deux Studios est prioritaire, puis `_updatedAt`, puis la publication ; une date vide, incorrecte ou impossible est ignorée. Les dates affichées et les métadonnées Open Graph utilisent le même helper, sans date courante inventée. Aucun document existant n’a été modifié.
- Dix-huit photos locales avant/après ont été vues sur une planche contact et renommées selon leur scène, sans commune incertaine ni intervention technique présumée. Les octets sont conservés : vérification SHA-256 des 18 fichiers. Les références des pages et tableaux historiques sont actualisées ; dix-huit redirections permanentes explicites conservent les anciennes URL sans dupliquer les fichiers. Les cinq noms exacts des photos du hero restent inchangés.
- Les séparateurs éditoriaux en tiret cadratin deviennent des deux-points dans les textes, métadonnées et ALT ; la ponctuation de la réserve juridique sur l’autorité publique devient une virgule, ses mots restent identiques. Les champs éditoriaux du CMS sont normalisés à l’affichage sans changer liens, références, dates ou documents. Les avis Google reçus de l’API ne passent pas par cette normalisation.
- `llms.txt` référence la FAQ, À propos et les quatorze pages de communes. Les ALT pertinents du hero contiennent déjà « paysagiste » et restent ceux demandés avec les photos exactes.

Validation technique : lint strict, TypeScript et diffcheck réussis ; sept contrôles ciblés passent sur les vrais helpers, dont dates vides/impossibles, cohérence des données structurées, absence de mutation des données CMS et conservation des 18 photographies. [Rapport](/tmp/permapaysage-phase10/helper-report.json). La recette indépendante reste en cours ; aucune validation de l’API Places réelle ni d’une conversion réelle n’est revendiquée.

Fichiers de ce lot (**64 chemins : 28 fichiers de code/documentation et 18 renommages correspondant à 36 chemins de médias**), comparés à la baseline phase 10 :

- `app/(main)/amenagement/page.tsx`
- `app/(main)/blog/[slug]/page.tsx`
- `app/(main)/blog/page.tsx`
- `app/(main)/conception/page.tsx`
- `app/(main)/conditions-generales-de-vente/page.tsx`
- `app/(main)/contact/page.tsx`
- `app/(main)/entretien/page.tsx`
- `app/(main)/faq/page.tsx`
- `app/(main)/mentions-legales/page.tsx`
- `app/(main)/page.tsx`
- `app/(main)/politique-cookies/page.tsx`
- `app/(main)/realisations/[slug]/page.tsx`
- `app/(main)/realisations/page.tsx`
- `app/layout.tsx`
- `app/llms.txt/route.ts`
- `app/studio/layout.tsx`
- `components/layout/footer.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`
- `lib/article-dates.ts`
- `lib/editorial-content.ts`
- `lib/legacy-image-redirects.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/schemas/article.ts`
- `lib/sanity/types.ts`
- `lib/seo.ts`
- `lib/site-data.ts`
- `next.config.ts`
- `studio-permapaysage/schemaTypes/article.ts`

Renommages (anciens chemins redirigés en permanence) :

| Ancien chemin | Nouveau chemin |
| --- | --- |
| `public/photos-entretien/avant/av-01.jpg` | `public/photos-entretien/avant/allee-pavee-avant-desherbage.jpg` |
| `public/photos-entretien/apres/ap-01.jpg` | `public/photos-entretien/apres/allee-pavee-apres-desherbage.jpg` |
| `public/photos-entretien/avant/av-02.jpg` | `public/photos-entretien/avant/haie-en-bordure-de-route-avant-taille.jpg` |
| `public/photos-entretien/apres/ap-02.jpg` | `public/photos-entretien/apres/haie-en-bordure-de-route-apres-taille.jpg` |
| `public/photos-entretien/avant/av-03.jpg` | `public/photos-entretien/avant/haie-de-jardin-avant-taille.jpg` |
| `public/photos-entretien/apres/ap-03.jpg` | `public/photos-entretien/apres/haie-de-jardin-apres-taille.jpg` |
| `public/photos-entretien/avant/av-04.jpg` | `public/photos-entretien/avant/pelouse-devant-maison-avant-tonte.jpg` |
| `public/photos-entretien/apres/ap-04.jpg` | `public/photos-entretien/apres/pelouse-devant-maison-apres-tonte.jpg` |
| `public/photos-entretien/avant/av-05.jpg` | `public/photos-entretien/avant/pelouse-entre-haies-avant-tonte.jpg` |
| `public/photos-entretien/apres/ap-05.jpg` | `public/photos-entretien/apres/pelouse-entre-haies-apres-tonte.jpg` |
| `public/photos-entretien/avant/av-06.jpg` | `public/photos-entretien/avant/massif-devant-palissade-avant-entretien.jpg` |
| `public/photos-entretien/apres/ap-06.jpg` | `public/photos-entretien/apres/massif-devant-palissade-apres-entretien.jpg` |
| `public/photos-entretien/avant/av-07.jpg` | `public/photos-entretien/avant/haie-au-dessus-muret-avant-taille.jpg` |
| `public/photos-entretien/apres/ap-07.jpg` | `public/photos-entretien/apres/haie-au-dessus-muret-apres-taille.jpg` |
| `public/photos-entretien/avant/av-08.jpg` | `public/photos-entretien/avant/jardin-devant-baie-vitree-avant-tonte.jpg` |
| `public/photos-entretien/apres/ap-08.jpg` | `public/photos-entretien/apres/jardin-devant-baie-vitree-apres-tonte.jpg` |
| `public/photos-entretien/avant/av-09.jpg` | `public/photos-entretien/avant/terrasse-en-bois-avant-intervention.jpg` |
| `public/photos-entretien/apres/ap-09.jpg` | `public/photos-entretien/apres/terrasse-en-bois-apres-intervention.jpg` |

[Manifest complet de l’étape 10](/tmp/permapaysage-phase10/files.json), [contrôle des médias et SHA-256](/tmp/permapaysage-phase10/images.json). Les contenus encore attendus restent ceux des étapes précédentes : portrait, photos dédiées, réponses et données éditoriales locales ; aucun nom de fichier ne leur attribue une provenance non prouvée.

Validation technique finale de l’étape 10 : reconstruction après correction des dates facultatives réussie, codes de sortie lint strict/TypeScript/build/diffcheck à 0. [Statuts](/tmp/permapaysage-phase10/commands.json). La recette indépendante reste en cours.

Recette finale de l’étape 10 : **108 contrôles navigateur réussis**, aucune erreur JavaScript, revues anti-pattern et qualité PASS ; lint strict, TypeScript et build réussis. Les cinq ALT exacts du hero contiennent bien « paysagiste ». [Rapport navigateur](/tmp/permapaysage-suite-recette/phase10-browser-report.json).

### Étape 11 : chargements différés et médias adaptés

Baseline de 110 chemins modifiés/nouveaux/supprimés conservée dans `/tmp/permapaysage-phase11-baseline`. Aucun staging, commit ou push. Les mesures de référence mobile sur le build précédent, sans mocks réseau, donnaient Performance 89 sur l’accueil, 92 sur Entretien, 97 sur Contact et 97 sur une commune ; la recette du nouveau build est en cours.

- Carte : `IntersectionObserver` déclenche le montage du composant dynamique uniquement à 200 pixels du viewport. La hauteur de 420 pixels et la région accessible sont conservées avant chargement ; le repli des navigateurs sans cet observer monte la carte après le premier rendu. La carte conserve centrage des communes, rayon du siège, attribution OpenStreetMap et contrôles de zoom.
- Google Analytics : le SDK externe est maintenant chargé uniquement après consentement accepté. Le script inline conserve le consentement initial refusé et la file `gtag`. Un helper partagé lit le cookie réel, applique le consentement, configure une seule fois puis place les événements acceptés dans la file ; il empêche la perte d’une conversion pendant le bref snapshot d’hydratation du banner. Refus/révocation arrêtent les événements, et une nouvelle acceptation ne rejoue pas les événements ignorés. Les quatre événements et leurs emplacements sont conservés. Il s’agit du comportement technique du mode de consentement Basic, pas d’une déclaration générale de conformité juridique.
- Logo : variante WebP de 192 × 192 pixels, **3 730 octets**, et icône Apple PNG optimisée, **4 021 octets**. Géométrie conservée par redimensionnement proportionnel, palette PNG 128 couleurs puis encodage WebP sans perte. Header, footer, métadonnées, manifest et schémas utilisent les nouveaux fichiers ; le PNG original reste disponible. [Comparatif visuel](/tmp/permapaysage-phase11/logo-before-after.png).
- Trois illustrations de communes converties en WebP de largeur maximale 900 pixels, qualité 85 : Conception 122 124 octets, Terrasse 43 754 octets, Entretien 25 352 octets. Le mapping visuellement correct et les originaux PNG sont conservés. [Comparatif](/tmp/permapaysage-phase11/illustrations-before-after.png).
- `sizes` ajouté aux trois hero de services et aux images des communes, avec plafonds tenant compte du container et du cadre des photos. Les polices passent déjà par `next/font`, sans ajout de fournisseur ou dépendance.
- Contrastes ciblés : liens et textes du footer éclaircis, bouton Refuser utilisant le texte secondaire lisible, numéros décoratifs accueil/communes/Entretien contrastés et masqués aux technologies d’assistance. La structure et les couleurs de la charte restent les mêmes.

Sources primaires : [principes du consentement Google](https://developers.google.com/tag-platform/security/concepts/consent-mode), [configuration du consentement](https://developers.google.com/tag-platform/security/guides/consent). Les sources sont aussi référencées dans le helper.

Validation technique : lint strict, TypeScript, build et diffcheck réussis, codes de sortie 0. Cinq contrôles ciblés des vrais helpers passent : absence de configuration/événements sous refus, configuration avant conversion avec cookie accepté pendant hydratation, configuration unique, révocation/réacceptation sans replay et tailles des logos. [Rapport](/tmp/permapaysage-phase11/helper-report.json). La recette indépendante réseau/consentement/cartes et les nouvelles mesures Lighthouse sont en cours ; aucun score final n’est anticipé.

Fichiers du lot (**20**, comparés à la baseline phase 11) :

- `app/(main)/[citySlug]/page.tsx`
- `app/(main)/amenagement/page.tsx`
- `app/(main)/conception/page.tsx`
- `app/(main)/entretien/page.tsx`
- `app/(main)/page.tsx`
- `app/layout.tsx`
- `app/manifest.ts`
- `components/layout/footer.tsx`
- `components/layout/header.tsx`
- `components/shared/CookieBanner.tsx`
- `components/shared/GoogleAnalytics.tsx`
- `components/shared/intervention-map-lazy.tsx`
- `doc/chantier-mise-a-jour-2026-10-04.md`
- `lib/analytics-events.ts`
- `lib/seo.ts`
- `public/logo-apple.png`
- `public/logo.webp`
- `public/services/amenagements-exterieurs.webp`
- `public/services/conception-jardin.webp`
- `public/services/entretien-espaces-verts.webp`

[Manifest de l’étape 11](/tmp/permapaysage-phase11/files.json). Les médias exacts du hero, les contenus en attente et les intégrations réellement non configurées restent documentés dans les lots précédents.

Recette finale de l’étape 11 : **41 contrôles réussis**, dont 32 navigateur avec GA/Cal/Web3Forms simulés pour les interactions et neuf sur le SDK/calendrier Cal réel, sans réservation. Aucune erreur JavaScript de page ; revues anti-pattern et qualité PASS. Le parent a inspecté les captures du hero, de la carte avec ses vraies tuiles et du logo. [Rapport final](/tmp/permapaysage-suite-recette/phase11-final-report.json).

Lighthouse **12.8.2**, mobile simulé 412 × 823/DPR 1,75, RTT 150 ms, débit 1 638,4 kbps, CPU ×4, build de production local, profils Chrome neufs, aucun mock/interception/blocage réseau, aucun choix de consentement, caches CMS/images chauds ; une mesure par route, pas une médiane ni une mesure du site déployé :

| Route | Performance | Accessibilité | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 91 | 100 | 100 | 3,457 s | 26 ms | 0 |
| `/entretien` | 90 | 100 | 100 | 3,466 s | 16,5 ms | 0 |
| `/contact` | 94 | 100 | 100 | 3,092 s | 17,5 ms | 0 |
| `/paysagiste-divatte-sur-loire` | 93 | 100 | 100 | 3,172 s | 19 ms | 0 |

[Mesures complètes](/tmp/permapaysage-suite-recette/lighthouse-final/summary.json), [mesures de référence](/tmp/permapaysage-suite-recette/lighthouse-baseline/summary.json). Aucun chargement initial de Cal, GA externe ou tuiles OSM dans ces mesures ; le hero utilise une seule image, d’environ 80 Ko transférés pour l’accueil mobile. Les bonnes pratiques restent à 96 : le script Vercel Insights répond 404 dans ce preview local hors plateforme et provoque un rejet MIME, incident identique à la référence. Ce n’est pas présenté comme une panne de production corrigée. Les contrastes passent sur les pages mesurées, sans revendiquer une certification WCAG générale.

### Étape 12 : bilan et audit final terminés localement

Baseline de 118 chemins conservée dans `/tmp/permapaysage-phase12-baseline`. Ce lot documentaire modifie seulement `doc/chantier-mise-a-jour-2026-10-04.md`. Les contrôles techniques du dernier code passent ; la campagne finale indépendante des routes, navigation, métadonnées et accessibilité est terminée avec 159 contrôles réussis sur 36 routes réelles. Aucun staging, commit, push, déploiement ou écriture Sanity.

Les listes exactes des fichiers de chaque étape sont conservées dans ce document : 24 fichiers pour Cal/photos ; 16 pour l’accueil et À propos ; 17 pour Places ; quatre pour le formulaire ; 13 pour Entretien ; 20 pour les communes ; 64 chemins pour le SEO/18 renommages ; 20 pour la performance. Les manifests temporaires restent des pièces de recette complémentaires ; ils ne remplacent pas ces listes dans le dépôt. Les fichiers communs à plusieurs étapes figurent dans chaque lot concerné, les comptes ne sont pas un total de fichiers distincts.

#### TODO CONTENU restants dans le code

| Fichier | Repère exact | Contenu attendu |
| --- | --- | --- |
| `app/(main)/page.tsx` | `recevoir et valider les réponses exactes des quatre questions, dont le budget.` | Réponses de la FAQ d’accueil, notamment budget, sans fourchette inventée. |
| `app/(main)/page.tsx` | `photos de chantier dédiées aux trois services, fournies par Jessy.` | Trois photos dédiées ; les trois photos réelles provisoires restent fidèles à leur scène. |
| `app/(main)/page.tsx` | `nouvelles paires avant/après avec localisation et légendes validées par Jessy.` | Paires et attribution validées ; priorité aux deux images d’un même projet CMS, puis paire locale vérifiée non localisée. |
| `app/(main)/page.tsx` | `remplacer la photo actuelle du projet de Clisson par la nouvelle sélection de Jessy.` | Nouvelle photo de Clisson ; la photo CMS actuelle correspond réellement au projet. |
| `app/(main)/page.tsx` | `photo de Jessy et de l'équipe sur un chantier.` | Portrait d’équipe pour le bloc Qui est Jessy. |
| `app/(main)/entretien/page.tsx` | `renseigner les noms, prestations et prix validés dans le document Sanity Formules d’entretien.` | Deux ou trois formules/prix ; les deux emplacements restent sans noms marketing ni tarifs inventés. |
| `app/(main)/entretien/page.tsx` | `fournir les deux photos avant/après du chantier réel de La Chapelle-Heulin.` | Paire propre à ce chantier, sans réattribuer une autre paire. |
| `app/(main)/[citySlug]/page.tsx` | `renseigner les trois réponses locales vérifiées dans Sanity pour chaque commune.` | Trois FAQ locales ; un placeholder ne produit pas de `FAQPage`. |
| `lib/site-data.ts` | `compléter les informations locales, distances et délais vérifiés de ces quatre communes.` | Données réelles de Divatte, Aigrefeuille, Gétigné et Le Landreau. |

Le témoignage Val Gasc est celui fourni par le client, sans date ni commune ajoutées ; il est distinct du projet local. Les cinq photos exactes du hero ne sont plus attendues et n’ont plus de TODO. Les nouveaux modèles de contenu sont facultatifs : pages et placeholders restent utilisables tant que ces documents ne sont pas publiés.

#### Actions manuelles et limites des intégrations

- **Vercel/domaines** : publier le travail local lorsque son propriétaire le décide ; garder `NEXT_PUBLIC_SITE_URL=https://www.permapaysage.fr`, domaine principal avec www, remplacer les deux redirections 307 constatées par 301/308 permanentes conservant chemin et paramètres, puis contrôler toutes les variantes HTTP/HTTPS.
- **Places (New)** : activer API/facturation, restreindre la clé à Places (New) et à son usage serveur, définir `GOOGLE_PLACES_API_KEY` dans Vercel puis redéployer. Vérifier alors la vraie réponse et ses attributions. La clé reste absente ici ; les tests API étaient simulés, le repli 5,0/37 sans avis détaillés est visible. Les notes/avis n’ont pas de cache persistant 24 h.
- **Web3Forms** : définir `NEXT_PUBLIC_WEB3FORMS_KEY`, clé publique prévue par ce fournisseur, puis contrôler un envoi réel, la réception de tous les champs et la redirection `/merci`. Les POST de recette étaient interceptés ; aucun email réel envoyé et aucune boîte contrôlée.
- **Cal.com** : le vrai calendrier affiche Jessy et l’appel de 15 minutes, des disponibilités et le contenu attendu ; aucun créneau n’a été réservé. Vérifier depuis le compte les droits, calendrier connecté et notifications. La fermeture native depuis l’hôte et le bouton Fermer sont disponibles ; Escape focalisé dans l’iframe tierce ne traverse pas son origine lorsque le SDK n’émet pas `__closeIframe`, limite externe documentée dans la phase 3.
- **GA4** : le SDK et les quatre événements sont configurés avec consentement ; les événements/confirmations de recette étaient simulés et la réception en production n’est pas validée. Dans la propriété `G-Z6SF5771E1`, marquer `demande_visite` et `rdv_appel_confirme` comme événements clés/conversions, puis vérifier DebugView/temps réel après publication et consentement. Le champ historique `NEXT_PUBLIC_GA_ID` de l’exemple n’est pas la source de l’ID actuellement configuré dans le code.
- **Sanity** : déployer si nécessaire les deux Studios avec les modèles locaux Article/date de mise à jour, Formules d’entretien et Page ville ; renseigner/valider/publier les contenus attendus. Pour les communes, compléter `paragrapheLocal`, `distanceDepuisVallet`, `delaiIntervention`, les références de réalisations, un `avisLocal` réellement vérifié et les trois réponses de `faqLocale` ; toute distance, délai ou attribution doit être fourni ou validé. Aucune écriture de production ni déploiement de Studio n’a été effectué par ce chantier.
- **Search Console** : vérifier la propriété officielle `.fr`, soumettre `/sitemap.xml`, demander la réindexation accueil/services et la suppression de l’ancien site Odoo selon le brief. Vérifier les liens `.fr` des fiches Google et UNEP.
- **Mesures après publication** : contrôler les URLs officielles, Vercel Insights, envoi réel, agenda et réception GA4 ; relancer Lighthouse dans les conditions réelles. Les mesures locales ne sont pas présentées comme des mesures du site déployé ni comme une certification d’accessibilité.

#### Validation finale locale

Recette indépendante finale : **159 contrôles réussis sur 36 routes réelles**, aucune erreur JavaScript de page. Accueil, trois services, quatorze communes, trois articles et six projets CMS publiés, FAQ/À propos, pages légales et `/merci` sont contrôlés ; HTTP 200, H1 unique, hiérarchie Hn, repère `main`, langue, title/canonical officiels et CTA sont vérifiés. Le sitemap contient les vraies publications et les quatorze communes, exclut `/merci` et les deux anciens articles inexistants (404). Menu mobile, navigation clavier, FAQ et comparateur passent ; sept combinaisons de couleurs contrôlées atteignent au moins 4,5:1. Les vraies tuiles OSM et le calendrier Cal sont inspectés dans la recette de l’étape 11.

[Rapport final des routes et interactions](/tmp/permapaysage-suite-recette/phase12-browser-report.json), [synthèse finale indépendante](/tmp/permapaysage-suite-recette/phase12-final-report.json), [état Git contrôlé](/tmp/permapaysage-suite-recette/phase12-git-report.json). Branche `main`, HEAD `9a3ae01`, index vide ; `git diff --check` passe. Aucun staging, commit ni push de ce chantier. Le dernier code reconstruit à l’étape 11 conserve lint strict, TypeScript et build réussis ; l’étape 12 ne modifie que ce journal et n’exige pas de reconstruction supplémentaire.

Pièces de recette consolidées, sans additionner les campagnes qui se recouvrent :

| Lot | Résultat indépendant | Pièces |
| --- | --- | --- |
| 3 + photos | 26 contrôles simulés, neuf SDK Cal réel, quatorze photos | [Cal simulé](/tmp/permapaysage-suite-recette/phase3-report.json), [Cal réel](/tmp/permapaysage-suite-recette/phase3-real-report.json), [photos](/tmp/permapaysage-suite-recette/photos-report.json) |
| 4 et 5 | 109 contrôles puis 40 contre-vérifications, huit interactions | [Accueil](/tmp/permapaysage-home-recette/report.json), [contre-recette](/tmp/permapaysage-home-recette/final-targeted-report.json), [interactions](/tmp/permapaysage-home-recette/interactions.json) |
| 6 | 178 contrôles indépendants ; Places simulé, clé absente | [Synthèse Places](/tmp/permapaysage-suite-recette/phase6-final-report.json) |
| 7 | 33 contrôles, cinq POST simulés, aucun email | [Formulaire](/tmp/permapaysage-suite-recette/phase7-browser-report.json) |
| 8 | 26 contrôles navigateur, sept calculs | [Entretien](/tmp/permapaysage-suite-recette/phase8-browser-report.json), [calculs](/tmp/permapaysage-phase8/calculator-report.json) |
| 9 | 100 contrôles navigateur, quatre contrôles source/fixtures indépendants | [Communes](/tmp/permapaysage-suite-recette/phase9-browser-report.json), [fixtures](/tmp/permapaysage-suite-recette/phase9-source-fixture-report.json) |
| 10 | 108 contrôles navigateur, sept helpers et conservation des 18 médias | [SEO](/tmp/permapaysage-suite-recette/phase10-browser-report.json), [helpers](/tmp/permapaysage-phase10/helper-report.json), [médias](/tmp/permapaysage-phase10/images.json) |
| 11 | 41 contrôles ; Lighthouse mobile 91/90/94/93, Accessibilité/SEO 100 | [Chargements/SDK](/tmp/permapaysage-suite-recette/phase11-final-report.json), [Lighthouse sans mocks](/tmp/permapaysage-suite-recette/lighthouse-final/summary.json) |
| 12 | 159 contrôles sur 36 routes, aucune erreur JavaScript de page | [Audit final](/tmp/permapaysage-suite-recette/phase12-browser-report.json) |

La recette locale est terminée. Les clés absentes, contenus client, réglages de compte et actions de publication ci-dessus restent à effectuer ; les tests simulés ne valent ni réception d’email réel, ni réservation réelle, ni réception de conversion en production. [Manifest documentaire de l’étape 12](/tmp/permapaysage-phase12/files.json).

### Ajustements visuels du 5 octobre : motifs, séparateurs et photos en grand

Essai local demandé après la recette finale : conservation de la structure, ajout d’un feuillage SVG discret dans le hero, les services de l’accueil et les sections finales de prise de contact. Le motif reste derrière le contenu, sans interaction ni annonce aux lecteurs d’écran ; son opacité diminue sur mobile. Les traits décoratifs des surtitres sont retirés dans tout le site, ainsi que plusieurs séparateurs de l’accueil et de la section Google. Les contours utiles des boutons et cartes restent présents.

Le carrousel d’accueil propose « Voir en grand ». Une boîte de dialogue native couvre la fenêtre et affiche la photo entière sans recadrage ; navigation par boutons, flèches du clavier ou glissement tactile. Échap et le bouton Fermer ferment la galerie, rétablissent le défilement et rendent le focus au bouton d’ouverture. L’arrière-plan de la page est inerte pendant l’ouverture ; le navigateur peut conserver l’accès à ses propres commandes à la limite de tabulation. La photo agrandie est montée seulement après ouverture et les autres photos ne sont pas préchargées.

Fichiers de ce lot : `app/globals.css`, `app/(main)/page.tsx`, `components/shared/hero-carousel.tsx`, `components/shared/google-reviews.tsx`, `components/sections/cta.tsx`, `public/motifs/feuillage.svg`, ainsi que ce journal.

Validation : lint strict, TypeScript et build de production réussis ; `git diff --check` passe. **44 contrôles navigateur réussis** sur ordinateur (1440 × 1000) et mobile tactile (390 × 844), aucune erreur JavaScript de page. Contrôles du chargement initial d’une seule photo, absence d’image agrandie avant ouverture, taille de la galerie, navigation clavier et tactile, page inerte, fermeture/reprise du focus, défilement et absence de débordement horizontal. Captures de l’accueil, des services et de la galerie inspectées, ainsi que la section finale partagée sur `/entretien`. [Rapport de recette](/tmp/permapaysage-visual-refinement/report.json), [accueil ordinateur](/tmp/permapaysage-visual-refinement/hero-desktop.png), [galerie ordinateur](/tmp/permapaysage-visual-refinement/gallery-desktop.png), [galerie mobile](/tmp/permapaysage-visual-refinement/gallery-mobile.png).

Aucun staging, commit, push ni déploiement. Aperçu de production local relancé sur `http://127.0.0.1:3102/`.

### Activation locale des avis Google du 5 octobre

La clé avait été renseignée dans `.env.example`, fichier non chargé par Next.js. Déplacée dans `.env.local` (ignoré par Git, permissions 600), puis retirée du modèle versionné. Aperçu local redémarré sans modification du code ni reconstruction, la lecture étant effectuée à l’exécution côté serveur.

Vrai appel Places (New) réussi : HTTP 200, établissement PERMAPAYSAGE à Vallet, note 5/5, 37 avis et cinq avis fournis par Google. Vérification dans le navigateur : trois cartes issues de la vraie réponse, trois liens individuels, dates, ouverture de « Lire la suite », aucun repli affiché et aucune erreur JavaScript de page. Clé absente du HTML retourné. La vérification Google locale n’est donc plus seulement simulée ; la configuration Vercel et la validation du site déployé restent à effectuer. Aucune clé ni réponse API sauvegardée dans ce journal ; aucun staging, commit, push ou déploiement.

### Simplification des textes visibles

À la demande du propriétaire, retrait du paragraphe technique expliquant la sélection des avis Google. Le bouton d’agrandissement du carrousel affiche seulement une icône dans un cercle de 44 px, assortie d’une infobulle et du libellé accessible « Voir les photos en grand ». La galerie garde son fonctionnement.

### Présentation des avis : badges et étoiles

Ajout d’un badge à coche près du nom des auteurs des avis issus de l’API Google, avec le libellé accessible et l’infobulle « Avis publié sur Google Maps ». Ce badge indique la provenance de l’avis et ne revendique pas une identité ou un achat certifié par Google. Les notes individuelles et la note globale sont représentées par cinq étoiles, dont le remplissage reflète la note réelle, y compris une éventuelle fraction. Retrait de la date de visite dans les cartes ; la date de publication et les liens de source restent affichés.

Validation de ce lot : lint ciblé et build de production avec TypeScript réussis ; contrôles navigateur à 1440, 390 et 320 px (trois badges, cinq étoiles par note, dates de publication conservées, aucune date de visite, aucun débordement horizontal ni erreur JavaScript). Couleur ocre des étoiles contrôlée dans le rendu final, captures ordinateur/mobile inspectées. Aperçu relancé sur le port 3102 ; aucun push.

### Page contact et typographie des titres

Remplacement de Fraunces par Lora pour tous les titres et les éléments utilisant `font-serif`. DM Sans reste la police du texte courant. Lora est intégrée avec `next/font`, servie localement par Next.js et chargée avec `display: swap` ; aucun appel Google Fonts depuis le navigateur.

La page contact adopte un fond sauge léger et le motif végétal existant, une introduction alignée à gauche et trois repères simples (visite offerte, sans engagement, réponse sous 48 h). Sur ordinateur, photo authentique de jardin et présentation de Jessy à gauche, formulaire à droite. Les quatre coordonnées sont regroupées sans quatre cartes distinctes ; la réservation d’appel devient une alternative en bas du bloc de contact. Sur mobile, le formulaire apparaît avant ce bloc, également dans l’ordre du document et du clavier.

Le formulaire présente deux groupes sémantiques, « Vos coordonnées » et « Votre projet », avec un bouton d’envoi sur toute la largeur. Les quatre champs obligatoires, champs facultatifs, valeurs, préremplissages, validation, envoi, consentement et confirmation restent inchangés. Aucun portrait de Jessy inventé ; la photo utilisée montre réellement la mare et la terrasse déjà intégrées à l’accueil.

Fichiers : `app/layout.tsx`, `app/globals.css`, `app/(main)/contact/page.tsx`, `components/shared/contact-form.tsx`, et ce journal.

Recette initiale : **80 contrôles réussis**, six pages représentatives à 1440 et 390 px (accueil, contact, entretien, commune, blog et réalisations), plus contact à 320 px. Police Lora réellement chargée, un H1, absence de débordement, groupes et champs, préremplissage et disposition adaptative vérifiés. Envois Web3Forms interceptés : validation native, refus avec conservation des valeurs, transmission des huit champs et confirmation `/merci` ; aucun email réel envoyé. Captures contact et accueil inspectées sur ordinateur/mobile. [Rapport](/tmp/permapaysage-contact-lora/report.json), [contact ordinateur](/tmp/permapaysage-contact-lora/contact-1440.png), [contact mobile](/tmp/permapaysage-contact-lora/contact-390.png).

Dernier ajustement : formulaire placé avant le bloc secondaire dans le DOM, tout en gardant la colonne droite sur ordinateur. Vérification finale du parcours clavier : le premier champ après le titre est bien Nom. Lint strict, build final avec TypeScript et `git diff --check` réussis. Aperçu relancé sur le port 3102. Aucun staging, commit, push ni déploiement.

### Ordre de l’accueil : avis après les réalisations

Le propriétaire remplace explicitement l’ordre initial du brief : Hero → Services → Avant/après et réalisations → Avis et chiffres clés → Comment ça se passe, puis la suite existante. La section `GoogleReviews` est déplacée dans `app/(main)/page.tsx` sans dupliquer ses contenus ; la note et le compteur Google restent dans le hero. Cette décision ultérieure prévaut sur la bande de confiance prévue en deuxième position à l’étape 5 du brief.

Validation : lint ciblé, build avec TypeScript et `git diff --check` réussis. Ordre réel des sections contrôlé dans le navigateur, une seule section Avis avec trois avis issus de Google, note du hero conservée, absence de débordement à 1440 et 390 px. Captures du nouvel enchaînement Hero/Services inspectées. Aperçu local relancé, aucun push.

### Cartes des quatre étapes

À la demande du propriétaire, les quatre étapes de « Comment ça se passe » reçoivent un fond crème (`bg-card`), des coins arrondis et 24 px d’espace intérieur, sans bordure ni trait décoratif supplémentaire. Espacement de grille ajusté pour conserver la lisibilité des colonnes. La photo de Jessy et de l’équipe sur le terrain est bien demandée dans le brief initial (étape 5, point 6) ; son emplacement reste en attente du média fourni.

Validation : lint ciblé, build avec TypeScript et `git diff --check` réussis. Fonds, absence de bordure et absence de débordement contrôlés à 1440, 1024 et 390 px ; captures ordinateur/mobile inspectées. Aperçu local relancé, aucun push.

### Reprise du 6 octobre : bilan, préproduction et présentation client

État vérifié : branche `refonte-site-octobre-2026`, commit `3bb2bfc`, poussée sur GitHub le 5 octobre. Vercel a automatiquement créé un déploiement Preview réussi de ce commit. La production déclarée par GitHub est toujours au commit `9a3ae01` (étape 2, nouveaux boutons/en-tête), et le site public conserve effectivement l’ancien H1 et l’ancien ordre des sections. La refonte complète n’a pas remplacé la production.

- Production : `https://www.permapaysage.fr/`, HTTP 200, ancien accueil, corrections techniques et étape 2 déjà publiées.
- Preview : `https://permapaysage-6krzz6h09-raphplts-projects.vercel.app/`, déploiement réussi, accès anonyme redirigé vers la connexion Vercel. Ce lien seul n’est donc pas prêt à envoyer au client ; créer un lien « Anyone with the link » dans Share et vérifier l’accès en navigation privée. Aucun token Vercel disponible dans cette session ; seuls les statuts GitHub et la navigation publique ont été consultés.

Les deux environnements sont bien distincts : la préproduction convient à la revue de Jessy, puis les changements validés pourront être publiés. Documentation officielle : https://vercel.com/docs/deployments/environments et https://vercel.com/docs/deployments/sharing-deployments.

#### Reste à compléter

Contenus client : réponses/validation des quatre FAQ d’accueil (crédit d’impôt, budget, délais, commune) ; photo de Jessy et de l’équipe ; deux ou trois formules d’entretien avec prestations et tarifs ; trois photos dédiées aux services ou validation de la sélection actuelle ; nouvelle image de Clisson ; paires avant/après avec attribution vérifiée, notamment La Chapelle-Heulin ; contenu local et FAQ des communes. Les cinq photos du hero sont déjà intégrées et les vrais avis Google ont été vérifiés localement.

Configuration et recette distante : renseigner `GOOGLE_PLACES_API_KEY` dans l’environnement Preview puis Production au moment voulu ; contrôler `NEXT_PUBLIC_WEB3FORMS_KEY` et, avec autorisation explicite, l’envoi et la réception d’une vraie demande ; vérifier les réglages de calendrier et notifications Cal ; déployer les modèles Sanity nécessaires et publier les contenus ; valider GA4 et ses événements clés, les redirections/domaines, puis Search Console et les performances après publication. L’absence de Web3Forms dans `.env.local` ne démontre pas son absence dans Vercel ; les variables distantes ne sont pas vérifiées ici.

#### Retour au rendu de production précédent, préparé séparément

Préparation locale dans `/tmp/permapaysage-retour-production`, branche `retour-production-version-validee`, basée sur `origin/main`. Annulation de `9a3ae01` préparée sans commit : retour aux anciens boutons/styles tout en conservant les corrections techniques de l’étape 1. Le résultat correspond exactement à l’arbre du commit `d8c7176`. La branche de refonte et ses changements sont conservés ; aucun changement de production n’a été effectué. Le choix entre ce retour visuel et l’ancienne version exacte du mois de mai est demandé au propriétaire.

Mail client préparé dans `doc/mail-avancement-jessy.txt`, avec FAQ, portrait, formules et photos manquantes. Le lien de partage reste à insérer après vérification. Aucun email ni invitation n’a été envoyé.

Validation de la préparation de retour : dépendances installées dans le worktree isolé ; lint strict et compilation de production avec TypeScript réussis, 39 pages générées. L’installation initiale avait omis les dépendances de développement via la configuration npm locale ; installation complète avec `--include=dev`, puis nouvelle compilation réussie. Aucun changement du code de la refonte ni de la production. L’annulation reste préparée localement sans commit ni push, dans l’attente du choix de version.

### Retour de production explicite du 6 octobre

Le propriétaire a demandé de remettre la version publiée avant la refonte d'octobre. La préparation limitée aux boutons est remplacée par la restauration du code du commit `e2af080`, dernière version publiée avant le chantier. Documents conservés, code identique à ce commit. Nouveau commit `ff84523` créé puis poussé sur `main`, sans réécriture d'historique. La refonte `3bb2bfc` reste sur sa branche et sa Preview.

Build de production et TypeScript réussis (39 pages). Le lint de cette version historique échoue avant analyse, car son Studio importe une configuration absente des dépendances racine ; ce défaut préexistant est conservé dans ce retour exact. `git diff --cached --check` et comparaison du code avec `e2af080` réussis.

Déploiement Vercel confirmé réussi, commit `ff84523`, environnement Production, identifiant GitHub `6880811301`. Vérification réelle de `https://www.permapaysage.fr/` : ancien bouton « Obtenir un devis » revenu, nouveau « Réserver un appel » absent. Huit routes en HTTP 200 : accueil, contact, entretien, conception, aménagement, réalisations, Vallet et sitemap. La branche distante de refonte reste au commit `3bb2bfc`. Aucun email, invitation, rendez-vous ni envoi de formulaire effectué.
