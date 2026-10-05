"use client";

import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { CtaButton } from "@/components/shared/cta-button";

const serviceLinks = [
  { href: "/conception", label: "Conception de jardin" },
  { href: "/amenagement", label: "Aménagement des extérieurs" },
  { href: "/entretien", label: "Entretien des espaces verts" },
];

const mainNav = [
  { href: "/", label: "Accueil" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }, []);

  const isServicePage = serviceLinks.some((s) => pathname === s.href);

  const linkClassName = (href: string) =>
    clsx(
      "rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
      pathname === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted",
    );

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape") return;

    if (isServicesOpen && servicesTrigger.current?.getClientRects().length) {
      event.preventDefault();
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      setIsServicesOpen(false);
      servicesTrigger.current.focus();
    } else if (isMenuOpen) {
      event.preventDefault();
      setIsMenuOpen(false);
      setIsMobileServicesOpen(false);
      menuTrigger.current?.focus();
    }
  };

  return (
    <header onKeyDown={handleKeyDown} className="border-border/70 bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 px-4 py-3 md:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
          <Image
            src="/Logo.png"
            alt="Logo Permapaysage"
            width={132}
            height={40}
            className="h-9 w-auto max-[400px]:h-auto max-[400px]:w-14 transition-opacity group-hover:opacity-90"
            priority
          />
          <span className="hidden text-xs tracking-[0.18em] uppercase text-muted-foreground 2xl:inline">Permapaysage</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-2 xl:flex">
          <Link href="/" className={linkClassName("/")}>
            Accueil
          </Link>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              ref={servicesTrigger}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              onClick={() => setIsServicesOpen((v) => !v)}
              className={clsx(
                "inline-flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                isServicePage ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              Nos services
              <CaretDownIcon
                size={14}
                weight="bold"
                className={clsx("transition-transform duration-200", isServicesOpen && "rotate-180")}
              />
            </button>

            {isServicesOpen && (
              <div className="absolute left-0 top-full z-50 pt-1">
                <div className="bg-popover ring-foreground/10 min-w-[240px] rounded-lg p-1 shadow-md ring-1 appearance-animation animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsServicesOpen(false)}
                      className={clsx(
                        "flex items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-popover-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mainNav.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={linkClassName(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a href="tel:+33752620818" className="whitespace-nowrap rounded-sm text-sm font-semibold text-foreground hover:text-cta-terracotta-hover">
            07 52 62 08 18
          </a>
          <CtaButton action="call" compact />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <CtaButton action="call" compact className="px-2 sm:px-4" />
          <button
            type="button"
            ref={menuTrigger}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="border-border bg-card inline-flex h-10 w-10 items-center justify-center rounded-sm border transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {isMenuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-navigation" aria-label="Navigation mobile" className="border-border/70 bg-card border-t xl:hidden">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 px-4 py-4">
            <Link href="/" className={linkClassName("/")} onClick={() => setIsMenuOpen(false)}>
              Accueil
            </Link>

            <button
              type="button"
              aria-expanded={isMobileServicesOpen}
              onClick={() => setIsMobileServicesOpen((v) => !v)}
              className={clsx(
                "inline-flex items-center justify-between rounded-sm px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                isServicePage ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              Nos services
              <CaretDownIcon
                size={14}
                weight="bold"
                className={clsx("transition-transform duration-200", isMobileServicesOpen && "rotate-180")}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="flex flex-col gap-1 pl-4">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClassName(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {mainNav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className={linkClassName(item.href)} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}

            <CtaButton action="call" compact onClick={() => setIsMenuOpen(false)} className="mt-2" />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
