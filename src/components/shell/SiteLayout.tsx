import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Motion from "@/components/shell/Motion";
import Header from "@/components/shell/Header";
import TableOfContents from "@/components/shell/TableOfContents";
import Foot from "@/components/shell/Foot";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Analytics } from "@vercel/analytics/next";
import {
  ISOS_PUBLICADAS,
  JOAO_LINKEDIN,
  MIZAEL_LINKEDIN,
  SITE_URL,
  VERSAO,
} from "@/lib/constants";
import { getMessages, HTML_LANG, OG_LOCALE, type Locale } from "@/lib/i18n";
import { ROUTES, absoluteUrl, localePath, routeTitle } from "@/lib/routes";
import "@/app/shell.css";

const jakarta = localFont({
  src: "../../assets/fonts/PlusJakartaSans.woff2",
  weight: "200 800",
  variable: "--ff-jakarta",
  display: "swap",
});

const grotesk = localFont({
  src: "../../assets/fonts/SpaceGrotesk.woff2",
  weight: "300 700",
  variable: "--ff-grotesk",
  display: "swap",
});

const plexMono = localFont({
  src: "../../assets/fonts/IBMPlexMono.woff2",
  weight: "400",
  variable: "--ff-mono-var",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c1422",
};

/** Metadados padrão do idioma. Cada página sobrescreve título, descrição,
 * canonical e hreflang com `pageMetadata`. */
export function siteMetadata(locale: Locale): Metadata {
  const t = getMessages(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.siteTitle,
      template: "%s · Neovanguard OS",
    },
    description: t.siteDescription,
    applicationName: "Neovanguard OS",
    keywords: t.keywords,
    authors: [{ name: "Neovanguard" }],
    creator: "Neovanguard",
    publisher: "Neovanguard",
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
      title: t.siteTitle,
      description: t.siteDescription,
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: "Neovanguard OS",
      url: absoluteUrl(localePath(locale, "/")),
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.siteDescription,
    },
  };
}

function jsonLd(locale: Locale) {
  const t = getMessages(locale);
  const home = absoluteUrl(localePath(locale, "/"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${home}${locale === "pt" ? "/" : ""}#website`,
        url: home,
        name: "Neovanguard OS",
        description: t.meta.siteDescription,
        inLanguage: HTML_LANG[locale],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Neovanguard",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        founder: [
          {
            "@type": "Person",
            name: "Mizael Ribeiro",
            url: MIZAEL_LINKEDIN,
            sameAs: [MIZAEL_LINKEDIN, "https://github.com/NEOpisa"],
            jobTitle: t.jsonLd.ceo,
          },
          {
            "@type": "Person",
            name: "João Antônio Rodrigues",
            url: JOAO_LINKEDIN,
            sameAs: [JOAO_LINKEDIN, "https://github.com/joaoinky"],
            jobTitle: t.jsonLd.coo,
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
        url: home,
        applicationCategory: "OperatingSystem",
        operatingSystem: "Linux",
        softwareVersion: VERSAO,
        releaseNotes: absoluteUrl(localePath(locale, "/novidades")),
        image: `${home}/opengraph-image`,
        description: t.meta.siteDescription,
        inLanguage: HTML_LANG[locale],
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
}

/** Páginas com sumário lateral "Nesta página", como escritas em português. */
const TOC_PAGES = ["/documentacao", "/instalacao", "/recursos", "/baixar"];

export default function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = getMessages(locale).shell;
  const other: Locale = locale === "pt" ? "en" : "pt";
  const link = (path: string) => localePath(locale, path);
  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${jakarta.variable} ${grotesk.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          {t.skip}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
        <BreadcrumbJsonLd
          names={Object.fromEntries(ROUTES.map(route => [route[locale], routeTitle(route, locale)]))}
          home={link("/")}
          lang={HTML_LANG[locale]}
        />
        <div className="site-frame">
          <Header
            locale={locale}
            t={t}
            links={{ home: link("/"), features: link("/recursos"), documentation: link("/documentacao"), about: link("/sobre"), download: link("/baixar") }}
            alternates={Object.fromEntries(ROUTES.map(route => [route[locale], route[other]]))}
            published={ISOS_PUBLICADAS}
            version={VERSAO}
          />
          <div className="sh">
            <main className="sh-main" id="main" tabIndex={-1}>
              {children}
            </main>
            <TableOfContents paths={TOC_PAGES.map(link)} label={t.toc} sectionsLabel={t.tocSections} />
          </div>
          <Foot locale={locale} />
        </div>
        <Motion />
        <Analytics />
      </body>
    </html>
  );
}
