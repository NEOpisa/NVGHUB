"use client";

import { useState } from "react";
import { WA } from "@/lib/constants";
import { WhatsAppIcon, ArrowUpRight } from "@/components/icons";

type Pergunta = { id: string; resumo: string; q: string; opcoes: string[] };

const PERGUNTAS: Pergunta[] = [
  {
    id: "objetivo",
    resumo: "Objetivo",
    q: "O que você mais quer agora?",
    opcoes: [
      "Existir online de vez",
      "Ser encontrado no Google",
      "Vender online",
      "Automatizar e organizar o negócio",
    ],
  },
  {
    id: "ramo",
    resumo: "Ramo",
    q: "Qual é o seu ramo?",
    opcoes: [
      "Comércio / Loja",
      "Serviços",
      "Alimentação",
      "Saúde & Beleza",
      "Outro",
    ],
  },
  {
    id: "situacao",
    resumo: "Situação",
    q: "Em que pé você está hoje?",
    opcoes: [
      "Não tenho nada online ainda",
      "Tenho redes, mas não tenho site",
      "Já tenho site e quero melhorar",
    ],
  },
];

/* diagnóstico: nota de presença digital + os furos que a resposta revela */
function diagnostico(r: Record<string, string>) {
  const sit = r.situacao ?? "";
  if (sit.startsWith("Não tenho nada"))
    return {
      nota: 24,
      pontos: [
        "Quem procura no Google não te encontra",
        "Sem canal próprio — todo cliente depende de indicação",
        "Concorrentes com site aparecem na sua frente",
      ],
    };
  if (sit.startsWith("Tenho redes"))
    return {
      nota: 43,
      pontos: [
        "Instagram atrai, mas não converte sozinho",
        "Invisível nas buscas locais do Google",
        "Sem agendamento ou pedido direto — a venda escapa no direct",
      ],
    };
  return {
    nota: 61,
    pontos: [
      "Site no ar não é o mesmo que site que converte",
      "Site lento derruba conversão e ranqueamento",
      "Atendimento manual segurando o crescimento",
    ],
  };
}

const LETRAS = "ABCDE";

/**
 * CONSULTA RÁPIDA — três perguntas, um diagnóstico e a ponte pro WhatsApp
 * com o resumo já escrito. Sem modal, sem formulário gigante.
 */
export default function ConsultaQuiz() {
  const [passo, setPasso] = useState(0);
  const [resp, setResp] = useState<Record<string, string>>({});

  const responder = (id: string, valor: string) => {
    setResp((r) => ({ ...r, [id]: valor }));
    setPasso((p) => p + 1);
  };

  const fim = passo >= PERGUNTAS.length;
  const pct = Math.round((Math.min(passo, PERGUNTAS.length) / PERGUNTAS.length) * 100);

  if (fim) {
    const d = diagnostico(resp);
    const msg = encodeURIComponent(
      [
        "Olá! Fiz a consulta rápida no site.",
        ...PERGUNTAS.map((p) => `${p.resumo}: ${resp[p.id] ?? "—"}`),
        `Presença digital estimada: ${d.nota}/100`,
      ].join("\n"),
    );

    return (
      <div>
        <div className="quiz-bar">
          <span>DIAGNÓSTICO</span>
          <span className="quiz-track">
            <i style={{ width: "100%" }} />
          </span>
          <span>100%</span>
        </div>

        <div className="scan">
          <div className="scan-nota">
            <strong>{d.nota}</strong>
            <span>/100 de presença digital</span>
          </div>
          <ul className="scan-lista">
            {d.pontos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="scan-resumo">
          {PERGUNTAS.map((p) => (
            <div key={p.id}>
              <span className="card-lbl">{p.resumo}</span>
              {resp[p.id] ?? "—"}
            </div>
          ))}
        </div>

        <div className="pill-row">
          <a
            href={`${WA}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            <WhatsAppIcon />
            Receber a solução no WhatsApp
          </a>
          <button
            type="button"
            className="pill pill--ghost"
            onClick={() => {
              setResp({});
              setPasso(0);
            }}
          >
            Refazer
          </button>
        </div>
      </div>
    );
  }

  const p = PERGUNTAS[passo];
  return (
    <div>
      <div className="quiz-bar">
        <span>
          PASSO {String(passo + 1).padStart(2, "0")} / {String(PERGUNTAS.length).padStart(2, "0")}
        </span>
        <span className="quiz-track">
          <i style={{ width: `${pct}%` }} />
        </span>
        <span>{pct}%</span>
      </div>

      <h2 className="h-md">{p.q}</h2>

      <div className="opts">
        {p.opcoes.map((o, i) => (
          <button
            key={o}
            type="button"
            className="opt"
            onClick={() => responder(p.id, o)}
          >
            <span className="opt-k">{LETRAS[i]}</span>
            {o}
            <ArrowUpRight />
          </button>
        ))}
      </div>

      {passo > 0 && (
        <button
          type="button"
          className="quiz-voltar"
          onClick={() => setPasso((s) => s - 1)}
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}
