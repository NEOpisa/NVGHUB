"use client";

import { useEffect, type CSSProperties } from "react";

/**
 * Palco "Blueprint Obsidian" das páginas internas — a mesma linguagem da
 * jornada da home, sem WebGL (barato o suficiente pra viver em toda rota):
 *   · fundo quase-preto com nebulosa em deriva contínua;
 *   · grade blueprint de 1px que desliza devagar;
 *   · linha de varredura (scan) descendo em loop;
 *   · moldura HUD fina com a assinatura mono no canto.
 * IDENTIDADE POR ÁREA: cada rota escolhe a LIGA do palco via `accent` —
 * violeta (casa) · teal (ferramentas) · gold (forja) · ice (platina).
 * Também liga `body.bp-page`, o escopo que re-tokeniza o design system.
 */

type BpAccent = "violet" | "teal" | "gold" | "ice";

/* triplas RGB (entram em rgba(var(--bp-*), a) no CSS) */
const ACCENTS: Record<BpAccent, { n1: string; n2: string; line: string }> = {
  violet: { n1: "108, 92, 255", n2: "90, 69, 240", line: "157, 140, 255" },
  teal: { n1: "63, 224, 216", n2: "36, 150, 160", line: "120, 214, 208" },
  gold: { n1: "244, 183, 74", n2: "196, 130, 32", line: "230, 190, 120" },
  ice: { n1: "170, 196, 220", n2: "63, 224, 216", line: "185, 205, 224" },
};

export default function BlueprintStage({
  accent = "violet",
}: {
  /** liga do palco desta rota (identidade por área) */
  accent?: BpAccent;
}) {
  useEffect(() => {
    document.body.classList.add("bp-page");
    return () => document.body.classList.remove("bp-page");
  }, []);

  const a = ACCENTS[accent];
  const vars = {
    "--bp-n1": a.n1,
    "--bp-n2": a.n2,
    "--bp-line": a.line,
  } as CSSProperties;

  return (
    <>
      <div className="bp-stage" style={vars} aria-hidden="true">
        <span className="bp-nebula bp-nebula-a" />
        <span className="bp-nebula bp-nebula-b" />
        <span className="bp-grid" />
        <span className="bp-scan" />
        <span className="bp-vignette" />
      </div>
      <div className="bp-frame" aria-hidden="true">
        <span className="bp-frame-label bp-frame-br">
          NVG · © {new Date().getFullYear()} neovanguard
        </span>
      </div>
    </>
  );
}
