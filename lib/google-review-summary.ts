import "server-only";
import { cache } from "react";

import {
	GOOGLE_PLACE_ID,
	getFallbackGoogleReviewSummary,
	parseGooglePlaceResponse,
	type GoogleReviewSummary,
} from "@/lib/google-reviews";

export type { GoogleReviewSummary } from "@/lib/google-reviews";

/**
 * Request-scoped deduplication only. Places content is never persisted.
 * https://developers.google.com/maps/documentation/places/web-service/policies
 * https://cloud.google.com/terms/maps-platform/eea/maps-service-terms
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
					cache: "no-store",
					signal: AbortSignal.timeout(5000),
				},
			);
			if (!response.ok) return getFallbackGoogleReviewSummary();
			const payload: unknown = await response.json();
			return (
				parseGooglePlaceResponse(payload) ?? getFallbackGoogleReviewSummary()
			);
		} catch {
			// No API payload or credential is logged, and no previous response is retained.
			return getFallbackGoogleReviewSummary();
		}
	},
);
