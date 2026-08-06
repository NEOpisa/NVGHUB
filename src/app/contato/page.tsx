import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import ContatoForm from "@/components/blocos/ContatoForm";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Contato — Neovanguard",
  description:
    "Fale com a Neovanguard pelo WhatsApp ou pelo formulário. Resposta rápida, sem burocracia.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <section className="panel" aria-labelledby="ct-h">
        <span className="eyebrow">Contato</span>
        <h1 id="ct-h" className="h-xl">
          Vamos <em className="h-accent">começar?</em>
        </h1>
        <p className="lead">
          Sem compromisso, sem enrolação. Conte o que precisa e respondemos
          rápido — em até 3h úteis.
        </p>
      </section>

      <section className="panel duo" aria-label="Formulário e canais">
        <div>
          <h2 className="h-md">Mandar mensagem</h2>
          <p className="card-d" style={{ margin: "10px 0 26px" }}>
            Três campos e pronto. Chega direto no nosso e-mail.
          </p>
          <ContatoForm />
        </div>
        <aside className="duo-side">
          <h2 className="h-md">Prefere pelo WhatsApp?</h2>
          <p className="card-d" style={{ margin: "10px 0 22px" }}>
            Resposta mais rápida e conversa mais direta. Manda mensagem agora e
            falamos ainda hoje.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="pill">
            <WhatsAppIcon />
            Abrir o WhatsApp
          </a>
          <dl className="mini-facts">
            <div>
              <dt>Resposta</dt>
              <dd>até 3h úteis</dd>
            </div>
            <div>
              <dt>Atendimento</dt>
              <dd>100% remoto, Brasil inteiro</dd>
            </div>
            <div>
              <dt>Compromisso</dt>
              <dd>nenhum — a consulta é livre</dd>
            </div>
          </dl>
        </aside>
      </section>

      <Foot />
    </>
  );
}
