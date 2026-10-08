import {
	BroomIcon,
	CheckCircleIcon,
	ClockIcon,
	FlowerTulipIcon,
	GrainsIcon,
	HandGrabbingIcon,
	LeafIcon,
	PercentIcon,
	PlantIcon,
	RecycleIcon,
	ScissorsIcon,
	ShieldCheckIcon,
	StarIcon,
	WalletIcon,
	WindIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta";
import { CtaButton, ctaButtonVariants } from "@/components/shared/cta-button";
import { MaintenanceCreditCalculator } from "@/components/shared/maintenance-credit-calculator";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { Container } from "@/components/shared/container";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import { ZoneIntervention } from "@/components/shared/zone-intervention";
import {
	buildBreadcrumbSchema,
	buildFaqSchema,
	buildPageMetadata,
	buildServiceSchema,
	buildWebPageSchema,
} from "@/lib/seo";
import {
	getEntretienFormules,
	getRealisations,
	getFaq,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatEuroCents } from "@/lib/maintenance-estimate";
import type { Faq, Realisation } from "@/lib/sanity/types";
import {
	entretienGaranties,
	entretienPrestations,
	services,
	SERVICE_UPDATED_AT,
	testimonials,
	company,
} from "@/lib/site-data";

const prestationIcons: Record<string, typeof LeafIcon> = {
	"Tonte de pelouse en mulching": RecycleIcon,
	Débroussaillage: GrainsIcon,
	"Taille de haies, arbustes & fruitiers": ScissorsIcon,
	"Désherbage manuel et écoresponsable": HandGrabbingIcon,
	"Entretien des massifs vivaces et fleuris": FlowerTulipIcon,
	"Soufflage & ramassage des feuilles": WindIcon,
	"Nettoyage des allées et terrasses": BroomIcon,
	Scarification: PlantIcon,
};

const avantApresGallery = [
	{
		title: "Taille de haie",
		avant: "/photos-entretien/avant/haie-en-bordure-de-route-avant-taille.jpg",
		apres: "/photos-entretien/apres/haie-en-bordure-de-route-apres-taille.jpg",
	},
	{
		title: "Tonte complète",
		avant: "/photos-entretien/avant/pelouse-devant-maison-avant-tonte.jpg",
		apres: "/photos-entretien/apres/pelouse-devant-maison-apres-tonte.jpg",
	},
	{
		title: "Tonte et haie",
		avant: "/photos-entretien/avant/pelouse-entre-haies-avant-tonte.jpg",
		apres: "/photos-entretien/apres/pelouse-entre-haies-apres-tonte.jpg",
	},
	{
		title: "Remise en état du jardin",
		avant: "/photos-entretien/avant/jardin-devant-baie-vitree-avant-tonte.jpg",
		apres: "/photos-entretien/apres/jardin-devant-baie-vitree-apres-tonte.jpg",
	},
];

const garantieIcons = [StarIcon, WalletIcon, ClockIcon];

export const metadata = buildPageMetadata({
	title: "Entretien de jardin à Vallet : Crédit d'impôt 50 % | Permapaysage",
	description:
		"Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
	path: "/entretien",
	keywords: [
		"entretien jardin Vallet",
		"jardinier Vallet",
		"taille haie Clisson",
		"credit impot entretien jardin",
	],
});

export const revalidate = 60;

export default async function EntretienPage() {
	const service = services.find((item) => item.slug === "entretien");

	if (!service) {
		notFound();
	}

	const [sanityFaqs, formules, cmsProjects]: [
		Faq[],
		Awaited<ReturnType<typeof getEntretienFormules>>,
		Realisation[],
	] = await Promise.all([
		getFaq("entretien"),
		getEntretienFormules(),
		getRealisations(),
	]);
	const localProject = cmsProjects.find(
		(project) =>
			project.ville
				?.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase() === "la chapelle-heulin",
	);
	const localPhoto = localProject?.images.find((image) => image.asset?._ref);
	const valGasc = testimonials.find(
		(testimonial) => testimonial.author === "Val Gasc",
	);
	const displayedFormules = Array.from(
		{ length: Math.max(2, formules.length) },
		(_, index) => formules[index],
	);
	// TODO CONTENU: renseigner les noms, prestations et prix validés dans le document Sanity Formules d’entretien.
	// TODO CONTENU: fournir les deux photos avant/après du chantier réel de La Chapelle-Heulin.
	// Explicit editorial correction of two published FAQ answers; no production CMS mutation.
	const fiscalAnswers: Record<string, string> = {
		"puis je beneficier du credit d impot pour l entretien de mon jardin":
			"Les petits travaux de jardinage réalisés dans le cadre des services à la personne peuvent ouvrir droit à un crédit d’impôt de 50 % des dépenses éligibles effectivement supportées, sous conditions. Le plafond spécifique est de 5 000 € de dépenses de jardinage par foyer et par an, inclus dans les plafonds généraux. La conception paysagère, les travaux d’aménagement, l’élagage et la vente de végétaux ne relèvent pas de ce dispositif. Vos droits disponibles et les aides déjà reçues doivent être pris en compte.",
		"comment fonctionne concretement ce credit d impot":
			"Après règlement et déclaration des dépenses éligibles, le crédit d’impôt peut réduire votre impôt ou vous être remboursé. L’avance immédiate Urssaf est un service optionnel : Permapaysage est inscrit à l’avance immédiate de l’Urssaf, vous ne réglez que 50 % dès la facture, une fois votre compte activé et dans la limite de vos droits disponibles. Le CESU préfinancé est un moyen de paiement ; il ne remplace pas la vérification de l’éligibilité fiscale. Le plafond annuel spécifique au petit jardinage est de 5 000 € de dépenses, dans les plafonds généraux.",
	};
	const faqItems = sanityFaqs.filter((faq) => faq.question?.trim() && faq.reponse?.trim()).map((faq) => {
		const key = faq.question
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase()
			.replace(/^\d+[^a-z]+/, "")
			.replace(/[^a-z0-9]+/g, " ")
			.trim();
		return {
			question: faq.question,
			answer: fiscalAnswers[key] ?? faq.reponse,
		};
	});

	const schemas = [
		buildWebPageSchema({
			title:
				"Entretien de jardin à Vallet : Crédit d'impôt 50 % | Permapaysage",
			description:
				"Entretien de jardin à Vallet avec des méthodes écologiques: tonte, taille raisonnée, désherbage manuel et crédit d'impôt de 50 %.",
			path: "/entretien",
		}),
		buildServiceSchema({
			name: service.title,
			description: service.longDescription,
			path: "/entretien",
			serviceType: "Entretien des espaces verts",
			areaServed: "Vallet et Vignoble Nantais",
		}),
		buildBreadcrumbSchema([
			{ name: "Accueil", path: "/" },
			{ name: "Entretien", path: "/entretien" },
		]),
		...(faqItems.length ? [buildFaqSchema(faqItems)] : []),
	];

	return (
		<>
			<StructuredData data={schemas} />

			{/* ── HERO ── */}
			<section className="dark-section decor decor-branch py-20 md:py-28">
				<Container>
					<div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
						<div className="space-y-6 appearance-animation animate-in fade-in slide-in-from-bottom-4 duration-300">
							<div className="inline-flex items-center gap-2 border-b border-cream/25 pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cream/80">
								<LeafIcon size={14} weight="fill" />
								Entretien
							</div>
							<h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">
								Paysagiste à Vallet : entretien écologique de votre jardin
							</h1>
              <p className="text-xs text-white/70">Mis à jour le <time dateTime={SERVICE_UPDATED_AT}>5 octobre 2026</time></p>
							<p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
								Votre jardin reste net, vivant et cohérent tout au long de
								l&apos;année, avec des gestes respectueux du vivant.
							</p>
							<div className="flex flex-wrap gap-3">
								<CtaButton
									emplacement="service"
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
									Voir les projets
								</Link>
							</div>
							<div className="flex flex-wrap gap-3">
								<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
									<PercentIcon size={16} weight="bold" />
									Crédit d&apos;impôt de 50 % sous conditions
								</span>
								<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
									<WalletIcon size={16} />
									CB, virement, CESU, E-CESU
								</span>
							</div>
						</div>
						<div className="appearance-animation animate-in fade-in zoom-in-95 duration-300">
							<div className="photo-frame">
								<Image
									src="/photos-entretien/apres/pelouse-entre-haies-apres-tonte.jpg"
									alt="Jardin entretenu par Permapaysage : pelouse tondue et haies taillées"
									sizes="(min-width: 1280px) 563px, (min-width: 1024px) calc(48.72vw - 60.77px), (min-width: 768px) calc(100vw - 62px), calc(100vw - 46px)"
                  width={1024}
									height={768}
									className="aspect-4/3 w-full rounded-xl object-cover"
									priority
								/>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* ── PRESTATIONS ── */}
			<section className="py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="max-w-3xl">
							<p className="section-eyebrow">Nos prestations</p>
							<h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
								Un jardinier pour l’entretien écologique de votre jardin
							</h2>
							<p className="text-muted-foreground mt-4 text-base md:text-lg">
								Des solutions ponctuelles ou des contrats annuels pour les
								particuliers de Vallet, Clisson, Gorges et tout le Sud-Loire.
							</p>
						</div>
					</Reveal>
					<div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{entretienPrestations.map((prestation, idx) => {
							const PrestationIcon = prestationIcons[prestation.title] ?? LeafIcon;
							return (
							<Reveal key={prestation.title} delay={idx * 80}>
								<article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
									<div className="absolute inset-y-0 left-0 w-1 bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
									<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
										<PrestationIcon size={22} weight="duotone" aria-hidden />
									</div>
									<h3 className="text-lg font-semibold leading-snug">
										{prestation.title}
									</h3>
									<p className="text-muted-foreground mt-2.5 text-sm leading-relaxed">
										{prestation.description}
									</p>
								</article>
							</Reveal>
							);
						})}
						<Reveal delay={entretienPrestations.length * 80}>
							<article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-7">
								<div>
									<h3 className="text-lg font-semibold">Un autre besoin ?</h3>
									<p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
										Décrivez-nous votre projet, on trouve la solution adaptée à
										votre jardin.
									</p>
								</div>
								<CtaButton
									emplacement="service"
									action="call"
									compact
									className="mt-5 w-full"
								/>
							</article>
						</Reveal>
					</div>
				</Container>
			</section>

			<section
				className="bg-surface-sage py-16 md:py-20"
				aria-labelledby="formules-title"
			>
				<Container>
					<p className="section-eyebrow">À votre rythme</p>
					<h2 id="formules-title" className="mt-3 text-3xl md:text-4xl">
						Formules et tarifs indicatifs
					</h2>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
						Les prestations et la fréquence sont précisées selon votre jardin.
						Les prix de départ sont indiqués avant tout éventuel crédit d’impôt.
					</p>
					<div className="mt-8 grid gap-5 md:grid-cols-2">
						{displayedFormules.map((formule, index) => (
							<article
								key={formule?._key ?? index}
								className="rounded-2xl border border-primary/10 bg-background p-6 md:p-7"
							>
								<h3 className="text-xl">
									{formule?.nom?.trim() || "Formule à préciser"}
								</h3>
								<p className="mt-3 text-sm text-muted-foreground">
									{formule?.description?.trim() ||
										"Prestations et fréquence à venir."}
								</p>
								<p className="mt-5 font-semibold text-primary">
									{typeof formule?.prixDepart === "number" &&
									Number.isFinite(formule.prixDepart) &&
									formule.prixDepart >= 0 &&
									Number.isSafeInteger(Math.round(formule.prixDepart * 100))
										? `À partir de ${formatEuroCents(Math.round(formule.prixDepart * 100))}`
										: "Prix indicatif à venir"}
								</p>
								<CtaButton
									action="visit"
									projectType="entretien"
									emplacement="service"
									className="mt-6 w-full whitespace-normal text-center sm:w-auto"
								/>
							</article>
						))}
					</div>
				</Container>
			</section>

			{/* ── CRÉDIT D'IMPÔT ── */}
			<section className="dark-section decor decor-contours py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="relative mx-auto max-w-3xl text-center">
							<PercentIcon
								size={40}
								weight="duotone"
								className="mx-auto mb-6 text-white/60"
							/>
							<h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
								Votre jardinier et le crédit d&apos;impôt
							</h2>
							<p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
								Les petits travaux de jardinage éligibles peuvent ouvrir droit à
								un crédit d&apos;impôt de 50 % des dépenses effectivement
								supportées, que vous soyez imposable ou non, sous conditions et
								dans la limite de vos droits.
							</p>
							<div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
								<div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
									<Image
										src="/logos/unipros.webp"
										alt="Membre UNIPROS"
										width={240}
										height={240}
										className="h-8 w-auto shrink-0"
									/>
									<span className="text-sm font-medium text-white/90">
										Membre UNIPROS
									</span>
								</div>
							</div>
						</div>
					</Reveal>

					<div className="relative mt-12 grid gap-6 sm:grid-cols-2">
						<Reveal delay={100}>
							<article className="h-full rounded-xl border border-white/15 bg-white/10 p-8 text-left backdrop-blur-sm transition-all duration-200 hover:bg-white/14">
								<CheckCircleIcon
									size={28}
									weight="duotone"
									className="mb-4 text-white/60"
								/>
								<h3 className="font-serif text-lg font-semibold text-white">
									Le Remboursement Annuel
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-white/75">
									Vous réglez la prestation puis déclarez les dépenses
									éligibles. Le crédit d&apos;impôt peut réduire votre impôt ou
									vous être remboursé, sous conditions et dans la limite des
									plafonds applicables.
								</p>
							</article>
						</Reveal>
						<Reveal delay={200}>
							<article className="relative h-full rounded-xl border-2 border-secondary bg-white/15 p-8 text-left backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
								<span className="absolute -top-3 right-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
									Optionnel
								</span>
								<CheckCircleIcon
									size={28}
									weight="duotone"
									className="mb-4 text-secondary"
								/>
								<h3 className="font-serif text-lg font-semibold text-white">
									L&apos;avance immédiate Urssaf
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-white/75">
									Ce service optionnel permet de déduire le crédit au paiement
									d&apos;une prestation éligible, dans la limite de vos droits.
									Permapaysage est inscrit à l&apos;avance immédiate de
									l&apos;Urssaf : vous ne réglez que 50 % dès la facture.
								</p>
							</article>
						</Reveal>
					</div>

					<div className="relative mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
						<div className="space-y-5 text-sm leading-relaxed text-white/80">
							<h3 className="text-xl text-white">Les conditions à connaître</h3>
							<p>
								Le plafond spécifique au petit jardinage est de 5 000 € de
								dépenses par foyer fiscal et par an, inclus dans les plafonds
								généraux des services à la personne. Vos dépenses déjà engagées
								et les aides reçues peuvent réduire vos droits disponibles.
							</p>
							<p>
								La conception et la réalisation paysagères, les terrasses,
								clôtures, travaux de terrassement, l’élagage et la vente de
								plantes ne sont pas des petits travaux de jardinage éligibles.
							</p>
							<div className="flex flex-col items-start gap-3">
								<a
									href="https://www.impots.gouv.fr/particulier/questions/comment-beneficier-du-credit-dimpot-pour-lemploi-dun-salarie-domicile"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white underline underline-offset-4"
								>
									Conditions du crédit d’impôt sur impots.gouv.fr
								</a>
								<a
									href="https://www.urssaf.fr/accueil/services/services-particuliers/service-avance-immediate.html"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white underline underline-offset-4"
								>
									Avance immédiate sur urssaf.fr
								</a>
							</div>
							<CtaButton
								emplacement="service"
								action="call"
								variant="primary-dark"
								className="w-full sm:w-auto"
							/>
						</div>
						<MaintenanceCreditCalculator />
					</div>
				</Container>
			</section>

			{/* ── GARANTIES ── */}
			<section className="bg-card py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="mx-auto max-w-2xl text-center">
							<div className="mx-auto mb-4 flex items-center justify-center gap-3">
								<ShieldCheckIcon
									size={24}
									weight="duotone"
									className="text-primary"
								/>
								<p className="section-eyebrow">Nos engagements</p>
							</div>
							<h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
								Notre priorité : votre bonheur au jardin
							</h2>
						</div>
					</Reveal>
					<div className="mt-14 grid gap-6 md:grid-cols-3">
						{entretienGaranties.map((garantie, idx) => {
							const Icon = garantieIcons[idx];
							return (
								<Reveal key={garantie.title} delay={idx * 100}>
									<article className="group flex h-full flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
										<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
											{Icon && <Icon size={28} weight="duotone" />}
										</div>
										<h3 className="text-xl font-semibold leading-snug">
											{garantie.title}
										</h3>
										<p className="text-muted-foreground mt-3 text-sm leading-relaxed">
											{garantie.description}
										</p>
									</article>
								</Reveal>
							);
						})}
					</div>
				</Container>
			</section>

			<section
				className="bg-surface-sage py-16 md:py-20"
				aria-labelledby="local-proof-title"
			>
				<Container>
					<div className="grid items-start gap-10 lg:grid-cols-2">
						<div>
							<p className="section-eyebrow">Sur le terrain</p>
							<h2 id="local-proof-title" className="mt-3 text-3xl md:text-4xl">
								L’entretien, sur le terrain
							</h2>
							{valGasc && (
								<figure className="mt-6 rounded-2xl border border-primary/10 bg-background p-6">
									<blockquote className="text-sm leading-relaxed">
										{valGasc.content}
									</blockquote>
									<figcaption className="mt-4 font-semibold">
										Val Gasc
									</figcaption>
									<a
										href={company.googleReviewsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-3 inline-block text-sm text-primary underline underline-offset-4"
									>
										Consulter les avis sur Google Maps
									</a>
								</figure>
							)}

						</div>
						<div>
							<h3 className="mb-5 text-2xl">
								Entretien de jardin à La Chapelle-Heulin
							</h3>
							{localProject?.avant && localProject.apres ? (
								<BeforeAfterSlider
									beforeSrc={urlFor(localProject.avant).width(1200).url()}
									afterSrc={urlFor(localProject.apres).width(1200).url()}
									beforeAlt={
										localProject.avant.alt ||
										"Avant l’entretien du jardin à La Chapelle-Heulin"
									}
									afterAlt={
										localProject.apres.alt ||
										"Après l’entretien du jardin à La Chapelle-Heulin"
									}
								/>
							) : localPhoto ? (
								<Image
									src={urlFor(localPhoto).width(1000).url()}
									alt={
										localPhoto.alt ||
										"Jardin du chantier d’entretien à La Chapelle-Heulin"
									}
									width={1000}
									height={750}
									sizes="(min-width: 1280px) 580px, (min-width: 1024px) 46vw, 90vw"
									className="aspect-4/3 w-full rounded-2xl object-cover"
								/>
							) : (
								<div className="flex aspect-4/3 items-center justify-center rounded-2xl border border-primary/10 bg-background p-6 text-sm text-muted-foreground">
									Photo de ce chantier à venir
								</div>
							)}
							{!(localProject?.avant && localProject.apres) && (
								<p className="mt-3 text-xs text-muted-foreground">
									Photos avant/après de ce chantier à venir.
								</p>
							)}
							{localProject && (
								<Link
									href={`/realisations/${localProject.slug.current}`}
									className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
								>
									Voir cette réalisation à La Chapelle-Heulin
								</Link>
							)}
						</div>
					</div>
				</Container>
			</section>

			{/* ── AVANT / APRÈS ── */}
			<section className="py-20 md:py-28">
				<Container>
					<Reveal>
						<div className="max-w-2xl">
							<p className="section-eyebrow">Transformations</p>
							<h2 className="mt-3 text-3xl font-semibold tracking-tight">
								Avant / Après
							</h2>
							<p className="text-muted-foreground mt-4 md:text-lg">
								Découvrez le résultat de nos interventions d&apos;entretien sur
								le terrain.
							</p>
						</div>
					</Reveal>
					<div className="mt-10 grid gap-6 sm:grid-cols-2">
						{avantApresGallery.map((item, idx) => (
							<Reveal key={item.title} delay={idx * 100}>
								<div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
									<div className="relative flex aspect-video w-full overflow-hidden">
										<div className="absolute left-3 top-3 z-10 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
											Avant
										</div>
										<div className="relative h-full w-1/2 overflow-hidden border-r border-border">
											<Image
												src={item.avant}
												alt={`Avant : ${item.title}`}
												fill
												className="object-cover"
											/>
										</div>
										<div className="absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
											Après
										</div>
										<div className="relative h-full w-1/2 overflow-hidden">
											<Image
												src={item.apres}
												alt={`Après : ${item.title}`}
												fill
												className="object-cover"
											/>
										</div>
										<div className="absolute inset-y-0 left-1/2 z-10 w-0.5 -translate-x-1/2 bg-white shadow-sm" />
									</div>
									<div className="px-5 py-4">
										<p className="text-sm font-medium">{item.title}</p>
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</Container>
			</section>

			{/* ── ZONE D'INTERVENTION ── */}
			<ZoneIntervention texte="Nous intervenons dans un rayon de 25 km autour de Vallet pour l'entretien écologique de vos espaces verts dans le Vignoble Nantais." />

			{/* ── FAQ ENTRETIEN ── */}
			{faqItems.length > 0 && (
				<section className="bg-card py-20 md:py-28">
					<Container>
						<Reveal>
							<div className="mx-auto max-w-2xl text-center">
								<p className="section-eyebrow">FAQ</p>
								<h2 className="mt-3 text-3xl font-semibold tracking-tight">
									Questions fréquentes
								</h2>
								<p className="text-muted-foreground mt-4 md:text-lg">
									Les réponses aux questions que vous vous posez sur
									l&apos;entretien de jardin.
								</p>
							</div>
						</Reveal>
						<Reveal delay={100}>
							<div className="mx-auto mt-10 max-w-3xl">
								<FaqAccordion items={faqItems} />
							</div>
						</Reveal>
					</Container>
				</section>
			)}

			<CtaSection />
		</>
	);
}
