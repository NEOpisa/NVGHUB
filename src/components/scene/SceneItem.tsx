"use client";

import type { ReactNode } from "react";
import { scene } from "@/components/scene/tunnel";

/**
 * Injeta nós R3F na cena global. Use dentro de uma seção (componente DOM) para
 * que ela "adicione itens ao canvas". Os filhos são renderizados pelo
 * <scene.Out/> do SceneCanvas — então só funcionam quando o SceneCanvas (WebGL)
 * está montado; em fallback CSS, nada é injetado.
 */
export default function SceneItem({ children }: { children: ReactNode }) {
  return <scene.In>{children}</scene.In>;
}
