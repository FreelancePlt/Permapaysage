"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigation } from "@/lib/site-data";

import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClassName = (href: string) =>
    clsx(
      "rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
      pathname === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted",
    );

  return (
    <header className="border-border/70 bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
          <Image
            src="/Logo.png"
            alt="Logo Permapaysage"
            width={132}
            height={40}
            className="h-9 w-auto transition-opacity group-hover:opacity-90"
            priority
          />
          <span className="hidden text-xs tracking-[0.18em] uppercase text-muted-foreground lg:inline">Eco-paysagiste a Vallet</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={linkClassName(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-sm px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            Obtenir un devis
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="border-border bg-card inline-flex h-10 w-10 items-center justify-center rounded-sm border transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {isMenuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav aria-label="Navigation mobile" className="border-border/70 bg-card border-t md:hidden">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 px-4 py-4">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={linkClassName(item.href)} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-primary-foreground mt-2 inline-flex h-10 items-center justify-center rounded-sm text-sm font-semibold"
            >
              Obtenir un devis
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
