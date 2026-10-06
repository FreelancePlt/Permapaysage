import { ArrowRightIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { Reveal } from "@/components/shared/reveal";
import { interventionCities } from "@/lib/site-data";

type ZoneInterventionProps = {
  texte: string;
  showCTA?: boolean;
};

export function ZoneIntervention({ texte, showCTA = true }: ZoneInterventionProps) {
  return (
    <section id="zone-intervention" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">
              Zone d&apos;intervention
            </p>
            <h2 className="mt-3 text-3xl leading-tight tracking-tight md:text-4xl">
              À votre service dans un rayon de 25 km
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <InterventionMapLazy />
            </div>

            <div className="space-y-6">
              <p className="text-base leading-relaxed md:text-lg">{texte}</p>

              <div className="flex flex-wrap gap-2">
                {interventionCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <MapPinIcon size={14} className="text-primary" />
                    {city}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-sm italic">
                Vous êtes plus loin ? Contactez-nous pour vérifier si nous pouvons intervenir.
              </p>

              {showCTA && (
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Demander un devis
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
