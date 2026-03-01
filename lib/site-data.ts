export type NavigationItem = {
  href: string;
  label: string;
};

export type Service = {
  slug: "conception" | "amenagement" | "entretien";
  title: string;
  shortDescription: string;
  longDescription: string;
  points: string[];
};

export type Metric = {
  value: string;
  label: string;
};

export type Testimonial = {
  author: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  city: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: { label: string; value: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  content: string[];
};

export type CityPage = {
  slug: string;
  city: string;
  distance: string;
  intro: string;
};

export const company = {
  name: "Permapaysage",
  legalName: "SASU Permapaysage",
  founder: "Jessy Laderriere",
  description:
    "Permapaysage conçoit, aménage et entretient des jardins écologiques à Vallet et dans le Vignoble Nantais.",
  email: "permapaysage.jl@gmail.com",
  phone: "07 52 62 08 18",
  address: "18 avenue du Général Heurtaux, 44330 Vallet",
  streetAddress: "18 avenue du Général Heurtaux",
  postalCode: "44330",
  city: "Vallet",
  region: "Pays de la Loire",
  countryCode: "FR",
  siren: "953 318 391",
  businessHours: "Lundi au vendredi, 8h - 19h",
  radius: "25 km autour de Vallet",
  rating: "5,0/5",
  reviewCount: 32,
  instagram: "https://instagram.com/perma.paysage",
  linkedin: "https://linkedin.com/company/permapaysage",
  googleReviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJyevHnQoNImQRCkXIe1ao2f8",
  sameAs: [
    "https://instagram.com/perma.paysage",
    "https://linkedin.com/company/permapaysage",
  ],
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/conception", label: "Conception" },
  { href: "/amenagement", label: "Aménagement" },
  { href: "/entretien", label: "Entretien" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const services: Service[] = [
  {
    slug: "conception",
    title: "Conception de jardin",
    shortDescription: "Imaginer un espace vivant, durable et adapté à votre terrain.",
    longDescription:
      "Chaque projet commence par l'écoute et l'observation du lieu. L'objectif est de dessiner un jardin utile, beau et résilient avec une approche permaculturelle.",
    points: [
      "Diagnostic complet du terrain et des usages",
      "Plan paysager sur mesure, petit ou grand budget",
      "Choix végétaux adaptés au climat du Vignoble Nantais",
    ],
  },
  {
    slug: "amenagement",
    title: "Aménagement des extérieurs",
    shortDescription: "Créer des extérieurs cohérents avec des matériaux nobles.",
    longDescription:
      "Terrasses, clôtures naturelles, circulations et massifs sont pensés pour durer, valoriser votre habitat et favoriser la biodiversité.",
    points: [
      "Terrasses bois et espaces de vie extérieurs",
      "Massifs végétalisés et aménagements durables",
      "Solutions esthétiques qui limitent l'entretien futur",
    ],
  },
  {
    slug: "entretien",
    title: "Entretien des espaces verts",
    shortDescription: "Préserver votre jardin sans contrainte, toute l'année.",
    longDescription:
      "Via Le Jardinier du Vignoble, l'entretien est réalisé avec des techniques écologiques et un accompagnement régulier selon les saisons.",
    points: [
      "Tonte, taille, désherbage et débroussaillage",
      "Mulching, taille raisonnée et désherbage manuel",
      "Service à la personne avec crédit d'impôt de 50 %",
    ],
  },
];

export const processSteps = [
  {
    title: "Prise de contact",
    description: "Nous échangeons sur vos envies, vos contraintes et votre budget.",
  },
  {
    title: "Rendez-vous terrain",
    description: "Visite sur place pour lire les potentiels du jardin et ses usages.",
  },
  {
    title: "Devis sur mesure",
    description: "Proposition transparente, phasée et adaptée à votre projet.",
  },
  {
    title: "Réalisation",
    description: "Travaux conduits avec soin et exigence de finition.",
  },
  {
    title: "Suivi durable",
    description: "Accompagnement au fil des saisons pour faire vivre votre jardin.",
  },
];

export const metrics: Metric[] = [
  { value: "+4 560", label: "heures passées dans les jardins" },
  { value: "+230", label: "projets réalisés" },
  { value: "25 km", label: "rayon d'intervention" },
  { value: "1 430", label: "végétaux plantés" },
];

export const testimonials: Testimonial[] = [
  {
    author: "Claudie Ebel",
    content:
      "Premier contrat avec Jessy pour restauration du jardin dont je suis pleinement satisfaite. Jessy est attentif, patient et très à l'écoute des demandes de son client et possède une grande capacité d'adaptation. C'est un professionnel de grande qualité que je ne manquerai pas de recommander autour de moi.",
  },
  {
    author: "Val Gasc",
    content:
      "Excellent professionnel ! J'ai fait appel à deux reprises pour l'entretien des espaces verts réalisé avec rigueur et souci du détail. Je recommande vivement Mr Laderriere de Permapaysage à tous ceux qui cherchent un service de qualité.",
  },
  {
    author: "Laura Denis",
    content:
      "Nous recommandons fortement cette entreprise. Le travail est toujours très bien réalisé et Jessy est arrangeant et sympathique. Nous sommes pleinement satisfaits.",
  },
  {
    author: "Marie Annick Birot",
    content:
      "Nous avons fait appel à Jessy et à son apprenti pour notre jardin immense. Il a su mettre en valeur quelques arbrisseaux et végétaux tout en recréant l'ambiance du jardin et en les intégrant au décor d'ensemble. Un plaisir de dialoguer avec lui.",
  },
  {
    author: "Hervé Morice",
    content:
      "Très bon contact avec Jessy. C'est un professionnel à l'écoute des besoins. Nous faisons appel à ses services depuis moins d'un an, et nous le recommandons !",
  },
];

export const projects: Project[] = [
  {
    slug: "jardin-vivant-vallet",
    title: "Jardin vivant à Vallet",
    category: "Conception + aménagement",
    city: "Vallet",
    summary:
      "Transformation complète d'un terrain sec en jardin nourricier avec terrasse bois et massifs durables.",
    description:
      "Ce projet a consisté à transformer un terrain nu et sec en un jardin vivant et productif. La conception s'appuie sur les principes de la permaculture : observation du terrain, gestion de l'eau, choix de végétaux adaptés au sol argilo-calcaire du Vignoble Nantais. Une terrasse en bois douglas relie la maison au jardin, prolongeant l'espace de vie vers l'extérieur. Les massifs mêlent arbustes persistants, vivaces mellifères et plantes comestibles pour un jardin beau et utile toute l'année.",
    image: "/photos-entretien/apres/ap-04.jpg",
    gallery: [
      "/photos-entretien/apres/ap-01.jpg",
      "/photos-entretien/apres/ap-02.jpg",
      "/photos-entretien/apres/ap-03.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Vallet (44)" },
      { label: "Surface", value: "≈ 350 m²" },
      { label: "Durée", value: "3 semaines" },
      { label: "Approche", value: "Permaculture" },
    ],
  },
  {
    slug: "terrasse-massifs-clisson",
    title: "Terrasse et massifs à Clisson",
    category: "Aménagement",
    city: "Clisson",
    summary:
      "Création d'un espace de vie extérieur structuré, chaleureux et facile à entretenir.",
    description:
      "L'objectif était de créer un extérieur à la fois accueillant et facile à vivre. La terrasse en bois structure l'espace et offre un lieu de convivialité ouvert sur le jardin. Les massifs plantés en bordure apportent du volume et de la couleur sans demander un entretien intensif. Le choix de végétaux résistants et d'un paillage épais limite les interventions tout en maintenant une esthétique soignée au fil des saisons.",
    image: "/photos-entretien/apres/ap-09.jpg",
    gallery: [
      "/photos-entretien/apres/ap-06.jpg",
      "/photos-entretien/apres/ap-07.jpg",
      "/photos-entretien/apres/ap-08.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Clisson (44)" },
      { label: "Surface", value: "≈ 180 m²" },
      { label: "Durée", value: "2 semaines" },
      { label: "Matériaux", value: "Bois douglas, pierre" },
    ],
  },
  {
    slug: "entretien-raisonne-vertou",
    title: "Entretien raisonné à Vertou",
    category: "Entretien",
    city: "Vertou",
    summary:
      "Programme d'entretien écologique annuel avec taille raisonnée et zéro phytosanitaire.",
    description:
      "Ce jardin de particulier bénéficie d'un programme d'entretien annuel basé sur des pratiques écologiques. Chaque passage est planifié selon les saisons : tonte en mulching au printemps, taille raisonnée des haies en été, nettoyage d'automne et préparation hivernale. L'approche zéro phytosanitaire repose sur le désherbage manuel, le paillage naturel et le respect des cycles de croissance. Le résultat : un jardin propre, sain et vivant toute l'année.",
    image: "/photos-entretien/apres/ap-05.jpg",
    gallery: [
      "/photos-entretien/avant/av-01.jpg",
      "/photos-entretien/avant/av-02.jpg",
      "/photos-entretien/apres/ap-06.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Vertou (44)" },
      { label: "Fréquence", value: "Mensuel" },
      { label: "Méthode", value: "Zéro phyto" },
      { label: "Avantage", value: "Crédit d'impôt 50 %" },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "5-principes-pour-un-jardin-durable",
    title: "5 principes pour un jardin durable dans le Vignoble Nantais",
    excerpt:
      "Un cadre concret pour concevoir un jardin plus résilient, économe en eau et plus agréable à vivre.",
    category: "Conception",
    publishedAt: "2026-02-20",
    readTime: "6 min",
    image: "/photos-entretien/apres/ap-03.jpg",
    content: [
      "Un jardin durable repose avant tout sur l'observation du terrain. Avant de planter quoi que ce soit, il faut comprendre les dynamiques du lieu : l'ensoleillement au fil de la journée, les vents dominants, la nature du sol et les zones de rétention d'eau. Dans le Vignoble Nantais, le sol argilo-calcaire et le climat océanique offrent des conditions favorables à de nombreuses espèces, à condition de bien les positionner.",
      "Le second principe consiste à structurer des zones d'usages claires. Un jardin fonctionnel distingue les espaces de détente (terrasse, coin lecture), les zones de passage (allées, circulations), les surfaces plantées (massifs, haies, potager) et les espaces techniques (compost, rangement). Cette organisation évite l'entretien inutile et rend le jardin agréable au quotidien.",
      "Le troisième levier est le choix des végétaux. Privilégier des espèces locales et adaptées au climat réduit considérablement les besoins en arrosage et en traitements. Le laurier-tin, le cornouiller, la lavande ou encore les graminées ornementales sont des valeurs sûres qui demandent peu d'entretien une fois bien installées.",
      "Quatrième principe : travailler avec le sol plutôt que contre lui. Le paillage (mulching) protège la terre, limite l'évaporation et nourrit la vie du sol. Éviter le retournement systématique et favoriser les couvre-sols vivants permet de maintenir un écosystème stable et fertile.",
      "Enfin, un jardin durable se pense dans le temps. Les matériaux choisis (bois certifié, pierre locale, acier corten) doivent vieillir avec élégance. L'idée n'est pas de créer un décor figé, mais un espace vivant qui évolue avec les saisons et gagne en caractère année après année.",
    ],
  },
  {
    slug: "mulching-et-taille-raisonnee",
    title: "Mulching et taille raisonnée: duo gagnant pour l'entretien",
    excerpt:
      "Des pratiques simples qui préservent la santé des sols et la vigueur des végétaux.",
    category: "Entretien",
    publishedAt: "2026-02-12",
    readTime: "4 min",
    image: "/photos-entretien/apres/ap-06.jpg",
    content: [
      "Le mulching consiste à broyer finement les résidus de tonte et à les laisser se décomposer sur place. Contrairement à l'idée reçue, cette technique ne crée pas de feutrage si elle est pratiquée régulièrement. Elle restitue de l'azote au sol, maintient l'humidité et réduit le volume de déchets verts à évacuer. Sur une saison complète, c'est un gain de temps et d'argent significatif.",
      "La taille raisonnée, de son côté, respecte le cycle naturel des arbres et arbustes. Plutôt que de tailler sévèrement en bloc, on intervient au bon moment et avec mesure. Une haie de laurier taillée deux fois par an en respectant sa forme naturelle sera plus dense, plus saine et plus esthétique qu'une haie « rasée » quatre fois par an.",
      "Ces deux pratiques partagent une même philosophie : accompagner le vivant plutôt que le contraindre. Le sol reste couvert et actif, les plantes poussent dans leur forme naturelle, et le jardin trouve son équilibre avec moins d'interventions lourdes.",
      "Concrètement, un jardin entretenu avec ces méthodes nécessite moins de passages, moins de produits et produit moins de déchets. C'est un entretien préventif qui évite les rattrapages coûteux. Et visuellement, le résultat est souvent plus naturel et harmonieux qu'un entretien classique intensif.",
    ],
  },
  {
    slug: "choisir-sa-terrasse-bois",
    title: "Comment choisir sa terrasse bois pour durer",
    excerpt:
      "Essences, orientation et usage: les critères clés pour un aménagement fiable et élégant.",
    category: "Aménagement",
    publishedAt: "2026-02-05",
    readTime: "5 min",
    image: "/photos-entretien/apres/ap-09.jpg",
    content: [
      "Le choix de l'essence de bois est la première décision structurante. Le pin traité autoclave (classe 4) offre un bon rapport qualité-prix et convient aux budgets serrés. Le douglas, naturellement résistant, vieillit avec un grisé élégant. Pour les projets haut de gamme, les bois exotiques (ipé, cumaru) ou le bois composite offrent une longévité supérieure à 25 ans avec un entretien minimal.",
      "L'orientation et l'exposition de la terrasse sont déterminantes. Une terrasse plein sud séchera vite mais chauffera en été, tandis qu'une exposition nord restera plus fraîche et humide, favorisant les mousses. Dans le Vignoble Nantais, l'humidité océanique impose une attention particulière à la ventilation sous les lames et à l'espacement entre elles pour un bon drainage.",
      "La structure porteuse est souvent négligée mais conditionne la durabilité de l'ensemble. Des lambourdes en aluminium ou en bois exotique, posées sur des plots réglables, garantissent une assise stable et une ventilation optimale. L'espacement régulier entre les lames (5 à 8 mm) permet l'écoulement des eaux et évite la stagnation responsable du pourrissement prématuré.",
      "Enfin, pensez votre terrasse comme un prolongement de la maison. Son intégration avec les massifs environnants, les marches d'accès au jardin et l'éclairage extérieur font la différence entre une simple plateforme et un véritable espace de vie. Un bon dessin initial évite les reprises coûteuses et crée un ensemble cohérent dès la pose.",
    ],
  },
];

export const entretienFaq = [
  {
    question: "Le crédit d'impôt de 50 % est-il applicable ?",
    answer:
      "Oui, les prestations d'entretien des espaces verts sont réalisées dans le cadre du service à la personne, selon les conditions en vigueur.",
  },
  {
    question: "Intervenez-vous toute l'année ?",
    answer:
      "Oui, le suivi s'adapte aux saisons avec des passages planifiés selon les besoins de votre jardin.",
  },
  {
    question: "Utilisez-vous des produits phytosanitaires ?",
    answer:
      "Non. L'approche privilégie des pratiques écologiques: désherbage manuel, mulching et entretien raisonné.",
  },
  {
    question: "Quels sont vos tarifs et fréquences de passage ?",
    answer:
      "Les tarifs varient selon la surface et les besoins. Les passages peuvent être ponctuels (taille de haies, grand nettoyage) ou réguliers (contrat annuel d'entretien).",
  },
  {
    question: "Acceptez-vous le CESU ?",
    answer:
      "Oui, dans le cadre du service à la personne (réalisé via Le Jardinier du Vignoble), le règlement par Chèque Emploi Service Universel (CESU) préfinancé est accepté.",
  },
];

export const conceptionSteps = [
  {
    title: "Rencontre & Écoute",
    description: "Un premier échange sur place pour comprendre vos besoins, le budget et s'imprégner des lieux.",
  },
  {
    title: "Relevé & Étude",
    description: "Prises de cotes, analyse de l'ensoleillement et de la qualité du sol pour un projet viable.",
  },
  {
    title: "Esquisses & Plans",
    description: "Propositions d'aménagement avec croquis, choix des matériaux et palette végétale.",
  },
  {
    title: "Dossier final",
    description: "Remise du plan détaillé avec le devis de réalisation si vous souhaitez nous confier les travaux.",
  },
];

export const amenagementTypes = [
  {
    title: "Terrasses bois",
    description: "Des espaces à vivre chaleureux et durables, posés dans les règles de l'art.",
    image: "/photos-entretien/apres/ap-09.jpg",
  },
  {
    title: "Clôtures et limites",
    description: "Palissades bois ou naturelles pour structurer l'espace et s'isoler avec élégance.",
    image: "/photos-entretien/apres/ap-02.jpg",
  },
  {
    title: "Massifs et végétalisation",
    description: "Des palettes végétales adaptées au sol et au climat, vivantes toute l'année.",
    image: "/photos-entretien/apres/ap-04.jpg",
  },
];

export const interventionCities = [
  "Vallet",
  "Clisson",
  "Le Loroux-Bottereau",
  "Haute-Goulaine",
  "Saint-Julien-de-Concelles",
  "Vertou",
  "Gorges",
  "Le Pallet",
  "Mouzillon",
  "La Chapelle-Heulin",
];

export const cityPages: CityPage[] = [
  {
    slug: "paysagiste-vallet",
    city: "Vallet",
    distance: "0 km",
    intro: "Intervention rapide à Vallet pour concevoir, aménager et entretenir des jardins durables.",
  },
  {
    slug: "paysagiste-clisson",
    city: "Clisson",
    distance: "14 km",
    intro: "Conception de jardins sur mesure à Clisson, avec une approche permaculture et des matériaux durables.",
  },
  {
    slug: "paysagiste-le-loroux-bottereau",
    city: "Le Loroux-Bottereau",
    distance: "12 km",
    intro: "Aménagement paysager et entretien écologique dans toute la commune du Loroux-Bottereau.",
  },
  {
    slug: "paysagiste-haute-goulaine",
    city: "Haute-Goulaine",
    distance: "18 km",
    intro: "Création d'extérieurs élégants et vivants à Haute-Goulaine, pensés pour durer.",
  },
  {
    slug: "paysagiste-saint-julien-de-concelles",
    city: "Saint-Julien-de-Concelles",
    distance: "11 km",
    intro: "Accompagnement complet à Saint-Julien-de-Concelles pour des extérieurs fonctionnels et sobres.",
  },
  {
    slug: "paysagiste-vertou",
    city: "Vertou",
    distance: "21 km",
    intro: "Interventions à Vertou pour des projets paysagers cohérents entre esthétique et écologie.",
  },
  {
    slug: "paysagiste-gorges",
    city: "Gorges",
    distance: "7 km",
    intro: "Permapaysage réalise vos aménagements à Gorges avec une attention forte à la biodiversité.",
  },
  {
    slug: "paysagiste-le-pallet",
    city: "Le Pallet",
    distance: "6 km",
    intro: "Solutions de conception et d'entretien de jardin au Pallet, adaptées au rythme des saisons.",
  },
  {
    slug: "paysagiste-mouzillon",
    city: "Mouzillon",
    distance: "5 km",
    intro: "Pour vos extérieurs à Mouzillon, une méthode claire: écoute, design, réalisation et suivi.",
  },
  {
    slug: "paysagiste-la-chapelle-heulin",
    city: "La Chapelle-Heulin",
    distance: "8 km",
    intro: "Conception paysagère à La Chapelle-Heulin avec des choix végétaux adaptés au territoire.",
  },
];

export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/politique-cookies", label: "Politique de cookies" },
];
