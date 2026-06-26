"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import SectionScene from "@/components/scene/SectionScene";
import IconCanvas from "@/components/services/IconCanvas";
import type { EcoKind } from "@/components/services/ecoIcons3d";

type Layer = {
  num: string;
  tier: string;
  title: string;
  desc: string;
  capilares: string[];
  icon: EcoKind;
};

// Não é uma lista de "serviços" — é a arquitetura do ecossistema.
// Cada camada alimenta a de cima: infra → conexão → inteligência.
const LAYERS: Layer[] = [
  {
    num: "03",
    tier: "Inteligência",
    title: "Dados, IA & Automação",
    desc: "A camada que aprende e age sozinha. Tira o trabalho repetitivo da sua mão e transforma cada interação em decisão.",
    capilares: ["IA aplicada", "Analytics", "Automação de processos"],
    icon: "inteligencia",
  },
  {
    num: "02",
    tier: "Conexão",
    title: "Integrações & Atendimento",
    desc: "O sistema nervoso. Conecta site, CRM e WhatsApp para que nenhum lead se perca entre uma ferramenta e outra.",
    capilares: ["CRM", "WhatsApp", "Integrações (APIs)"],
    icon: "conexao",
  },
  {
    num: "01",
    tier: "Base",
    title: "Arquitetura de Conversão",
    desc: "A fundação. Infraestrutura web rápida, segura e encontrável — feita para transformar visita em cliente, não só para existir.",
    capilares: ["Velocidade", "SEO técnico", "Cloud"],
    icon: "base",
  },
];

export default function EcossistemaSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  return (
    <section id="ecossistema" className="eco" aria-label="O ecossistema Neovanguard">
      <SectionScene variant="rings" className="section-scene-eco" />
      <div className="inner">
        <div ref={headerRef} className="eco-header" data-parallax="0.1">
          <span className="section-eyebrow">Ecossistema</span>
          <h2 className="section-heading" data-split>
            Não vendemos site. Construímos{" "}
            <span className="text-accent-nvg">capilares de crescimento.</span>
          </h2>
          <p className="section-sub">
            Cada peça conversa com a próxima. O site é só o ponto de entrada —
            por baixo dele corre uma estrutura que captura, conecta e converte
            sem intervenção manual.
          </p>
        </div>

        <div className="eco-stack">
          {LAYERS.map((layer, i) => (
            <EcoLayer key={layer.tier} layer={layer} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EcoLayer({ layer, delay }: { layer: Layer; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, delay);

  return (
    <div className="eco-layer" ref={ref}>
      <span className="eco-layer-num" aria-hidden="true">{layer.num}</span>
      <div className="eco-layer-head">
        <span className="eco-layer-tier">{layer.tier}</span>
        <h3 className="eco-layer-title">{layer.title}</h3>
      </div>
      <p className="eco-layer-desc">{layer.desc}</p>
      <ul className="eco-capilares">
        {layer.capilares.map((c) => (
          <li key={c} className="eco-capilar">
            <span className="eco-capilar-dot" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
      <IconCanvas variant="eco" kind={layer.icon} className="eco-layer-icon" />
    </div>
  );
}
