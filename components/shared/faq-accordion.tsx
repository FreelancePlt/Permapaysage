"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items, variant = "light" }: { items: FaqItem[]; variant?: "light" | "dark" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isDark = variant === "dark";

  return (
    <div className={clsx(
      "divide-y overflow-hidden rounded-2xl border",
      isDark ? "divide-white/10 border-white/10 bg-white/5" : "divide-border border-border bg-card",
    )}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className={clsx(
                "flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:outline-none md:px-8",
                isDark ? "hover:bg-white/5" : "hover:bg-muted/40",
              )}
            >
              <span className={clsx("text-sm font-medium md:text-base", isDark && "text-white/90")}>{item.question}</span>
              <div className={clsx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                isOpen
                  ? isDark ? "bg-white text-primary rotate-180" : "bg-primary text-white rotate-180"
                  : isDark ? "bg-white/10 text-white/70" : "bg-primary/10 text-primary",
              )}>
                <CaretDownIcon size={16} weight="bold" />
              </div>
            </button>
            <div
              className={clsx(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className={clsx(
                  "px-6 pb-6 text-sm leading-relaxed md:px-8 md:text-base",
                  isDark ? "text-white/60" : "text-muted-foreground",
                )}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
