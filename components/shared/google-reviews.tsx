import {
	ArrowRightIcon,
	SealCheckIcon,
	StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CtaButton } from "@/components/shared/cta-button";
import { Container } from "@/components/shared/container";
import {
	getGoogleReviewSummary,
	type GoogleReviewSummary,
} from "@/lib/google-review-summary";
import { metrics } from "@/lib/site-data";

function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
	return (
		<span
			role="img"
			aria-label={`Note : ${rating.toLocaleString("fr-FR")} sur 5`}
			className="inline-flex gap-0.5 text-cta-ochre"
		>
			{Array.from({ length: 5 }, (_, index) => (
				<span
					key={index}
					aria-hidden
					className="relative block shrink-0"
					style={{ width: size, height: size }}
				>
					<StarIcon size={size} className="block" />
					<span
						className="absolute inset-y-0 left-0 overflow-hidden"
						style={{
							width: `${Math.max(0, Math.min(1, rating - index)) * 100}%`,
						}}
					>
						<StarIcon size={size} weight="fill" className="block" />
					</span>
				</span>
			))}
		</span>
	);
}

export async function GoogleReviews({
	data: suppliedData,
}: {
	data?: GoogleReviewSummary;
}) {
	const data = suppliedData ?? (await getGoogleReviewSummary());
	return (
		<section
			className="bg-surface-sage py-16 md:py-24"
			aria-labelledby="trust-title"
		>
			<Container>
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div>
						<p className="section-eyebrow">La confiance se cultive</p>
						<h2 id="trust-title" className="mt-3 text-3xl md:text-4xl">
							Leurs jardins, leurs mots
						</h2>
					</div>
					<div className="flex items-center gap-4">
						<Image
							src="/logos/google-maps.svg"
							alt="Google Maps"
							width={98}
							height={18}
							className="mx-2.5 mb-1.5 mt-2.5 h-[18px] w-auto"
						/>
						<div>
							<p className="flex items-center gap-2 font-semibold">
								<RatingStars rating={data.ratingValue} size={18} />
								{data.rating}/5
							</p>
							<p className="text-sm text-muted-foreground">
								{data.reviewCount} avis Google
							</p>
						</div>
					</div>
				</div>
				{data.reviews.length > 0 ? (
					<>
						<div className="mt-6 grid gap-5 md:grid-cols-3">
							{data.reviews.map((review) => (
								<figure
									key={review.googleMapsUri}
									className="h-full min-w-0 rounded-2xl border border-primary/10 bg-background p-6 md:p-7"
								>
									<figcaption className="mb-4 flex items-center gap-3">
										{review.photoUri ? (
											// Direct image: no persistent Next.js image cache of Google content.
											<Image
												unoptimized
												src={review.photoUri}
												alt={`Photo de ${review.author}`}
												width={40}
												height={40}
												className="h-10 w-10 shrink-0 rounded-full object-cover"
											/>
										) : (
											<span
												aria-hidden
												className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-cream"
											>
												{review.author.charAt(0)}
											</span>
										)}
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												{review.authorUri ? (
													<a
														href={review.authorUri}
														target="_blank"
														rel="noopener noreferrer"
														className="break-words font-semibold hover:underline"
													>
														{review.author}
													</a>
												) : (
													<p className="break-words font-semibold">
														{review.author}
													</p>
												)}
												{data.source === "google" && (
													<span
														role="img"
														aria-label="Avis publié sur Google Maps"
														title="Avis publié sur Google Maps"
														className="shrink-0 text-primary"
													>
														<SealCheckIcon
															size={18}
															weight="fill"
															aria-hidden
														/>
													</span>
												)}
											</div>
											<div className="mt-1 flex items-center gap-2">
												<RatingStars rating={review.rating} />
											</div>
										</div>
									</figcaption>
									<p className="mb-3 text-xs text-muted-foreground">
										Publié le{" "}
										<time dateTime={review.publishTime}>
											{new Intl.DateTimeFormat("fr-FR", {
												dateStyle: "long",
												timeZone: "Europe/Paris",
											}).format(new Date(review.publishTime))}
										</time>
										{review.relativePublishTimeDescription && (
											<span className="block">
												{review.relativePublishTimeDescription}
											</span>
										)}
									</p>
									{review.content.length > 180 ? (
										<details className="review-details break-words text-sm leading-relaxed text-foreground/85">
											<summary className="cursor-pointer list-none rounded-sm focus-visible:outline-2 focus-visible:outline-primary">
												<span className="review-excerpt">
													{review.content.slice(0, 180).trim()}…
												</span>
												<span className="review-open-label font-semibold text-primary">
													Avis complet
												</span>
												<span className="review-closed-label mt-3 block font-semibold text-primary underline underline-offset-4">
													Lire la suite
												</span>
											</summary>
											<blockquote className="mt-3 whitespace-pre-line">
												{review.content}
											</blockquote>
										</details>
									) : (
										<blockquote className="whitespace-pre-line break-words text-sm leading-relaxed text-foreground/85">
											{review.content}
										</blockquote>
									)}
									{review.originalContent &&
										review.originalContent !== review.content && (
											<details className="mt-4 text-xs text-muted-foreground">
												<summary className="cursor-pointer rounded-sm underline focus-visible:outline-2 focus-visible:outline-primary">
													Traduit par Google · Texte original
												</summary>
												<p className="mt-2 whitespace-pre-line break-words">
													{review.originalContent}
												</p>
											</details>
										)}
									<div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-primary">
										<a
											href={review.googleMapsUri}
											target="_blank"
											rel="noopener noreferrer"
											className="underline underline-offset-4"
										>
											Voir cet avis sur Google Maps
										</a>
										{review.flagContentUri && (
											<a
												href={review.flagContentUri}
												target="_blank"
												rel="noopener noreferrer"
												className="underline underline-offset-4"
											>
												Signaler cet avis
											</a>
										)}
									</div>
								</figure>
							))}
						</div>
					</>
				) : (
					<p className="mt-8 text-sm text-muted-foreground">
						Les avis détaillés sont à consulter directement sur Google Maps.
					</p>
				)}
				<div className="mt-6 text-right">
					<Link
						href={data.googleMapsUri}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
					>
						Voir tous les avis sur Google
						<ArrowRightIcon size={16} aria-hidden />
					</Link>
				</div>
				<div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 py-8 md:grid-cols-4">
					{metrics.map((metric) => (
						<div key={metric.label}>
							<p className="font-serif text-3xl text-primary lg:text-4xl">
								{metric.value}
							</p>
							<p className="mt-2 text-sm font-semibold">{metric.label}</p>
							<p className="mt-1 text-xs text-muted-foreground">
								{metric.subtext}
							</p>
						</div>
					))}
				</div>
				<div className="mt-8 flex flex-col items-center justify-between gap-7 lg:flex-row">
					<div className="flex flex-wrap items-center justify-center gap-6">
						<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
							Membre de
						</p>
						<Image
							src="/logos/unep.png"
							alt="UNEP, Les Entreprises du Paysage"
							width={120}
							height={48}
							className="h-12 w-auto max-w-32 object-contain"
						/>
						<Image
							src="/logos/unipros.png"
							alt="Unipros"
							width={120}
							height={48}
							className="h-12 w-auto max-w-32 object-contain"
						/>
					</div>
					<CtaButton
						emplacement="trust"
						action="call"
						responsiveLabel={false}
						className="w-full whitespace-normal px-3 text-center sm:w-auto"
					/>
				</div>
			</Container>
		</section>
	);
}
