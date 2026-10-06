import {
	GlobeIcon,
	HandsClappingIcon,
	HeartIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/shared/container";
import { CtaSection } from "@/components/sections/cta";
import { StructuredData } from "@/components/shared/structured-data";
import {
	buildBreadcrumbSchema,
	buildPageMetadata,
	buildWebPageSchema,
} from "@/lib/seo";
import { companyValues } from "@/lib/values";

const title =
	"À propos de Permapaysage : les valeurs d'un paysagiste écologique à Vallet";
const description =
	"Découvrez les trois éthiques de la permaculture qui guident Jessy Laderriere et Permapaysage : prendre soin de la terre, des hommes et partager équitablement.";
export const metadata = buildPageMetadata({
	title,
	description,
	path: "/a-propos",
});
const icons = [GlobeIcon, HeartIcon, HandsClappingIcon];

export default function AboutPage() {
	return (
		<>
			<StructuredData
				data={[
					buildWebPageSchema({
						title,
						description,
						path: "/a-propos",
						type: "AboutPage",
					}),
					buildBreadcrumbSchema([
						{ name: "Accueil", path: "/" },
						{ name: "À propos", path: "/a-propos" },
					]),
				]}
			/>
			<section className="dark-section decor decor-branch py-16 md:py-24">
				<Container>
					<div className="max-w-3xl">
						<p className="text-xs font-semibold uppercase tracking-widest text-cream/80">
							À propos
						</p>
						<h1 className="mt-5 text-4xl text-cream md:text-5xl">
							Des jardins vivants, des valeurs qui nous guident
						</h1>
						<p className="mt-5 text-lg leading-relaxed text-cream/80">
							Chaque projet s&apos;appuie sur les trois éthiques fondamentales
							de la permaculture.
						</p>
					</div>
				</Container>
			</section>
			<section className="py-16 md:py-24">
				<Container>
					<div className="mx-auto max-w-4xl divide-y divide-border">
						{companyValues.map((value, index) => {
							const Icon = icons[index];
							return (
								<article key={value.title} className="py-9 first:pt-0">
									<Icon
										size={32}
										weight="duotone"
										className="text-secondary"
										aria-hidden
									/>
									<h2 className="mt-4 text-2xl md:text-3xl">{value.title}</h2>
									<p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
										{value.description}
									</p>
								</article>
							);
						})}
					</div>
				</Container>
			</section>
			<CtaSection
				title="Un jardin en accord avec vos envies"
				description="Parlons de votre terrain, de vos usages et de la place que vous souhaitez donner au vivant."
			/>
		</>
	);
}
