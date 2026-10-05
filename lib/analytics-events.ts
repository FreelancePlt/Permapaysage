export type CtaPlacement =
	| "header"
	| "hero"
	| "trust"
	| "services"
	| "process"
	| "zone"
	| "final"
	| "service"
	| "contact"
	| "project"
	| "city"
	| "content";
export type SiteAnalyticsEvent =
	| "clic_reserver_appel"
	| "clic_visite_offerte"
	| "rdv_appel_confirme"
	| "demande_visite";

export function hasAnalyticsConsent(): boolean {
	return (
		typeof document !== "undefined" &&
		document.cookie
			.split(";")
			.some((part) => part.trim() === "cookie_consent=accepted")
	);
}

const GA_MEASUREMENT_ID = "G-Z6SF5771E1";
let initialized = false;
let reportedConsent: boolean | undefined;

/** Basic consent mode: configure only after actual consent, before any queued event.
 * https://developers.google.com/tag-platform/security/concepts/consent-mode
 * https://developers.google.com/tag-platform/security/guides/consent
 */
export function syncGoogleAnalyticsConsent(): boolean {
  const accepted = hasAnalyticsConsent();
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
  if (reportedConsent !== accepted) {
    window.gtag("consent", "update", { analytics_storage: accepted ? "granted" : "denied" });
    reportedConsent = accepted;
  }
  if (accepted && !initialized) {
    initialized = true;
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
  }
  return accepted;
}

/** Custom events never enter the Google queue without explicit consent. */
export function trackSiteEvent(
	event: SiteAnalyticsEvent,
	emplacement: CtaPlacement,
): boolean {
	// https://developers.google.com/analytics/devguides/collection/ga4/events
	if (!syncGoogleAnalyticsConsent()) return false;
	window.gtag("event", event, { emplacement });
	return true;
}

const VISIT_CONFIRMATION_KEY = "permapaysage-visit-confirmed";

/** Call only after the existing delivery service confirms success, before redirecting to /merci. */
export function markVisitRequestConfirmed(): void {
	try {
		sessionStorage.setItem(VISIT_CONFIRMATION_KEY, "1");
	} catch {
		/* Storage may be unavailable. */
	}
}

/** A direct visit or reload of /merci cannot create a conversion. */
export function consumeVisitConfirmation(): boolean {
	try {
		if (sessionStorage.getItem(VISIT_CONFIRMATION_KEY) !== "1") return false;
		sessionStorage.removeItem(VISIT_CONFIRMATION_KEY);
		return true;
	} catch {
		return false;
	}
}
