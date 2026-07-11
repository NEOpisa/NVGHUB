"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

type Tier = "ouro" | "platina";

type Question = { id: string; resumo: string; label: string; options: string[] };

/* ── perguntas por divisão: cada trilha tem a sua conversa ── */

const QUESTIONS: Record<Tier, Question[]> = {
  // OURO — qualificação LEVE e objetiva (3 passos, ritmo rápido)
  ouro: [
    {
      id: "hoje",
      resumo: "hoje",
      label: "O que você já tem hoje?",
      options: [
        "Nada ainda — começando do zero",
        "Um site antigo que não converte",
        "Site ok, falta alcance",
        "Só perfil no Instagram",
      ],
    },
    {
      id: "precisa",
      resumo: "precisa",
      label: "O que o seu negócio precisa agora?",
      options: [
        "Vitrine Digital — página única",
        "Presença Web — site completo",
        "Sistema Web — agendamento / cardápio",
        "E-commerce — vender online",
      ],
    },
    {
      id: "prazo",
      resumo: "prazo",
      label: "Para quando?",
      options: ["Para ontem", "Nas próximas semanas", "Estou planejando"],
    },
  ],
  // PLATINA — aplicação PROFUNDA (filtra perfil e momento)
  platina: [
    {
      id: "negocio",
      resumo: "negócio",
      label: "Qual é o seu negócio?",
      options: [
        "Clínica / saúde",
        "Serviço premium",
        "Comércio local",
        "Outro",
      ],
    },
    {
      id: "faturamento",
      resumo: "faturamento",
      label: "Faturamento mensal aproximado",
      options: [
        "Até 30 mil",
        "Entre 30 e 100 mil",
        "Acima de 100 mil",
        "Prefiro falar na consulta",
      ],
    },
    {
      id: "trafego",
      resumo: "tráfego",
      label: "Você já investe em tráfego pago?",
      options: ["Sim, com gestor", "Sim, por conta própria", "Ainda não"],
    },
    {
      id: "gargalo",
      resumo: "gargalo",
      label: "Qual o maior gargalo hoje?",
      options: [
        "Poucos leads chegando",
        "Agenda ociosa",
        "Leads que não fecham",
        "Sem previsibilidade nenhuma",
      ],
    },
  ],
};

const COPY: Record<
  Tier,
  { tipo: string; done: string; doneSub: string; cta: string }
> = {
  ouro: {
    tipo: "Quiz Ouro — consulta rápida",
    done: "Recebido. Vamos fazer acontecer.",
    doneSub:
      "Vamos te chamar para uma consulta objetiva de 20–30 minutos — produto certo e valor, direto ao ponto.",
    cta: "Adiantar pelo WhatsApp",
  },
  platina: {
    tipo: "Aplicação Platina — diagnóstico",
    done: "Aplicação recebida.",
    doneSub:
      "Vamos analisar o seu caso e te chamar para o diagnóstico de 30–45 minutos — profundo, não demorado.",
    cta: "Falar pelo WhatsApp",
  },
};

/* ── SCAN Platina: índice de prontidão + gargalos, derivados da aplicação ── */
function prontidao(a: Record<string, string>) {
  let nota = 35;
  const fat = a.faturamento ?? "";
  const tra = a.trafego ?? "";
  const gar = a.gargalo ?? "";
  if (fat.startsWith("Acima")) nota += 25;
  else if (fat.startsWith("Entre")) nota += 18;
  else if (fat.startsWith("Até")) nota += 8;
  else if (fat) nota += 12;
  if (tra.startsWith("Sim, com gestor")) nota += 20;
  else if (tra.startsWith("Sim")) nota += 13;
  else if (tra) nota += 5;
  if (gar) nota += 8;

  const pontos: string[] = [];
  if (gar === "Poucos leads chegando")
    pontos.push("Funil sem topo — mídia e página precisam trabalhar juntas");
  if (gar === "Agenda ociosa")
    pontos.push("Captação sem cadência — automação preenche a agenda");
  if (gar === "Leads que não fecham")
    pontos.push("Qualificação fraca — tracking e nutrição elevam o fechamento");
  if (gar === "Sem previsibilidade nenhuma")
    pontos.push("Sem dados — o sistema completo cria previsibilidade");
  if (tra === "Ainda não")
    pontos.push("Sem mídia ativa — todo crescimento hoje é orgânico");
  if (tra === "Sim, por conta própria")
    pontos.push("Mídia sem gestão dedicada — verba deixando resultado na mesa");
  return { nota: Math.min(96, nota), pontos: pontos.slice(0, 3) };
}

/** painel SCAN — HUD de aplicação ao vivo ao lado do quiz Platina */
function TierScan({
  questions,
  answers,
  step,
  finalizado,
}: {
  questions: Question[];
  answers: Record<string, string>;
  step: number;
  finalizado: boolean;
}) {
  const n = Object.keys(answers).length;
  const total = questions.length;
  const { nota, pontos } = prontidao(answers);
  return (
    <aside className={`qsc${finalizado ? " is-final" : ""}`} aria-hidden="true">
      <div className="qsc-frame card-2">
        <header className="qsc-head">
          <span className="qsc-tag">APLICAÇÃO AO VIVO</span>
          <span className={`qsc-status${finalizado ? " is-done" : ""}`}>
            <i />
            {finalizado
              ? "ANÁLISE CONCLUÍDA"
              : `COLETANDO ${String(Math.min(step + 1, total)).padStart(2, "0")}/${String(total).padStart(2, "0")}`}
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
              <span className="qsc-score-num">
                {String(nota).padStart(2, "0")}
                <em>/100</em>
              </span>
              <b>PRONTIDÃO PLATINA</b>
            </span>
          )}
        </div>

        <div className="qsc-readout">
          {questions.map((q) => (
            <span key={q.id} className={`qsc-line${answers[q.id] ? " is-on" : ""}`}>
              <i>{q.resumo}</i>
              <b>{answers[q.id] ?? "aguardando…"}</b>
            </span>
          ))}
        </div>

        {finalizado && pontos.length > 0 && (
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

const stepVariants = {
  enter: { opacity: 0, x: 44, filter: "blur(4px)" },
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 220, damping: 26 },
  },
  exit: { opacity: 0, x: -44, filter: "blur(4px)", transition: { duration: 0.22 } },
};

