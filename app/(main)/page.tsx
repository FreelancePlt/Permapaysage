import {
	ArrowRightIcon,
	CalendarBlankIcon,
	ClockIcon,
	CompassIcon,
	GlobeIcon,
	HandsClappingIcon,
	HeartIcon,
	LeafIcon,
	MapPinIcon,
	PhoneCallIcon,
	PlantIcon,
	RecycleIcon,
	StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { GoogleReviews } from "@/components/shared/google-reviews";
import { HeroCarousel } from "@/components/shared/hero-carousel";
import { SectionEdge } from "@/components/shared/section-edge";
import { StructuredData } from "@/components/shared/structured-data";
import { ZoneIntervention } from "@/components/shared/zone-intervention";
import { getGoogleReviewSummary } from "@/lib/google-review-summary";
import {
	buildFaqSchema,
	buildItemListSchema,
	buildOrganizationSchema,
	buildPageMetadata,
	buildWebPageSchema,
	buildWebsiteSchema,
} from "@/lib/seo";
import { urlFor } from "@/lib/sanity/image";
import { getFaq, getRealisations } from "@/lib/sanity/queries";
import type { Faq, Realisation } from "@/lib/sanity/types";
import { company, interventionCityLinks, projects, services } from "@/lib/site-data";

const title = "Paysagiste écologique à Vallet et Clisson | Permapaysage";
const description =
	"Paysagiste écologique à Vallet : création et entretien de jardins à Clisson, Le Loroux-Bottereau, La Chapelle-Heulin, Le Pallet et alentours. Visite offerte.";
export const metadata = buildPageMetadata({
	title,
	description,
	path: "/",
	keywords: ["paysagiste Vallet", "jardin durable Clisson", "entretien jardin"],
});

const categorieLabels: Record<string, string> = {
	conception: "Conception",
	amenagement: "Aménagement",
	terrasse: "Terrasse",
	cloture: "Clôture",
	massif: "Massif",
	entretien: "Entretien",
};

const orderedServices = ["entretien", "conception", "amenagement"] as const;
const serviceIcons = {
	entretien: RecycleIcon,
	conception: CompassIcon,
	amenagement: PlantIcon,
};
const process = [
	{
		title: "Appel de 15 minutes",
		text: "Un premier échange pour parler de votre jardin et de vos envies.",
		icon: PhoneCallIcon,
	},
	{
		title: "Visite terrain offerte",
		text: "Nous découvrons le lieu, ses contraintes et ses possibilités.",
		icon: MapPinIcon,
	},
	{
		title: "Proposition sous 48 h",
		text: "Vous recevez une proposition adaptée à votre projet.",
		icon: ClockIcon,
	},
	{
		title: "Intervention",
		text: "Votre jardin prend forme, avec soin et dans le respect du vivant.",
		icon: PlantIcon,
	},
];
const values = [
	{
		title: "Prendre soin de la terre",
		text: "Préserver les sols et la biodiversité avec des végétaux adaptés et une gestion raisonnée.",
		icon: GlobeIcon,
	},
	{
		title: "Prendre soin des hommes",
		text: "Écouter vos besoins et prendre soin des personnes qui façonnent votre jardin.",
		icon: HeartIcon,
	},
	{
		title: "Partager équitablement",
		text: "Créer des jardins nourriciers qui offrent des récoltes et un refuge à la biodiversité.",
		icon: HandsClappingIcon,
	},
];
const homeFaq = [
	{
		question: "Comment fonctionne le crédit d'impôt de 50 % ?",
		answer:
			"L'entretien de votre jardin (tonte, taille de haies et d'arbustes, désherbage, débroussaillage, ramassage des feuilles) ouvre droit à un crédit d'impôt de 50 % des sommes versées, que vous soyez imposable ou non. Une intervention de 200 € vous revient donc à 100 €. Avec l'avance immédiate de l'Urssaf, vous ne réglez que la moitié dès la facture. Le plafond est de 5 000 € de dépenses par an et par foyer. La conception, les terrasses et les clôtures n'y ouvrent pas droit.",
	},
	{
		question: "Quel budget prévoir ?",
		answer:
			"La visite de votre jardin et le devis sont toujours offerts, sans engagement. Pour l'entretien, le prix dépend de la surface et de la fréquence des passages, et le crédit d'impôt divise la facture par deux. Pour la conception, la formule « Votre jardin de rêve » (plan 2D et plan de plantation) démarre à 1 000 €, et l'étude complète avec livret pour réaliser vous-même à 2 500 €. Vous préférez faire vous-même avec de bons conseils ? Le coaching de jardin, à 150 € TTC, vous accompagne directement dans votre jardin. Les aménagements (plantations, clôtures, allées, terrasses) sont chiffrés sur devis après la visite.",
	},
	{
		question: "Sous quel délai intervenez-vous ?",
		answer:
			"Nous vous répondons sous 48 h pour fixer un premier échange. La date d'intervention vous est donnée dans la proposition : elle dépend de la saison et de la nature du chantier. Bon à savoir : l'automne et l'hiver sont les meilleures saisons pour planter et pour concevoir votre jardin avant le printemps.",
	},
	{
		question: "Intervenez-vous dans ma commune ?",
		answer:
			"Nous intervenons dans un rayon de 25 km autour de Vallet : Clisson, Le Loroux-Bottereau, La Chapelle-Heulin, Le Pallet, Mouzillon, Saint-Julien-de-Concelles, Divatte-sur-Loire, Haute-Goulaine, Gorges, Aigrefeuille-sur-Maine, Gétigné, Le Landreau et Vertou. Vous êtes un peu plus loin ? Contactez-nous, nous vous dirons si nous pouvons venir.",
	},
];
const normalizeQuestion = (question: string) =>
	question
		.normalize("NFKC")
		.replace(/[’‘]/g, "'")
		.replace(/\s+/g, " ")
		.trim()
		.toLocaleLowerCase("fr");
// Asset verified in the existing Clisson project, used only as a fallback when its CMS gallery is unavailable.
const clissonPhoto =
	"https://cdn.sanity.io/images/ecfagc9w/production/9f29e2f8a9fc7b2b44ffb14c4ed91909b521d374-3264x1836.jpg";

export default async function HomePage() {
	const [cmsProjects, cmsFaq]: [Realisation[], Faq[]] = await Promise.all([
		getRealisations(),
		getFaq(),
	]);
	const reviews = await getGoogleReviewSummary();
	const faqItems = homeFaq.map(({ question, answer }) => {
		const source = cmsFaq.find(
			(item) =>
				normalizeQuestion(item.question) === normalizeQuestion(question) &&
				item.reponse?.trim(),
		);
		return { question, answer: source?.reponse ?? answer };
	});
	const clisson = cmsProjects.find(
		(project) =>
			project.ville?.toLocaleLowerCase("fr") === "clisson" ||
			project.slug.current.includes("clisson"),
	);
	const conceptionPhoto = clisson?.images.find(
		(image) =>
			image.asset?._ref ===
			"image-9f29e2f8a9fc7b2b44ffb14c4ed91909b521d374-3264x1836-jpg",
	);
	const serviceImages = {
		entretien: {
			src: "/photos-site/entretien-jardin-glycine-pas-japonais-paysagiste-saint-julien-de-concelles.webp",
			alt: "Jardin entretenu à Saint-Julien-de-Concelles : glycine en fleurs, pelouse et pas japonais",
		},
		conception: {
			src: "/photos-site/vignette-plan-conception-jardin-paysagiste-haute-goulaine.webp",
			alt: "Plan de conception d'un jardin à Haute-Goulaine avec potager, mare et massifs",
		},
		amenagement: {
			src: "/photos-entretien/illustrations/terrasse-travertin.jpg",
			alt: "Terrasse en travertin devant une maison en pierre",
		},
	};
	const displayedProjects = cmsProjects.length
		? cmsProjects.slice(0, 3).map((project) => {
				const knownClisson = project.slug.current === clisson?.slug.current;
				const image = knownClisson
					? (conceptionPhoto ?? project.images[3] ?? project.images[0])
					: project.images[0];
				return {
					slug: project.slug.current,
					title: project.titre,
					summary: project.resume,
					category: categorieLabels[project.categorie] || project.categorie,
					image: image ? urlFor(image).width(900).url() : undefined,
					alt: image?.alt || project.titre,
				};
			})
		: projects.slice(0, 3).map((project) => ({
				...project,
				image: project.city === "Clisson" ? clissonPhoto : project.image,
				alt: project.title,
			}));
	// TODO CONTENU: remplacer la photo actuelle du projet de Clisson par la nouvelle sélection de Jessy.
	const schemas = [
		buildWebsiteSchema(),
		buildOrganizationSchema(),
		buildWebPageSchema({ title, description, path: "/" }),
		buildItemListSchema(
			orderedServices.map((slug) => ({
				name: services.find((service) => service.slug === slug)!.title,
				path: `/${slug}`,
			})),
		),
		buildFaqSchema(faqItems),
	];

	return (
		<>
			<StructuredData data={schemas} />
			<section className="dark-section decor decor-branch pt-12 pb-16 md:pt-20 md:pb-28">
				<Container>
					<div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.1fr_0.9fr] lg:gap-12">
						<div>
							<p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-cream/80">
								<LeafIcon size={16} aria-hidden />
								VIGNOBLE NANTAIS · 25 KM AUTOUR DE VALLET
							</p>
							<h1 className="mt-6 max-w-3xl text-[2.35rem] leading-[1.1] tracking-[-0.025em] text-cream sm:text-5xl xl:text-[3.6rem]">
								Paysagiste écologique à Vallet : un beau jardin, moins de temps
								à y passer
							</h1>
							<p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
								Création et entretien de jardins vivants, pensés pour durer et
								demander peu d&apos;entretien.
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<CtaButton emplacement="hero"
									action="call"
									compactOnNarrowDesktop
									variant="primary-dark"
									icon={<CalendarBlankIcon size={20} aria-hidden />}
									className="w-full px-3 sm:w-auto"
								/>
								<CtaButton emplacement="hero"
									action="visit"
									variant="secondary-dark"
									icon={<ArrowRightIcon size={18} aria-hidden />}
									iconPosition="right"
									className="w-full px-3 sm:w-auto"
								/>
							</div>
							<p className="mt-4 text-sm leading-relaxed text-cream/80">
								Appel gratuit et sans engagement · Réponse sous 48 h
							</p>
							<ul className="mt-7 space-y-3 text-sm text-cream/90">
								<li>
									<Link
										href={reviews.googleMapsUri}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 underline decoration-cream/35 underline-offset-4 hover:decoration-cream"
									>
										<StarIcon
											size={18}
											weight="fill"
											className="text-cta-ochre"
											aria-hidden
										/>
										<span>
											{reviews.rating}/5 sur <span translate="no" className="whitespace-nowrap font-sans font-normal not-italic tracking-normal text-white">Google Maps</span> · {reviews.reviewCount} avis
										</span>
									</Link>
								</li>
								<li>
									<Link
										href="/entretien"
										className="inline-flex items-center gap-2 underline decoration-cream/35 underline-offset-4 hover:decoration-cream"
									>
										<LeafIcon size={18} aria-hidden />
										Entretien : 50 % de crédit d&apos;impôt
									</Link>
								</li>
								<li className="flex items-center gap-2">
									<MapPinIcon size={18} aria-hidden />
									Visite et devis offerts
								</li>
							</ul>
						</div>
						<HeroCarousel />
					</div>
				</Container>
				<SectionEdge className="text-background" />
			</section>

			<section className="py-16 md:py-24" aria-labelledby="services-title">
				<Container>
					<div className="max-w-2xl">
						<p className="section-eyebrow">Nos services</p>
						<h2 id="services-title" className="mt-3 text-3xl md:text-4xl">
							Un jardin qui vous ressemble, à chaque étape
						</h2>
						<p className="mt-4 text-base leading-relaxed text-muted-foreground">
							Entretenir, imaginer, aménager : choisissez l&apos;accompagnement
							dont votre jardin a besoin.
						</p>
					</div>
					<div className="mt-10 grid gap-6 md:grid-cols-3">
						{orderedServices.map((slug) => {
							const service = services.find((item) => item.slug === slug)!;
							const Icon = serviceIcons[slug];
							const photo = serviceImages[slug];
							return (
								<article
									key={slug}
									className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
								>
									<Link
										href={`/${slug}`}
										className="group relative block overflow-hidden"
									>
										<Image
											src={photo.src}
											alt={photo.alt}
											width={900}
											height={600}
											sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 96px) / 3 - 2px), 393px"
											className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
										/>
										{slug === "entretien" && (
											<span className="absolute bottom-4 left-4 rounded-full bg-cream px-3 py-2 text-xs font-semibold text-primary">
												-50 % crédit d&apos;impôt
											</span>
										)}
									</Link>
									<div className="flex flex-1 flex-col p-6 lg:p-7">
										<Icon
											size={26}
											weight="duotone"
											className="mb-5 text-secondary"
											aria-hidden
										/>
										<h3 className="text-2xl">
											<Link href={`/${slug}`} className="hover:underline">
												{service.title}
											</Link>
										</h3>
										<p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
											{service.shortDescription}
										</p>
										{slug === "entretien" && (
											<p className="mt-4 text-sm font-semibold text-primary">
												200 € de prestation = 100 € pour vous
											</p>
										)}
										<Link
											href={`/${slug}`}
											className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
										>
											Découvrir ce service
											<ArrowRightIcon size={16} aria-hidden />
										</Link>
										<CtaButton emplacement="services"
											action="visit"
											projectType={slug}
											variant="secondary-light"
											className="mt-5 w-full whitespace-normal px-2 text-center leading-tight"
										/>
									</div>
								</article>
							);
						})}
					</div>
				</Container>
			</section>

			<GoogleReviews data={reviews} />

			<section
				className="bg-card py-16 md:py-24"
				aria-labelledby="projects-title"
			>
				<Container>
					<div className="max-w-2xl">
						<p className="section-eyebrow">Réalisations</p>
						<h2 id="projects-title" className="mt-3 text-3xl md:text-4xl">
							Des projets différents, une même attention
						</h2>
					</div>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						{displayedProjects.map((project) => (
							<Link
								key={project.slug}
								href={`/realisations/${project.slug}`}
								className="group block overflow-hidden rounded-2xl border border-border bg-background"
							>
								{project.image ? (
									<Image
										src={project.image}
										alt={project.alt}
										width={900}
										height={600}
										sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 96px) / 3 - 2px), 393px"
										className="aspect-4/3 w-full object-cover"
									/>
								) : (
									<div className="flex aspect-4/3 items-center justify-center bg-surface-sage text-sm text-muted-foreground">
										Photo du projet à venir
									</div>
								)}
								<div className="p-6">
									<p className="text-xs font-semibold uppercase tracking-wide text-primary-light">
										{project.category}
									</p>
									<h3 className="mt-2 text-xl group-hover:underline">
										{project.title}
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{project.summary}
									</p>
									<span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
										Voir le projet
										<ArrowRightIcon size={16} aria-hidden />
									</span>
								</div>
							</Link>
						))}
					</div>
					<div className="mt-8 text-right">
						<Link
							href="/realisations"
							className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
						>
							Voir toutes les réalisations
							<ArrowRightIcon size={18} aria-hidden />
						</Link>
					</div>
				</Container>
			</section>

			<section
				className="dark-section decor decor-branch-left pt-20 pb-16 md:pt-32 md:pb-24"
				aria-labelledby="process-title"
			>
				<SectionEdge position="top" className="text-card" />
				<Container>
					<div className="max-w-2xl">
						<p className="section-eyebrow">Comment ça se passe</p>
						<h2 id="process-title" className="mt-3 text-3xl text-cream md:text-4xl">
							Un premier échange, puis du concret
						</h2>
					</div>
					<ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{process.map((step, index) => (
							<li
								key={step.title}
								className="h-full rounded-2xl border border-cream/15 bg-cream/[0.06] p-6"
							>
								<div className="flex items-center justify-between">
									<step.icon
										size={30}
										weight="duotone"
										className="text-cta-ochre"
										aria-hidden
									/>
									<span aria-hidden="true" className="font-serif text-3xl text-cream/60">
										0{index + 1}
									</span>
								</div>
								<h3 className="mt-5 text-xl text-cream">{step.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-cream/75">
									{step.text}
								</p>
							</li>
						))}
					</ol>
					<CtaButton emplacement="process"
						action="call"
						variant="primary-dark"
						icon={<CalendarBlankIcon size={20} aria-hidden />}
						responsiveLabel={false}
						className="mt-9 w-full whitespace-normal px-3 text-center sm:w-auto"
					/>
				</Container>
			</section>

			<section
				className="bg-card py-16 md:py-24"
				aria-labelledby="about-title"
			>
				<Container>
					<div className="grid items-center gap-10 lg:grid-cols-2">
						<div className="photo-frame">
							<Image
								src="/photos-site/equipe-permapaysage-paysagiste-vallet.webp"
								alt="Jessy et l'équipe Permapaysage devant le camion de l'entreprise à Vallet"
								width={1600}
								height={1200}
								sizes="(max-width: 1023px) calc(100vw - 32px), 600px"
								className="aspect-4/3 w-full rounded-xl object-cover"
							/>
						</div>
						<div>
							<p className="section-eyebrow">Qui est derrière Permapaysage</p>
							<h2 id="about-title" className="mt-3 text-3xl md:text-4xl">
								Jessy, à l&apos;écoute de votre jardin
							</h2>
							<div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
								<p>
									Jessy Laderriere est le fondateur de Permapaysage, à Vallet.
								</p>
								<p>
									Il vous accompagne dans la conception, l&apos;aménagement et
									l&apos;entretien de votre jardin.
								</p>
								<p>
									Son approche écologique s&apos;appuie sur l&apos;observation
									du lieu, vos usages et les éthiques de la permaculture.
								</p>
							</div>
							<Link
								href="/a-propos"
								className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
							>
								Découvrir notre démarche
								<ArrowRightIcon size={18} aria-hidden />
							</Link>
						</div>
					</div>
					<div className="mt-12 grid gap-7 pt-4 md:grid-cols-3">
						{values.map((value) => (
							<article key={value.title}>
								<value.icon
									size={25}
									weight="duotone"
									className="text-secondary"
									aria-hidden
								/>
								<h3 className="mt-3 text-xl">{value.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									{value.text}
								</p>
							</article>
						))}
					</div>
				</Container>
			</section>

			<ZoneIntervention
				cities={interventionCityLinks}
				texte="Nous intervenons dans un rayon de 25 km autour de Vallet pour la conception, l'aménagement et l'entretien de jardins dans le Vignoble Nantais."
			/>

			<section
				className="decor decor-contours-left bg-surface-sage py-16 md:py-24"
				aria-labelledby="faq-title"
			>
				<Container>
					<div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
						<div>
							<p className="section-eyebrow">Questions fréquentes</p>
							<h2 id="faq-title" className="mt-3 text-3xl md:text-4xl">
								Avant de se rencontrer
							</h2>
							<Link
								href="/faq"
								className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
							>
								Toutes les questions
								<ArrowRightIcon size={18} aria-hidden />
							</Link>
						</div>
						<FaqAccordion items={faqItems} />
					</div>
				</Container>
			</section>

			<section
				className="dark-section decor decor-branch pt-20 pb-16 md:pt-32 md:pb-24"
				aria-labelledby="final-title"
			>
				<SectionEdge position="top" className="text-surface-sage" />
				<Container>
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-xs font-semibold uppercase tracking-widest text-cream/80">
							Faisons le premier pas
						</p>
						<h2
							id="final-title"
							className="mt-5 text-3xl leading-tight text-cream md:text-5xl"
						>
							Votre jardin ne devrait pas être une contrainte
						</h2>
						<p className="mt-6 text-base leading-relaxed text-cream/80">
							Appel gratuit · Visite et devis offerts · Réponse sous 48 h
						</p>
						<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
							<CtaButton emplacement="final"
								action="call"
								variant="primary-dark"
								icon={<CalendarBlankIcon size={20} aria-hidden />}
							/>
							<CtaButton emplacement="final"
								action="visit"
								variant="secondary-dark"
								icon={<ArrowRightIcon size={18} aria-hidden />}
								iconPosition="right"
								className="px-3"
							/>
						</div>
						<a
							href="tel:+33752620818"
							className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-cream hover:underline"
						>
							<PhoneCallIcon size={20} aria-hidden />
							{company.phone}
						</a>
					</div>
				</Container>
			</section>
		</>
	);
}
