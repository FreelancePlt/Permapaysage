import { Container } from "@/components/shared/container";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { getFaq } from "@/lib/sanity/queries";
import type { Faq } from "@/lib/sanity/types";

export const metadata = buildPageMetadata({
  title: "FAQ — Questions fréquentes | Permapaysage",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur nos services de conception, aménagement et entretien de jardin à Vallet et dans le Vignoble Nantais.",
  path: "/faq",
  keywords: [
    "faq paysagiste",
    "questions jardin Vallet",
    "credit impot entretien jardin",
    "conception jardin questions",
  ],
});

export const revalidate = 60;

export default async function FaqPage() {
  const allFaqs: Faq[] = await getFaq();
  const faqItems = allFaqs.map((f) => ({ question: f.question, answer: f.reponse }));

  const schemas = [
    buildWebPageSchema({
      title: "FAQ — Questions fréquentes | Permapaysage",
      description:
        "Retrouvez les réponses aux questions les plus fréquentes sur nos services.",
      path: "/faq",
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
    ...(faqItems.length > 0 ? [buildFaqSchema(faqItems)] : []),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
              FAQ
            </div>
            <h1 className="mt-4 text-4xl leading-tight tracking-tight text-white md:text-5xl">
              Questions fréquentes
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              Les réponses aux questions que vous vous posez le plus souvent sur nos services.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          {faqItems.length > 0 ? (
            <Reveal>
              <div className="mx-auto max-w-3xl">
                <FaqAccordion items={faqItems} />
              </div>
            </Reveal>
          ) : (
            <p className="text-muted-foreground text-center">Aucune question pour le moment.</p>
          )}
        </Container>
      </section>
    </>
  );
}