/**
 * QUIZ POR DIVISÃO — a porta de entrada consultiva de cada trilha.
 * Ouro: 3 perguntas leves, ritmo rápido, card enxuto.
 * Platina: 4 perguntas de aplicação COM o painel SCAN ao vivo (a experiência
 * "Sua solução" integrada — radar, readout e índice de prontidão).
 * Sem preço: o quiz termina agendando a consulta (Ouro) ou o diagnóstico
 * (Platina). Ao concluir, o card recolhe 20% — o foco vira a próxima ação.
 */
export default function TierQuiz({ tier }: { tier: Tier }) {
  const questions = QUESTIONS[tier];
  const copy = COPY[tier];
  const total = questions.length + 1; // + passo de contato

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const progress = useMemo(
    () => `Q_${String(Math.min(step + 1, total)).padStart(2, "0")}/${String(total).padStart(2, "0")}`,
    [step, total],
  );

  const pick = (q: Question, opt: string) => {
    setAnswers((a) => ({ ...a, [q.id]: opt }));
    window.setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submit = async () => {
    if (!nome.trim() || tel.replace(/\D/g, "").length < 10 || status === "loading")
      return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: tel.trim(),
          origem: `quiz-${tier}`,
          tipo: copy.tipo,
          itens: questions.map((q) => ({
            label: `${q.label} → ${answers[q.id] ?? "—"}`,
            price: null,
          })),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  const atContact = step >= questions.length;

  const card = (
    <div
      className={`tq tq--${tier} card-1${status === "done" ? " is-done" : ""}`}
      id="quiz"
    >
      <div className="tq-top">
        <span className="tq-progress">{status === "done" ? "OK" : progress}</span>
        <span className="tq-track" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <i key={i} className={i <= step ? "is-on" : ""} />
          ))}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            className="tq-step tq-done"
            variants={stepVariants}
            initial="enter"
            animate="center"
          >
            <h3 className="tq-q">{copy.done}</h3>
            <p className="tq-done-sub">{copy.doneSub}</p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon />
              {copy.cta}
            </a>
          </motion.div>
        ) : !atContact ? (
          <motion.div
            key={questions[step].id}
            className="tq-step"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h3 className="tq-q">{questions[step].label}</h3>
            <div className="tq-options quiz-options">
              {questions[step].options.map((opt, oi) => (
                <button
                  key={opt}
                  type="button"
                  className={`quiz-option${answers[questions[step].id] === opt ? " ativo" : ""}`}
                  style={{ animationDelay: `${oi * 55}ms` }}
                  onClick={() => pick(questions[step], opt)}
                >
                  <span className="quiz-option-key" aria-hidden="true">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span className="quiz-option-label">{opt}</span>
                  <span className="quiz-option-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                className="tq-back"
                onClick={() => setStep((s) => s - 1)}
              >
                ← voltar
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            className="tq-step"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <h3 className="tq-q">
              {tier === "ouro"
                ? "Para onde enviamos a consulta?"
                : "Para onde enviamos o diagnóstico?"}
            </h3>

            {/* readout do terminal: o que foi respondido (linguagem do SCAN) */}
            <div className="quiz-readout tq-readout" aria-hidden="true">
              {questions.map(
                (q) =>
                  answers[q.id] && (
                    <span key={q.id} className="quiz-readout-line">
                                            {q.resumo} <b>▸ {answers[q.id]}</b>
                    </span>
                  ),
              )}
            </div>

            <div className="tq-fields">
              <input
                type="text"
                placeholder="Seu nome"
                aria-label="Seu nome"
                autoComplete="name"
                enterKeyHint="next"
                value={nome}
                maxLength={120}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="tel"
                placeholder="WhatsApp (com DDD)"
                aria-label="WhatsApp com DDD"
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="send"
                value={tel}
                maxLength={40}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            {status === "error" && (
              <p className="tq-error">
                Não foi possível enviar agora — tente de novo ou{" "}
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  chame no WhatsApp
                </a>
                .
              </p>
            )}
            <div className="tq-actions">
              <button
                type="button"
                className="tq-back"
                onClick={() => setStep((s) => s - 1)}
              >
                ← voltar
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={
                  status === "loading" ||
                  !nome.trim() ||
                  tel.replace(/\D/g, "").length < 10
                }
                onClick={submit}
              >
                {status === "loading"
                  ? "Enviando..."
                  : tier === "ouro"
                    ? "Agendar consulta"
                    : "Enviar aplicação"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Platina: card + painel SCAN lado a lado (mesma malha do antigo /solucao)
  if (tier === "platina") {
    return (
      <div className="quiz-grid tq-duo">
        {card}
        <TierScan
          questions={questions}
          answers={answers}
          step={step}
          finalizado={atContact || status === "done"}
        />
      </div>
    );
  }

  return card;
}
