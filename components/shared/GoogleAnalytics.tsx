"use client";

import { useEffect } from "react";
import Script from "next/script";
import { syncGoogleAnalyticsConsent } from "@/lib/analytics-events";

export function GoogleAnalytics({ consent }: { consent: boolean }) {
  useEffect(() => {
    // Read the real cookie: the hydration snapshot briefly has no consent value.
    // The shared helper also runs before events, so configuration always precedes conversions.
    syncGoogleAnalyticsConsent();
  }, [consent]);

  return consent ? (
    <Script id="google-analytics" src="https://www.googletagmanager.com/gtag/js?id=G-Z6SF5771E1" strategy="afterInteractive" />
  ) : null;
}
