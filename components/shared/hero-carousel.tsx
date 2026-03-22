"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const images = [
  {
    src: "/photos-entretien/apres/ap-03.jpg",
    alt: "Entretien de jardin paysager par Permapaysage à Vallet",
  },
  {
    src: "/photos-entretien/illustrations/terrasse-travertin.jpg",
    alt: "Terrasse en travertin devant maison en pierre par Permapaysage",
  },
  {
    src: "/photos-entretien/illustrations/terrasse-ceramique.jpg",
    alt: "Terrasse en céramique extérieure aménagée par Permapaysage",
  },
  {
    src: "/photos-entretien/illustrations/croquis-ambiance.jpg",
    alt: "Croquis d'ambiance aquarelle d'un jardin paysagé par Permapaysage",
  },
  {
    src: "/photos-entretien/illustrations/plan-global-2d.png",
    alt: "Plan d'aménagement paysager 2D complet réalisé par Permapaysage",
  },
];

const INTERVAL = 5500;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
        {images.map((image, idx) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={1024}
            height={768}
            priority={idx === 0}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Photo précédente"
        className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Photo suivante"
        className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((image, idx) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Aller à la photo ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
