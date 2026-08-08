import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import ConsultaQuiz from "@/components/blocos/ConsultaQuiz";
import { ArrowUpRight } from "@/components/icons";

export const metadata = pageMetadata({
  title: "Consulta rápida — monte a sua solução",
  description:
    "Três perguntas rápidas e já entendemos o seu momento: a Neovanguard indica a ferramenta certa para o seu negócio, sem formulário gigante e sem compromisso.",
  path: "/solucao",
});

export default function SolucaoPage() {
  return (
    <>
      <section className="panel" aria-labelledby="sol-h">
        <span className="eyebrow">Consulta rápida</span>
        <h1 id="sol-h" className="h-xl">
          Vamos montar a <em className="h-accent">sua solução.</em>
        </h1>
        <p className="lead">
          Responda 3 perguntas rápidas e já entendemos o seu momento — sem
          formulário gigante, sem compromisso.
        </p>
      </section>

      <section className="panel" aria-label="Perguntas da consulta">
        <ConsultaQuiz />
      </section>

      <section className="closer" aria-label="Outros caminhos">
        <h2 className="h-xl">Prefere ver antes de decidir?</h2>
        <p className="lead">
          Os exemplos mostram o formato do que entregamos — problema,
          ferramenta e resultado, caso a caso.
        </p>
        <div className="pill-row">
          <Link href="/exemplos" className="pill">
            Ver exemplos
            <ArrowUpRight />
          </Link>
          <Link href="/parceria" className="pill pill--ghost">
            Ser parceiro
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
