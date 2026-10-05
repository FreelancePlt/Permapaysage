"use client";

import { PhoneIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export function FloatingCallButton() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <a
      href="tel:+33752620818"
      aria-label="Appeler Permapaysage"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-cta-terracotta text-cta-white shadow-lg transition-colors hover:bg-cta-terracotta-hover focus-visible:ring-2 focus-visible:ring-cta-terracotta focus-visible:ring-offset-2 md:hidden"
    >
      <PhoneIcon size={24} weight="fill" />
    </a>
  );
}
