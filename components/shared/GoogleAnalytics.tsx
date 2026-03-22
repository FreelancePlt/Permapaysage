"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Z6SF5771E1";

export function GoogleAnalytics({ consent }: { consent: boolean }) {
  useEffect(() => {
    if (GA_ID && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consent ? "granted" : "denied",
      });
    }
  }, [consent]);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
