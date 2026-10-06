import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import type { Service } from "@/lib/site-data";

type ServicePageProps = {
  service: Service;
  image: string;
  eyebrow: string;
  subtitle: string;
  extraSectionTitle: string;
  extraPoints: string[];
};

export function ServicePageSection({
  service,
  image,
  eyebrow,
  subtitle,
  extraSectionTitle,
  extraPoints,
}: ServicePageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                {eyebrow}
              </div>
              <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">{service.title}</h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-7 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  Obtenir un devis
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
                >
                  Voir les projets
                </Link>
              </div>
            </div>
            <div className="animate-in fade-in zoom-in-95 duration-700 delay-200">
              <div className="overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <Image
                  src={image}
                  alt={`Illustration du service ${service.title}`}
                  width={1024}
                  height={768}
                  className="aspect-4/3 w-full rounded-xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Notre approche</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight">Approche</h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">{service.longDescription}</p>
              <ul className="mt-6 space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm md:text-base">
                    <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Résultats</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight">{extraSectionTitle}</h2>
              <ul className="mt-6 space-y-3">
                {extraPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm md:text-base">
                    <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-secondary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                Parler de votre projet
                <ArrowRightIcon size={16} weight="bold" />
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
