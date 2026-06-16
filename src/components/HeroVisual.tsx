"use client";

import dynamic from "next/dynamic";

const LogoScene = dynamic(() => import("@/components/LogoScene"), {
  ssr: false,
});

export default function HeroVisual() {
  return <LogoScene />;
}
