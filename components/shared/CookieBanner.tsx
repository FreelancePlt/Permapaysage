"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { ctaButtonVariants } from "@/components/shared/cta-button";

import { GoogleAnalytics } from "./GoogleAnalytics";

type ConsentStatus = "accepted" | "refused" | null;

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

const COOKIE_NAME = "cookie_consent";
const COOKIE_DAYS = 395; // ~13 mois
const CONSENT_CHANGE_EVENT = "cookie-consent-change";

function getConsent(): ConsentStatus {
  const stored = getCookie(COOKIE_NAME);
  return stored === "accepted" || stored === "refused" ? stored : null;
}

function getServerConsent(): undefined {
  return undefined;
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

function saveConsent(consent: Exclude<ConsentStatus, null>) {
  setCookie(COOKIE_NAME, consent, COOKIE_DAYS);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsent,
    getServerConsent,
  );

  return (
    <>
      <GoogleAnalytics consent={consent === "accepted"} />

      {consent === null && (
        <div
          role="dialog"
          aria-label="Gestion des cookies"
          className="appearance-animation animate-in slide-in-from-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card shadow-[0_-2px_12px_rgba(0,0,0,0.08)] duration-300"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
            <p className="text-foreground/80 text-sm leading-relaxed">
              Ce site utilise des cookies pour mesurer l&apos;audience. Vous pouvez accepter ou refuser.{" "}
              <Link href="/politique-cookies" className="text-primary underline underline-offset-2 hover:no-underline">
                En savoir plus
              </Link>
            </p>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => saveConsent("refused")}
                className="text-foreground/50 hover:text-foreground/70 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className={ctaButtonVariants({ variant: "primary-light" })}
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
