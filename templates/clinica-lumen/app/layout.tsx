import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clínica Lumen — Odontologia de precisão em Pinheiros, São Paulo - SP",
  description:
    "Clínica odontológica premium em Pinheiros, São Paulo - SP. Implantes, lentes de contato dental, ortodontia e harmonização. Agende sua avaliação online.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Clínica Lumen",
  description: "Clínica odontológica de alto padrão em Pinheiros, São Paulo - SP",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "UF",
    addressCountry: "BR",
  },
  telephone: "+55 (00) 00000-0000",
  openingHours: "Mo-Fr 08:00-19:00, Sa 08:00-13:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${outfit.variable}`}>
      <head>
        <Script
          id="dentist-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
