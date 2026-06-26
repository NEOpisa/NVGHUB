import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SceneCanvas from "@/components/scene/SceneCanvas";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollJuice from "@/components/ScrollJuice";
import PageTransition from "@/components/PageTransition";
import TransitionCanvas from "@/components/scene/TransitionCanvas";
import FpsMeter from "@/components/FpsMeter";
import ScrollToSection from "@/components/ScrollToSection";
import ClickFX from "@/components/ClickFX";
import MetaPixel from "@/components/MetaPixel";
import ViewportProbe from "@/components/ViewportProbe";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neovanguard — Agência de Soluções Digitais",
    template: "%s · Neovanguard",
  },
  description:
    "Sites, sistemas, SEO e suporte operados como um só ecossistema. Entrega com prazo definido, sem contrato mínimo, atendendo o Brasil inteiro de forma 100% remota.",
  applicationName: "Neovanguard",
  keywords: [
    "agência digital",
    "criação de sites",
    "sistemas web",
    "SEO local",
    "Google Meu Negócio",
    "site para pequenos negócios",
    "desenvolvimento web Brasil",
    "manutenção de sites",
    "landing page",
    "Neovanguard",
  ],
  authors: [{ name: "Neovanguard" }],
  creator: "Neovanguard",
  publisher: "Neovanguard",
  alternates: { canonical: "/" },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Neovanguard — Agência de Soluções Digitais",
    description:
      "Sites, sistemas, SEO e suporte operados como um só ecossistema. Entrega com prazo definido, sem contrato mínimo, 100% remoto.",
    type: "website",
    locale: "pt_BR",
    siteName: "Neovanguard",
    url: SITE_URL,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Neovanguard — Agência de Soluções Digitais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neovanguard — Agência de Soluções Digitais",
    description:
      "Sites, sistemas, SEO e suporte como um só ecossistema. 100% remoto, sem contrato mínimo.",
    images: ["/og.png"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Neovanguard",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#org`,
      name: "Neovanguard",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og.png`,
      description:
        "Agência de soluções digitais 100% remota, especializada em sites e sistemas para pequenos negócios locais em todo o Brasil.",
      areaServed: { "@type": "Country", name: "Brasil" },
      priceRange: "$$",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+5521969043544",
        availableLanguage: ["pt-BR"],
      },
      sameAs: [IG],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site Profissional",
            description:
              "Landing pages e sites institucionais responsivos, otimizados para SEO local.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sistema para Negócio",
            description:
              "Cardápio digital, agendamento online e catálogos com painel de controle.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Presença Digital",
            description:
              "Google Meu Negócio e otimização para aparecer nas buscas locais.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Manutenção & Suporte",
            description:
              "Suporte via WhatsApp, atualizações e monitoramento contínuo.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS por segmento",
            description: "Plataformas prontas para clínicas e restaurantes.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${jakarta.variable} ${orbitron.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ViewportProbe />
        <Preloader />
        <PageTransition />
        <TransitionCanvas />
        <SmoothScroll />
        <ScrollJuice />
        <ScrollToSection />
        <ClickFX />
        <SceneCanvas />
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
