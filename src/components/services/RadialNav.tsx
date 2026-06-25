"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { WA, IG } from "@/lib/constants";

// Canvas (three/drei) sob demanda — fora do bundle inicial. Os links radiais (DOM)
// renderizam na hora (clique/SEO).
const RadialNavCanvas = dynamic(() => import("@/components/services/RadialNavCanvas"), { ssr: false });

const ITEMS = [
  { label: "Pacotes", href: "/pacotes", external: false },
  { label: "Quem somos", href: "/sobre", external: false },
  { label: "Perguntas", href: "/faq", external: false },
  { label: "Contato", href: "/contato", external: false },
  { label: "WhatsApp", href: WA, external: true },
  { label: "Instagram", href: IG, external: true },
];

/**
 * Fecho da galeria: a "área de navegação" como menu RADIAL — anel + hub + nós 3D
 * girando no canvas, com os links reais (DOM) em círculo por cima (clique/SEO).
 */
export default function RadialNav() {
  return (
    <section className="radial-nav" aria-label="Navegação">
      <div className="radial-nav-canvas" aria-hidden="true">
        <RadialNavCanvas />
      </div>

      <div className="radial-nav-center">
        <span className="section-eyebrow">Explore o ecossistema</span>
        <h2>Tudo conectado em um só lugar</h2>
      </div>

      <nav className="radial-nav-links" aria-label="Navegação do site">
        {ITEMS.map((it, i) => {
          const angle = (i / ITEMS.length) * 360 - 90;
          const style = { ["--a" as string]: `${angle}deg` } as React.CSSProperties;
          return it.external ? (
            <a key={it.href} href={it.href} target="_blank" rel="noopener noreferrer" className="radial-link" style={style}>
              <span>{it.label}</span>
            </a>
          ) : (
            <Link key={it.href} href={it.href} className="radial-link" style={style}>
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
