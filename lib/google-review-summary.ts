import "server-only";
import { cache } from "react";

import {
	GOOGLE_PLACE_ID,
	getFallbackGoogleReviewSummary,
	parseGooglePlaceResponse,
	type GoogleReviewSummary,
} from "@/lib/google-reviews";

export type { GoogleReviewSummary } from "@/lib/google-reviews";

const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Every Place Details call with `reviews` is billed (Enterprise + Atmosphere SKU),
 * so the response is shared through the Next.js data cache and refreshed once a day.
 */
export const getGoogleReviewSummary = cache(
	async (): Promise<GoogleReviewSummary> => {
		const key = process.env.GOOGLE_PLACES_API_KEY;
		if (!key) return getFallbackGoogleReviewSummary();
		try {
			const response = await fetch(
				`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}?languageCode=fr`,
				{
					headers: {
						"X-Goog-Api-Key": key,
						"X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
					},
					next: { revalidate: REVALIDATE_SECONDS },
					signal: AbortSignal.timeout(5000),
				},
			);
			if (!response.ok) return getFallbackGoogleReviewSummary();
			const payload: unknown = await response.json();
			return (
				parseGooglePlaceResponse(payload) ?? getFallbackGoogleReviewSummary()
			);
		} catch {
			return getFallbackGoogleReviewSummary();
		}
	},
);
