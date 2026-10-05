/** Siège vérifié via le géocodage officiel IGN/BAN, coordonnées [latitude, longitude]. */
export const COMPANY_COORDINATES: [number, number] = [47.161664, -1.270126];
export const INTERVENTION_RADIUS_METERS = 25_000;

export function isValidCoordinates(
	latitude: unknown,
	longitude: unknown,
): boolean {
	return (
		typeof latitude === "number" &&
		Number.isFinite(latitude) &&
		latitude >= -90 &&
		latitude <= 90 &&
		typeof longitude === "number" &&
		Number.isFinite(longitude) &&
		longitude >= -180 &&
		longitude <= 180
	);
}
