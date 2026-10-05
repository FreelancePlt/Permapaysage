export const CAL_NAMESPACE = "permapaysage-appel";
export const CAL_LINK = "permapaysage/appel-15-min";
export const CAL_BOOKING_URL = `https://cal.com/${CAL_LINK}`;
export const CAL_SCRIPT_URL = "https://app.cal.com/embed/embed.js";

export type CalBookingEvent = CustomEvent<{
	type: string;
	namespace: string;
	data: {
		uid?: string;
		status?: string;
		confirmed?: boolean;
		booking?: { uid?: string; id?: number | string };
	};
}>;
export type CalCallback = (event: CalBookingEvent) => void;
export type CalApi = ((...args: unknown[]) => void) & {
	q: unknown[][];
	instance?: unknown;
};
type GlobalCal = CalApi & { loaded: boolean; ns: Record<string, CalApi> };

declare global {
	interface Window {
		Cal?: GlobalCal;
	}
}
let loading: Promise<CalApi> | undefined;

/** Official queue bootstrap, only run on an explicit booking click. */
export function loadCalApi(): Promise<CalApi> {
	if (loading) return loading;
	loading = new Promise((resolve, reject) => {
		// Cal official snippet and API:
		// https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-snippet/src/index.ts
		// https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-core/src/embed.ts
		let cal = window.Cal;
		if (!cal) {
			const queue: unknown[][] = [];
			cal = Object.assign(
				(...args: unknown[]) => {
					queue.push(args);
				},
				{ q: queue, loaded: true, ns: {} as Record<string, CalApi> },
			);
			window.Cal = cal;
		}
		const namespaceQueue: unknown[][] = [];
		const api =
			cal.ns[CAL_NAMESPACE] ??
			Object.assign(
				(...args: unknown[]) => {
					namespaceQueue.push(args);
				},
				{ q: namespaceQueue },
			);
		cal.ns[CAL_NAMESPACE] = api;
		api("init", CAL_NAMESPACE, { origin: "https://cal.com" });
		cal("initNamespace", CAL_NAMESPACE);
		if (cal.instance) {
			resolve(api);
			return;
		}
		const script = document.createElement("script");
		script.src = CAL_SCRIPT_URL;
		script.async = true;
		let settled = false;
		const timer = window.setTimeout(() => fail(), 12000);
		function fail() {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			script.remove();
			loading = undefined;
			if (!window.Cal?.instance) delete window.Cal;
			reject(new Error("Calendrier indisponible"));
		}
		script.onerror = fail;
		script.onload = () => {
			if (settled) return;
			if (!window.Cal?.ns[CAL_NAMESPACE]?.instance) {
				fail();
				return;
			}
			settled = true;
			window.clearTimeout(timer);
			resolve(window.Cal.ns[CAL_NAMESPACE]);
		};
		document.head.appendChild(script);
	});
	return loading;
}
