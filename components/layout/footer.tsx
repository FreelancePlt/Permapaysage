import { ArrowRightIcon, FacebookLogoIcon, InstagramLogoIcon, LeafIcon, LinkedinLogoIcon, MapPinLineIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { company, legalLinks, navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border text-white" style={{ backgroundColor: "#0F3A0F" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-6 md:py-20">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Image
              src="/Logo.png"
              alt="Logo de Permapaysage"
              width={32}  
              height={32}
              className="h-8 w-8 rounded-full "
            />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/70">Permapaysage</span>
          </div>
          <h2 className="font-serif text-2xl tracking-tight">Des jardins qui prennent racine dans le temps.</h2>
          <p className="text-sm leading-relaxed text-white/60">
            Conception, aménagement et entretien de jardins écologiques à Vallet et dans tout le Vignoble Nantais.
          </p>
          <div className="space-y-2.5 text-sm text-white/60">
            <p className="inline-flex items-start gap-2.5">
              <MapPinLineIcon size={18} className="mt-0.5 shrink-0 text-white/40" />
              <span>{company.address}</span>
            </p>
            <p className="inline-flex items-center gap-2.5">
              <PhoneCallIcon size={18} className="shrink-0 text-white/40" />
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                {company.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-serif text-lg text-white/90">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white">
                  <ArrowRightIcon size={12} className="text-white/30" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <h3 className="font-serif text-lg text-white/90">Informations</h3>
          <ul className="space-y-2.5 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white">
                  <ArrowRightIcon size={12} className="text-white/30" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-3">
            <Link
              href={company.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Permapaysage"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <FacebookLogoIcon size={18} />
            </Link>
            <Link
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Permapaysage"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <InstagramLogoIcon size={18} />
            </Link>
            <Link
              href={company.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Permapaysage"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <LinkedinLogoIcon size={18} />
            </Link>
          </div>

        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between md:px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-white/50">Membre de</span>
            <div className="h-5 w-px bg-white/20" />
            <div className="flex items-center gap-5">
              <Image
                src="/logos/unipros.png"
                alt="Membre Unipros — Union Nationale des Intégrateurs Professionnels"
                width={120}
                height={48}
                className="h-12 w-auto brightness-0 invert opacity-80 transition-opacity hover:opacity-100"
              />
              <Image
                src="/logos/unep.png"
                alt="Membre UNEP — Union Nationale des Entreprises du Paysage"
                width={120}
                height={48}
                className="h-12 w-auto brightness-0 invert opacity-80 transition-opacity hover:opacity-100"
              />
            </div>
          </div>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Permapaysage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
