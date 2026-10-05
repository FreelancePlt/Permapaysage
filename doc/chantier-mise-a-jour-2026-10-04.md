# Chantier de mise à jour Permapaysage

Préparation du 4 octobre 2026. Source complète : [brief du client](brief-mise-a-jour-2026-10-04.md). Le brief prévaut sur les anciennes consignes et les anciennes données de `claude.md` et `doc/`.

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

Garde-fous : conserver les règles React ; exclure seulement les artefacts générés ; préserver SSR et hydratation. Commit distinct lorsque les contrôles passent : `fix: rétablir les contrôles qualité avant la mise à jour`.

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

Garde-fous : conserver les slugs, ne pas inventer une configuration de domaines non inspectée, ne pas remplacer les titres et ALT Sanity renseignés par le client, ne pas ajouter au sitemap une page qui n'existe pas encore. Commit : `fix: corriger le domaine et les fondations SEO locales`.

## Lots suivants, dans l'ordre du brief

À chaque étape : documenter les fichiers modifiés, passer `npm run lint` et `npm run build`, effectuer les contrôles ciblés puis créer un commit. Lire les références indiquées avant de modifier le code. Les noms des futurs fichiers ci-dessous sont des destinations prévues, pas des fichiers déjà présents.

| Étape | Livrable et références à reprendre | Vérifications et garde-fous |
|---|---|---|
| 2. En-tête, CTA, animations | Tokens dans `app/globals.css`, CTA métier réutilisable à partir de `components/ui/button.tsx` et `cva`, variantes par fond. Reprendre Header, Footer, `CtaSection`, appels flottants, Reveal et pages existantes. | Hauteur 52 px, texte 17 px, terracotta/ocre/contour, téléphone international, CTA mobile, safe area, consentement non masqué. Animation 0,3 s désactivée sur mobile et mouvement réduit. Les contrôles du carrousel et liens de navigation gardent leurs libellés utiles. |
| 3. Cal.com et GA4 | Embed officiel différé au clic ; événement de confirmation documenté ; helper d'événements reposant sur GA4 existant. Liens visite vers `/contact?objet=visite` et correspondance de présélection corrigée dans ContactForm. | Chaque emplacement émet le bon clic, aucun double événement. Tester fermeture, focus et réservation ; vérifier la confirmation avec l'événement réellement documenté, sans supposer sa signature. Pas de chargement Cal.com initial lourd ni second GA4. |
| 4. Hero | Reprendre `HeroCarousel` et le hero de `app/(main)/page.tsx`. Textes et ALT exacts du brief, navigation manuelle et swipe. Préparer un contrat de données des avis raccordable à l'étape 6. | Première photo prioritaire, quatre suivantes lazy, responsive, aucun timer automatique. Ne pas attribuer les noms des photos attendues à des photos existantes sans correspondance vérifiée. Placeholder propre si contenu absent. |
| 5. Accueil | Réorganiser les sections ; reprendre GoogleReviews, FaqAccordion, comparateur et CTA. Nouvelle page `/a-propos`, navigation et sitemap. Paires disponibles depuis les réalisations si vérifiées. | Ordre exact, entretien en premier, avis lisibles sur place, logos et quatre chiffres existants, un lien global vers toutes les réalisations. N'afficher dans FAQPage que des réponses réelles visibles ; les contenus non fournis restent des TODO. Contrat des avis raccordé à l'étape 6. |
| 6. Avis Google | Nouveau module serveur `lib/google-reviews.ts`, types stricts, cache 24 h, clé privée dans `.env.example`, alimentation hero/confiance/JSON-LD. Lire Places New et documentation du cache Next réellement installé. | Succès, absence de clé, erreur API, données incomplètes, attribution, lien Google, tri des trois avis disponibles les plus récents. Repli 5,0/37 sans faux avis détaillés. Ne pas promettre une persistance interinstances avec une simple variable mémoire ; vérifier la stratégie de dernière valeur en cache. |
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

- Les cinq photos WebP du hero listées dans le brief, absentes des fichiers reçus ici.
- Photo de Jessy et de l'équipe, trois photos services, paires avant/après, photo de remplacement du projet de Clisson.
- Réponses aux quatre FAQ de l'accueil, budgets, formules et tarifs Entretien, textes locaux à enrichir.
- Clé serveur `GOOGLE_PLACES_API_KEY` et activation/restriction Places New.
- Vérification de l'événement public Cal.com `permapaysage/appel-15-min` au moment de l'intégration.
- Accès Vercel et analytics nécessaires pour confirmer les réglages externes et la réception des événements.

Ces éléments ne bloquent pas la remise au vert des contrôles ni l'étape 1. À l'intégration, chaque contenu absent aura un placeholder propre et un repère `// TODO CONTENU:` ; ne pas remplacer un contenu existant validé par une invention.

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
| Étapes 2 à 12 | À faire | À renseigner étape par étape | Contrôles détaillés ci-dessus. |
