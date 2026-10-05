# Mise à jour permapaysage.fr : toutes les modifications

## Contexte

Site Next.js (App Router) + Tailwind v4 + shadcn/ui + TypeScript strict + Sanity, déployé sur Vercel. Domaine officiel : **https://www.permapaysage.fr**. Ce document fusionne trois sources : le brief de refonte de l'accueil du client (04/10/2026), l'audit du site (28/09/2026) et le plan d'actions SEO local (21/09/2026). **En cas de conflit, le brief du client l'emporte.** Les conflits connus sont déjà tranchés ci-dessous.

## Règles de travail

- Lis d'abord le repo (structure, composants, schémas Sanity, formulaire, layout) avant de modifier quoi que ce soit.
- Avance étape par étape, dans l'ordre. Un commit par étape, message clair. `npm run build` et le lint doivent passer à chaque étape.
- Ne casse rien de ce qui fonctionne : URL existantes, fil d'Ariane, maillage interne, dark mode s'il existe, responsive.
- Contenu pas encore fourni par le client : place un placeholder visible et propre, marqué `// TODO CONTENU:` dans le code. Ne jamais inventer de tarif, d'avis ou de chiffre.
- Tout texte visible en français, avec accents, sans tiret cadratin.
- À la fin, donne-moi la liste des TODO restants et des actions manuelles.

## Charte et règle des boutons (s'applique à tout le site)

- Vert profond de la charte actuelle : marque et titres uniquement, plus jamais pour les boutons.
- Crème `#F5EFE3` : fonds clairs.
- Ocre `#E0A33A` (survol `#CC8F2A` + légère ombre), texte `#1F2A1F` demi-gras : bouton principal **sur fond vert**.
- Terracotta `#B5552B`, texte blanc : bouton principal **sur fond clair** (crème, blanc).
- Bouton secondaire : toujours en contour 2 px (crème sur fond vert, avec survol fond crème plein + texte vert de la marque).
- Taille : hauteur 52 px, texte 17 px, coins arrondis comme l'existant.
- **Deux libellés seulement sur tout le site** : « Réserver un appel de 15 minutes » (ou « Réserver un appel » quand la place manque) et « Demander ma visite offerte ».

Ajoute ces couleurs en variables (tokens Tailwind / CSS) et crée un composant bouton réutilisable avec ses variantes plutôt que des classes répétées.

---

## Étape 1 : corrections techniques prioritaires

