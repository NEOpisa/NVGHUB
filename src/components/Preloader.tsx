"use client";

import { useEffect } from "react";
import { markIntroDone } from "@/components/scene/introState";

/**
 * Gate de entrada do site. A intro cerimonial (a marca se desenhando dentro
 * do palco 3D da jornada) saiu junto com a jornada: hoje a formação da marca
 * é a MONTAGEM do V 3D no próprio hero da home — o visitante já chega nela,
 * sem loader, sem trava de scroll.
 * O que sobrou aqui é o sinal `site-loaded`, de que a cascata depende para
 * revelar o cromo do site.
 */
export default function Preloader() {
  useEffect(() => {
    document.body.classList.add("site-loaded");
    markIntroDone();
  }, []);
  return null;
}
