import { ArrowRightIcon, LeafIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Container } from "@/components/shared/container";

type CtaSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  points?: string[];
  ctaText?: string;
  ctaHref?: string;
};

export function CtaSection({
  eyebrow = "Lancer votre projet",
  title = "Parlons de votre jardin et de votre vision.",
  description = "Un premier échange permet de cadrer rapidement la faisabilité, les priorités et les étapes.",
  points,
  ctaText = "Contacter Permapaysage",
  ctaHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#1A531A] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-white/4 blur-2xl" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/3 blur-3xl" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
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
          <Link
            href={ctaHref}
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-10 text-base font-bold text-[#1A531A] shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
          >
            {ctaText}
            <ArrowRightIcon size={18} weight="bold" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
