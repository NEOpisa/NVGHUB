import { renderOg, ogAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/** OG da divisão Ouro — mesmo desenho do site, cor da divisão. */
export const runtime = "nodejs";
export const alt = ogAlt("ouro");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OuroOgImage() {
  return renderOg("ouro");
}
