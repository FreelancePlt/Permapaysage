import {
	ArrowRightIcon,
	CompassIcon,
	LeafIcon,
	MapPinIcon,
	RecycleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { GoogleReviews } from "@/components/shared/google-reviews";
import { CtaButton, ctaButtonVariants } from "@/components/shared/cta-button";
import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { getCityContent, getRealisations } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Realisation } from "@/lib/sanity/types";
import { isValidCoordinates } from "@/lib/geo";
import { cityLocation, safeHttpsLink, selectCityProjects } from "@/lib/cities";
import {
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildPageMetadata,
	buildWebPageSchema,
} from "@/lib/seo";
import { cityPages, services } from "@/lib/site-data";

type CityPageProps = {
	params: Promise<{ citySlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
	return cityPages.map((cityPage) => ({ citySlug: cityPage.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
	const { citySlug } = await params;
	const cityPage = cityPages.find((item) => item.slug === citySlug);

	if (!cityPage) {
		return buildPageMetadata({
			title: "Paysagiste à Vallet | Permapaysage",
			description: "Permapaysage intervient autour de Vallet.",
			path: `/${citySlug}`,
			noIndex: true,
		});
	}

	const location = cityLocation(cityPage.city);
	const content = await getCityContent(citySlug);
	const distance = content?.distanceDepuisVallet?.trim() || cityPage.distance;

	return buildPageMetadata({
		title: `Paysagiste ${location} | Conception et aménagement | Permapaysage`,
		description: `Permapaysage, votre éco-paysagiste ${location}${distance ? ` (${distance} de Vallet)` : ""}. Conception, aménagement et entretien de jardins écologiques en Loire-Atlantique.`,
		path: `/${cityPage.slug}`,
		keywords: [
			`paysagiste ${cityPage.city}`,
			`amenagement jardin ${cityPage.city}`,
			`entretien jardin ${cityPage.city}`,
			`conception jardin ${cityPage.city}`,
		],
	});
}

const serviceIcons = [CompassIcon, RecycleIcon, LeafIcon];
// Asset filenames are reversed: visually verified terrace = entretien-espaces-verts, pruning = amenagements-exterieurs.
const serviceImages: Record<string, string> = {
	conception: "/services/conception-jardin.webp",
	amenagement: "/services/entretien-espaces-verts.webp",
	entretien: "/services/amenagements-exterieurs.webp",
};

export default async function CitySeoPage({ params }: CityPageProps) {
	const { citySlug } = await params;
	const cityPage = cityPages.find((item) => item.slug === citySlug);

	if (!cityPage) {
		notFound();
	}

	const location = cityLocation(cityPage.city);

	const [content, publishedProjects]: [
		Awaited<ReturnType<typeof getCityContent>>,
		Realisation[],
	] = await Promise.all([getCityContent(citySlug), getRealisations()]);
	const distance = content?.distanceDepuisVallet?.trim() || cityPage.distance;
	const coordinates: [number, number] =
		content?.coordonnees &&
		isValidCoordinates(content.coordonnees.lat, content.coordonnees.lng)
			? [content.coordonnees.lat, content.coordonnees.lng]
			: cityPage.coordinates;
	const localProjects = selectCityProjects(
		cityPage.city,
		publishedProjects,
		content?.realisations ?? [],
	);
	const realFaqItems = (content?.faqLocale ?? [])
		.filter((faq) => faq?.question?.trim() && faq.reponse?.trim())
		.slice(0, 3)
		.map((faq) => ({
			question: faq.question!.trim(),
			answer: faq.reponse!.trim(),
		}));
	// TODO CONTENU: renseigner les trois réponses locales vérifiées dans Sanity pour chaque commune.
	const placeholders = [
		`Comment organiser une visite terrain ${location} ?`,
		`Quelles réalisations pouvez-vous présenter ${location} ?`,
		`Quels travaux d’entretien proposez-vous ${location} ?`,
	].map((question) => ({
		question,
		answer:
			"Réponse locale à venir. Contactez Jessy pour préciser votre projet.",
	}));
	const faqItems = [...realFaqItems, ...placeholders]
		.filter(
			(faq, index, items) =>
				items.findIndex((item) => item.question === faq.question) === index,
		)
		.slice(0, 3);
	const localReview =
		content?.avisLocal?.auteur?.trim() && content.avisLocal.texte?.trim()
			? content.avisLocal
			: undefined;
	const reviewSource = safeHttpsLink(localReview?.source);
	const reviewDate =
		localReview?.date &&
		/^\d{4}-\d{2}-\d{2}$/.test(localReview.date) &&
		Number.isFinite(Date.parse(localReview.date)) &&
		new Date(localReview.date).toISOString().slice(0, 10) === localReview.date
			? localReview.date
			: undefined;

	const schemas = [
		buildWebPageSchema({
			title: `Paysagiste ${location} | Conception et aménagement | Permapaysage`,
			description: `Permapaysage, votre éco-paysagiste ${location}${distance ? ` (${distance} de Vallet)` : ""}. Conception, aménagement et entretien de jardins écologiques en Loire-Atlantique.`,
			path: `/${cityPage.slug}`,
		}),
		buildBreadcrumbSchema([
			{ name: "Accueil", path: "/" },
			{ name: `Paysagiste ${location}`, path: `/${cityPage.slug}` },
		]),
		...(realFaqItems.length ? [buildFaqSchema(realFaqItems)] : []),
	];

	return (
		<>
			<StructuredData data={schemas} />

			{/* ── HERO ── */}
			<section className="dark-section relative overflow-hidden py-20 md:py-28">
				<Container>
					<div className="relative max-w-3xl space-y-6 appearance-animation animate-in fade-in slide-in-from-bottom-4 duration-300">
						<div className="inline-flex items-center gap-2 border-b border-cream/25 pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cream/80">
							<MapPinIcon size={14} weight="fill" />
							{cityPage.city}
							{distance ? ` · ${distance} de Vallet` : ""}
						</div>
						<h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
							Paysagiste {location} : conception, aménagement et entretien
						</h1>
						<p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
							{content?.paragrapheLocal?.trim() || cityPage.intro}
						</p>
						<div className="flex flex-wrap gap-3">
							<CtaButton
								emplacement="city"
								action="call"
								variant="primary-dark"
								className="w-full sm:w-auto"
							/>
							<Link
								href="/realisations"
								className={ctaButtonVariants({
									variant: "secondary-dark",
									className: "w-full sm:w-auto",
								})}
							>
								Voir les réalisations
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* ── SERVICES ── */}
			<section className="py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="mx-auto max-w-2xl text-center">
							<p className="section-eyebrow">Nos services {location}</p>
							<h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
								Trois expertises pour votre jardin
							</h2>
							<p className="text-muted-foreground mt-4 text-base md:text-lg">
								De la conception à l&apos;entretien, nous intervenons {location}{" "}
								et dans tout le Vignoble Nantais.
							</p>
						</div>
					</Reveal>
					<div className="mt-14 grid gap-6 md:grid-cols-3">
						{services.map((service, idx) => {
							const Icon = serviceIcons[idx];
							return (
								<Reveal key={service.slug} delay={idx * 100}>
									<Link
										href={`/${service.slug}`}
										className="group block h-full"
									>
										<article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
											<div className="relative overflow-hidden bg-card">
												<Image
													src={serviceImages[service.slug]}
													alt={`Illustration : ${service.title}`}
													sizes="(min-width: 1280px) 395px, (min-width: 768px) calc((100vw - 96px) / 3), calc(100vw - 32px)"
													width={600}
													height={400}
													className="aspect-4/3 w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.025]"
												/>
											</div>
											<div className="relative flex flex-1 flex-col p-8">
												<div className="mb-5 flex items-center justify-between border-b border-border pb-5 text-secondary">
													{Icon && <Icon size={24} weight="duotone" />}
													<span
														aria-hidden="true"
														className="font-serif text-xl text-primary/80"
													>
														0{idx + 1}
													</span>
												</div>
												<h3 className="text-2xl leading-tight">
													{service.title}
												</h3>
												<p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
													{service.shortDescription}
												</p>
												<span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
													Découvrir
													<ArrowRightIcon
														size={14}
														weight="bold"
														className="transition-transform group-hover:translate-x-1"
													/>
												</span>
											</div>
										</article>
									</Link>
								</Reveal>
							);
						})}
					</div>
				</Container>
			</section>

			{/* ── RÉALISATIONS LOCALES ── */}
			{localProjects.length > 0 && (
				<section className="bg-card py-20 md:py-28">
					<Container>
						<Reveal>
							<div className="mx-auto max-w-2xl text-center">
								<p className="section-eyebrow">Réalisations {location}</p>
								<h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
									Nos projets {location}
								</h2>
							</div>
						</Reveal>
						<div className="mt-12 grid gap-6 md:grid-cols-3">
							{localProjects.slice(0, 3).map((project, idx) => (
								<Reveal key={project._id} delay={idx * 100}>
									<Link
										href={`/realisations/${project.slug.current}`}
										className="group block h-full"
									>
										<article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
											<div className="relative overflow-hidden">
												{project.images?.[0]?.asset?._ref ? (
													<Image
														src={urlFor(project.images[0]).width(900).url()}
														alt={project.images?.[0]?.alt || project.titre}
														sizes="(min-width: 1280px) 395px, (min-width: 768px) calc((100vw - 96px) / 3), calc(100vw - 32px)"
														width={900}
														height={600}
														className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
													/>
												) : (
													<div className="flex aspect-4/3 items-center justify-center bg-surface-sage p-6 text-sm text-muted-foreground">
														Photo de cette réalisation à venir
													</div>
												)}
												<span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
													{(
														{
															conception: "Conception",
															amenagement: "Aménagement",
															entretien: "Entretien",
															terrasse: "Terrasse",
															cloture: "Clôture",
															massif: "Massif",
														} as Record<string, string>
													)[project.categorie] ?? project.categorie}
												</span>
											</div>
											<div className="flex flex-1 flex-col p-6">
												<h3 className="text-xl leading-tight line-clamp-1">
													{project.titre}
												</h3>
												<p className="text-muted-foreground mt-2 flex-1 text-sm line-clamp-2">
													{project.resume}
												</p>
												<span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
													Voir le projet
													<ArrowRightIcon
														size={14}
														weight="bold"
														className="transition-transform group-hover:translate-x-1"
													/>
												</span>
											</div>
										</article>
									</Link>
								</Reveal>
							))}
						</div>
					</Container>
				</section>
			)}

			{localReview && (
				<section className="bg-surface-sage py-16 md:py-20">
					<Container className="max-w-3xl">
						<h2 className="text-3xl">Un témoignage {location}</h2>
						<figure className="mt-6 rounded-2xl border border-primary/10 bg-background p-6">
							<blockquote className="whitespace-pre-line text-sm leading-relaxed">
								{localReview.texte}
							</blockquote>
							<figcaption className="mt-4 font-semibold">
								{localReview.auteur}
							</figcaption>
							{reviewDate && (
								<p className="mt-2 text-xs text-muted-foreground">
									<time dateTime={reviewDate}>
										{new Intl.DateTimeFormat("fr-FR", {
											dateStyle: "long",
											timeZone: "UTC",
										}).format(new Date(reviewDate))}
									</time>
								</p>
							)}
							{reviewSource && (
								<a
									href={reviewSource}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 inline-block text-sm text-primary underline underline-offset-4"
								>
									Consulter le témoignage original
								</a>
							)}
						</figure>
					</Container>
				</section>
			)}

			{/* ── AVIS CLIENTS ── */}
			<GoogleReviews />

			{/* ── ZONE D'INTERVENTION ── */}
			<section className="py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="mx-auto max-w-2xl text-center">
							<p className="section-eyebrow">Zone d&apos;intervention</p>
							<h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
								Intervention {location} et alentours
							</h2>
						</div>
					</Reveal>

					<Reveal delay={100}>
						<div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
							<div className="overflow-hidden rounded-2xl border border-border shadow-sm">
								<InterventionMapLazy
									center={coordinates}
									label={cityPage.city}
									zoom={11}
								/>
							</div>
							<div className="space-y-6">
								<p className="text-base leading-relaxed md:text-lg">
									Basés à Vallet, nous intervenons <strong>{location}</strong>
									{distance ? ` (${distance})` : ""} pour la conception,
									l&apos;aménagement et l&apos;entretien de jardins dans le
									Vignoble Nantais.
								</p>
								<div className="rounded-2xl border border-border bg-card p-6">
									<div className="grid grid-cols-2 gap-4 text-sm">
										{distance && (
											<div>
												<p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
													Distance
												</p>
												<p className="mt-1 font-semibold">
													{distance} de Vallet
												</p>
											</div>
										)}
										<div>
											<p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
												Code postal
											</p>
											<p className="mt-1 font-semibold">
												{cityPage.postalCode}
											</p>
										</div>
									</div>
								</div>
								{content?.delaiIntervention?.trim() && (
									<p className="text-sm">
										<strong>Délai d’intervention :</strong>{" "}
										{content.delaiIntervention}
									</p>
								)}
								<p className="text-muted-foreground text-sm italic">
									Vous êtes plus loin ? Contactez-nous pour vérifier si nous
									pouvons intervenir.
								</p>
								<CtaButton
									emplacement="city"
									action="visit"
									variant="primary-light"
									className="w-full sm:w-auto"
								/>
							</div>
						</div>
					</Reveal>
				</Container>
			</section>

			<section className="bg-card py-16 md:py-20">
				<Container className="max-w-3xl">
					<p className="section-eyebrow">Questions locales</p>
					<h2 className="mt-3 text-3xl">Votre projet de jardin {location}</h2>
					<div className="mt-8">
						<FaqAccordion items={faqItems} />
					</div>
				</Container>
			</section>

			{/* ── CTA FINAL ── */}
			<CtaSection
				title={`Votre jardin ${location} mérite un expert. Parlons-en.`}
				description={`Échangeons sur votre projet paysager ${location}. Premier rendez-vous et diagnostic offerts.`}
			/>
		</>
	);
}
