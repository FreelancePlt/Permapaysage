import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { CtaButton, ctaButtonVariants } from "@/components/shared/cta-button";
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
      <section className="dark-section relative overflow-hidden py-20 md:py-28">

        <Container>
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6 appearance-animation animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="inline-flex items-center gap-2 border-b border-cream/25 pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cream/80">
                {eyebrow}
              </div>
              <h1 className="text-4xl leading-tight tracking-tight text-white md:text-5xl">{service.title}</h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <CtaButton emplacement="service" action="call" variant="primary-dark" className="w-full sm:w-auto" />
                <Link
                  href="/realisations"
                  className={ctaButtonVariants({ variant: "secondary-dark", className: "w-full sm:w-auto" })}
                >
                  Voir les projets
                </Link>
              </div>
            </div>
            <div className="appearance-animation animate-in fade-in zoom-in-95 duration-300">
              <div className="photo-frame">
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
              <p className="section-eyebrow">Notre approche</p>
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
              <p className="section-eyebrow">Résultats</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight">{extraSectionTitle}</h2>
              <ul className="mt-6 space-y-3">
                {extraPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm md:text-base">
                    <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-secondary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <CtaButton emplacement="service" action="call" variant="primary-light" className="mt-8 w-full sm:w-auto" />
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
