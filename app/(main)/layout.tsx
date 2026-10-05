import { StructuredData } from "@/components/shared/structured-data";
import { getGoogleReviewSummary } from "@/lib/google-review-summary";
import { buildLocalBusinessSchema } from "@/lib/seo";
import type { ReactNode } from "react";

import { BookingController } from "@/components/shared/booking-controller";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { FloatingCallButton } from "@/components/shared/floating-call-button";

export const dynamic = "force-dynamic";

export default async function MainLayout({
	children,
}: {
	children: ReactNode;
}) {
	const reviews = await getGoogleReviewSummary();
	return (
		<>
			<StructuredData
				data={buildLocalBusinessSchema("/", undefined, reviews)}
			/>
			<a
				href="#main-content"
				className="bg-primary text-primary-foreground sr-only z-50 rounded-sm px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
			>
				Aller au contenu
			</a>
			<Header />
			<Breadcrumbs />
			<main id="main-content">{children}</main>
			<Footer />
			<FloatingCallButton />
			<CookieBanner />
			<BookingController />
		</>
	);
}
