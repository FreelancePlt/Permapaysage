import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Service } from "@/lib/site-data";

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
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-6">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">{eyebrow}</p>
              <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">{service.title}</h1>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">{subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors"
                >
                  Obtenir un devis
                </Link>
                <Link
                  href="/realisations"
                  className="border-primary text-primary hover:bg-primary/10 inline-flex h-11 items-center justify-center rounded-sm border px-6 text-sm font-semibold transition-colors"
                >
                  Voir les projets
                </Link>
              </div>
            </div>
            <div className="bg-card border-border rounded-lg border p-4 shadow-md">
              <Image
                src={image}
                alt={`Maquette visuelle du service ${service.title}`}
                width={1024}
                height={768}
                className="aspect-[16/11] w-full rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-card/55 py-14 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="bg-background border-border rounded-lg border p-6 md:p-8">
              <h2 className="text-3xl leading-tight tracking-tight">Approche</h2>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">{service.longDescription}</p>
              <ul className="mt-6 space-y-3">
                {service.points.map((point) => (
                  <li key={point} className="text-muted-foreground flex items-start gap-2 text-sm md:text-base">
                    <span className="bg-primary mt-2 inline-block h-1.5 w-1.5 rounded-full" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="bg-background border-border rounded-lg border p-6 md:p-8">
              <h2 className="text-3xl leading-tight tracking-tight">{extraSectionTitle}</h2>
              <ul className="mt-6 space-y-3">
                {extraPoints.map((point) => (
                  <li key={point} className="text-muted-foreground flex items-start gap-2 text-sm md:text-base">
                    <span className="bg-secondary mt-2 inline-block h-1.5 w-1.5 rounded-full" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="text-primary mt-8 inline-flex text-sm font-semibold hover:underline">
                Parler de votre besoin
              </Link>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
