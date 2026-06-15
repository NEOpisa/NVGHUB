import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientField from "@/components/AmbientField";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToSection from "@/components/ScrollToSection";
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
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} ${orbitron.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Preloader />
        <SmoothScroll />
        <ScrollToSection />
        <AmbientField />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
