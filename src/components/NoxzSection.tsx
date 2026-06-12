"use client";

import { useEffect } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

const CARDS = [
  {
    num: "01",
    name: "O que é o Noxz?",
    tag: "Força-tarefa",
    text: "O Plano Noxz é a metodologia de execução da NVG que funde as competências do time em um ecossistema focado em Segurança Extrema, Velocidade e Eficácia Cirúrgica. Em vez de atuações isoladas, o projeto é tratado de ponta a ponta por uma força-tarefa síncrona.",
  },
  {
    num: "02",
    name: "Segurança extrema",
    tag: "Zero Trust",
    text: "O projeto é desenhado desde o primeiro dia sob o conceito de Zero Trust. Toda a arquitetura de back-end e infraestrutura é estruturada com criptografia de ponta e redundância de servidores, garantindo estabilidade total e blindagem contra falhas ou vulnerabilidades.",
  },
  {
    num: "03",
    name: "Eficácia Modular",
    tag: "Código limpo",
    text: "Foco estratégico no que gera valor real para o negócio. A coordenação técnica implacável garante que o código limpo se alinhe perfeitamente a uma estratégia de comunicação e aquisição de clientes, transformando tecnologia em resultado comercial.",
  },
  {
    num: "04",
    name: "Velocidade",
    tag: "Time-to-Market",
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
        {/* auroras de fundo */}
        <span className="noxz-aurora noxz-aurora-a" aria-hidden="true" />
        <span className="noxz-aurora noxz-aurora-b" aria-hidden="true" />

        <button
          className="noxz-modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="noxz-modal-header">
          <span className="noxz-badge">
            <span className="noxz-badge-pulse" aria-hidden="true" />
            Metodologia exclusiva NVG
          </span>
          <h2 className="noxz-title">
            Plano <span className="noxz-title-shimmer">Noxz</span>
          </h2>
          <p className="section-sub">
            Uma metodologia de execução síncrona e implacável — projetada para
            entregar com velocidade e segurança extrema.
          </p>
        </div>

        <div className="noxz-modal-grid">
          {CARDS.map((card, i) => (
            <article
              key={card.name}
              className="noxz-card"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="noxz-card-num" aria-hidden="true">{card.num}</span>
              <span className="noxz-card-tag">{card.tag}</span>
              <div className="noxz-name">{card.name}</div>
              <p className="noxz-area">{card.text}</p>
            </article>
          ))}
        </div>

        <div className="noxz-modal-footer">
          <a
            href={`${WA}?text=${encodeURIComponent("Olá! Quero saber mais sobre o Plano Noxz da Neovanguard.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary noxz-cta"
          >
            <WhatsAppIcon size={15} />
            Ativar o Plano Noxz
          </a>
          <span className="noxz-footer-note">
            Vagas limitadas por ciclo de execução
          </span>
        </div>
      </div>
    </div>
  );
}
