import { LeafIcon } from "@phosphor-icons/react/dist/ssr";
import { CtaButton } from "@/components/shared/cta-button";

import { Container } from "@/components/shared/container";

type CtaSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  points?: string[];
};

export function CtaSection({
  eyebrow = "Lancer votre projet",
  title = "Parlons de votre jardin et de votre vision.",
  description = "Un premier échange permet de cadrer rapidement la faisabilité, les priorités et les étapes.",
  points,
}: CtaSectionProps) {
  return (
    <section className="dark-section decor decor-branch-left py-20 md:py-24">
      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cream/80">
            <LeafIcon size={14} weight="fill" />
            {eyebrow}
          </div>
          <h2 className="mt-6 text-3xl leading-tight tracking-tight text-white md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{description}</p>
          {points && points.length > 0 && (
            <ul className="mx-auto mt-6 max-w-md space-y-2 text-left">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-white/80 md:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaButton emplacement="final" action="call" variant="primary-dark" />
            <CtaButton emplacement="final" action="visit" variant="secondary-dark" />
          </div>
        </div>
      </Container>
    </section>
  );
}
