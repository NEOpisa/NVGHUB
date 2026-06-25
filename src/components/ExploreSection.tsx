"use client";

import Link from "next/link";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitReveal } from "@/lib/motion";
import SectionScene from "@/components/scene/SectionScene";

gsap.registerPlugin(ScrollTrigger);

const AREAS = [
  { num: "01", label: "Sua solução",          href: "/solucao",  desc: "Responda 3 perguntas e a gente monta o seu sob medida.", highlight: true },
  { num: "02", label: "Pacotes",               href: "/pacotes",  desc: "Os tipos de solução que a gente entrega." },
  { num: "03", label: "Quem somos",            href: "/sobre",    desc: "Quem somos, nossos números e a metodologia." },
  { num: "04", label: "Perguntas frequentes",  href: "/faq",      desc: "Prazos, suporte e como a gente trabalha." },
  { num: "05", label: "Contato",               href: "/contato",  desc: "Fale com a gente pelo WhatsApp ou formulário." },
];

export default function ExploreSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const s = sectionRef.current;
    if (!s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const eyebrow = s.querySelector(".section-eyebrow");
    const sub     = s.querySelector(".section-sub");
    const links   = s.querySelectorAll(".explore-link");
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, x: -20 });
    // heading: o reveal cinético (SplitText) cuida do estado inicial das linhas.
    if (sub)     gsap.set(sub,     { opacity: 0, y: 18 });
    // Links: cada um oculto + rotacionado levemente (efeito 3D)
    links.forEach(l => gsap.set(l, { opacity: 0, x: -24 }));
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const eyebrow = s.querySelector<HTMLElement>(".section-eyebrow");
    const heading = s.querySelector<HTMLElement>(".section-heading");
    const sub     = s.querySelector<HTMLElement>(".section-sub");
    const links   = s.querySelectorAll<HTMLElement>(".explore-link");
    const list    = s.querySelector<HTMLElement>(".explore-list");

    let sr: ReturnType<typeof splitReveal> | undefined;
    const ctx = gsap.context(() => {
      // Eyebrow desliza
      if (eyebrow) {
        gsap.to(eyebrow, { opacity: 1, x: 0, duration: 0.50, ease: "power3.out",
          scrollTrigger: { trigger: s, start: "top 86%", once: true } });
      }
      // Heading: tipografia cinética — revela linha por linha (SplitText).
      if (heading) {
        sr = splitReveal(heading, { type: "lines", start: "top 85%" });
      }
      // Sub fade
      if (sub) {
        gsap.to(sub, { opacity: 1, y: 0, duration: 0.60, ease: "power3.out",
          delay: 0.22,
          scrollTrigger: { trigger: s, start: "top 84%", once: true } });
      }
      // Links: surgem com rotação 3D lateral + x (efeito "virando para o usuário")
      links.forEach((link, i) => {
        gsap.to(link, {
          opacity: 1, x: 0,
          duration: 0.6, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: list, start: "top 82%", once: true },
        });
      });
    }, s);

    return () => {
      ctx.revert();
      sr?.split.revert();
    };
  }, []);

  return (
    <section id="explorar" className="explore" aria-label="Navegue pelo site" ref={sectionRef}>
      <SectionScene variant="orbit" className="section-scene-explore" />
      <div className="inner">
        <div className="explore-head">
          <span className="section-eyebrow">Navegue</span>
          <h2 className="section-heading">
            Explore a <span className="text-accent-nvg">Neovanguard</span>
          </h2>
          <p className="section-sub">Cada área num lugar próprio. Escolha por onde começar.</p>
        </div>
        <div className="explore-list">
          {AREAS.map((a) => (
            <Link key={a.href} href={a.href} className={`explore-link${a.highlight ? " is-solucao" : ""}`}>
              <span className="explore-index" aria-hidden="true">{a.num}</span>
              <span className="explore-label">{a.label}</span>
              <span className="explore-desc">{a.desc}</span>
              <span className="explore-arrow" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
