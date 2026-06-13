"use client";

import dynamic from "next/dynamic";

// O Canvas 3D é carregado sob demanda (fora do bundle inicial), mas
// roda em todos os dispositivos — desktop e mobile veem o mesmo logo 3D.
const LogoScene = dynamic(() => import("@/components/LogoScene"), {
  ssr: false,
});

export default function HeroVisual() {
  return <LogoScene />;
}
