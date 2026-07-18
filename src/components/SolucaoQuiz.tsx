"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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

/* ── SCAN: nota de presença digital + furos, derivados das respostas ── */
function diagnostico(r: Record<string, string>) {
  const sit = r.situacao ?? "";
  let nota = 50;
  let pontos: string[] = [];
  if (sit.startsWith("Não tenho nada")) {
    nota = 24;
    pontos = [
      "Quem procura no Google não te encontra",
      "Sem canal próprio — todo cliente depende de indicação",
      "Concorrentes com site aparecem na sua frente",
    ];
  } else if (sit.startsWith("Tenho redes")) {
    nota = 43;
    pontos = [
      "Instagram atrai, mas não converte sozinho",
      "Invisível nas buscas locais do Google",
      "Sem agendamento/pedido direto — venda escapa no direct",
    ];
  } else if (sit.startsWith("Já tenho site")) {
    nota = 61;
    pontos = [
      "Site no ar ≠ site que converte",
      "Site lento derruba conversão e ranqueamento",
      "Atendimento manual segurando o crescimento",
    ];
  }
  if (r.objetivo === "Vender online") nota = Math.max(12, nota - 5);
  if (r.objetivo === "Automatizar e organizar o negócio") nota = Math.max(12, nota - 3);
  return { nota, pontos };
}

/** contador animado da nota (ease-out cúbico) */
function ScoreCount({ nota }: { nota: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(nota * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nota]);
  return (
    <span className="qsc-score-num">
      {String(v).padStart(2, "0")}
      <em>/100</em>
    </span>
  );
}

/** painel SCAN — HUD de diagnóstico ao vivo ao lado do quiz */
function ScanPanel({
  respostas,
  passo,
  finalizado,
  nota,
  pontos,
}: {
  respostas: Record<string, string>;
  passo: number;
  finalizado: boolean;
  nota: number;
  pontos: string[];
}) {
  const n = Object.keys(respostas).length;
  return (
    <aside className={`qsc${finalizado ? " is-final" : ""}`} aria-hidden="true">
      <div className="qsc-frame card-2">
        <header className="qsc-head">
          <span className="qsc-tag">SCAN AO VIVO</span>
          <span className={`qsc-status${finalizado ? " is-done" : ""}`}>
            <i />
            {finalizado
              ? "ANÁLISE CONCLUÍDA"
              : `COLETANDO ${String(passo + 1).padStart(2, "0")}/${String(TOTAL).padStart(2, "0")}`}
          </span>
        </header>

        <div className="qsc-radar">
          <span className="qsc-ring qsc-r1" />
          <span className="qsc-ring qsc-r2" />
          <span className="qsc-ring qsc-r3" />
          <span className="qsc-cross" />
          <span className="qsc-sweep" />
          {Array.from({ length: n }, (_, i) => (
            <span
              key={i}
              className="qsc-blip"
              style={{ "--bi": i } as React.CSSProperties}
            />
          ))}
          {finalizado && (
            <span className="qsc-lock">
              <ScoreCount nota={nota} />
              <b>PRESENÇA DIGITAL</b>
            </span>
          )}
        </div>

        <div className="qsc-readout">
          {PERGUNTAS.map((p) => (
            <span
              key={p.id}
              className={`qsc-line${respostas[p.id] ? " is-on" : ""}`}
            >
              <i>{p.resumo.toLowerCase()}</i>
              <b>{respostas[p.id] ?? "aguardando…"}</b>
            </span>
          ))}
        </div>

        {finalizado && (
          <div className="qsc-result">
            <span className="qsc-bar">
              <i style={{ width: `${nota}%` }} />
            </span>
            <ul className="qsc-pontos">
              {pontos.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
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
  const { itens, waHref, respondidas, nota, pontos } = useMemo(() => {
    const respondidas = PERGUNTAS.filter((p) => respostas[p.id]);
    const { nota, pontos } = diagnostico(respostas);
    const completo = respondidas.length === TOTAL;
    const mensagemWA = [
      "Olá! Acabei de fazer o diagnóstico no site da Neovanguard.",
      "",
      ...respondidas.map((p) => `• ${p.resumo}: ${respostas[p.id]}`),
      ...(completo ? ["", `Minha presença digital: ${nota}/100`] : []),
      "",
      "Quero montar a minha solução sob medida.",
    ].join("\n");
    return {
      itens: respondidas.map((p) => ({ label: `${p.resumo}: ${respostas[p.id]}`, price: null })),
      waHref: `${WA}?text=${encodeURIComponent(mensagemWA)}`,
      respondidas,
      nota,
      pontos,
    };
  }, [respostas]);

  const progresso = Math.round((passo / TOTAL) * 100);

  return (
    <div id="diagnostico" className="comprar-part" aria-label="Diagnóstico sob medida">
      <div className="inner">
        <div ref={headerRef} className="quiz-head">
          <span className="section-eyebrow">Consulta rápida</span>
          <h1 className="section-heading">
            Vamos montar a <span className="text-accent-nvg">sua solução</span>
          </h1>
          <p className="section-sub">
            Responda 3 perguntas rápidas e já entendemos o seu momento — sem formulário gigante, sem compromisso.
          </p>
        </div>

        <div className="quiz-grid">
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
                                        {p.resumo.toLowerCase()} <b>▸ {respostas[p.id]}</b>
                  </span>
                ))}
              </div>

              {/* próximo passo: consultoria sob medida, sem prateleira */}
              <div className="quiz-rec">
                <span className="quiz-rec-label">Próximo passo</span>
                <span className="quiz-rec-name">Sua solução sob medida</span>
                <p className="quiz-rec-why">
                  Com base no que você respondeu, desenhamos a solução ideal para o seu
                  momento — direto com você, no atendimento.
                </p>
              </div>

              <p className="quiz-final-sub">
                Fechamos os detalhes com você no atendimento — no ritmo e no
                orçamento que cabem no seu negócio. Vamos conversar?
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

        <ScanPanel
          respostas={respostas}
          passo={Math.min(passo, TOTAL - 1)}
          finalizado={finalizado}
          nota={nota}
          pontos={pontos}
        />
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
