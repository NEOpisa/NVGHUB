import { renderOg, ogAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/** OG das páginas em inglês: o mesmo cartão, com os textos traduzidos. */
export const runtime = "nodejs";
export const alt = ogAlt("en");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg("en");
}
