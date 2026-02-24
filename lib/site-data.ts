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
  image: string;
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
  founder: "Jessy Laderriere",
  email: "permapaysage.jl@gmail.com",
  phone: "07 52 62 08 18",
  address: "18 avenue du Général Heurtaux, 44330 Vallet",
  businessHours: "Lundi au vendredi, 8h - 19h",
  radius: "25 km autour de Vallet",
  rating: "5,0/5",
  reviewCount: 32,
  instagram: "https://instagram.com/perma.paysage",
  linkedin: "https://linkedin.com/company/permapaysage",
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
  { value: "50 %", label: "crédit d'impôt sur l'entretien" },
];

export const testimonials: Testimonial[] = [
  {
    author: "Maryse Chantecaille",
    content:
      "Nous sommes tout à fait satisfaits de la réalisation du chantier. Le choix des matériaux a été parfaitement adapté à notre environnement.",
  },
  {
    author: "Claudie Ebel",
    content:
      "Jessy est attentif, patient, très à l'écoute et possède une vraie capacité d'adaptation. Une première collaboration très réussie.",
  },
  {
    author: "Hervé Morice",
    content:
      "Professionnel à l'écoute de nos besoins. Nous faisons appel à ses services depuis moins d'un an et nous le recommandons.",
  },
];

export const projects: Project[] = [
  {
    slug: "jardin-vivant-vallet",
    title: "Jardin vivant à Vallet",
    category: "Conception + aménagement",
    city: "Vallet",
    summary: "Transformation complète d'un terrain sec en jardin nourricier avec terrasse bois et massifs durables.",
    image: "/images/project-01.svg",
  },
  {
    slug: "terrasse-massifs-clisson",
    title: "Terrasse et massifs à Clisson",
    category: "Aménagement",
    city: "Clisson",
    summary: "Création d'un espace de vie extérieur structuré, chaleureux et facile à entretenir.",
    image: "/images/project-02.svg",
  },
  {
    slug: "entretien-raisonne-vertou",
    title: "Entretien raisonné à Vertou",
    category: "Entretien",
    city: "Vertou",
    summary: "Programme d'entretien écologique annuel avec taille raisonnée et zéro phytosanitaire.",
    image: "/images/project-03.svg",
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
    image: "/images/blog-01.svg",
    content: [
      "Un jardin durable repose sur l'observation du terrain avant toute décision. La lumière, les vents et la qualité du sol orientent le plan d'ensemble.",
      "Le second levier consiste à structurer des zones d'usages claires. On distingue les espaces de détente, de passage, de plantation et d'entretien.",
      "Enfin, le choix des végétaux locaux et des matériaux pérennes garantit un résultat stable dans le temps, avec moins d'arrosage et moins d'interventions.",
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
    image: "/images/blog-02.svg",
    content: [
      "Le mulching permet de restituer de la matière organique au sol tout en limitant les évacuations de déchets verts.",
      "La taille raisonnée respecte la physiologie des arbres et arbustes. Elle améliore la tenue esthétique sans créer de stress excessif.",
      "Appliquées ensemble, ces méthodes réduisent l'entretien curatif au profit d'un entretien préventif plus durable.",
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
    image: "/images/blog-03.svg",
    content: [
      "Le choix de l'essence dépend de l'exposition, de l'humidité et de la fréquence d'utilisation de la terrasse.",
      "Une bonne conception intègre les circulations, les zones d'ombre et la continuité avec les massifs.",
      "La qualité de mise en oeuvre reste déterminante pour la stabilité, l'écoulement des eaux et la longévité globale.",
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
    image: "/images/project-01.svg",
  },
  {
    title: "Clôtures et limites",
    description: "Palissades bois ou naturelles pour structurer l'espace et s'isoler avec élégance.",
    image: "/images/project-02.svg",
  },
  {
    title: "Massifs et végétalisation",
    description: "Des palettes végétales adaptées au sol et au climat, vivantes toute l'année.",
    image: "/images/project-03.svg",
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
