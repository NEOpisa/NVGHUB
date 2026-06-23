"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AREAS = [
  { num: "01", label: "Sua solução",          href: "/solucao",  highlight: true },
  { num: "02", label: "Pacotes",               href: "/pacotes" },
  { num: "03", label: "Quem somos",            href: "/sobre" },
  { num: "04", label: "Perguntas frequentes",  href: "/faq" },
  { num: "05", label: "Contato",               href: "/contato" },
];

export default function ExploreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list    = listRef.current;
    if (!section || !list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const head  = section.querySelector<HTMLElement>(".explore-head");
    const links = list.querySelectorAll<HTMLElement>(".explore-link");

    if (head) gsap.set(head, { opacity: 0, y: 24 });
    gsap.set(links, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      if (head) {
        gsap.to(head, {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: head, start: "top 88%", once: true },
        });
      }
      links.forEach((link, i) => {
        gsap.to(link, {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: list, start: "top 82%", once: true },
        });
      });
    }, section);

    // Lens effect: hover num link escurece os outros
    const onEnter = () => list.classList.add("has-hover");
    const onLeave = () => list.classList.remove("has-hover");
    links.forEach(l => l.addEventListener("mouseenter", onEnter));
    list.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      links.forEach(l => l.removeEventListener("mouseenter", onEnter));
      list.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="explorar" className="explore" aria-label="Navegue pelo site" ref={sectionRef}>
      <div className="inner">
        <div className="explore-head">
          <span className="section-eyebrow">Navegue</span>
          <h2 className="section-heading chroma">
            Explore a <span className="text-accent-nvg">Neovanguard</span>
          </h2>
        </div>

        <div className="explore-list" ref={listRef}>
          {AREAS.map((a) => (
            <Link key={a.href} href={a.href} className={`explore-link${a.highlight ? " is-solucao" : ""}`}>
              <span className="explore-index" aria-hidden="true">{a.num}</span>
              <span className="explore-label">{a.label}</span>
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
