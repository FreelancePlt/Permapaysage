"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-border divide-y overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:outline-none md:px-8"
            >
              <span className="text-sm font-medium md:text-base">{item.question}</span>
              <div className={clsx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                isOpen ? "bg-primary text-white rotate-180" : "bg-primary/10 text-primary",
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
                <p className="text-muted-foreground px-6 pb-6 text-sm leading-relaxed md:px-8 md:text-base">
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
