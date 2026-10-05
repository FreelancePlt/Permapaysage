import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import type { CtaPlacement } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

export const ctaDestinations = {
	call: "https://cal.com/permapaysage/appel-15-min",
	visit: "/contact?objet=visite",
} as const;

export const ctaButtonVariants = cva(
	"inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-md border-2 px-5 text-[17px] font-semibold tracking-[-0.015em] whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta-terracotta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				"primary-light":
					"border-transparent bg-cta-terracotta text-cta-white shadow-sm hover:bg-cta-terracotta-hover hover:shadow-md",
				"primary-dark":
					"border-transparent bg-cta-ochre text-cta-ink shadow-sm hover:bg-cta-ochre-hover hover:shadow-md focus-visible:ring-cream focus-visible:ring-offset-primary",
				"secondary-light":
					"border-cta-terracotta text-cta-terracotta-hover hover:bg-cta-terracotta hover:text-cta-white",
				"secondary-dark":
					"border-cream/60 text-cream hover:border-cream hover:bg-cream hover:text-primary focus-visible:ring-cream focus-visible:ring-offset-primary",
			},
		},
		defaultVariants: { variant: "primary-light" },
	},
);

type CtaButtonProps = Omit<ComponentProps<typeof Link>, "href" | "children"> &
	VariantProps<typeof ctaButtonVariants> & {
		action: keyof typeof ctaDestinations;
		compact?: boolean;
		projectType?: "entretien" | "conception" | "amenagement";
		icon?: ReactNode;
		iconPosition?: "left" | "right";
		responsiveLabel?: boolean;
		compactOnNarrowDesktop?: boolean;
		emplacement?: CtaPlacement;
	};

export function CtaButton({
	action,
	compact = false,
	variant,
	className,
	projectType,
	icon,
	iconPosition = "left",
	responsiveLabel = true,
	compactOnNarrowDesktop = false,
	emplacement = "content",
	...props
}: CtaButtonProps) {
	return (
		<Link
			{...props}
			href={
				action === "visit" && projectType
					? `/contact?objet=${projectType}`
					: ctaDestinations[action]
			}
			aria-haspopup={action === "call" ? "dialog" : undefined}
			data-cta={action}
			data-emplacement={emplacement}
			className={cn(ctaButtonVariants({ variant }), className)}
		>
			{iconPosition === "left" && icon}
			{action === "visit" ? (
				"Demander ma visite offerte"
			) : compact ? (
				"Réserver un appel"
			) : !responsiveLabel ? (
				"Réserver un appel de 15 minutes"
			) : (
				<>
					<span
						className={
							compactOnNarrowDesktop
								? "sm:hidden lg:inline xl:hidden"
								: "sm:hidden"
						}
					>
						Réserver un appel
					</span>
					<span
						className={
							compactOnNarrowDesktop
								? "hidden sm:inline lg:hidden xl:inline"
								: "hidden sm:inline"
						}
					>
						Réserver un appel de 15 minutes
					</span>
				</>
			)}
			{iconPosition === "right" && icon}
		</Link>
	);
}
