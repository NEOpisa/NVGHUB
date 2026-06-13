"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-noise"></div>
      <Hero3D />
      <div className="hero-content">
        <div className="hero-eyebrow">Box de CrossFit — [Bairro, Cidade - UF]</div>
        <h1 className="hero-headline">
          <span className="line1">VOCÊ</span>
          <span className="line2">NÃO</span>
          <span className="line3">NASCEU</span>
        </h1>
        <p className="hero-sub">
          para <strong>esteira e musiquinha ambiente.</strong>
          <br />
          [Nome da Academia] é para quem quer sentir o treino. Comunidade
          real, resultado real — ou a segunda semana é por nossa conta.
        </p>
        <div className="hero-btns">
          <a href="#experimental" className="btn-volt">
            Aula experimental grátis
          </a>
          <a href="#planos" className="btn-ghost">
            Ver planos →
          </a>
        </div>
      </div>
    </section>
  );
}
