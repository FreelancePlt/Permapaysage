import { ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";

import { ContactForm } from "@/components/shared/contact-form";
import { Container } from "@/components/shared/container";
import { InterventionMapLazy } from "@/components/shared/intervention-map-lazy";
import { Reveal } from "@/components/shared/reveal";
import { StructuredData } from "@/components/shared/structured-data";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildLocalBusinessSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";
import { company, interventionCities } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Contactez Permapaysage — Devis gratuit paysagiste Vallet",
  description:
    "Contactez Permapaysage pour un devis gratuit : conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
  path: "/contact",
  keywords: [
    "contact paysagiste Vallet",
    "devis jardin Vallet",
    "entreprise paysagiste Clisson",
    "devis amenagement exterieur Vertou",
  ],
});

const contactDetails = [
  { icon: PhoneIcon, label: "Téléphone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
  { icon: EnvelopeIcon, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPinIcon, label: "Adresse", value: company.address },
  { icon: ClockIcon, label: "Horaires", value: company.businessHours },
];

export default function ContactPage() {
  const schemas = [
    buildWebPageSchema({
      title: "Contactez Permapaysage — Devis gratuit paysagiste Vallet",
      description:
        "Contactez Permapaysage pour un devis gratuit : conception, aménagement et entretien de jardin à Vallet et dans un rayon de 25 km.",
      path: "/contact",
      type: "ContactPage",
    }),
    buildLocalBusinessSchema("/contact", interventionCities),
    buildItemListSchema(
      interventionCities.map((city) => ({
        name: city,
        path: "/contact",
      })),
      "https://schema.org/ItemListUnordered",
    ),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ];

  return (
    <>
      <StructuredData data={schemas} />

      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <Container>
          <div className="relative mx-auto max-w-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
              Contact
            </div>
            <h1 className="mt-4 text-4xl leading-tight tracking-tight text-white md:text-5xl">
              Parlons de votre projet paysager
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              Remplissez le formulaire ci-dessous ou contactez-nous directement. Réponse sous 48 heures.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon;
                    const content = (
                      <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20 hover:shadow-sm">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon size={22} weight="duotone" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{detail.label}</p>
                          <p className="mt-1 text-sm font-medium">{detail.value}</p>
                        </div>
                      </div>
                    );

                    if (detail.href) {
                      return (
                        <a key={detail.label} href={detail.href} className="block">
                          {content}
                        </a>
                      );
                    }
                    return <div key={detail.label}>{content}</div>;
                  })}
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="text-lg font-medium">Devis gratuit & sans engagement</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Décrivez votre projet et nous vous recontactons rapidement pour organiser un rendez-vous sur place. La visite terrain et le premier échange sont offerts.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-card py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Zone d&apos;intervention</p>
              <h2 className="mt-3 text-3xl leading-tight tracking-tight">Intervention autour de Vallet</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
                Nous intervenons dans un rayon de 25 km autour de Vallet, au c&#339;ur du Vignoble Nantais.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <InterventionMapLazy />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {interventionCities.map((city) => (
                <span key={city} className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium shadow-sm">
                  {city}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-sm">
              Besoin d&apos;une vérification rapide de zone ? Appelez le{" "}
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="font-semibold text-primary">
                {company.phone}
              </a>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
