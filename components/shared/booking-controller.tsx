"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
	consumeVisitConfirmation,
	trackSiteEvent,
	type CtaPlacement,
} from "@/lib/analytics-events";
import {
	CAL_BOOKING_URL,
	CAL_LINK,
	CAL_NAMESPACE,
	loadCalApi,
	type CalApi,
	type CalBookingEvent,
	type CalCallback,
} from "@/lib/cal-embed";

const reportedBookings = new Set<string>();
type BookingStatus = "loading" | "ready" | "error";

/** A single client controller keeps CTA links and their icon children rendered on the server. */
export function BookingController() {
	const pathname = usePathname();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const embedRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLAnchorElement | null>(null);
	const placementRef = useRef<CtaPlacement>("content");
	const initializedRef = useRef(false);
	const cleanupRef = useRef<(() => void) | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState<BookingStatus>("loading");

	useEffect(() => {
		if (pathname === "/merci" && consumeVisitConfirmation())
			trackSiteEvent("demande_visite", "contact");
		dialogRef.current?.close();
	}, [pathname]);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (!(event.target instanceof Element)) return;
			const anchor = event.target.closest<HTMLAnchorElement>("a[data-cta]");
			if (
				!anchor ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			)
				return;
			const placement = (anchor.dataset.emplacement ||
				"content") as CtaPlacement;
			if (anchor.dataset.cta === "visit") {
				trackSiteEvent("clic_visite_offerte", placement);
				return;
			}
			if (anchor.dataset.cta !== "call") return;
			trackSiteEvent("clic_reserver_appel", placement);
			if (!dialogRef.current?.showModal) return; // Plain HTTPS link remains the progressive fallback.
			event.preventDefault();
			triggerRef.current = anchor;
			placementRef.current = placement;
			if (!initializedRef.current) setStatus("loading");
			setOpen(true);
		}
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	useEffect(() => {
		if (!open) return;
		const dialog = dialogRef.current;
		if (!dialog?.open) dialog?.showModal();
		if (initializedRef.current) return;
		initializedRef.current = true;
		let disposed = false;
		let readyTimer: ReturnType<typeof setTimeout> | undefined;
		let api: CalApi | undefined;
		const listeners: Array<{ action: string; callback: CalCallback }> = [];

		function addListener(action: string, callback: CalCallback) {
			api?.("on", { action, callback });
			listeners.push({ action, callback });
		}
		function onLoadFailure() {
			if (disposed) return;
			cleanupRef.current?.();
			initializedRef.current = false;
			embedRef.current?.replaceChildren();
			setStatus("error");
		}
		function onBooking(event: CalBookingEvent) {
			// Official legacy + V2 events, never dry-run/reschedule events or raw postMessage data.
			// https://github.com/calcom/cal.diy/blob/main/packages/embeds/embed-core/src/sdk-action-manager.ts
			if (event.detail.namespace !== CAL_NAMESPACE) return;
			const data = event.detail.data;
			const confirmed =
				event.detail.type === "bookingSuccessful"
					? data.confirmed === true
					: data.status?.toUpperCase() === "ACCEPTED";
			if (!confirmed) return;
			const id = data.uid ?? data.booking?.uid ?? data.booking?.id;
			const key =
				id !== undefined ? String(id) : "confirmed-without-identifier";
			if (reportedBookings.has(key)) return;
			reportedBookings.add(key);
			// Only the placement is sent; booking fields and attendee details stay out of Analytics.
			trackSiteEvent("rdv_appel_confirme", placementRef.current);
		}

		loadCalApi()
			.then((loadedApi) => {
				if (disposed || !embedRef.current) return;
				api = loadedApi;
				addListener("linkReady", () => {
					clearTimeout(readyTimer);
					setStatus("ready");
				});
				addListener("linkFailed", onLoadFailure);
				addListener("__closeIframe", () => dialogRef.current?.close());
				addListener("bookingSuccessful", onBooking);
				addListener("bookingSuccessfulV2", onBooking);
				readyTimer = setTimeout(onLoadFailure, 20000);
				api("inline", {
					elementOrSelector: embedRef.current,
					calLink: CAL_LINK,
					config: {
						layout: "month_view",
						theme: "light",
						iframeAttrs: {
							id: "permapaysage-cal-iframe",
						},
					},
				});
				// The SDK supports iframeAttrs.id, but supplies its own English title.
				const iframe =
					embedRef.current.querySelector<HTMLIFrameElement>("iframe");
				if (iframe)
					iframe.title = "Réserver un appel de 15 minutes avec Permapaysage";
				api("ui", {
					theme: "light",
					hideEventTypeDetails: false,
					layout: "month_view",
					cssVarsPerTheme: { light: { "cal-brand": "#A65D43" } },
				});
			})
			.catch(() => {
				if (!disposed) {
					cleanupRef.current?.();
					initializedRef.current = false;
					setStatus("error");
				}
			});
		cleanupRef.current = () => {
			disposed = true;
			clearTimeout(readyTimer);
			for (const listener of listeners) api?.("off", listener);
		};
	}, [open]);

	useEffect(() => () => cleanupRef.current?.(), []);

	function restoreFocus() {
		setOpen(false);
		requestAnimationFrame(() => {
			const trigger = triggerRef.current;
			if (trigger?.isConnected) trigger.focus();
			else
				Array.from(
					document.querySelectorAll<HTMLAnchorElement>(
						'header a[data-cta="call"]',
					),
				)
					.find((anchor) => anchor.getClientRects().length > 0)
					?.focus();
		});
	}

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby="booking-dialog-title"
			onClose={restoreFocus}
			className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-5xl overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-primary-deep/60"
		>
			<div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-4 md:px-6">
				<h2 id="booking-dialog-title" className="text-lg md:text-2xl">
					Votre appel de 15 minutes
				</h2>
				<button
					type="button"
					onClick={() => dialogRef.current?.close()}
					aria-label="Fermer le calendrier"
					className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-2xl hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
				>
					×
				</button>
			</div>
			<div className="p-3 md:p-5">
				<p
					role="status"
					className={`mb-3 text-sm text-muted-foreground ${status === "ready" ? "sr-only" : ""}`}
				>
					{status === "loading"
						? "Chargement du calendrier…"
						: status === "error"
							? "Le calendrier est indisponible. Vous pouvez réserver directement sur Cal.com."
							: "Calendrier prêt."}
				</p>
				<div
					ref={embedRef}
					hidden={status === "error"}
					className="min-h-[480px] w-full"
				/>
				<a
					href={CAL_BOOKING_URL}
					onClick={() =>
						trackSiteEvent("clic_reserver_appel", placementRef.current)
					}
					className="mt-4 inline-block rounded-sm text-sm font-semibold text-cta-terracotta-hover underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
				>
					Réserver un appel de 15 minutes
				</a>
				<span className="ml-2 text-sm text-muted-foreground">sur Cal.com</span>
			</div>
		</dialog>
	);
}
