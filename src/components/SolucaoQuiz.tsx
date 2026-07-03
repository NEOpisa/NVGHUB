"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type ReactNode } from "react";
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
  CheckIcon,
} from "@/components/icons";
import LeadModal from "@/components/LeadModal";
import TiltCard from "@/components/TiltCard";
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

/** rota sugerida a partir do OBJETIVO (refinada pelo ramo) — o diagnóstico
 *  devolve algo concreto, não só um "fale com a gente" */
function recomendar(respostas: Record<string, string>): {
  pacote: string;
  motivo: string;
  extra?: string;
} {
  const objetivo = respostas.objetivo ?? "";
  const ramo = respostas.ramo ?? "";
  const saasRamo = ramo === "Saúde & Beleza" || ramo === "Alimentação";
  if (objetivo.startsWith("Vender"))
    return {
      pacote: "E-commerce",
      motivo: "Loja virtual completa com carrinho, Pix e painel do lojista.",
    };
  if (objetivo.startsWith("Automatizar"))
    return {
      pacote: "Sistema",
      motivo: "Agendamento, cardápio ou catálogo com painel de controle.",
      extra: saasRamo
        ? "Seu ramo também se encaixa no nosso SaaS pronto — no ar em 5 dias."
        : undefined,
    };
  if (objetivo.startsWith("Ser encontrado"))
    return {
      pacote: "Presença",
      motivo: "SEO local + Google Meu Negócio pra aparecer nas buscas.",
    };
  return {
    pacote: "Presença",
    motivo: "Landing completa e encontrável — presença de verdade, rápido.",
  };
}

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

  // Deriva itens + recomendação + link do WhatsApp só quando as respostas
  // mudam, mantendo a referência estável de `itens` p/ o modal.
  const { itens, waHref, rec, respondidas } = useMemo(() => {
    const respondidas = PERGUNTAS.filter((p) => respostas[p.id]);
    const rec = recomendar(respostas);
    const mensagemWA = [
      "Olá! Acabei de fazer o diagnóstico no site da Neovanguard.",
      "",
      ...respondidas.map((p) => `• ${p.resumo}: ${respostas[p.id]}`),
      "",
      `O site sugeriu o pacote ${rec.pacote}. Quero montar a minha solução sob medida.`,
    ].join("\n");
    return {
      itens: respondidas.map((p) => ({ label: `${p.resumo}: ${respostas[p.id]}`, price: null })),
      waHref: `${WA}?text=${encodeURIComponent(mensagemWA)}`,
      rec,
      respondidas,
    };
  }, [respostas]);

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
            {/* trilho SEGMENTADO: um traço por pergunta, o atual pulsa */}
            <div className="quiz-progress-track">
              {PERGUNTAS.map((p, i) => (
                <span
                  key={p.id}
                  className={`quiz-progress-seg${
                    i < passo || finalizado
                      ? " is-done"
                      : i === passo
                        ? " is-now"
                        : ""
                  }`}
                />
              ))}
            </div>
            <span className="quiz-progress-pct">{progresso}%</span>
          </div>

          {!finalizado && pergunta ? (
            <div className="quiz-step" key={pergunta.id}>
              <h4 className="quiz-question">{pergunta.q}</h4>
              <div className="quiz-options">
                {pergunta.opcoes.map((op, oi) => {
                  const ativo = respostas[pergunta.id] === op.label;
                  return (
                    <button
                      key={op.label}
                      type="button"
                      className={`quiz-option${ativo ? " ativo" : ""}`}
                      style={{ animationDelay: `${oi * 55}ms` }}
                      onClick={() => escolher(pergunta.id, op.label)}
                    >
                      <span className="quiz-option-key" aria-hidden="true">
                        {String.fromCharCode(65 + oi)}
                      </span>
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
            <TiltCard maxTilt={6} className="quiz-final-tilt">
            <div className="quiz-final">
              <div className="quiz-final-badge" aria-hidden="true">
                <CheckIcon size={21} strokeWidth={2.4} />
              </div>
              <h4 className="quiz-final-title">Diagnóstico concluído.</h4>

              {/* readout do terminal: o que você respondeu */}
              <div className="quiz-readout" aria-hidden="true">
                {respondidas.map((p) => (
                  <span key={p.id} className="quiz-readout-line">
                    <i>{"// "}</i>
                    {p.resumo.toLowerCase()} <b>▸ {respostas[p.id]}</b>
                  </span>
                ))}
              </div>

              {/* rota sugerida pelo diagnóstico */}
              <div className="quiz-rec">
                <span className="quiz-rec-label">Rota sugerida</span>
                <span className="quiz-rec-name">{rec.pacote}</span>
                <p className="quiz-rec-why">{rec.motivo}</p>
                {rec.extra && <p className="quiz-rec-extra">{rec.extra}</p>}
                <Link href="/pacotes" className="quiz-rec-link">
                  Ver o pacote {rec.pacote}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </Link>
              </div>

              <p className="quiz-final-sub">
                A gente fecha os detalhes com você no atendimento — no ritmo e no
                orçamento que cabem no seu negócio. Bora conversar?
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
            </TiltCard>
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
        origem="atendimento"
        tipo="Diagnóstico sob medida"
        itens={itens}
        valor={null}
      />
    </div>
  );
}
