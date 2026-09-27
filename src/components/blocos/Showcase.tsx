import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CAPTURAS = [
  { file: "plasma-desktop.webp", title: "Ambiente KDE Plasma", detail: "MBN Live · KDE Plasma", label: "Área de trabalho KDE Plasma" },
  { file: "instalador.webp", title: "Instalador MBN Install", detail: "MBN Install · sete etapas", label: "Etapa do instalador MBN Install" },
  { file: "neo-status.webp", title: "Diagnóstico com neo-status", detail: "Terminal · neo-status", label: "Saída do comando neo-status" },
  { file: "identidade-nostr.webp", title: "Identidade Nostr", detail: "Nostr · identidade local", label: "Configuração da identidade Nostr" },
] as const;

/** Capturas reais entram no próximo build. A ausência nunca vira imagem quebrada
 * nem uma simulação que alguém possa confundir com o sistema. */
export default function Showcase() {
  return <section className="panel showcase" aria-labelledby="vitrine">
    <div className="sec-head">
      <span className="eyebrow">Interface</span>
      <h2 className="h-lg" id="vitrine">Capturas do <span className="h-accent">sistema</span></h2>
      <p className="lead">Área de trabalho, instalador, diagnóstico e configuração de identidade.</p>
    </div>
    <div className="showcase-grid" role="region" aria-label="Capturas do sistema" tabIndex={0}>
      {CAPTURAS.map((capture, index) => {
        const ready = existsSync(join(process.cwd(), "public/capturas", capture.file));
        return <figure className="capture" key={capture.file}>
          <div className="capture-media">
            {ready ? <Image src={`/capturas/${capture.file}`} alt={capture.label} fill sizes="(max-width: 680px) 85vw, (max-width: 900px) 43vw, 40vw" /> :
              <div className="capture-placeholder"><span className="capture-index" aria-hidden="true">0{index + 1}</span><span>{capture.label}</span><small>Captura ainda não disponível</small></div>}
          </div>
          <figcaption><h3>{capture.title}</h3><span>{capture.detail}</span></figcaption>
        </figure>;
      })}
    </div>
  </section>;
}
