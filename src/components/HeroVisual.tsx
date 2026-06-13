"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// O Canvas 3D (Three.js) só é carregado em aparelhos capazes.
// Em mobile/dispositivos fracos servimos o logo estático, evitando
// baixar e executar o three.js.
const LogoScene = dynamic(() => import("@/components/LogoScene"), {
  ssr: false,
});

export default function HeroVisual() {
  const [full, setFull] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd =
      window.matchMedia("(max-width: 968px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4);

    if (!lowEnd) setFull(true);
  }, []);

  if (!full) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="logo-scene logo-scene-fallback"
        src="/logo.png"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
      />
    );
  }

  return <LogoScene />;
}
