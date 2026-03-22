"use client";

import { useEffect } from "react";

export function GoogleAnalytics({ consent }: { consent: boolean }) {
  useEffect(() => {
    // DEBUG — à supprimer
    console.log("[GA] consent prop:", consent);
    console.log("[GA] window.gtag exists:", typeof window.gtag === "function");
    console.log("[GA] window.dataLayer:", window.dataLayer);

    if (typeof window.gtag === "function") {
      const mode = consent ? "granted" : "denied";
      console.log("[GA] consent update → analytics_storage:", mode);
      window.gtag("consent", "update", {
        analytics_storage: mode,
      });
    }
  }, [consent]);

  return null;
}
