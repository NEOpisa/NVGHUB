import Link from "next/link";
import BlueprintStage from "@/components/BlueprintStage";
import { WhatsAppIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { WA } from "@/lib/constants";

export const metadata = {
  ...pageMetadata({
    title: "Recebemos sua mensagem — Neovanguard",
    description:
      "Tudo certo — sua mensagem chegou. Veja o que acontece agora e adiante a conversa pelo WhatsApp.",
    path: "/obrigado",
  }),
  // página de pós-conversão: não indexar
  robots: { index: false, follow: true },
};

const PASSOS = [
  {
    n: "01",
    tag: "RECEBIDO",
    title: "Sua mensagem chegou",
    desc: "Já está na nossa fila — nada de robô, quem lê é gente do time.",
  },
  {
    n: "02",
    tag: "ANÁLISE",
    title: "Entendemos seu momento",
    desc: "Damos uma olhada rápida no seu contexto pra chegar já com direção.",
  },
  {
    n: "03",
    tag: "RESPOSTA",
    title: "Falamos com você",
    desc: "Retornamos em até 3 horas úteis, direto no canal que você preferir.",
  },
];

export default function ObrigadoPage() {
  return (
    <main id="main">
      <BlueprintStage code="obrigado" index="07" />
      <section className="obg-page" aria-label="Mensagem recebida">
        <div className="inner">
          <span className="section-eyebrow">Tudo certo</span>
          <h1 className="section-heading">
            Recebemos sua <span className="text-accent-nvg">mensagem.</span>
          </h1>
          <p className="section-sub">
            Obrigado pelo contato. Enquanto a gente prepara seu retorno, veja o
            que acontece agora — e, se preferir agilizar, é só chamar no
            WhatsApp.
          </p>

          <ol className="obg-steps" aria-label="Próximos passos">
            {PASSOS.map((p) => (
              <li key={p.n} className="obg-step card-1">
                <span className="obg-step-tag">
                  <b>{p.n}</b> {p.tag}
                </span>
                <h2 className="obg-step-title">{p.title}</h2>
                <p className="obg-step-desc">{p.desc}</p>
              </li>
            ))}
          </ol>

          <div className="obg-cta">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-whatsapp"
            >
              <WhatsAppIcon />
              Adiantar pelo WhatsApp
            </a>
            <Link href="/exemplos" className="btn-ghost">
              Ver exemplos enquanto isso
            </Link>
            <Link href="/" className="obg-back">
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
