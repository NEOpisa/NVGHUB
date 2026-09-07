import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CAPTURAS = [
  { file: "plasma-desktop.webp", title: "Plasma no Neovanguard", detail: "MBN Live · KDE Plasma", label: "Desktop pronto" },
  { file: "instalador.webp", title: "O instalador", detail: "MBN Install · sete etapas", label: "Uma etapa da instalação" },
  { file: "neo-status.webp", title: "O sistema responde", detail: "Terminal · neo-status", label: "Comando em execução" },
  { file: "identidade-nostr.webp", title: "A identidade é sua", detail: "Nostr · identidade local", label: "Carteira / identidade Nostr" },
] as const;

/** Capturas reais entram no próximo build. A ausência nunca vira imagem quebrada
 * nem uma simulação que alguém possa confundir com o sistema. */
export default function Showcase() {
  return <section className="panel showcase" aria-labelledby="vitrine">
    <div className="sec-head">
      <span className="eyebrow">Por dentro da máquina</span>
      <h2 className="h-lg" id="vitrine">Do desktop à <span className="h-accent">sua identidade.</span></h2>
      <p className="lead">O ambiente, a instalação e as ferramentas que rodam aqui.</p>
    </div>
    <div className="showcase-grid" role="region" aria-label="Capturas do sistema" tabIndex={0}>
      {CAPTURAS.map((capture, index) => {
        const ready = existsSync(join(process.cwd(), "public/capturas", capture.file));
        return <figure className="capture" key={capture.file}>
          <div className="capture-media">
            {ready ? <Image src={`/capturas/${capture.file}`} alt={capture.label} fill sizes="(max-width: 680px) 85vw, (max-width: 900px) 43vw, 40vw" /> :
              <div className="capture-placeholder"><span className="capture-index" aria-hidden="true">0{index + 1}</span><span>{capture.label}</span><small>Captura em preparação</small></div>}
          </div>
          <figcaption><h3>{capture.title}</h3><span>{capture.detail}</span></figcaption>
        </figure>;
      })}
    </div>
  </section>;
}
