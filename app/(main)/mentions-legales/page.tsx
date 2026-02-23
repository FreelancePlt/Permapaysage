import Link from "next/link";

import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mentions legales — Permapaysage",
  description: "Mentions légales de Permapaysage.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-3xl space-y-8">
        <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Mentions legales</h1>
        <section className="space-y-3 text-sm leading-relaxed">
          <p>
            <span className="font-semibold">Societe:</span> SASU Permapaysage
          </p>
          <p>
            <span className="font-semibold">President:</span> Jessy Laderriere
          </p>
          <p>
            <span className="font-semibold">SIREN:</span> 953 318 391
          </p>
          <p>
            <span className="font-semibold">Adresse:</span> 18 avenue du General Heurtaux, 44330 Vallet
          </p>
          <p>
            <span className="font-semibold">RCS:</span> Nantes
          </p>
          <p>
            <span className="font-semibold">Contact:</span> permapaysage.jl@gmail.com — 07 52 62 08 18
          </p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Hebergement</h2>
          <p>Site heberge sur Vercel, Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Propriete intellectuelle</h2>
          <p>L&apos;ensemble des contenus du site est protege. Toute reproduction est interdite sans autorisation prealable.</p>
        </section>
        <Link href="/contact" className="text-primary inline-flex text-sm font-semibold hover:underline">
          Contacter Permapaysage
        </Link>
      </Container>
    </section>
  );
}
