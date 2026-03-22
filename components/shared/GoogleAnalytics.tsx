"use client";

import { useEffect } from "react";

export function GoogleAnalytics({ consent }: { consent: boolean }) {
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consent ? "granted" : "denied",
      });
    }
  }, [consent]);

  return null;
}
