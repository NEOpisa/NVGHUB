import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientField from "@/components/AmbientField";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollJuice from "@/components/ScrollJuice";
import PageTransition from "@/components/PageTransition";
import FpsMeter from "@/components/FpsMeter";
import ScrollToSection from "@/components/ScrollToSection";
import ClickFX from "@/components/ClickFX";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, IG } from "@/lib/constants";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--ff-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--ff-jakarta",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--ff-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Neovanguard — Agência de Soluções Digitais",
  description:
    "Sites, sistemas, SEO e suporte operados como um só ecossistema. Entrega com prazo definido, sem contrato mínimo, atendendo o Brasil inteiro de forma 100% remota.",
  openGraph: {
    title: "Neovanguard — Agência de Soluções Digitais",
    description:
      "Sites, sistemas, SEO e suporte operados como um só ecossistema. Entrega com prazo definido, sem contrato mínimo, 100% remoto.",
    type: "website",
    url: SITE_URL,
    images: ["/og.png"],
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
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+5521969043544",
    availableLanguage: ["pt-BR"],
  },
  sameAs: [IG],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} ${orbitron.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <ScrollJuice />
        <ScrollToSection />
        <ClickFX />
        <AmbientField />
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
        <div className="site-frame" aria-hidden="true" />
        <MetaPixel />
        <FpsMeter />
        <Analytics />
      </body>
    </html>
  );
}
