import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  IBM_Plex_Mono,
} from "next/font/google";
import RailLeft from "@/components/shell/RailLeft";
import RailRight from "@/components/shell/RailRight";
import MobileBar from "@/components/shell/MobileBar";
import MetaPixel from "@/components/MetaPixel";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/constants";
import "./shell.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-jakarta",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--ff-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ff-mono-var",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06070b",
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
      image: `${SITE_URL}/opengraph-image`,
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
    },
  ],
};

/**
 * A "telinha" do site: trilho de rotas à esquerda, coluna de painéis no
 * meio, trilho de utilidades à direita. Os trilhos são sticky e nunca
 * somem — toda página é montada dentro desse mesmo esqueleto.
 */
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
        <MobileBar />
        <div className="sh">
          <RailLeft />
          <main className="sh-main" id="main">
            {children}
          </main>
          <RailRight />
        </div>
        <MetaPixel />
        <Analytics />
      </body>
    </html>
  );
}
