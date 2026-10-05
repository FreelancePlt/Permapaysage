import Link from "next/link";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
	title: "Merci pour votre demande | Permapaysage",
	description:
		"Votre demande de visite terrain offerte a été envoyée à Permapaysage.",
	path: "/merci",
	noIndex: true,
});

export default function MerciPage() {
	return (
		<section className="bg-surface-sage py-20 md:py-28">
			<Container className="max-w-3xl">
				<p className="section-eyebrow">Votre demande</p>
				<h1 className="mt-4 text-3xl leading-tight md:text-5xl">
					Merci ! Jessy vous rappelle sous 48 h pour fixer la visite terrain
					offerte.
				</h1>
				<p className="mt-6 text-muted-foreground">
					Vous pouvez continuer à découvrir nos jardins et nos services.
				</p>
				<Link
					href="/"
					className="mt-8 inline-flex rounded-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
				>
					Revenir à l’accueil
				</Link>
			</Container>
		</section>
	);
}
