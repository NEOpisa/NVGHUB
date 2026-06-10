import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AmbientField from "@/components/AmbientField";
import { SITE_URL, IG } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Neovanguard — Agência de Soluções Digitais",
  description:
    "Criamos sites e sistemas para pequenos negócios locais. Site pronto em até 7 dias. Você aparece no Google, seus clientes chegam.",
  openGraph: {
    title: "Neovanguard — Agência de Soluções Digitais",
    description:
      "Criamos sites e sistemas para pequenos negócios locais. Site pronto em até 7 dias.",
    type: "website",
    url: SITE_URL,
    images: ["/logo.png"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neovanguard",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Agência de soluções digitais 100% remota, especializada em sites e sistemas para pequenos negócios locais em todo o Brasil.",
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs: [IG],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Orbitron:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <AmbientField />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
