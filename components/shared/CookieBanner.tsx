"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

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

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentStatus>(undefined as unknown as ConsentStatus);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    // DEBUG — à supprimer
    console.log("[CookieBanner] cookie_consent value:", stored);
    if (stored === "accepted" || stored === "refused") {
      setConsent(stored);
    } else {
      setConsent(null);
      setVisible(true);
    }
  }, []);

  const accept = useCallback(() => {
    console.log("[CookieBanner] → Accepter cliqué"); // DEBUG
    setCookie(COOKIE_NAME, "accepted", COOKIE_DAYS);
    setConsent("accepted");
    setVisible(false);
  }, []);

  const refuse = useCallback(() => {
    console.log("[CookieBanner] → Refuser cliqué"); // DEBUG
    setCookie(COOKIE_NAME, "refused", COOKIE_DAYS);
    setConsent("refused");
    setVisible(false);
  }, []);

  return (
    <>
      <GoogleAnalytics consent={consent === "accepted"} />

      {visible && (
        <div
          role="dialog"
          aria-label="Gestion des cookies"
          className="animate-in slide-in-from-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card shadow-[0_-2px_12px_rgba(0,0,0,0.08)] duration-300"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
            <p className="text-foreground/80 text-sm leading-relaxed">
              Ce site utilise des cookies pour mesurer l&apos;audience. Vous pouvez accepter ou refuser.{" "}
              <Link href="/politique-cookies" className="text-primary underline underline-offset-2 hover:no-underline">
                En savoir plus
              </Link>
            </p>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={refuse}
                className="text-foreground/50 hover:text-foreground/70 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={accept}
                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md px-5 py-2 text-sm font-medium transition-colors"
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
