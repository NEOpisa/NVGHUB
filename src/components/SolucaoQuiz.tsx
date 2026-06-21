"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import {
  GlobeIcon,
  MapPinIcon,
  CartIcon,
  GearIcon,
  StoreIcon,
  ShieldIcon,
  PaletteIcon,
  EditIcon,
  RocketIcon,
  InstagramIcon,
  ZapIcon,
  WhatsAppIcon,
} from "@/components/icons";
import LeadModal from "@/components/LeadModal";
import { WA } from "@/lib/constants";

type Opcao = { label: string; icon: ReactNode };
type Pergunta = { id: string; resumo: string; q: string; opcoes: Opcao[] };

const PERGUNTAS: Pergunta[] = [
  {
    id: "objetivo",
    resumo: "Objetivo",
    q: "O que você mais quer agora?",
    opcoes: [
      { label: "Existir online de vez", icon: <GlobeIcon size={16} /> },
      { label: "Ser encontrado no Google", icon: <MapPinIcon size={16} /> },
      { label: "Vender online", icon: <CartIcon size={16} /> },
      { label: "Automatizar e organizar o negócio", icon: <GearIcon size={16} /> },
    ],
  },
  {
    id: "ramo",
    resumo: "Ramo",
    q: "Qual é o seu ramo?",
    opcoes: [
      { label: "Comércio / Loja", icon: <StoreIcon size={16} /> },
      { label: "Serviços", icon: <ShieldIcon size={16} /> },
      { label: "Alimentação", icon: <CartIcon size={16} /> },
      { label: "Saúde & Beleza", icon: <PaletteIcon size={16} /> },
      { label: "Outro", icon: <EditIcon size={16} /> },
    ],
  },
  {
    id: "situacao",
    resumo: "Situação",
    q: "Em que pé você está hoje?",
    opcoes: [
      { label: "Não tenho nada online ainda", icon: <RocketIcon size={16} /> },
      { label: "Tenho redes, mas não tenho site", icon: <InstagramIcon size={16} /> },
      { label: "Já tenho site e quero melhorar", icon: <ZapIcon size={16} /> },
    ],
  },
];

const TOTAL = PERGUNTAS.length;

export default function SolucaoQuiz() {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [modalAberto, setModalAberto] = useState(false);

  const finalizado = passo >= TOTAL;
  const pergunta = finalizado ? null : PERGUNTAS[passo];

  const escolher = (id: string, label: string) => {
    setRespostas((prev) => ({ ...prev, [id]: label }));
    setPasso((p) => p + 1);
  };

  const voltar = () => setPasso((p) => Math.max(0, p - 1));

  const recomecar = () => {
    setRespostas({});
    setPasso(0);
  };

  const itens = PERGUNTAS.filter((p) => respostas[p.id]).map((p) => ({
    label: `${p.resumo}: ${respostas[p.id]}`,
    price: null,
  }));

  const mensagemWA = [
    "Olá! Acabei de fazer o diagnóstico no site da Neovanguard.",
    "",
    ...PERGUNTAS.filter((p) => respostas[p.id]).map((p) => `• ${p.resumo}: ${respostas[p.id]}`),
    "",
    "Quero montar a minha solução sob medida.",
  ].join("\n");
  const waHref = `${WA}?text=${encodeURIComponent(mensagemWA)}`;

  const progresso = Math.round((passo / TOTAL) * 100);

  return (
    <div id="diagnostico" className="comprar-part" aria-label="Diagnóstico sob medida">
      <div className="inner">
        <div ref={headerRef} className="quiz-head">
          <span className="section-eyebrow">Sua solução</span>
          <h1 className="section-heading">
            Vamos montar a <span className="text-accent-nvg">sua solução</span>
          </h1>
          <p className="section-sub">
            Responda 3 perguntas rápidas e a gente já entende o seu momento — sem formulário gigante, sem compromisso.
          </p>
        </div>

        <div className="quiz">
          <div className="quiz-progress" aria-hidden="true">
            <span className="quiz-progress-step">
              {finalizado ? (
                "Concluído"
              ) : (
                <>
                  Passo <b>{String(passo + 1).padStart(2, "0")}</b> / {String(TOTAL).padStart(2, "0")}
                </>
              )}
            </span>
            <div className="quiz-progress-track">
              <div className="quiz-progress-fill" style={{ width: `${progresso}%` }} />
            </div>
          </div>

          {!finalizado && pergunta ? (
            <div className="quiz-step" key={pergunta.id}>
              <h4 className="quiz-question">{pergunta.q}</h4>
              <div className="quiz-options">
                {pergunta.opcoes.map((op) => {
                  const ativo = respostas[pergunta.id] === op.label;
                  return (
                    <button
                      key={op.label}
                      type="button"
                      className={`quiz-option${ativo ? " ativo" : ""}`}
                      onClick={() => escolher(pergunta.id, op.label)}
                    >
                      <span className="quiz-option-icon" aria-hidden="true">{op.icon}</span>
                      <span className="quiz-option-label">{op.label}</span>
                      <span className="quiz-option-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </span>
                    </button>
                  );
                })}
              </div>

              {passo > 0 && (
                <button type="button" className="quiz-back" onClick={voltar}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Voltar
                </button>
              )}
            </div>
          ) : (
            <div className="quiz-final">
              <div className="quiz-final-badge" aria-hidden="true">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <h4 className="quiz-final-title">Temos a solução certa pra você.</h4>
              <p className="quiz-final-sub">
                Com base no que você respondeu, a gente monta a sua solução sob medida — no ritmo e no orçamento que cabem no seu negócio. Bora conversar?
              </p>

              <div className="quiz-final-actions">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <WhatsAppIcon size={16} />
                  Falar agora no WhatsApp
                </a>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setModalAberto(true)}
                >
                  Prefiro que me chamem
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>

              <button type="button" className="quiz-restart" onClick={recomecar}>
                Refazer o diagnóstico
              </button>
            </div>
          )}
        </div>

        <div className="comprar-crosslink">
          <p>Quer ver os tipos de solução que a gente entrega?</p>
          <Link href="/pacotes" className="btn-ghost">
            Ver tipos de solução
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      <LeadModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        origem="orcamento"
        tipo="Diagnóstico sob medida"
        itens={itens}
        valor={null}
      />
    </div>
  );
}
