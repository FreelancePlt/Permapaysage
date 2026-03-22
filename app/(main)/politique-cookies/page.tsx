import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Politique de cookies — Permapaysage",
  description: "Politique de cookies et gestion du consentement sur le site Permapaysage.",
  path: "/politique-cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageSchema({
            title: "Politique de cookies — Permapaysage",
            description: "Politique de cookies et gestion du consentement sur le site Permapaysage.",
            path: "/politique-cookies",
          }),
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Politique de cookies", path: "/politique-cookies" },
          ]),
        ]}
      />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl space-y-8">
          <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">Politique de cookies</h1>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Pourquoi des cookies ?</h2>
            <p>Les cookies servent à mesurer l&apos;audience et à améliorer l&apos;expérience utilisateur. Aucun cookie non essentiel n&apos;est déposé sans consentement.</p>
          </section>

          <section className="space-y-4 text-sm leading-relaxed">
            <h2 className="text-2xl">Cookies utilisés</h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-[var(--border)] p-4">
                <h3 className="mb-1 font-medium">cookie_consent</h3>
                <p className="text-foreground/70 text-xs">Cookie fonctionnel</p>
                <p className="mt-2">Stocke votre choix concernant les cookies (accepté ou refusé). Ce cookie est indispensable au bon fonctionnement du bandeau de consentement.</p>
                <p className="text-foreground/60 mt-1 text-xs">Durée : 13 mois</p>
              </div>

              <div className="rounded-lg border border-[var(--border)] p-4">
                <h3 className="mb-1 font-medium">_ga, _ga_*</h3>
                <p className="text-foreground/70 text-xs">Cookies de mesure d&apos;audience (Google Analytics)</p>
                <p className="mt-2">Permettent de mesurer l&apos;audience du site de manière anonymisée : nombre de visiteurs, pages consultées, durée des visites. Ces cookies ne sont déposés que si vous acceptez les cookies.</p>
                <p className="text-foreground/60 mt-1 text-xs">Durée : 13 mois</p>
              </div>
            </div>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Gestion du consentement</h2>
            <p>Lors de votre première visite, un bandeau vous propose d&apos;accepter ou de refuser les cookies de mesure d&apos;audience. Votre choix est conservé pendant 13 mois.</p>
            <p>Le refus des cookies n&apos;empêche en aucun cas la navigation sur le site. Toutes les fonctionnalités restent accessibles.</p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Droit d&apos;accès</h2>
            <p>Pour toute question concernant vos données personnelles ou la gestion des cookies, contactez permapaysage.jl@gmail.com.</p>
          </section>
        </Container>
      </section>
    </>
  );
}
