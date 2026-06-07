"use client";

import { useState, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";

const OPCOES = [
  { id: "site",       label: "Site Profissional",        desc: "Landing page responsiva + 3 meses de suporte",     price: 760  },
  { id: "sistema",    label: "+ Sistema para Negócio",   desc: "Cardápio, agendamento ou catálogo com painel de controle",     price: 930 },
  { id: "seo",        label: "+ SEO Avançado",           desc: "Google Meu Negócio configurado + estratégia de palavras-chave", price: 390  },
  { id: "manutencao", label: "+ Manutenção Mensal",      desc: "Suporte de 5 meses após o período incluso nos planos",           price: 530  },
];

export default function OrcamentoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const itens = OPCOES.filter((o) => selecionados.includes(o.id));
  const total  = itens.reduce((s, o) => s + o.price, 0);

  const msg =
    itens.length > 0
      ? `Olá! Quero um orçamento para: ${itens.map((o) => o.label).join(", ")}. Total estimado: R$ ${total.toLocaleString("pt-BR")}.`
      : "Olá! Quero um orçamento da NeoVanguard.";

  return (
    <section id="orcamento" aria-label="Monte seu orçamento">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Orçamento</span>
          <h2 className="section-heading">
            Monte o seu <span className="text-accent-nvg">pacote</span>
          </h2>
          <p className="section-sub">
            Selecione o que você precisa e veja o preço atualizar na hora. Sem enrolação.
          </p>
        </div>

        <div className="orcamento-grid">
          {OPCOES.map((opcao) => {
            const ativo = selecionados.includes(opcao.id);
            return (
              <button
                key={opcao.id}
                className={`orcamento-item${ativo ? " ativo" : ""}`}
                onClick={() => toggle(opcao.id)}
                aria-pressed={ativo}
              >
                <div className="orcamento-check" aria-hidden="true">
                  {ativo && <CheckIcon />}
                </div>
                <div className="orcamento-info">
                  <div className="orcamento-label">{opcao.label}</div>
                  <div className="orcamento-desc">{opcao.desc}</div>
                </div>
                <div className="orcamento-price">
                  + R$ {opcao.price.toLocaleString("pt-BR")}
                </div>
              </button>
            );
          })}
        </div>

        <div className="orcamento-footer">
          <div className="orcamento-total">
            <span className="orcamento-total-label">Total estimado</span>
            <span className="orcamento-total-value" key={total}>
              {selecionados.length === 0 ? "—" : `R$ ${total.toLocaleString("pt-BR")}`}
            </span>
          </div>
          <a
            href={`${WA}?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WaIcon />
            {selecionados.length === 0 ? "Falar com a equipe" : "Solicitar este orçamento"}
          </a>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
