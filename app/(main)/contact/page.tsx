import {
	CheckCircleIcon,
	ClockIcon,
	EnvelopeIcon,
	MapPinIcon,
	PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Suspense } from "react";

import { CtaButton } from "@/components/shared/cta-button";
import { ContactForm } from "@/components/shared/contact-form";
import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { ZoneIntervention } from "@/components/shared/zone-intervention";
import {
	buildBreadcrumbSchema,
	buildItemListSchema,
	buildPageMetadata,
	buildWebPageSchema,
} from "@/lib/seo";
import { company, interventionCities } from "@/lib/site-data";

export const metadata = buildPageMetadata({
	title: "Contactez Permapaysage : Devis gratuit paysagiste Vallet",
	description:
		"Contactez Permapaysage pour un devis gratuit : conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
	path: "/contact",
	keywords: [
		"contact paysagiste Vallet",
		"devis jardin Vallet",
		"entreprise paysagiste Clisson",
		"devis amenagement exterieur Vertou",
	],
});

const contactDetails = [
	{
		icon: PhoneIcon,
		label: "Téléphone",
		value: company.phone,
		href: `tel:${company.phone.replace(/\s/g, "")}`,
	},
	{
		icon: EnvelopeIcon,
		label: "Email",
		value: company.email,
		href: `mailto:${company.email}`,
	},
	{ icon: MapPinIcon, label: "Adresse", value: company.address },
	{ icon: ClockIcon, label: "Horaires", value: "Du lundi au vendredi, 8h–19h" },
];

export default function ContactPage() {
	const schemas = [
		buildWebPageSchema({
			title: "Contactez Permapaysage : Devis gratuit paysagiste Vallet",
			description:
				"Contactez Permapaysage pour un devis gratuit : conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
			path: "/contact",
			type: "ContactPage",
		}),
		buildItemListSchema(
			interventionCities.map((city) => ({
				name: city,
				path: "/contact",
			})),
			"https://schema.org/ItemListUnordered",
		),
		buildBreadcrumbSchema([
			{ name: "Accueil", path: "/" },
			{ name: "Contact", path: "/contact" },
		]),
	];

	return (
		<>
			<StructuredData data={schemas} />

			<section className="decor decor-contours bg-surface-sage/40 py-10 md:py-16">
				<Container>
					<div className="max-w-3xl">
						<p className="section-eyebrow">
							Votre jardin commence par une rencontre
						</p>
						<h1 className="mt-4 text-3xl leading-tight tracking-tight md:text-5xl">
							Parlons de votre projet paysager
						</h1>
						<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
							Une idée à faire grandir, un jardin à entretenir ? Parlez-nous de
							vos envies, nous réfléchirons ensemble à la suite.
						</p>
						<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary">
							{[
								"Visite terrain offerte",
								"Sans engagement",
								"Réponse sous 48 h",
							].map((benefit) => (
								<li key={benefit} className="flex items-center gap-2">
									<CheckCircleIcon size={18} aria-hidden />
									{benefit}
								</li>
							))}
						</ul>
					</div>

					<div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
						<div className="order-1 min-w-0 lg:order-2">
							<Suspense
								fallback={
									<div className="h-96 animate-pulse rounded-2xl bg-background" />
								}
							>
								<ContactForm />
							</Suspense>
						</div>
						<aside
							className="order-2 overflow-hidden rounded-2xl bg-card lg:order-1"
							aria-labelledby="contact-direct-title"
						>
							<div className="relative aspect-[16/9]">
								<Image
									src="/hero/mare-naturelle-terrasse-bois-paysagiste-vallet.webp"
									alt="Mare naturelle et terrasse en bois dans un jardin aménagé par Permapaysage"
									fill
									sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1279px) calc((100vw - 96px) * 0.45), 534px"
									className="object-cover"
								/>
							</div>
							<div className="p-6 md:p-8">
								<p className="section-eyebrow">Au plaisir d’échanger</p>
								<h2
									id="contact-direct-title"
									className="mt-3 text-2xl leading-snug md:text-3xl"
								>
									Un premier échange avec Jessy
								</h2>
								<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
									Jessy vous accompagne dans la conception, l’aménagement et
									l’entretien de votre jardin. Une visite sur place permet de
									découvrir le terrain et vos besoins.
								</p>
								<dl className="mt-6 space-y-5">
									{contactDetails.map((detail) => {
										const Icon = detail.icon;
										return (
											<div
												key={detail.label}
												className="flex items-start gap-3"
											>
												<Icon
													size={20}
													className="mt-1 shrink-0 text-primary"
													aria-hidden
												/>
												<div className="min-w-0">
													<dt className="text-xs text-muted-foreground">
														{detail.label}
													</dt>
													<dd className="mt-1 text-sm leading-relaxed">
														{detail.href ? (
															<a
																href={detail.href}
																className="break-words font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
															>
																{detail.value}
															</a>
														) : (
															detail.value
														)}
													</dd>
												</div>
											</div>
										);
									})}
								</dl>
								<div className="mt-8 rounded-xl bg-surface-sage p-5">
									<h3 className="text-lg leading-snug">
										Vous préférez en parler de vive voix ?
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										Réservez un appel gratuit de 15 minutes avec Jessy.
									</p>
									<CtaButton
										action="call"
										emplacement="contact"
										variant="secondary-light"
										compact
										className="mt-4 h-11 w-full text-sm"
									/>
								</div>
							</div>
						</aside>
					</div>
				</Container>
			</section>

			<ZoneIntervention
				texte="Nous intervenons dans un rayon de 25 km autour de Vallet pour la conception, l'aménagement et l'entretien de jardins dans le Vignoble Nantais."
				showCTA={false}
			/>
		</>
	);
}
