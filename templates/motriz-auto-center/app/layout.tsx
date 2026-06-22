import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motriz Auto Center — Mecânica de confiança | Revisão, freios e suspensão",
  description:
    "Centro automotivo completo: revisão, injeção eletrônica, freios, suspensão e ar-condicionado. Diagnóstico computadorizado e orçamento sem compromisso.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Motriz Auto Center",
  description:
    "Centro automotivo completo com diagnóstico computadorizado e garantia nos serviços.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "UF",
    addressCountry: "BR",
  },
  telephone: "+55 (00) 00000-0000",
  openingHours: "Mo-Fr 08:00-18:00, Sa 08:00-13:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        <Script
          id="autorepair-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
