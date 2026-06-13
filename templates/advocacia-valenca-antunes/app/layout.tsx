import type { Metadata } from "next";
import { Besley, Archivo, Courier_Prime } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const besley = Besley({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-besley",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valença & Antunes — Advocacia Empresarial",
  description:
    "Escritório de advocacia empresarial em [Bairro, Cidade - UF]. Direito tributário, trabalhista, societário e contratos. Atendimento estratégico para empresas.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Valença & Antunes Advocacia",
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
    <html
      lang="pt-BR"
      className={`${besley.variable} ${archivo.variable} ${courierPrime.variable}`}
    >
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
