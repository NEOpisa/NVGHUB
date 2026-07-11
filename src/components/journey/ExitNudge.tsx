"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

/* #047 · Exit-intent LEVE: quando o ponteiro sai pelo topo da janela
   (intenção de fechar/trocar de aba), um toast discreto sugere a consulta
   rápida. Regras de não-intrusão: só desktop (pointer fine), uma vez por
   sessão, dispensável, some sozinho em 12s, respeita reduced-motion. */
const KEY = "nvg:exit-nudge";

export default function ExitNudge() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let hideTimer = 0;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 8 || e.relatedTarget) return; // só saída real pelo topo
      document.removeEventListener("mouseout", onLeave);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* sem storage: mostra mesmo assim, uma vez nesta carga */
      }
      setShow(true);
      track("exit_nudge_shown");
      hideTimer = window.setTimeout(() => setShow(false), 12000);
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;
  return (
    <div className="exit-nudge" role="status">
      <p>
        Antes de ir — <strong>3 perguntas</strong> e montamos a solução ideal
        pro seu negócio.
      </p>
      <div className="exit-nudge-row">
        <Link
          href="/solucao"
          className="btn-primary"
          onClick={() => track("exit_nudge_click")}
        >
          Consulta rápida
        </Link>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setShow(false)}
          aria-label="Dispensar aviso"
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
