"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";
import { getLenisInstance } from "@/lib/lenis";
import { journey } from "@/components/journey/journeyState";

/* ── conteúdo ────────────────────────────────────────────── */

const DNA_LAYERS = [
  {
    num: "01",
    tier: "Captura",
    title: "Arquitetura de Conversão",
    desc: "A fundação. Páginas rápidas, encontráveis e desenhadas para transformar visita em contato.",
    tags: ["Velocidade", "SEO técnico", "Landing"],
  },
  {
    num: "02",
    tier: "Conexão",
    title: "Integrações & Atendimento",
    desc: "O sistema nervoso. Site, agenda, CRM e WhatsApp conectados para nenhum lead se perder.",
    tags: ["WhatsApp", "Agendamento", "CRM"],
  },
  {
    num: "03",
    tier: "Conversão",
    title: "Dados, IA & Automação",
    desc: "A camada que aprende e age. Tracking, automação e otimização contínua sobre números reais.",
    tags: ["Tracking", "IA aplicada", "Ads"],
  },
];

const RAIL = [
  { label: "Início", p: 0.02 },
  { label: "DNA", p: 0.3 },
  { label: "A Escolha", p: 0.985 },
];

function scrollToProgress(pc: number) {
  const wrap = document.querySelector<HTMLElement>(".vy-wrap");
  if (!wrap) return;
  const y = wrap.offsetTop + pc * (wrap.offsetHeight - window.innerHeight);
  const lenis = getLenisInstance();
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/* ── overlay ─────────────────────────────────────────────── */

/**
 * DOM da voyage — 3 capítulos: HERO → DNA → A ESCOLHA (bifurcação 3D final).
 * Coreografia de scroll com GSAP ScrollTrigger (scrub) sincronizada ao canvas
 * (que lê journey.progress). O hover das portas energiza as estelas 3D via
 * journey.forkHover. Clique dispara A PASSAGEM e navega para a divisão.
 */
export default function VoyageOverlay({ staticMode }: { staticMode: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const passRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* A PASSAGEM — o mundo tinge na temperatura da divisão antes de navegar */
  const cross = (href: string, tier: "ouro" | "platina") => {
    const pass = passRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pass || reduce) {
      router.push(href);
      return;
    }
    pass.dataset.tier = tier;
    pass.classList.add("is-crossing");
    window.setTimeout(() => router.push(href), 560);
  };

  const hoverFork = (side: "" | "ouro" | "platina") => {
    journey.forkHover = side;
  };

  useEffect(() => {
    if (staticMode) return;
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = el.querySelector(".vy-hero");
      const hint = el.querySelector(".vy-hint");
      const dna = el.querySelector(".vy-dna");
      const dnaCards = el.querySelectorAll(".vy-dna-card");
      const fork = el.querySelector(".vy-fork");
      const doors = el.querySelectorAll(".vy-door");
      const foot = el.querySelector(".vy-fork-foot");

      // estados iniciais (o scrub é determinístico a partir daqui)
      gsap.set(dna, { autoAlpha: 0, y: 44 });
      gsap.set(dnaCards, { autoAlpha: 0, y: 26 });
      gsap.set(fork, { autoAlpha: 0, y: 44 });
      gsap.set(doors, { autoAlpha: 0, y: 30 });
      gsap.set(foot, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".vy-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
      // linha do tempo normalizada 0..1 = progresso da jornada
      tl.to(hint, { autoAlpha: 0, duration: 0.03 }, 0.015)
        .to(hero, { autoAlpha: 0, y: -60, duration: 0.1 }, 0.05)
        .to(dna, { autoAlpha: 1, y: 0, duration: 0.07 }, 0.17)
        .to(dnaCards, { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.022 }, 0.2)
        .to(dna, { autoAlpha: 0, y: -44, duration: 0.07 }, 0.42)
        .to(fork, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.55)
        .to(doors, { autoAlpha: 1, y: 0, duration: 0.06, stagger: 0.035 }, 0.62)
        .to(foot, { autoAlpha: 1, duration: 0.05 }, 0.74)
        .to({}, { duration: 0.01 }, 1); // âncora: estende a timeline até o fim

      // estados discretos (brand do header, pointer-events, rail)
      ScrollTrigger.create({
        trigger: ".vy-wrap",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          document.body.classList.toggle("jy-past-hero", p > 0.11);
          const sections: Array<{ node: Element | null; on: boolean }> = [
            { node: hero, on: p < 0.13 },
            { node: dna, on: p >= 0.15 && p < 0.5 },
            { node: fork, on: p >= 0.55 },
          ];
          sections.forEach(({ node, on }) =>
            node?.classList.toggle("is-live", on),
          );
          const chapter = p < 0.16 ? 0 : p < 0.5 ? 1 : 2;
          el.querySelectorAll(".vy-rail-item").forEach((r, i) =>
            r.classList.toggle("is-on", i === chapter),
          );
        },
      });
    }, el);

    return () => {
      ctx.revert();
      document.body.classList.remove("jy-past-hero");
      journey.forkHover = "";
    };
  }, [staticMode]);

  return (
    <div ref={root} className={`vy-overlay${staticMode ? " vy-static" : ""}`}>
      {/* ── CAP 1 · HERO ──────────────────────────────────── */}
      <section
        id="hero"
        className="vy-sec vy-hero is-live"
        aria-label="Apresentação da NEOVANGUARD"
      >
        <div className="vy-hero-grid">
          <div className="vy-hero-copy card-1">
            <div className="vy-brand vy-enter vy-d1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" aria-hidden="true" width={40} height={30} />
              <span className="vy-brand-name">
                NEO<b>VANGUARD</b>
              </span>
              <span className="vy-brand-sep" aria-hidden="true" />
              <span className="vy-brand-tag">Agência digital · Brasil</span>
            </div>

            <h1 className="vy-h1 vy-enter vy-d2">
              Ecossistemas digitais que{" "}
              <span className="text-gradient">capturam, conectam e convertem</span>
            </h1>

            <p className="vy-sub vy-enter vy-d3">
              Design de alta performance, integração e automação — operados
              como um só sistema, em duas divisões:{" "}
              <strong>Ouro</strong> e <strong>Platina</strong>.
            </p>

            <div className="vy-cta-row vy-enter vy-d4">
              <Magnetic>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollToProgress(0.985)}
                >
                  Fazer a escolha
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <WhatsAppIcon />
                  Falar pelo WhatsApp
                </a>
              </Magnetic>
            </div>

            <div className="vy-trust vy-enter vy-d5" aria-hidden="true">
              <span className="vy-trust-line">
                {"//"} captura · conecta · converte
              </span>
            </div>
          </div>
          {/* coluna direita: a marca NV 3D vive aqui (dentro do canvas) */}
          <div className="vy-hero-space" aria-hidden="true" />
        </div>
        <div className="vy-hint" aria-hidden="true">
          <span>role para iniciar a jornada</span>
          <i />
        </div>
      </section>

      {/* ── CAP 2 · DNA ───────────────────────────────────── */}
      <section className="vy-sec vy-dna" aria-label="O DNA Neovanguard">
        <div className="vy-inner">
          <div className="vy-head card-2">
            <span className="section-eyebrow">O Ecossistema</span>
            <h2 className="vy-h2">
              Um DNA. <span className="text-accent-nvg">Três camadas.</span>
            </h2>
            <p className="vy-sub-sm">
              Tudo que entregamos — do site à automação — se apoia na mesma
              espinha dorsal.
            </p>
          </div>
          <div className="vy-dna-grid">
            {DNA_LAYERS.map((l) => (
              <article key={l.num} className="vy-dna-card card-1">
                <span className="vy-num">{l.num}</span>
                <span className="vy-tier">{l.tier}</span>
                <h3>{l.title}</h3>
                <p>{l.desc}</p>
                <ul className="vy-tags">
                  {l.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAP 3 · A ESCOLHA (bifurcação 3D final) ───────── */}
      <section
        className="vy-sec vy-fork vy-fork-final"
        aria-label="A escolha: Ouro ou Platina"
      >
        <div className="vy-fork-layout">
          <div className="vy-head vy-fork-head card-2">
            <span className="section-eyebrow">A escolha</span>
            <h2 className="vy-h2">
              Duas divisões. <span className="text-accent-nvg">Um DNA.</span>
            </h2>
            <p className="vy-sub-sm">
              Ambas consultivas — o valor é apresentado na consulta. A
              diferença é a profundidade.
            </p>
          </div>

          {/* os resumos ancoram sob as estelas 3D */}
          <div className="vy-fork-grid vy-fork-grid--gate">
            <article
              className="vy-door vy-door--ouro card-1"
              onMouseEnter={() => hoverFork("ouro")}
              onMouseLeave={() => hoverFork("")}
              onFocus={() => hoverFork("ouro")}
              onBlur={() => hoverFork("")}
              onClick={() => cross("/ouro", "ouro")}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && cross("/ouro", "ouro")}
            >
              <span className="vy-door-tag">DIV_01 · PRODUTO CONSULTIVO</span>
              <h3 className="vy-door-title">OURO</h3>
              <p className="vy-door-desc">
                Presença sólida com escopo claro e entrega rápida. Uma consulta
                objetiva define o caminho — momentum para fazer acontecer.
              </p>
              <span className="vy-door-cta">
                Entrar no Ouro
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </article>

            <article
              className="vy-door vy-door--platina card-1"
              onMouseEnter={() => hoverFork("platina")}
              onMouseLeave={() => hoverFork("")}
              onFocus={() => hoverFork("platina")}
              onBlur={() => hoverFork("")}
              onClick={() => cross("/platina", "platina")}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && cross("/platina", "platina")}
            >
              <span className="vy-door-tag">DIV_02 · PARCERIA SOB MEDIDA</span>
              <h3 className="vy-door-title">PLATINA</h3>
              <p className="vy-door-desc">
                O sistema completo, desenhado para o seu negócio — diagnóstico
                profundo, resultado assumido, otimização contínua.
              </p>
              <span className="vy-door-cta">
                Entrar na Platina
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </article>
          </div>

          <footer className="vy-fork-foot">
            <span>© {new Date().getFullYear()} neovanguard</span>
            <span className="vy-foot-links">
              <Link href="/sobre">Quem somos</Link>
              <Link href="/contato">Contato</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={IG} target="_blank" rel="noopener noreferrer">
                <InstagramIcon /> Instagram
              </a>
            </span>
          </footer>
        </div>
      </section>

      {/* rail de capítulos */}
      {!staticMode && (
        <nav className="vy-rail" aria-label="Capítulos da jornada">
          {RAIL.map((r) => (
            <button
              key={r.label}
              type="button"
              className="vy-rail-item"
              onClick={() => scrollToProgress(r.p)}
            >
              <i />
              <span className="vy-rail-label">{r.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* A PASSAGEM — véu de travessia para as divisões */}
      <div ref={passRef} className="vy-passagem" aria-hidden="true" />
    </div>
  );
}
