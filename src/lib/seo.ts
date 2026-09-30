import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { getMessages, localeOf, OG_LOCALE } from "@/lib/i18n";
import { absoluteUrl, findRoute, languageAlternates, routeDescription, routeTitle } from "@/lib/routes";

/**
 * Gera Metadata padronizada para uma rota cadastrada em `ROUTES`: title,
 * description, canonical, hreflang, OpenGraph e Twitter card. O idioma vem do
 * próprio caminho; título e descrição vêm do dicionário daquele idioma.
 *
 * A home usa o título completo com a marca; as páginas internas passam pelo
 * template "Página · Neovanguard OS" do layout.
 */
export function pageMetadata(path: string): Metadata {
  const route = findRoute(path);
  if (!route) throw new Error("Rota sem cadastro: " + path);
  const locale = localeOf(path);
  const t = getMessages(locale).meta;
  const home = route.page === "home";
  const title = home ? t.siteTitle : routeTitle(route, locale);
  const social = home ? title : `${title} · Neovanguard OS`;
  const description = routeDescription(route, locale);
  const image = `${SITE_URL}${locale === "en" ? "/en" : ""}/opengraph-image`;
  return {
    metadataBase: new URL(SITE_URL),
    title: home ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      title: social,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName: "Neovanguard OS",
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "en" ? "pt" : "en"],
      images: [{ url: image, width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: {
      images: [image],
      card: "summary_large_image",
      title: social,
      description,
    },
  };
}
