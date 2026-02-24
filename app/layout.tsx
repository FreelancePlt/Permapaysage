import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { ThemeScript } from "@/components/layout/theme-script";

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
  metadataBase: new URL("https://www.permapaysage.com"),
  title: "Permapaysage — Éco-paysagiste à Vallet | Conception, aménagement et entretien",
  description:
    "Permapaysage conçoit, aménage et entretient des jardins écologiques à Vallet et dans le Vignoble Nantais.",
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.permapaysage.com",
    siteName: "Permapaysage",
    title: "Permapaysage — Éco-paysagiste à Vallet",
    description: "Conception, aménagement et entretien de jardins durables à Vallet.",
    images: [
      {
        url: "/images/og-garden.svg",
        width: 1200,
        height: 630,
        alt: "Permapaysage, éco-paysagiste à Vallet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Permapaysage — Éco-paysagiste à Vallet",
    description: "Conception, aménagement et entretien de jardins durables à Vallet.",
    images: ["/images/og-garden.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
