"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { InterventionMapProps } from "./intervention-map";

function MapPlaceholder() {
  return <div className="bg-muted h-105 w-full animate-pulse rounded-2xl" aria-busy="true" />;
}

const LazyMap = dynamic(
  () => import("./intervention-map").then((mod) => ({ default: mod.InterventionMap })),
  { ssr: false, loading: MapPlaceholder },
);

/** Reserve the full map height; load Leaflet only when this area approaches the viewport. */
export function InterventionMapLazy(props: InterventionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!containerRef.current) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-105 w-full" role="region" aria-label={`Carte de la zone d’intervention : ${props.label ?? "Vallet"}`}>
      {visible ? <LazyMap {...props} /> : <MapPlaceholder />}
    </div>
  );
}
