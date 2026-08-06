"use client";

import { useEffect } from "react";

/**
 * Marca o <body> enquanto a home está montada. É o gancho que troca o
 * cromo global (header, moldura, barra de progresso) para o modo CLARO da
 * home creme — o resto do site segue obsidian.
 */
export default function HomeChrome() {
  useEffect(() => {
    document.body.classList.add("is-home-units");
    return () => document.body.classList.remove("is-home-units");
  }, []);
  return null;
}
