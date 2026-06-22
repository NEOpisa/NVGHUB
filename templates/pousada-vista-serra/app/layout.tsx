import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pousada Vista Serra — Refúgio na montanha | Hospedagem boutique",
  description:
    "Pousada boutique na serra: chalés com vista para o vale, café da manhã artesanal, spa e trilhas. Reserve sua estadia e desacelere de verdade.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Pousada Vista Serra",
  description:
    "Pousada boutique na serra com chalés, café da manhã artesanal e spa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Serra da Mantiqueira",
    addressRegion: "UF",
    addressCountry: "BR",
  },
  telephone: "+55 (00) 00000-0000",
  priceRange: "$$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <Script
          id="lodging-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
