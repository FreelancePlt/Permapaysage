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
          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Types de cookies</h2>
            <p>Cookies strictement nécessaires, cookies de mesure d&apos;audience et cookies éventuels de personnalisation.</p>
          </section>
          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Gestion du consentement</h2>
            <p>Vous pouvez accepter ou refuser les cookies optionnels via les paramètres de votre navigateur.</p>
          </section>
          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Droit d&apos;accès</h2>
            <p>Pour toute question, contactez permapaysage.jl@gmail.com.</p>
          </section>
        </Container>
      </section>
    </>
  );
}
