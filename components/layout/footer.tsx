import { InstagramLogoIcon, LinkedinLogoIcon, MapPinLineIcon, PhoneCallIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { company, legalLinks, navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-border bg-card mt-24 border-t">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <p className="text-secondary text-xs font-semibold tracking-[0.18em] uppercase">Permapaysage</p>
          <h2 className="font-serif text-2xl tracking-tight">Des jardins qui prennent racine dans le temps.</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Conception, aménagement et entretien de jardins écologiques à Vallet et dans tout le Vignoble Nantais.
          </p>
          <div className="text-muted-foreground space-y-2 text-sm">
            <p className="inline-flex items-start gap-2">
              <MapPinLineIcon size={18} className="mt-0.5 shrink-0" />
              <span>{company.address}</span>
            </p>
            <p className="inline-flex items-center gap-2">
              <PhoneCallIcon size={18} className="shrink-0" />
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">
                {company.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-xl">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-xl">Informations</h3>
          <ul className="space-y-2 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 pt-2">
            <Link
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Permapaysage"
              className="border-border text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <InstagramLogoIcon size={16} />
            </Link>
            <Link
              href={company.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Permapaysage"
              className="border-border text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <LinkedinLogoIcon size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-border/80 text-muted-foreground border-t px-4 py-4 text-center text-xs md:px-6">
        <p>© {new Date().getFullYear()} Permapaysage. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
