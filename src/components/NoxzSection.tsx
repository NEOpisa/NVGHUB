"use client";

import { useEffect } from "react";

const CARDS = [
  {
    name: "O que é o Noxz?",
    text: "O Plano Noxz é a metodologia de execução da NVG que funde as competências do time em um ecossistema focado em Segurança Extrema, Velocidade e Eficácia Cirúrgica. Em vez de atuações isoladas, o projeto é tratado de ponta a ponta por uma força-tarefa síncrona.",
  },
  {
    name: "Segurança extrema",
    text: "O projeto é desenhado desde o primeiro dia sob o conceito de Zero Trust. Toda a arquitetura de back-end e infraestrutura é estruturada com criptografia de ponta e redundância de servidores, garantindo estabilidade total e blindagem contra falhas ou vulnerabilidades.",
  },
  {
    name: "Eficácia Modular",
    text: "Foco estratégico no que gera valor real para o negócio. A coordenação técnica implacável garante que o código limpo se alinhe perfeitamente a uma estratégia de comunicação e aquisição de clientes, transformando tecnologia em resultado comercial.",
  },
  {
    name: "Velocidade",
    text: "Time-to-Market Acelerado: Eliminação de burocracias e retrabalho. Através de um front-end otimizado e design de interface fluido, o produto é validado e colocado no ar no menor tempo possível, garantindo uma experiência de usuário imediata e sem fricção.",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoxzModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="noxz-modal-overlay" onClick={onClose}>
      <div className="noxz-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="noxz-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="noxz-modal-header">
          <span className="section-eyebrow">Metodologia</span>
          <h2 className="section-heading" style={{ marginTop: "12px" }}>
            <span className="text-gradient">Plano Noxz</span>
          </h2>
          <p className="section-sub">
            Uma metodologia de execução síncrona e implacável — projetada para
            entregar com velocidade e segurança extrema.
          </p>
        </div>

        <div className="noxz-modal-grid">
          {CARDS.map((card) => (
            <article key={card.name} className="noxz-card">
              <div className="noxz-name">{card.name}</div>
              <p className="noxz-area">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
