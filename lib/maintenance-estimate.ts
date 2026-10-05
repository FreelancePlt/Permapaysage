/** Annual specific expense limit, within the household's other applicable limits.
 * https://www.impots.gouv.fr/particulier/questions/comment-beneficier-du-credit-dimpot-pour-lemploi-dun-salarie-domicile
 */
export const GARDENING_EXPENSE_LIMIT_CENTS = 500_000;

export function estimateMaintenanceCredit(input: string) {
	const normalized = input.trim();
	if (!/^\d+(?:[.,]\d{1,2})?$/.test(normalized)) return undefined;
	const [whole, fraction = ""] = normalized.split(/[.,]/);
	const amountCents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
	if (!Number.isSafeInteger(amountCents) || amountCents < 0) return undefined;
	const eligibleCents = Math.min(amountCents, GARDENING_EXPENSE_LIMIT_CENTS);
	const creditCents = Math.round(eligibleCents / 2);
	return {
		amountCents,
		creditCents,
		remainingCents: amountCents - creditCents,
		capped: amountCents > GARDENING_EXPENSE_LIMIT_CENTS,
	};
}

export function formatEuroCents(cents: number): string {
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(cents / 100);
}
