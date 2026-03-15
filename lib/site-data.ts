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
  subtext: string;
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
  aboutText: string;
  image: string;
  gallery: string[];
  highlights: { label: string; value: string }[];
  seoKeywords: string[];
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
  facebook: "https://www.facebook.com/permapaysage",
  googleReviewsUrl:
    "https://search.google.com/local/reviews?placeid=ChIJyevHnQoNImQRCkXIe1ao2f8",
  sameAs: [
    "https://instagram.com/perma.paysage",
    "https://linkedin.com/company/permapaysage",
    "https://www.facebook.com/permapaysage",
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
  { value: "+150", label: "jardins sublimés", subtext: "Pour un cadre de vie apaisé." },
  { value: "+2 800", label: "végétaux plantés", subtext: "Essences locales et nourricières." },
  { value: "+14 700 m²", label: "entretenus", subtext: "La maîtrise de vos espaces." },
  { value: "+73 m³", label: "de biomasse", subtext: "Ressources revalorisées sur place." },
  { value: "+7 500", label: "heures de métier", subtext: "L\u2019exigence du geste artisanal." },
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
    slug: "conception-jardin-ecologique-clisson",
    title: "Conception de Jardin Écologique à Clisson",
    category: "Conception",
    city: "Clisson",
    summary:
      "Sanctuaire personnel nourricier, feuille de route durable pour un jardin de ville de 600 m².",
    description:
      "L\u2019enjeu de ce projet de conception de jardin à Clisson était de créer un sanctuaire personnel : un espace paisible, nourricier et adapté à son écosystème. Plus qu\u2019un simple plan, nous avons dessiné une feuille de route durable. L\u2019objectif : permettre à notre cliente de bâtir son refuge étape par étape, en garantissant la santé du sol et la cohérence paysagère.",
    aboutText:
      "Ce projet incarne notre philosophie : la conception comme outil de liberté. Pour ce jardin de ville dans le Vignoble, nous avons privilégié une sélection végétale indigène et des zones de biodiversité. Ce plan de paysagiste permet aujourd\u2019hui à la propriétaire de planter ses fruitiers sereinement, avec la certitude que chaque geste respecte l\u2019équilibre naturel de son terrain.",
    image: "/photos-entretien/apres/ap-04.jpg",
    gallery: [
      "/photos-entretien/apres/ap-01.jpg",
      "/photos-entretien/apres/ap-02.jpg",
      "/photos-entretien/apres/ap-03.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Clisson (44190)" },
      { label: "Surface", value: "600 m²" },
      { label: "Expertise", value: "Bureau d\u2019étude bioclimatique" },
      { label: "Catégorie", value: "Conception" },
    ],
    seoKeywords: [
      "Conception jardin Clisson",
      "Paysagiste conseil 44",
      "Plan de jardin permaculture",
    ],
  },
  {
    slug: "amenagement-jardin-familial-mouzillon",
    title: "Aménagement de Jardin Familial à Mouzillon",
    category: "Aménagement",
    city: "Mouzillon",
    summary:
      "Espace de jeu sécurisé de 350 m² avec structure bois durable et végétalisation sensorielle.",
    description:
      "Transformer un terrain nu en un espace de jeu sécurisé : tel était le défi de cet aménagement de jardin à Mouzillon. Pour ce projet de 350 m², nos clients cherchaient un espace clos « zéro souci » pour leur enfant. Nous avons conçu une structure bois durable et une végétalisation sensorielle pour protéger l\u2019intimité familiale sans compromis sur l\u2019esthétique.",
    aboutText:
      "La sécurité est une base de sérénité. Nous avons ceinturé le jardin d\u2019une clôture en bois local intégrée à des massifs arbustifs denses. L\u2019innovation : une sélection végétale sans épines (plantes mellifères et graminées). En combinant une terrasse bois et une pelouse robuste, nous avons créé une extension de vie où le design noble rencontre la spontanéité de l\u2019enfance.",
    image: "/photos-entretien/apres/ap-09.jpg",
    gallery: [
      "/photos-entretien/apres/ap-06.jpg",
      "/photos-entretien/apres/ap-07.jpg",
      "/photos-entretien/apres/ap-08.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Mouzillon (44330)" },
      { label: "Surface", value: "350 m²" },
      { label: "Expertise", value: "Aménagement bois et végétalisation" },
      { label: "Catégorie", value: "Aménagement" },
    ],
    seoKeywords: [
      "Aménagement extérieur Mouzillon",
      "Création jardin familial",
      "Terrasse bois paysagiste",
    ],
  },
  {
    slug: "terrasse-travertin-le-pallet",
    title: "Terrasse en Travertin au Pallet",
    category: "Aménagement",
    city: "Le Pallet",
    summary:
      "Terrasse de prestige en travertin Opus Romain, 45 m² de maçonnerie paysagère.",
    description:
      "L\u2019avant d\u2019une maison est sa première poignée de main. Au Pallet, l\u2019objectif était de remplacer un passage neutre par une terrasse de prestige soulignant l\u2019architecture. Nous avons opté pour le travertin en Opus Romain, une pierre naturelle aux nuances intemporelles. Ce calepinage traditionnel apporte un cachet authentique dès le premier pas sur la propriété.",
    aboutText:
      "Poser du travertin en Opus Romain est un exercice de précision que nous affectionnons. Ce puzzle de pierre doit être techniquement irréprochable pour garantir l\u2019évacuation des eaux. Sa clarté illumine la façade et s\u2019intègre parfaitement à l\u2019esprit du Vignoble Nantais. Une extension minérale qui valorise immédiatement le patrimoine de nos clients.",
    image: "/photos-entretien/apres/ap-03.jpg",
    gallery: [
      "/photos-entretien/apres/ap-01.jpg",
      "/photos-entretien/apres/ap-06.jpg",
      "/photos-entretien/apres/ap-07.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Le Pallet (44330)" },
      { label: "Surface", value: "45 m²" },
      { label: "Matériau", value: "Travertin 1er choix (Pierre naturelle)" },
      { label: "Catégorie", value: "Aménagement" },
    ],
    seoKeywords: [
      "Terrasse travertin Le Pallet",
      "Maçonnerie paysagère 44",
      "Pierre naturelle extérieur",
    ],
  },
  {
    slug: "cloture-bois-basse-goulaine",
    title: "Pose de Clôture en Bois à Basse-Goulaine",
    category: "Aménagement",
    city: "Basse-Goulaine",
    summary:
      "Séparation élégante et durable de 22 mètres en bois local sur muret existant.",
    description:
      "Comment redonner du prestige à un muret existant ? À Basse-Goulaine, nous avons recréé une séparation élégante et durable. L\u2019enjeu : trouver l\u2019équilibre entre intimité et esthétique aérienne. Le choix s\u2019est porté sur un bois de pays (Classe 4), sélectionné pour sa résistance face aux vents du Vignoble, garantissant une tenue parfaite sur le long terme.",
    aboutText:
      "L\u2019installation d\u2019une clôture bois sur muret demande une rigueur technique : la solidité dépend de l\u2019ancrage inox pour prévenir la corrosion. Nous avons opté pour une pose à claire-voie qui laisse passer la lumière tout en protégeant des regards. Une ligne sobre qui transforme un muret maçonné en un élément de décor noble et naturel.",
    image: "/photos-entretien/apres/ap-02.jpg",
    gallery: [
      "/photos-entretien/apres/ap-01.jpg",
      "/photos-entretien/apres/ap-04.jpg",
      "/photos-entretien/apres/ap-05.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Basse-Goulaine (44115)" },
      { label: "Linéaire", value: "22 mètres" },
      { label: "Matériaux", value: "Bois local et fixations inox" },
      { label: "Catégorie", value: "Aménagement" },
    ],
    seoKeywords: [
      "Clôture bois Basse-Goulaine",
      "Brise-vue bois local",
      "Aménagement clôture 44",
    ],
  },
  {
    slug: "entretien-jardin-la-chapelle-heulin",
    title: "Entretien de Jardin à La Chapelle-Heulin",
    category: "Entretien",
    city: "La Chapelle-Heulin",
    summary:
      "Suivi mensuel rigoureux pour une esthétique constante, avec crédit d\u2019impôt de 50 %.",
    description:
      "Un jardin est une matière vivante. À La Chapelle-Heulin, nous assurons un suivi mensuel rigoureux pour garantir une esthétique constante. Plus besoin de surveiller le calendrier : nous intervenons avec précision (tonte, taille, désherbage) pour que votre extérieur reste un lieu de détente absolue, sans la moindre contrainte pour vous.",
    aboutText:
      "Notre approche repose sur l\u2019anticipation. Nous entretenons la structure chaque mois : tonte adaptée à la météo et taille respectueuse des floraisons. Le désherbage est manuel ou thermique, sans chimie. Le résultat ? Un jardin qui ne semble jamais à l\u2019abandon. C\u2019est l\u2019expertise du Jardinier du Vignoble au service de votre temps libre.",
    image: "/photos-entretien/apres/ap-05.jpg",
    gallery: [
      "/photos-entretien/avant/av-01.jpg",
      "/photos-entretien/avant/av-02.jpg",
      "/photos-entretien/apres/ap-06.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "La Chapelle-Heulin (44330)" },
      { label: "Fréquence", value: "Passage mensuel (12 mois/an)" },
      { label: "Avantage", value: "50 % de crédit d\u2019impôt (Avance immédiate)" },
      { label: "Catégorie", value: "Entretien" },
    ],
    seoKeywords: [
      "Entretien jardin La Chapelle-Heulin",
      "Jardinier crédit d\u2019impôt 44",
      "Tonte et taille Vignoble",
    ],
  },
  {
    slug: "remise-en-etat-jardin-mouzillon",
    title: "Remise en état de Jardin à Mouzillon",
    category: "Entretien",
    city: "Mouzillon",
    summary:
      "Interventions stratégiques 2 à 3 fois par an : taille de structure, nettoyage et mise au propre.",
    description:
      "Certains jardins exigent un coup de maître aux moments charnières. Nous intervenons 2 à 3 fois par an à Mouzillon pour les travaux de force : taille de structure en sortie d\u2019hiver, nettoyage de printemps et mise au propre d\u2019automne. La solution idéale pour un jardin sain et architecturé sans intervention régulière.",
    aboutText:
      "Intervenir ponctuellement demande une vision globale. Chaque passage est une opération « coup de poing » : grandes hauteurs, volumes de déchets verts et taille technique. Nous revalorisons la biomasse sur place (paillage) pour limiter l\u2019évaporation et la repousse. C\u2019est l\u2019assurance d\u2019un jardin dompté et prêt à être admiré toute la saison.",
    image: "/photos-entretien/apres/ap-06.jpg",
    gallery: [
      "/photos-entretien/avant/av-04.jpg",
      "/photos-entretien/avant/av-05.jpg",
      "/photos-entretien/apres/ap-08.jpg",
    ],
    highlights: [
      { label: "Localisation", value: "Mouzillon (44330)" },
      { label: "Fréquence", value: "2 à 3 passages stratégiques / an" },
      { label: "Prestations", value: "Taille de haies, élagage, nettoyage massifs" },
      { label: "Catégorie", value: "Entretien" },
    ],
    seoKeywords: [
      "Remise en état jardin Mouzillon",
      "Taille de haie paysagiste",
      "Nettoyage jardin 44",
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

export const entretienPrestations = [
  {
    title: "Tonte de pelouse en mulching",
    description:
      "Retrouvez le plaisir de marcher pieds nus dans une herbe fraîche chaque samedi, sans jamais sortir la tondeuse.",
  },
  {
    title: "Débroussaillage",
    description:
      "Ne laissez plus les ronces envahir votre tranquillité. Nous redonnons vie à vos espaces oubliés.",
  },
  {
    title: "Taille de haies, arbustes & fruitiers",
    description:
      "Une taille au moment idéal pour garantir floraisons et récoltes, sans corvée ni évacuation pour vous.",
  },
  {
    title: "Désherbage manuel et écoresponsable",
    description:
      "Dites adieu aux mauvaises herbes sans culpabilité. Un extérieur soigné et respectueux de la biodiversité.",
  },
  {
    title: "Entretien des massifs vivaces et fleuris",
    description:
      "Un suivi saisonnier pour que vos massifs soient un spectacle permanent sous vos fenêtres.",
  },
  {
    title: "Soufflage & ramassage des feuilles",
    description:
      "Des allées et une pelouse dégagées en un clin d\u2019œil pour préserver la beauté et la sécurité de vos accès.",
  },
  {
    title: "Nettoyage des allées et terrasses",
    description:
      "Redonnez de l\u2019éclat à vos espaces de vie. Retrouvez le plaisir de recevoir vos proches en toute sérénité.",
  },
  {
    title: "Scarification",
    description:
      "Offrez une cure de jeunesse à votre pelouse. Élimination du feutrage pour permettre à votre gazon de respirer et reverdir.",
  },
];

export const entretienGaranties = [
  {
    title: "Satisfaction garantie",
    description:
      "Si un détail ne vous convient pas, nous revenons corriger le travail gratuitement sous 3 jours.",
  },
  {
    title: "Transparence fiscale",
    description:
      "Profitez d\u2019un service pro pour la moitié du prix. Nous gérons toutes les démarches administratives pour vous.",
  },
  {
    title: "Respect de votre temps",
    description:
      "Toujours à l\u2019heure, nous ne repartons jamais sans avoir nettoyé vos allées. Un jardin net, sans effort pour vous.",
  },
];

export const entretienFaq = [
  {
    question: "Quels travaux d\u2019entretien sont éligibles au crédit d\u2019impôt de 50 % ?",
    answer:
      "La quasi-totalité des tâches d\u2019entretien courant sont couvertes : tonte, débroussaillage, désherbage manuel, scarification, ramassage des feuilles, taille de haies et arbustes (à hauteur d\u2019homme), nettoyage des allées et terrasses.",
  },
  {
    question: "Si je ne paye pas d\u2019impôts, ai-je quand même droit aux 50 % ?",
    answer:
      "Absolument. C\u2019est un crédit d\u2019impôt universel. Si vous n\u2019êtes pas imposable, le Trésor Public vous rembourse la moitié de vos dépenses par virement ou chèque. Avec l\u2019Avance Immédiate Urssaf, vous ne payez que 50 % dès la facture.",
  },
  {
    question: "C\u2019est quoi l\u2019Avance Immédiate de l\u2019Urssaf ?",
    answer:
      "Au lieu d\u2019attendre un an pour être remboursé, l\u2019Urssaf déduit votre aide instantanément. Pour 200 \u20AC de prestation, vous ne réglez que 100 \u20AC. C\u2019est l\u2019État qui verse directement le complément.",
  },
  {
    question: "Dois-je fournir les outils ou l\u2019essence ?",
    answer:
      "Rien du tout. Nous venons avec notre propre équipement professionnel. Vous n\u2019avez pas à vous soucier de l\u2019entretien des machines, du stockage ou des consommables.",
  },
  {
    question: "Intervenez-vous pour une seule fois ou faut-il un contrat ?",
    answer:
      "Nous nous adaptons à votre besoin. Que ce soit pour un coup de propre ponctuel ou un entretien régulier à l\u2019année, vous êtes libre. Pas d\u2019engagement de longue durée.",
  },
  {
    question: "Utilisez-vous des produits phytosanitaires ?",
    answer:
      "Non. L\u2019approche privilégie des pratiques 100 % écologiques : désherbage manuel, mulching, taille raisonnée et respect des cycles de croissance.",
  },
  {
    question: "Quels sont vos tarifs et fréquences de passage ?",
    answer:
      "Les tarifs varient selon la surface et les besoins. Les passages peuvent être ponctuels (taille de haies, grand nettoyage) ou réguliers (contrat annuel d\u2019entretien). Contactez-nous pour un devis gratuit.",
  },
  {
    question: "Acceptez-vous le CESU ?",
    answer:
      "Oui, dans le cadre du service à la personne (réalisé via Le Jardinier du Vignoble), le règlement par Chèque Emploi Service Universel (CESU) préfinancé est accepté, ainsi que CB, virement et chèque.",
  },
  {
    question: "Y a-t-il des prestations non éligibles au crédit d\u2019impôt ?",
    answer:
      "Oui, sont exclus : les travaux de création paysagère (massifs, clôtures, terrasses), l\u2019élagage nécessitant des cordes ou harnais, et la vente de végétaux ou matériel. Seule la main-d\u2019œuvre d\u2019entretien est déductible.",
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
