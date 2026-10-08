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

			<section className="decor decor-contours bg-surface-sage/40 py-10 md:py-14 lg:flex lg:min-h-[calc(100svh-7.875rem)] lg:items-center lg:py-8">
				<Container className="w-full">
					<div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-12 lg:gap-y-6 xl:gap-x-16 tall:gap-y-8">
						<div className="min-w-0 lg:col-start-1 lg:row-start-1">
							<p className="section-eyebrow">
								Votre jardin commence par une rencontre
							</p>
							<h1 className="mt-4 text-3xl leading-tight tracking-tight md:text-5xl lg:mt-3 lg:text-[2.75rem] tall:mt-4 tall:text-5xl">
								Parlons de votre projet paysager
							</h1>
							<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg lg:mt-4 lg:text-base xl:text-[1.0625rem] tall:mt-5 tall:text-lg">
								Une idée à faire grandir, un jardin à entretenir ? Parlez-nous de
								vos envies, nous réfléchirons ensemble à la suite.
							</p>
							<ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary lg:mt-5">
								{[
									"Visite et devis offerts",
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

						<div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
							<Suspense
								fallback={
									<div className="h-96 animate-pulse rounded-2xl bg-background" />
								}
							>
								<ContactForm />
							</Suspense>
						</div>

						<aside
							className="overflow-hidden rounded-2xl bg-card lg:col-start-1 lg:row-start-2"
							aria-labelledby="contact-direct-title"
						>
							<div className="relative aspect-[16/7] lg:aspect-[16/5] tall:aspect-[16/6]">
								<Image
									src="/hero/mare-naturelle-terrasse-bois-paysagiste-vallet.webp"
									alt="Mare naturelle et terrasse en bois dans un jardin aménagé par Permapaysage"
									fill
									sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1279px) calc((100vw - 96px) * 0.475), 560px"
									className="object-cover"
								/>
							</div>
							<div className="p-6 md:p-7 tall:p-8">
								<h2
									id="contact-direct-title"
									className="text-xl leading-snug md:text-2xl"
								>
									Un premier échange avec Jessy
								</h2>
								<dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
									{contactDetails.map((detail) => {
										const Icon = detail.icon;
										return (
											<div
												key={detail.label}
												className="flex min-w-0 items-start gap-3"
											>
												<Icon
													size={20}
													className="mt-0.5 shrink-0 text-primary"
													aria-hidden
												/>
												<div className="min-w-0">
													<dt className="text-xs text-muted-foreground">
														{detail.label}
													</dt>
													<dd className="mt-0.5 text-sm leading-relaxed">
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
								<div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
									<p className="text-sm leading-relaxed text-muted-foreground">
										<span className="block font-semibold text-foreground">
											Vous préférez en parler de vive voix ?
										</span>
										Un appel gratuit de 15 minutes avec Jessy.
									</p>
									<CtaButton
										action="call"
										emplacement="contact"
										variant="secondary-light"
										compact
										className="h-10 shrink-0 px-4 text-sm"
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