1. **Domaine** : passe l'URL de base (`NEXT_PUBLIC_SITE_URL` / `metadataBase`) à `https://www.permapaysage.fr`. Vérifie que canonical, og:url, og:image, identifiants JSON-LD, robots.txt et sitemap pointent tous vers le .fr. Recherche toute occurrence de l'ancien domaine en .com dans le repo et remplace-la.
2. **Redirections** : si le domaine .com est géré par le projet, ajoute des redirections 301 permanentes page à page (`/entretien` vers `/entretien`) de l'ancien domaine en .com, avec et sans www, et de `http://` vers `https://www.permapaysage.fr`. Idem `permapaysage.fr` sans www vers www. Si ça se règle dans le dashboard Vercel, mets-le dans les actions manuelles.
3. **Sitemap** : supprime les 2 URL en 404 (`/blog/5-principes-pour-un-jardin-durable`, `/blog/mulching-et-taille-raisonnee`), génère dynamiquement les articles réels depuis Sanity, ajoute `/faq` et toutes les pages villes. Exclure `/merci`.
4. **Carte de la zone d'intervention** : remplace les tuiles CARTO (filigrane « API KEY REQUIRED ») par les tuiles OpenStreetMap standard avec la mention « © OpenStreetMap ».
5. **Page /realisations** : ajoute un H1 « Nos réalisations de jardins dans le Vignoble Nantais ».
6. **ALT en double** : le gabarit des projets ajoute la ville deux fois (« … à Clisson à Clisson »). Corrige le gabarit.
7. **Grammaire des communes** : « Paysagiste à Le Loroux-Bottereau » et « à Le Pallet » deviennent « au Loroux-Bottereau » et « au Pallet » partout (pied de page, H1 des pages villes, fil d'Ariane, title, meta, liens). Crée un helper qui gère à / au / aux selon la commune.

## Étape 2 : en-tête, boutons globaux, animations

1. **En-tête desktop** : bouton « Obtenir un devis » remplacé par « Réserver un appel » (terracotta, fond d'en-tête clair). À gauche du bouton, le numéro **07 52 62 08 18** en lien `tel:+33752620818`.
2. **En-tête mobile** : le bouton devis est actuellement masqué sous 768 px (`hidden md:flex`). Ajoute un bouton compact « Réserver un appel » à côté du burger.
3. **Bouton d'appel flottant mobile** : vérifie qu'il existe en bas d'écran ; sinon crée une barre fixe mobile « Appeler · Réserver un appel », avec gestion de la safe area iOS.
4. **Remplacement des boutons** :

| Bouton actuel | Emplacement | Nouveau | Style |
|---|---|---|---|
| Obtenir un devis | En-tête (toutes pages) | Réserver un appel | Terracotta |
| Demander une étude de projet | Hero | Réserver un appel de 15 minutes | Ocre |
| Bénéficiez du crédit d'impôt de 50 % | Hero | Demander ma visite offerte | Contour crème |
| Demander un devis | Section Zone | Demander ma visite offerte | Terracotta |
| Lancer mon étude personnalisée sous 48h | Appel final | Les deux boutons | Ocre + contour crème (fond vert) |

Vérifie aussi les autres pages (services, villes, blog) : tout bouton d'action doit utiliser l'un des deux libellés.

5. **Animations d'apparition** : durée 0,3 s, supprime l'effet de flou (environ 33 éléments), désactive-les sur mobile et avec `prefers-reduced-motion: reduce`.

## Étape 3 : Cal.com et suivi GA4

1. « Réserver un appel (de 15 minutes) » ouvre **https://cal.com/permapaysage/appel-15-min** en pop-up intégrée (le visiteur reste sur le site). Utilise l'embed officiel Cal.com (`@calcom/embed-react` ou le snippet element-click), chargé uniquement au clic ou en différé pour ne pas pénaliser les performances.
2. « Demander ma visite offerte » mène à `/contact?objet=visite` avec « Visite conseil » présélectionné dans le formulaire.
3. Événements GA4 (via le GA4 déjà en place) :
   - `clic_reserver_appel` au clic sur tout bouton « Réserver un appel »
   - `clic_visite_offerte` au clic sur tout bouton « Demander ma visite offerte »
   - `rdv_appel_confirme` quand Cal.com confirme une réservation (événement `bookingSuccessful` de l'embed)
   - `demande_visite` sur la page `/merci`
   - Ajoute un paramètre `emplacement` (header, hero, zone, final…) à chaque événement de clic.
   - Indique-moi dans les actions manuelles de marquer `demande_visite` et `rdv_appel_confirme` comme conversions dans GA4.

## Étape 4 : hero de l'accueil

1. **Carrousel** : remplace les 5 photos par celles-ci, dans cet ordre. Renomme les fichiers reçus selon ces noms (les fichiers ont été envoyés avec des suffixes `vignoble-nantais`, la correspondance est évidente par le début du nom).

| Pos. | Fichier | Alt |
|---|---|---|
| 1 | `mare-naturelle-terrasse-bois-paysagiste-vallet.webp` | Mare naturelle bordée d'iris et de salicaires, avec terrasse en bois, par Permapaysage, paysagiste à Vallet |
| 2 | `massif-graminees-micro-trefle-paysagiste-clisson.webp` | Massif de graminées et d'arbustes sur paillage, pelouse en micro-trèfle, par Permapaysage, paysagiste intervenant à Clisson |
| 3 | `cloture-chataignier-haie-libre-paysagiste-la-chapelle-heulin.webp` | Clôture en châtaignier et haie libre plantée sur paillage, par Permapaysage, paysagiste intervenant à La Chapelle-Heulin |
| 4 | `jardin-massifs-paillage-palmier-paysagiste-le-loroux-bottereau.webp` | Jardin réaménagé avec massifs paillés, palmier et bordures, par Permapaysage, paysagiste intervenant au Loroux-Bottereau |
| 5 | `plan-amenagement-jardin-paysagiste-vallet-permapaysage.webp` | Plan d'aménagement paysager dessiné à la main par Permapaysage, paysagiste à Vallet |

   Photo 1 en `priority` (fetchpriority high, c'est le LCP), photos 2 à 5 en lazy. **Pas de défilement automatique** : flèches et points conservés, swipe au doigt sur mobile.

2. **Boutons** : bouton 1 « Réserver un appel de 15 minutes » (ocre, icône téléphone ou calendrier à gauche) ; bouton 2 « Demander ma visite offerte » (contour crème, flèche à droite). Côte à côte sur desktop (1 à gauche), empilés pleine largeur sur mobile (1 au-dessus). Dessous, en petit texte crème : « Appel gratuit et sans engagement · Réponse sous 48 h ».

3. **Textes** :

| Élément | Nouveau texte |
|---|---|
| Étiquette | VIGNOBLE NANTAIS · 25 KM AUTOUR DE VALLET |
| H1 | Paysagiste écologique à Vallet : un beau jardin, moins de temps à y passer |
| Sous-titre | Création et entretien de jardins vivants, pensés pour durer et demander peu d'entretien. |
| Puce 1 | {note}/5 sur Google · {nombre} avis (lien vers les avis Google, nouvel onglet), valeurs dynamiques de l'étape 6 |
| Puce 2 | Entretien : 50 % de crédit d'impôt (lien vers /entretien) |
| Puce 3 | Réponse sous 48 h |

## Étape 5 : nouvel ordre des sections de l'accueil

1. **Hero** (étape 4).
2. **Bande de confiance** (fusion des blocs Avis et Chiffres clés) : note + 3 avis récents (dynamiques, étape 6), les avis s'ouvrent en entier sur place (dépliage ou modale, pas de lien vers Google pour lire), puis les 4 chiffres clés sur une ligne, puis les logos UNEP et Unipros (aujourd'hui dans le pied de page). Bouton terracotta « Réserver un appel de 15 minutes » en bas.
3. **Nos services** : ordre Entretien, Conception, Aménagement. Remplace les 3 illustrations dessinées par des photos de chantier (`// TODO CONTENU: photos fournies par Jessy`). Carte Entretien : badge « -50 % crédit d'impôt » et ligne « 200 € de prestation = 100 € pour vous ». Chaque carte mène à sa page et son lien contact porte `?objet=entretien|conception|amenagement`.
4. **Avant / après puis Réalisations** : composant comparaison avant/après avec curseur glissant (accessible au clavier, fonctionne au doigt), alimenté par des paires d'images (`// TODO CONTENU`). Puis les 3 projets ; photo du projet de Clisson à remplacer (`// TODO CONTENU`). Un seul lien « Voir toutes les réalisations » (supprimer « Découvrir les autres projets »).
5. **Comment ça se passe** (nouveau) : 4 étapes avec icônes : 1. Appel de 15 minutes. 2. Visite terrain offerte. 3. Proposition sous 48 h. 4. Intervention. Bouton terracotta « Réserver un appel de 15 minutes ».
6. **Qui est derrière Permapaysage** (nouveau, remplace « Nos valeurs ») : photo de Jessy et de l'équipe sur le terrain (`// TODO CONTENU`), 3 lignes de présentation, puis les 3 valeurs en une phrase chacune (prendre soin de la terre, prendre soin des hommes, partager équitablement). Le texte long actuel de « Nos valeurs » part sur une **nouvelle page /a-propos** (lien dans le menu ou le pied de page, métadonnées propres, ajoutée au sitemap).
7. **Zone d'intervention** : carte OSM réparée. Liste des 14 communes de l'étape 9, chaque commune en lien vers sa page « Paysagiste à/au … ». Bouton « Demander ma visite offerte » terracotta.
8. **Questions fréquentes** (nouveau, remplace le bloc Blog) : 4 questions en accordéon, avec balisage FAQPage : « Comment fonctionne le crédit d'impôt de 50 % ? », « Quel budget prévoir ? », « Sous quel délai intervenez-vous ? », « Intervenez-vous dans ma commune ? ». Réponses : `// TODO CONTENU`. Lien « Toutes les questions » vers /faq. Le blog reste accessible par le menu et le pied de page.
9. **Appel final** : garder « Votre jardin ne devrait pas être une contrainte », ajouter « Appel gratuit · Visite terrain offerte · Réponse sous 48 h », les deux boutons (ocre + contour crème sur fond vert) et le numéro de téléphone cliquable.
10. **Pied de page** : inchangé, plus les horaires « Du lundi au vendredi, 8h–19h ».

## Étape 6 : avis Google automatiques (API Places New)

- Requête côté serveur uniquement : `GET https://places.googleapis.com/v1/places/ChIJyevHnQoNImQRCkXIe1ao2f8?languageCode=fr`
- En-têtes : `X-Goog-Api-Key: process.env.GOOGLE_PLACES_API_KEY` et `X-Goog-FieldMask: rating,userRatingCount,reviews,googleMapsUri`
- Cache Next.js 24 h (`revalidate: 86400`). La clé ne doit jamais être exposée au navigateur (pas de préfixe `NEXT_PUBLIC_`). Ajoute la variable à `.env.example`.
- Si l'API échoue : dernières valeurs en cache, sinon repli **5,0 et 37 avis** sans avis détaillés.
- Utilisations : puce 1 du hero, bande de confiance (3 avis les plus récents : nom, photo, date, texte, mention « Avis Google », avec l'attribution de l'auteur exigée par Google), lien « Voir tous les avis » vers `googleMapsUri`, `aggregateRating` du JSON-LD.
- Types TypeScript stricts pour la réponse, fonction isolée dans `lib/`.

## Étape 7 : page Contact, formulaire, /merci

1. **Formulaire** :

| Champ | Règle |
|---|---|
| Nom | Obligatoire |
| Téléphone | **Obligatoire**, aide « pour caler la visite offerte » |
| Email | Obligatoire |
| Commune | **Nouveau**, obligatoire, saisie libre |
| Type de besoin | Facultatif, prérempli via `?objet=` (visite, entretien, conception, amenagement) ; ajouter l'option « Visite conseil » |
| Surface du jardin | Nouveau, facultatif : moins de 500 m² / 500 à 1 500 m² / plus de 1 500 m² |
| Délai souhaité | Nouveau, facultatif : dès que possible / sous 3 mois / simple idée pour l'instant |
| Message | **Facultatif**, placeholder « Ex. : jardin de 800 m² à entretenir, haie à tailler, projet de potager… » |

   Garde le service d'envoi actuel (Web3Forms ou autre) et vérifie que les nouveaux champs arrivent bien dans l'email.
2. Au-dessus du formulaire : bouton terracotta « Réserver un appel de 15 minutes » (pop-up Cal.com).
3. Horaires sur la page : « Du lundi au vendredi, 8h–19h ».
4. Après envoi, redirection vers **/merci** (`noindex`, hors sitemap) : « Merci ! Jessy vous rappelle sous 48 h pour fixer la visite terrain offerte. » + événement GA4 `demande_visite`.

## Étape 8 : page Entretien

1. Bloc **formules et tarifs indicatifs** : 2 ou 3 formules nommées (exemple de structure : « Passage ponctuel », « Contrat annuel 6 passages », « Jardin serein 12 passages ») avec prix « à partir de ». Noms et prix : `// TODO CONTENU`, ne rien inventer, rendre le bloc facile à remplir (idéalement depuis Sanity).
2. **Mini calculateur crédit d'impôt** : champ « Montant de la prestation » qui affiche « Ce que vous payez réellement » (50 %). Composant client léger, accessible, formaté en euros.
3. **Preuve locale** : l'avis de Val Gasc (entretien) et l'avant/après « Entretien de jardin à La Chapelle-Heulin » (déjà dans les réalisations si présent, sinon `// TODO CONTENU`).
4. Mot-clé **« jardinier »** dans un H2 (garder « paysagiste » dans le H1).
5. Liens sortants d'autorité : page crédit d'impôt d'impots.gouv.fr et avance immédiate sur urssaf.fr.
6. Boutons selon la règle de la charte.

## Étape 9 : pages services et pages villes

**Pages services (/entretien, /conception, /amenagement)**
- Balisage **FAQPage** sur les trois FAQ ; ajouter une FAQ sur la page service qui n'en a pas (`// TODO CONTENU` pour les réponses si besoin).
- H1 de /amenagement : « Aménagement paysager à Vallet : terrasses, clôtures, plantations ».
- Date de mise à jour visible sur chaque page service.

**Pages villes /paysagiste-[ville]**
- Enrichir le modèle Sanity de la page ville (champs optionnels, la page reste correcte s'ils sont vides) : réalisations liées à la commune, avis local, paragraphe local (sols, contraintes, distance depuis Vallet, délai d'intervention), 3 FAQ propres à la commune avec balisage FAQPage, carte OSM centrée sur la commune.
- Lier automatiquement les réalisations dont la commune correspond (Mouzillon, Le Pallet, La Chapelle-Heulin en ont déjà).
- **14 communes** : Vallet, Clisson, Le Loroux-Bottereau, La Chapelle-Heulin, Le Pallet, Mouzillon, Saint-Julien-de-Concelles, Divatte-sur-Loire, Haute-Goulaine, Gorges, Aigrefeuille-sur-Maine, Gétigné, Le Landreau, Vertou. Liste les pages existantes et crée les manquantes sur le modèle existant, avec un contenu de base non dupliqué marqué `// TODO CONTENU` pour la partie locale.
- `generateStaticParams`, sitemap et liens de la section Zone à jour.

## Étape 10 : SEO et données structurées

**Accueil**
- title : `Paysagiste écologique à Vallet et Clisson | Permapaysage`
- meta description : `Paysagiste écologique à Vallet : création et entretien de jardins à Clisson, Le Loroux-Bottereau, La Chapelle-Heulin, Le Pallet et alentours. Visite offerte.`

**JSON-LD LocalBusiness (toutes pages)**
- `areaServed` : un objet `City` par commune (les 14), plus un `GeoCircle` de 25 km autour du siège.
- `geo` : coordonnées GPS du 18 avenue du Général Heurtaux, 44330 Vallet (vérifie-les, mets-les en constante).
- `hasMap` : lien vers la fiche Google (`googleMapsUri`).
- `openingHoursSpecification` : lundi au vendredi, 08:00–19:00.
- `aggregateRating` : valeurs dynamiques de l'étape 6.
- `hasOfferCatalog` : les 3 services avec leurs URL.
- `priceRange` : `€€` au lieu de `$$`.
- Tous les `@id` et URL en `https://www.permapaysage.fr`.

**Blog**
- Schéma `BlogPosting` sur chaque article : auteur « Jessy Laderriere », `datePublished`, `dateModified`.
- Auteur et date de mise à jour affichés sur chaque article.

**Images**
- Renomme les fichiers génériques (`ap-03.jpg`, `ap-04.jpg`, `ap-09.jpg`, `IMG_xxxx`…) en noms descriptifs (`paysagiste-vallet-entretien-haie.jpg`, etc.).
- Mets le mot « paysagiste » dans quelques ALT pertinents.

## Étape 11 : performance

- Logo PNG de 76 Ko : SVG ou WebP de moins de 10 Ko.
- Image LCP du hero : WebP/AVIF, 80 à 100 Ko max, `priority`.
- Cal.com et Leaflet chargés en différé (dynamic import, `ssr: false`).
- Vérifie que les polices sont bien chargées via `next/font`.

## Étape 12 : vérifications finales

- Build et lint OK, aucune erreur TypeScript.
- Un seul H1 par page, structure Hn cohérente.
- Lighthouse mobile 90+ sur l'accueil, /entretien, /contact et une page ville.
- Navigation clavier, contrastes WCAG AA (attention au texte crème sur vert et blanc sur ocre/terracotta).
- Plus aucune occurrence de l'ancien domaine en .com, de « Obtenir un devis » ou des anciens libellés de boutons.
- Test d'envoi du formulaire et redirection /merci.
- Rends-moi : la liste des fichiers modifiés par étape, les `// TODO CONTENU` restants, et les actions manuelles ci-dessous.

---

## Contenus attendus du client (placeholders en attendant)

- Photo de Jessy et de l'équipe sur un chantier
- 3 photos de chantier pour les cartes services + paires avant/après
- Nouvelle photo du projet de Clisson
- Réponses aux 4 questions de la FAQ de l'accueil (dont une fourchette de budget)
- Formules et tarifs de la page Entretien
- Clé API Google Places (variable `GOOGLE_PLACES_API_KEY` à ajouter dans Vercel)

## Actions manuelles (pour moi, hors code)

- Vercel : redirection du domaine .com vers https://www.permapaysage.fr en 301/308 permanente si non gérée dans le code ; ajout de `GOOGLE_PLACES_API_KEY`.
- Google Cloud : restreindre la clé Places à l'API Places (New).
- GA4 : marquer `demande_visite` et `rdv_appel_confirme` comme conversions.
- Search Console : vérifier la propriété .fr, soumettre le nouveau sitemap, demander la réindexation de l'accueil et des pages services, demander la suppression de permapaysage.odoo.com.
- Vérifier que la fiche Google et la fiche UNEP pointent vers https://www.permapaysage.fr/.
