import type { Metadata, Viewport } from "next";
import { DM_Sans, Lora } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import { BASE_URL, buildPageMetadata } from "@/lib/seo";
import { company } from "@/lib/site-data";

import "./globals.css";

const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
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
		title:
			"Permapaysage : Éco-paysagiste à Vallet | Conception, aménagement et entretien",
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
			{ url: "/logo.webp", type: "image/webp" },
		],
		apple: [{ url: "/logo-apple.png", sizes: "192x192", type: "image/png" }],
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
	themeColor: "#1F4A2E",
	colorScheme: "light",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className={`${lora.variable} ${dmSans.variable}`}>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
              });
            `,
					}}
				/>
			</head>
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
