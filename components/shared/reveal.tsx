"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const motion = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    if (!motion.matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      el.classList.add("revealed");
      el.classList.remove("reveal-pending");
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (delay > 0) timer = setTimeout(reveal, Math.min(delay, 200));
        else reveal();
        observer.unobserve(el);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const handleMotionChange = () => {
      if (motion.matches) return;
      clearTimeout(timer);
      reveal();
      observer.disconnect();
    };

    el.classList.add("reveal-pending");
    observer.observe(el);
    motion.addEventListener("change", handleMotionChange);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      motion.removeEventListener("change", handleMotionChange);
      el.classList.remove("reveal-pending");
    };
  }, [delay]);

  return <div ref={ref} className={cn("reveal-on-scroll", className)}>{children}</div>;
}
