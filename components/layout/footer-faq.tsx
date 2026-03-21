import { FaqAccordion } from "@/components/shared/faq-accordion";
import { getFaq } from "@/lib/sanity/queries";
import type { Faq } from "@/lib/sanity/types";

export async function FooterFaq() {
  const sanityFaqs: Faq[] = await getFaq();
  const faqItems = sanityFaqs.map((f) => ({ question: f.question, answer: f.reponse }));

  if (faqItems.length === 0) return null;

  return (
    <div className="relative border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h3 className="font-serif text-2xl tracking-tight text-white/90 text-center">
            Questions fréquentes
          </h3>
          <p className="mt-3 text-center text-sm text-white/50">
            Les réponses aux questions que vous vous posez le plus souvent.
          </p>
          <div className="mt-10">
            <FaqAccordion items={faqItems} variant="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
