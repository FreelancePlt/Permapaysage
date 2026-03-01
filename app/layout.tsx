import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { ThemeScript } from "@/components/layout/theme-script";
import { BASE_URL, buildPageMetadata } from "@/lib/seo";
import { company } from "@/lib/site-data";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...buildPageMetadata({
    title: "Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien",
    description: company.description,
    path: "/",
    keywords: [
      "paysagiste Clisson",
      "paysagiste Vertou",
      "amenagement exterieur Vallet",
      "devis paysagiste Vallet",
    ],
  }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Logo.png", type: "image/png" },
    ],
    apple: [{ url: "/Logo.png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "Permapaysage",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#254239",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <ThemeScript />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
