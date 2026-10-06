"use client";

import { PhoneIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

import { company } from "@/lib/site-data";

export function FloatingCallButton() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <a
      href={`tel:${company.phone.replace(/\s/g, "")}`}
      aria-label="Appeler Permapaysage"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A531A] text-white shadow-lg transition-transform active:scale-95 md:hidden"
    >
      <PhoneIcon size={24} weight="fill" />
    </a>
  );
}
