import Link from "next/link";
import Foot from "@/components/shell/Foot";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { WA } from "@/lib/constants";

export const metadata = {
  ...pageMetadata({
    title: "Recebemos sua mensagem — Neovanguard",
    description:
      "Tudo certo — sua mensagem chegou. Veja o que acontece agora e adiante a conversa pelo WhatsApp.",
    path: "/obrigado",
  }),
  // pós-conversão: não indexar
  robots: { index: false, follow: true },
};

const PASSOS = [
  {
    n: "01",
    t: "Sua mensagem chegou",
    d: "Já está na nossa fila — nada de robô, quem lê é gente do time.",
  },
  {
    n: "02",
    t: "Entendemos seu momento",
    d: "Damos uma olhada no seu contexto pra chegar já com direção.",
  },
  {
    n: "03",
    t: "Falamos com você",
    d: "Retornamos em até 3 horas úteis, no canal que você preferir.",
  },
];

export default function ObrigadoPage() {
  return (
    <>
      <section className="panel" aria-labelledby="obg-h">
        <span className="eyebrow">Tudo certo</span>
        <h1 id="obg-h" className="h-xl">
          Recebemos <em className="h-accent">sua mensagem.</em>
        </h1>
        <p className="lead">
          Enquanto a gente lê com calma, você pode adiantar a conversa pelo
          WhatsApp — ou dar uma olhada no que já construímos.
        </p>
        <div className="pill-row">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="pill">
            <WhatsAppIcon />
            Adiantar pelo WhatsApp
          </a>
          <Link href="/exemplos" className="pill pill--ghost">
            Ver exemplos
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="panel" aria-label="O que acontece agora">
        <header className="sec-head">
          <span className="eyebrow">O que acontece agora</span>
          <h2 className="h-lg">Três passos, <em className="h-accent">sem mistério.</em></h2>
        </header>
        <div className="cards">
          {PASSOS.map((p) => (
            <article key={p.n} className="card">
              <span className="card-n">{p.n}</span>
              <h3 className="card-t">{p.t}</h3>
              <p className="card-d">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      <Foot />
    </>
  );
}
