"use client";

import { useEffect } from "react";

/**
 * Palco "Blueprint Obsidian" das páginas internas — a mesma linguagem da
 * jornada da home, sem WebGL (barato o suficiente pra viver em toda rota):
 *   · fundo quase-preto com nebulosa violeta em deriva contínua;
 *   · grade blueprint de 1px que desliza devagar;
 *   · linha de varredura (scan) descendo em loop;
 *   · moldura HUD fina com cantoneiras pulsantes e labels mono.
 * Também liga `body.bp-page`, o escopo que re-tokeniza o design system
 * (superfícies violeta translúcidas, hairlines, cantos retos).
 */
export default function BlueprintStage({
  index,
}: {
  /** índice do "capítulo" no site, ex.: "01" */
  index: string;
  /** (legado) rótulo mono da rota — não é mais exibido no canto */
  code?: string;
}) {
  useEffect(() => {
    document.body.classList.add("bp-page");
    return () => document.body.classList.remove("bp-page");
  }, []);

  return (
    <>
      <div className="bp-stage" aria-hidden="true">
        <span className="bp-nebula bp-nebula-a" />
        <span className="bp-nebula bp-nebula-b" />
        <span className="bp-grid" />
        <span className="bp-scan" />
        <span className="bp-vignette" />
        <span className="bp-ghost">{index}</span>
      </div>
      <div className="bp-frame" aria-hidden="true">
        <span className="bp-frame-label bp-frame-br">
          SEC {index} · © {new Date().getFullYear()} neovanguard
        </span>
      </div>
    </>
  );
}
