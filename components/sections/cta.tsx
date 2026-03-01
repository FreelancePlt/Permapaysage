import { ArrowRightIcon, LeafIcon } from "@phosphor-icons/react/dist/ssr";
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
        <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 md:px-14 md:py-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/[0.06] blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />
            <div className="absolute right-1/4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/[0.03] blur-2xl" />
          </div>

          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                <LeafIcon size={14} weight="fill" />
                {eyebrow}
              </div>
              <h2 className="text-3xl leading-tight tracking-tight text-white md:text-4xl">{title}</h2>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">{description}</p>
            </div>
            <Link
              href={ctaHref}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-7 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
            >
              {ctaText}
              <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
