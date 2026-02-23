import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only z-50 rounded-sm px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>
      <Header />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
