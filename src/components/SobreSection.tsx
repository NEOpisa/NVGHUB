"use client";

import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const PILARES = [
  {
    num: "01",
    title: "Segurança extrema",
    desc: "Arquitetura pensada sob Zero Trust desde o primeiro dia: infraestrutura blindada, criptografia de ponta e estabilidade total.",
  },
  {
    num: "02",
    title: "Velocidade real",
    desc: "Time-to-market acelerado, sem burocracia. Seu produto validado e no ar no menor tempo possível — em dias, não meses.",
  },
  {
    num: "03",
    title: "Eficácia cirúrgica",
    desc: "Foco no que gera resultado de verdade. Código limpo alinhado a uma estratégia de aquisição de clientes — tecnologia que vira venda.",
  },
];

export default function SobreSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(gridRef, 80);

  return (
    <section id="sobre" className="sobre" aria-label="Quem somos">
      <div className="inner">
        <div className="sobre-head" ref={headerRef} data-parallax="0.12">
          <span className="section-eyebrow">Quem somos</span>
          {/* #030 · página própria: heading principal é H1 (estilo é por classe) */}
          <h1 className="section-heading" data-split>
            Ferramentas pensadas como{" "}
            <span className="text-accent-nvg">um só ecossistema</span>
          </h1>
          <p className="section-sub">
            Somos a Neovanguard — uma operação 100% remota que atende o Brasil
            inteiro. Resolvemos problemas de negócio criando a ferramenta
            certa: sistemas, automações e IA não são serviços soltos —
            funcionam como um organismo único, conduzido por uma força-tarefa
            síncrona do briefing à entrega.
          </p>
        </div>

        <div className="sobre-grid" ref={gridRef}>
          {PILARES.map((p) => (
            <article key={p.title} className="sobre-card">
              <span className="sobre-card-num" aria-hidden="true">{p.num}</span>
              <h3 className="sobre-card-title">{p.title}</h3>
              <p className="sobre-card-desc">{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="sobre-method" data-parallax="0.16">
          <div className="sobre-method-copy">
            <h3 className="sobre-method-title">
              Tudo isso vira execução no <span className="text-accent-nvg">Plano Noxz</span>
            </h3>
            <p className="sobre-method-desc">
              Nossa metodologia de força-tarefa síncrona — segurança extrema,
              velocidade e eficácia cirúrgica do briefing à entrega.
            </p>
          </div>
          <Link href="/metodologia" className="btn-primary">
            <SparkIcon />
            Conhecer o Plano Noxz
          </Link>
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}
