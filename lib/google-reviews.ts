/** Normalized public data, independent of the server credential and fetch layer. */
export type GoogleReview = {
	author: string;
	authorUri?: string;
	photoUri?: string;
	rating: number;
	content: string;
	languageCode?: string;
	originalContent?: string;
	publishTime: string;
	relativePublishTimeDescription?: string;
	visitDate?: { year: number; month: number };
	googleMapsUri: string;
	flagContentUri?: string;
};

export type GoogleReviewSummary = {
	rating: string;
	ratingValue: number;
	reviewCount: number;
	googleMapsUri: string;
	reviews: readonly GoogleReview[];
	source: "google" | "fallback";
};

export const GOOGLE_PLACE_ID = "ChIJyevHnQoNImQRCkXIe1ao2f8";

/** Fixed brief fallback; never a saved copy of API reviews. */
export function getFallbackGoogleReviewSummary(): GoogleReviewSummary {
	return {
		rating: "5,0",
		ratingValue: 5,
		reviewCount: 37,
		googleMapsUri: `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`,
		reviews: [],
		source: "fallback",
	};
}

function record(value: unknown): Record<string, unknown> | undefined {
	return typeof value === "object" && value !== null && !Array.isArray(value)
		? (value as Record<string, unknown>)
		: undefined;
}

function string(value: unknown): string | undefined {
	return typeof value === "string" && value.trim() ? value : undefined;
}

function httpsUri(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	try {
		const url = new URL(value);
		return url.protocol === "https:" && !url.username && !url.password
			? url.href
			: undefined;
	} catch {
		return undefined;
	}
}

function rating(value: unknown): value is number {
	return (
		typeof value === "number" &&
		Number.isFinite(value) &&
		value >= 1 &&
		value <= 5
	);
}

function daysInMonth(year: number, month: number): number {
	if (month === 2)
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
	return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function timestamp(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	const parts =
		/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(?:Z|([+-])(\d{2}):(\d{2}))$/.exec(
			value,
		);
	if (!parts) return undefined;
	const [, y, m, d, h, min, sec, , oh, om] = parts;
	const year = Number(y),
		month = Number(m),
		day = Number(d);
	if (
		year < 1 ||
		month < 1 ||
		month > 12 ||
		day < 1 ||
		day > daysInMonth(year, month) ||
		Number(h) > 23 ||
		Number(min) > 59 ||
		Number(sec) > 59 ||
		(oh !== undefined && (Number(oh) > 23 || Number(om) > 59))
	)
		return undefined;
	return Number.isFinite(Date.parse(value)) ? value : undefined;
}

function parseVisitDate(value: unknown): GoogleReview["visitDate"] {
	const date = record(value);
	if (!date) return undefined;
	const { year, month, day } = date;
	if (
		typeof year !== "number" ||
		!Number.isInteger(year) ||
		year < 1 ||
		year > 9999 ||
		typeof month !== "number" ||
		!Number.isInteger(month) ||
		month < 1 ||
		month > 12 ||
		(day !== undefined &&
			(typeof day !== "number" ||
				!Number.isInteger(day) ||
				day < 0 ||
				day > daysInMonth(year, month)))
	)
		return undefined;
	return { year, month };
}

function parseReview(value: unknown): GoogleReview | undefined {
	const review = record(value);
	if (!review) return undefined;
	const author = record(review.authorAttribution);
	const authorName = string(author?.displayName);
	const text = record(review.text);
	const originalText = record(review.originalText);
	const content = string(text?.text) ?? string(originalText?.text);
	const publishTime = timestamp(review.publishTime);
	const googleMapsUri = httpsUri(review.googleMapsUri);
	// An individual source and publication date are required to display a review.
	if (
		!authorName ||
		!content ||
		!publishTime ||
		!googleMapsUri ||
		!rating(review.rating)
	)
		return undefined;
	return {
		author: authorName,
		authorUri: httpsUri(author?.uri),
		photoUri: httpsUri(author?.photoUri),
		rating: review.rating,
		content,
		languageCode: string(text?.languageCode),
		originalContent: string(originalText?.text),
		publishTime,
		relativePublishTimeDescription: string(
			review.relativePublishTimeDescription,
		),
		visitDate: parseVisitDate(review.visitDate),
		googleMapsUri,
		flagContentUri: httpsUri(review.flagContentUri),
	};
}

/** Places supplies at most five reviews by relevance; our ordering is only within that selection. */
export function parseGooglePlaceResponse(
	value: unknown,
): GoogleReviewSummary | undefined {
	const place = record(value);
	if (
		!place ||
		!rating(place.rating) ||
		typeof place.userRatingCount !== "number" ||
		!Number.isSafeInteger(place.userRatingCount) ||
		place.userRatingCount < 0
	)
		return undefined;
	const googleMapsUri = httpsUri(place.googleMapsUri);
	if (
		!googleMapsUri ||
		(place.reviews !== undefined &&
			(!Array.isArray(place.reviews) || place.reviews.length > 5))
	)
		return undefined;
	const reviews = (Array.isArray(place.reviews) ? place.reviews : [])
		.map(parseReview)
		.filter((review): review is GoogleReview => review !== undefined)
		.sort((a, b) => Date.parse(b.publishTime) - Date.parse(a.publishTime))
		.slice(0, 3);
	return {
		rating: place.rating.toFixed(1).replace(".", ","),
		ratingValue: place.rating,
		reviewCount: place.userRatingCount,
		googleMapsUri,
		reviews,
		source: "google",
	};
}
