import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { languageAlternates } from "@/lib/routes";

type PageMetaInput = {
  title: string;
  description: string;
  /** Caminho da rota começando com "/" (ex.: "/baixar"). Use "/" para a home. */
  path: string;
};

/**
 * Gera Metadata padronizada para uma rota: title, description, canonical,
 * OpenGraph e Twitter card. Centraliza OG + canonical em todas as páginas.
 *
 * As páginas dos dois idiomas compartilham a imagem gerada na raiz.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Neovanguard",
      locale: path.startsWith("/en") ? "en_US" : "pt_BR",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Neovanguard OS" }],
    },
    twitter: {
      images: [`${SITE_URL}/opengraph-image`],
      card: "summary_large_image",
      title,
      description,
    },
  };
}
