import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const ctaDestinations = {
  call: "https://cal.com/permapaysage/appel-15-min",
  visit: "/contact?objet=visite-conseil",
} as const;

export const ctaButtonVariants = cva(
  "inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl border-2 px-5 text-[17px] font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta-terracotta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "primary-light": "border-transparent bg-cta-terracotta text-cta-white hover:bg-cta-terracotta-hover hover:shadow-md",
        "primary-dark": "border-transparent bg-cta-ochre text-cta-ink hover:bg-cta-ochre-hover hover:shadow-md focus-visible:ring-cream focus-visible:ring-offset-primary",
        "secondary-light": "border-cta-terracotta text-cta-terracotta-hover hover:bg-cta-terracotta hover:text-cta-white",
        "secondary-dark": "border-cream text-cream hover:bg-cream hover:text-primary focus-visible:ring-cream focus-visible:ring-offset-primary",
      },
    },
    defaultVariants: { variant: "primary-light" },
  },
);

type CtaButtonProps = Omit<ComponentProps<typeof Link>, "href" | "children"> &
  VariantProps<typeof ctaButtonVariants> & {
    action: keyof typeof ctaDestinations;
    compact?: boolean;
  };

export function CtaButton({ action, compact = false, variant, className, ...props }: CtaButtonProps) {
  return (
    <Link
      {...props}
      href={ctaDestinations[action]}
      data-cta={action}
      className={cn(ctaButtonVariants({ variant }), className)}
    >
      {action === "visit" ? "Demander ma visite offerte" : compact ? "Réserver un appel" : (
        <>
          <span className="sm:hidden">Réserver un appel</span>
          <span className="hidden sm:inline">Réserver un appel de 15 minutes</span>
        </>
      )}
    </Link>
  );
}
