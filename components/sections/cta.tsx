import Link from "next/link";

import { Container } from "@/components/shared/container";

type CtaSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};

export function CtaSection({
  eyebrow = "Lancer votre projet",
  title = "Parlons de votre jardin et de votre vision.",
  description = "Un premier échange permet de cadrer rapidement la faisabilité, les priorités et les étapes.",
  ctaText = "Contacter Permapaysage",
  ctaHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="bg-primary text-primary-foreground rounded-lg px-6 py-10 md:flex md:items-end md:justify-between md:px-10 md:py-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase">{eyebrow}</p>
            <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
            <p className="text-primary-foreground/90 text-sm md:text-base">{description}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href={ctaHref}
              className="bg-background text-foreground hover:bg-background/90 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-sm px-6 text-sm font-semibold transition-colors"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
