import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";

const CAPTURAS = ["plasma-desktop", "instalador", "neo-status", "identidade-nostr"] as const;

/** Capturas reais entram no próximo build. A ausência nunca vira imagem quebrada
 * nem uma simulação que alguém possa confundir com o sistema. */
export default function Showcase({ locale }: { locale: Locale }) {
  const t = getMessages(locale).home.showcase;
  const available = CAPTURAS.filter(capture => existsSync(join(process.cwd(), "public/capturas", capture + ".webp")));
  if (!available.length) return null;
  return <section className="panel showcase" aria-labelledby="vitrine">
    <div className="sec-head">
      <span className="eyebrow">{t.eyebrow}</span>
      <h2 className="h-lg" id="vitrine">{rich(t.title)}</h2>
      <p className="lead">{t.lead}</p>
    </div>
    <div className="showcase-grid" role="region" aria-label={t.regionLabel} tabIndex={0}>
      {available.map((capture) => {
        const text = t.captures[capture];
        return <figure className="capture" key={capture}>
          <div className="capture-media">
            <Image src={`/capturas/${capture}.webp`} alt={text.alt} fill sizes="(max-width: 680px) 85vw, (max-width: 900px) 43vw, 40vw" />
          </div>
          <figcaption><h3>{text.title}</h3><span>{text.detail}</span></figcaption>
        </figure>;
      })}
    </div>
  </section>;
}
