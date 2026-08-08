import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

type PageMetaInput = {
  title: string;
  description: string;
  /** Caminho da rota começando com "/" (ex.: "/solucao"). Use "/" para a home. */
  path: string;
};

/**
 * Gera Metadata padronizada para uma rota: title, description, canonical,
 * OpenGraph e Twitter card. Centraliza OG + canonical em todas as páginas.
 *
 * A imagem NÃO é declarada aqui de propósito: quem responde por ela é o
 * arquivo `opengraph-image` do segmento — o da raiz vale para o site
 * inteiro, e /ouro sobrescreve com a cor da divisão. Fixar uma URL aqui
 * anularia essa herança e traria de volta o PNG velho para todas as rotas.
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
