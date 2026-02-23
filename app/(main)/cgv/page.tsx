import { Container } from "@/components/shared/container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "CGV — Permapaysage",
  description: "Conditions generales de vente de Permapaysage.",
  path: "/cgv",
});

export default function CgvPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-3xl space-y-8">
        <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Conditions generales de vente</h1>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Objet</h2>
          <p>Les presentes CGV encadrent les prestations de conception, amenagement et entretien realisees par Permapaysage.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Devis et execution</h2>
          <p>Chaque intervention fait l&apos;objet d&apos;un devis detaille. Les delais et modalites sont precises avant lancement du chantier.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Paiement</h2>
          <p>Les conditions de reglement sont indiquees sur devis et facture. Des acomptes peuvent etre demandes selon la nature de la mission.</p>
        </section>
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-2xl">Responsabilites</h2>
          <p>Permapaysage s&apos;engage a executer les prestations avec soin. Le client garantit l&apos;accessibilite et la conformite de son terrain.</p>
        </section>
        <p className="text-muted-foreground text-xs">Version maquette. Le texte juridique final doit etre valide avant mise en production.</p>
      </Container>
    </section>
  );
}
