import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Space_Grotesk,
  IBM_Plex_Mono,
} from "next/font/google";
import Motion from "@/components/shell/Motion";
import Header from "@/components/shell/Header";
import TableOfContents from "@/components/shell/TableOfContents";
import Foot from "@/components/shell/Foot";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, VERSAO } from "@/lib/constants";
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
  themeColor: "#0c1422",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neovanguard OS — a máquina é sua, inclusive a identidade",
    template: "%s · Neovanguard OS",
  },
  description:
    "Distribuição Linux baseada em Arch onde a sua chave Nostr é a conta do sistema. Nó Bitcoin, Lightning e relay rodando na sua máquina, endurecimento de fábrica e 55 comandos para operar tudo isso. Código aberto, GPL-3.0.",
  applicationName: "Neovanguard OS",
  keywords: [
    "Neovanguard OS",
    "distribuição Linux",
    "Arch Linux",
    "Linux Bitcoin",
    "Linux Nostr",
    "sistema operacional soberano",
    "nó Bitcoin",
    "Lightning Network",
    "relay Nostr",
    "distro brasileira",
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
    title: "Neovanguard OS — a máquina é sua, inclusive a identidade",
    description:
      "Distribuição Linux baseada em Arch: a sua chave Nostr é a conta do sistema, e o nó Bitcoin, o Lightning e o relay rodam na sua máquina. Duas imagens, instalador próprio, GPL-3.0.",
    type: "website",
    locale: "pt_BR",
    siteName: "Neovanguard OS",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Neovanguard OS — a máquina é sua, inclusive a identidade",
    description:
      "Linux sobre Arch onde a sua chave é a conta do sistema. Nó Bitcoin, Lightning e relay Nostr locais. Livre e de código aberto.",
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Neovanguard",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    {
      // O que este site descreve é um sistema operacional, e o schema tem de
      // dizer isso: `SoftwareApplication` com `operatingSystem`, não
      // `ProfessionalService` com faixa de preço e telefone de atendimento.
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#os`,
      name: "Neovanguard OS",
      url: SITE_URL,
      applicationCategory: "OperatingSystem",
      operatingSystem: "Linux",
      softwareVersion: VERSAO,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Distribuição Linux baseada em Arch em que a chave Nostr do usuário é a conta do sistema. Nó Bitcoin, Lightning e relay Nostr locais, endurecimento de fábrica e 55 comandos neo-* para operá-los.",
      license: "https://www.gnu.org/licenses/gpl-3.0.html",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
      author: { "@id": `${SITE_URL}/#org` },
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
        <div className="site-frame">
          <Header />
          <div className="sh">
            <main className="sh-main" id="main" tabIndex={-1}>
              {children}
            </main>
            <TableOfContents />
          </div>
          <Foot />
        </div>
        <Motion />
        <Analytics />
      </body>
    </html>
  );
}
