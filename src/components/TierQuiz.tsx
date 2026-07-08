"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

type Tier = "ouro" | "platina";

type Question = { id: string; label: string; options: string[] };

/* ── perguntas por divisão: cada trilha tem a sua conversa ── */

const QUESTIONS: Record<Tier, Question[]> = {
  // OURO — qualificação LEVE e objetiva (3 passos, ritmo rápido)
  ouro: [
    {
      id: "hoje",
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
      label: "Pra quando?",
      options: ["Pra ontem", "Nas próximas semanas", "Estou planejando"],
    },
  ],
  // PLATINA — aplicação PROFUNDA (filtra perfil e momento)
  platina: [
    {
      id: "negocio",
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
      label: "Você já investe em tráfego pago?",
      options: ["Sim, com gestor", "Sim, por conta própria", "Ainda não"],
    },
    {
      id: "gargalo",
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
    done: "Recebido. Bora fazer acontecer.",
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
 * Ouro: 3 perguntas leves, ritmo rápido. Platina: 4 perguntas de aplicação.
 * Transições com Motion; estilo herdado do data-tier da página. Sem preço:
 * o quiz termina agendando a consulta (Ouro) ou o diagnóstico (Platina).
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

  return (
    <div className={`tq tq--${tier} card-1`} id="quiz">
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
            <div className="tq-options">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`tq-option${answers[questions[step].id] === opt ? " is-picked" : ""}`}
                  onClick={() => pick(questions[step], opt)}
                >
                  <i aria-hidden="true" />
                  {opt}
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
                ? "Pra onde mandamos a consulta?"
                : "Pra onde mandamos o diagnóstico?"}
            </h3>
            <div className="tq-fields">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                maxLength={120}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="tel"
                placeholder="WhatsApp (com DDD)"
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
}
