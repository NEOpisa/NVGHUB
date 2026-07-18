import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  IBM_Plex_Mono,
} from "next/font/google";
import Header from "@/components/Header";
import FooterGate from "@/components/FooterGate";
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
import LetterScatter from "@/components/LetterScatter";
import ObsidianRain from "@/components/ObsidianRain";
import HudControls from "@/components/HudControls";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";
// Zonas de CSS por owner (paralelismo sem conflito — ver /inc2.md).
// Ordem importa: importadas após globals.css para vencer a cascata.
import "./c1.css";
import "./c2.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--ff-jakarta",
  display: "swap",
});

// tipografia da jornada (linguagem igloo): grotesca técnica + mono terminal
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // #027 · cor da UI do navegador casa com o obsidian do site
  themeColor: "#040309",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neovanguard — Ferramentas para o seu negócio",
    template: "%s · Neovanguard",
  },
  description:
    "Resolvemos problemas de negócio criando a ferramenta certa: sistemas, automações, IA aplicada e lojas sob medida. Entrega com prazo definido, sem contrato mínimo, atendendo o Brasil inteiro de forma 100% remota.",
  applicationName: "Neovanguard",
  keywords: [
    "ferramentas para negócios",
    "sistemas web sob medida",
    "automação de processos",
    "IA para empresas",
    "sistema para comércio",
    "agendamento online",
    "e-commerce",
    "desenvolvimento sob medida Brasil",
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
    title: "Neovanguard — Ferramentas para o seu negócio",
    description:
      "Resolvemos problemas de negócio criando a ferramenta certa: sistemas, automações, IA e lojas sob medida. Prazo definido, sem contrato mínimo, 100% remoto.",
    type: "website",
    locale: "pt_BR",
    siteName: "Neovanguard",
    url: SITE_URL,
    // imagem OG: gerada pelo app/opengraph-image.tsx (Blueprint Obsidian)
  },
  twitter: {
    card: "summary_large_image",
    title: "Neovanguard — Ferramentas para o seu negócio",
    description:
      "A ferramenta certa para cada problema do seu negócio: sistemas, automações e IA sob medida. 100% remoto, sem contrato mínimo.",
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
        "Estúdio de tecnologia 100% remoto: resolvemos problemas de negócio criando a ferramenta certa — sistemas, automações, IA e lojas sob medida — para empresas de todo o Brasil.",
      areaServed: { "@type": "Country", name: "Brasil" },
      priceRange: "$$",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+5519994425132",
        availableLanguage: ["pt-BR"],
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ferramenta sob medida",
            description:
              "Sistemas, automações e integrações desenhados para o problema específico do seu negócio.",
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
      className={`${jakarta.variable} ${grotesk.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
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
        {/* fundo das páginas internas: BlueprintStage (por página) — o antigo
            SceneCanvas global saiu junto com a linguagem antiga */}
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        {children}
        <FooterGate />
        <div className="site-frame" aria-hidden="true" />
        <HudControls />
        <LetterScatter />
        <ObsidianRain />
        <MetaPixel />
        <FpsMeter />
        <Analytics />
      </body>
    </html>
  );
}
