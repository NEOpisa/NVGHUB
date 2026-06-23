"use client";

import Link from "next/link";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const head  = s.querySelector(".explore-head");
    const links = s.querySelectorAll(".explore-link");
    if (head)        gsap.set(head,  { opacity: 0, y: 24 });
    if (links.length) gsap.set(links, { opacity: 0, y: 18 });
  }, []);

  useEffect(() => {
    const s = sectionRef.current;
    if (!s || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const head  = s.querySelector<HTMLElement>(".explore-head");
    const links = s.querySelectorAll<HTMLElement>(".explore-link");

    const ctx = gsap.context(() => {
      if (head) {
        gsap.to(head, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: head, start: "top 88%", once: true } });
      }
      links.forEach((link, i) => {
        gsap.to(link, { opacity: 1, y: 0, duration: 0.60, ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: s.querySelector(".explore-list"), start: "top 82%", once: true } });
      });
    }, s);

    return () => ctx.revert();
  }, []);

  return (
    <section id="explorar" className="explore" aria-label="Navegue pelo site" ref={sectionRef}>
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
