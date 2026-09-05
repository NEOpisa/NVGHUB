import { renderOg, ogAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/** OG do site — a variante padrão herdada por toda rota sem imagem própria. */
export const runtime = "nodejs";
export const alt = ogAlt();
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg();
}
