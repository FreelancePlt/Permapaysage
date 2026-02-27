import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "CGV — Permapaysage",
  description: "Conditions générales de vente de Permapaysage.",
  path: "/cgv",
});

export default function CgvPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-3xl space-y-8">
        <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Conditions générales de vente</h1>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Objet</h2>
          <p>Les présentes CGV encadrent les prestations de conception, aménagement et entretien réalisées par Permapaysage.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Devis et exécution</h2>
          <p>Chaque intervention fait l&apos;objet d&apos;un devis détaillé. Les délais et modalités sont précisées avant lancement du chantier.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Paiement</h2>
          <p>Les conditions de règlement sont indiquées sur devis et facture. Des acomptes peuvent être demandés selon la nature de la mission.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Responsabilités</h2>
          <p>Permapaysage s&apos;engage à exécuter les prestations avec soin. Le client garantit l&apos;accessibilité et la conformité de son terrain.</p>
        </section>
      </Container>
    </section>
  );
}
