import type { Metadata } from "next";
import { Cormorant_Garamond, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Nome do Escritório de Advocacia] — Advocacia Empresarial",
  description:
    "Escritório de advocacia empresarial em [Bairro, Cidade - UF]. Direito tributário, trabalhista, societário e contratos. Atendimento estratégico para empresas.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "[Nome do Escritório de Advocacia]",
  address: {
    "@type": "PostalAddress",
    addressLocality: "[Cidade]",
    addressRegion: "UF",
    addressCountry: "BR",
  },
  telephone: "+55-00-00000-0000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorantGaramond.variable} ${archivo.variable}`}>
      <body>
        <Script
          id="legal-service-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
