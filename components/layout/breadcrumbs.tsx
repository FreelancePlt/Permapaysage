"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/site-data";

const labelMap = new Map(navigation.map((item) => [item.href.replace("/", "") || "accueil", item.label]));

function formatSegment(segment: string): string {
  if (segment.startsWith("paysagiste-")) {
    const cityName = segment.replace("paysagiste-", "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
    return `Paysagiste à ${cityName}`;
  }

  const mapped = labelMap.get(segment);
  if (mapped) {
    return mapped;
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Fil d'Ariane" className="border-border/80 bg-background/90 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-2 px-4 py-3 text-sm md:px-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
          Accueil
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <span key={href} className="inline-flex items-center gap-2">
              <span className="text-muted-foreground/70">/</span>
              {isLast ? (
                <span className="text-foreground font-medium">{formatSegment(segment)}</span>
              ) : (
                <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {formatSegment(segment)}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
