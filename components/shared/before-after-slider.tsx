"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clamp(clientX - rect.left, 0, rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(event.clientX);
    };

    const onPointerEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
    };
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video select-none overflow-hidden rounded-2xl bg-muted ${className ?? ""}`}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 45vw"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 45vw"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
        Avant
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
        Après
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-sm"
        style={{ left: `${position}%` }}
      />

      <button
        type="button"
        role="slider"
        aria-label="Glisser pour comparer l'avant et l'après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center gap-1 rounded-full border border-white/70 bg-white shadow-md transition-transform hover:scale-105"
        style={{ left: `${position}%` }}
        onPointerDown={(event) => {
          event.preventDefault();
          isDragging.current = true;
          updatePosition(event.clientX);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setPosition((previous) => clamp(previous - 2, 0, 100));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setPosition((previous) => clamp(previous + 2, 0, 100));
          }
        }}
      >
        <span className="h-4 w-0.5 rounded-full bg-primary/80" />
        <span className="h-4 w-0.5 rounded-full bg-primary/80" />
      </button>
    </div>
  );
}
