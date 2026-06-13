"use client";

import { useState } from "react";
import { quizStep1Options, quizStep2Options } from "../data/quiz";

interface QuizOverlayProps {
  onClose: () => void;
}

export default function QuizOverlay({ onClose }: QuizOverlayProps) {
  const [step, setStep] = useState(1);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const options = step === 1 ? quizStep1Options : quizStep2Options;

  const title =
    step === 3
      ? "Quase lá — onde envio sua análise?"
      : step === 2
      ? "Qual é o seu maior objetivo em 12 meses?"
      : "Qual é o seu maior obstáculo hoje?";

  const subtitle =
    step === 3
      ? "Vou personalizar seu caminho com base nas suas respostas."
      : "Leva 30 segundos. Vamos personalizar sua trilha de aprendizado.";

  const buttonLabel = step === 3 ? "Ver minha análise →" : "Continuar →";
  const buttonEnabled = step === 3 || selectedOpt !== null;

  function handleSelect(opt: string) {
    setSelectedOpt(opt);
  }

  function handleNext() {
    if (step === 1 && !selectedOpt) return;
    if (step === 2 && !selectedOpt) return;

    if (step === 1) {
      setStep(2);
      setSelectedOpt(null);
    } else if (step === 2) {
      setStep(3);
    } else {
      onClose();
    }
  }

  return (
    <div className="quiz-overlay" id="quizOverlay">
      <div className="quiz-box animate-in">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Diagnóstico gratuito
        </div>
        <h2 id="quizTitle">{title}</h2>
        <p id="quizSub">{subtitle}</p>
        <div className="quiz-progress" id="quizProgress">
          <div className={`quiz-dot${step >= 1 ? " done" : ""}`}></div>
          <div className={`quiz-dot${step >= 2 ? " done" : ""}`}></div>
          <div className={`quiz-dot${step >= 3 ? " done" : ""}`}></div>
        </div>
        {step !== 3 && (
          <div className="quiz-options" id="quizOptions">
            {options.map((opt) => (
              <button
                key={opt}
                className={`quiz-opt${selectedOpt === opt ? " selected" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {step === 3 && (
          <div id="quizEmailStep" style={{ display: "block" }}>
            <input className="quiz-input" type="text" placeholder="Seu nome" id="qName" />
            <input className="quiz-input" type="email" placeholder="Seu melhor e-mail" id="qEmail" />
          </div>
        )}
        <button
          className="btn-primary"
          id="quizNextBtn"
          onClick={handleNext}
          style={{
            width: "100%",
            opacity: buttonEnabled ? 1 : 0.4,
            pointerEvents: buttonEnabled ? "auto" : "none",
          }}
        >
          {buttonLabel}
        </button>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem" }}>
          Sem spam. Sua privacidade é respeitada.
        </p>
      </div>
    </div>
  );
}
