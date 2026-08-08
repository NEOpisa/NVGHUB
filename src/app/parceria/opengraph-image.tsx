import { renderOg, ogAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

/** OG da parceria — mesmo desenho do site, com a cor própria da página. */
export const runtime = "nodejs";
export const alt = ogAlt("parceria");
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function ParceriaOgImage() {
  return renderOg("parceria");
}
