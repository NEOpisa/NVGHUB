import { renderOg } from "@/lib/og";

/**
 * OG da divisão Platina em /og/platina.
 *
 * O Platina não tem página desde "platina sem vitrine" — a porta leva direto
 * ao contato —, então a imagem não pode nascer de um opengraph-image de
 * rota. Fica aqui como endereço fixo: serve para anúncio, para post e para
 * quem compartilhar a porta.
 */
export const runtime = "nodejs";

export function GET() {
  return renderOg("platina");
}
