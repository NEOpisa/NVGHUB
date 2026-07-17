"use client";

import { useEffect } from "react";

/**
 * Palco "Blueprint Obsidian" das páginas internas — a mesma linguagem da
 * jornada da home, sem WebGL (barato o suficiente pra viver em toda rota):
 *   · fundo quase-preto com nebulosa violeta em deriva contínua;
 *   · grade blueprint de 1px que desliza devagar;
 *   · linha de varredura (scan) descendo em loop;
 *   · moldura HUD fina com a assinatura mono no canto.
 * Também liga `body.bp-page`, o escopo que re-tokeniza o design system
 * (superfícies violeta translúcidas, hairlines, cantos retos).
 */
export default function BlueprintStage() {
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
      </div>
      <div className="bp-frame" aria-hidden="true">
        <span className="bp-frame-label bp-frame-br">
          NVG · © {new Date().getFullYear()} neovanguard
        </span>
      </div>
    </>
  );
}
