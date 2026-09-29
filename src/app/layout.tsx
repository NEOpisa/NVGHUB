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
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Analytics } from "@vercel/analytics/next";
import {
  JOAO_LINKEDIN,
  MIZAEL_LINKEDIN,
  REPO_URL,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  VERSAO,
} from "@/lib/constants";
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
    default: SITE_TITLE,
    template: "%s · Neovanguard OS",
  },
  description:
    SITE_DESCRIPTION,
  applicationName: "Neovanguard OS",
  keywords: [
    "Neovanguard OS",
    "distribuição Linux",
    "Arch Linux",
    "Linux Bitcoin",
    "Linux Nostr",
    "sistema operacional de código aberto",
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
    title: SITE_TITLE,
    description:
      SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Neovanguard OS",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      SITE_DESCRIPTION,
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
      sameAs: [REPO_URL, MIZAEL_LINKEDIN, JOAO_LINKEDIN],
      founder: [
        {
          "@type": "Person",
          name: "Mizael Ribeiro",
          url: MIZAEL_LINKEDIN,
          jobTitle: "Cofundador e CEO",
        },
        {
          "@type": "Person",
          name: "João Antônio Rodrigues",
          url: JOAO_LINKEDIN,
          jobTitle: "Cofundador e COO",
        },
      ],
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
        SITE_DESCRIPTION,
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
        <BreadcrumbJsonLd />
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
