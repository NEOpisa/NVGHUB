import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

const OG_IMAGE = "/og.png";

type PageMetaInput = {
  title: string;
  description: string;
  /** Caminho da rota começando com "/" (ex.: "/pacotes"). Use "/" para a home. */
  path: string;
};

/**
 * Gera Metadata padronizada para uma rota: title, description, canonical,
 * OpenGraph e Twitter card. Centraliza OG + canonical em todas as páginas.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Neovanguard",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
