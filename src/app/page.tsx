import Link from "next/link";
import dynamic from "next/dynamic";
import { WA } from "@/lib/constants";
import HomeChrome from "@/components/home/HomeChrome";
import { WhatsAppIcon } from "@/components/icons";

// a marca 3D só existe no cliente (WebGL) — fallback vetor dentro do componente
const NVMark3D = dynamic(() => import("@/components/brand/NVMark3D"), {
  ssr: true,
});

/**
 * HOME — papel creme, trilho de navegação numerado à esquerda e painéis
 * arredondados à direita (linguagem editorial tipo "units"), na paleta da
 * marca: MediumBlue principal + CornflowerBlue de acento.
 * Rolagem NATIVA: sem jornada 3D scroll-jacked, sem snap, sem Lenis.
 */

const RAIL = [
  { n: "01", label: "Ouro", href: "/ouro", tone: "a" },
  { n: "02", label: "Consulta rápida", href: "/solucao", tone: "b" },
  { n: "03", label: "Exemplos", href: "/exemplos", tone: "c" },
  { n: "04", label: "Contato", href: "/contato", tone: "d" },
] as const;

const SERVICOS = [
  {
    n: "01",
    t: "Sistemas sob medida",
    d: "Painéis, cadastros e fluxos desenhados para a operação que você já tem — não para um manual genérico.",
  },
  {
    n: "02",
    t: "Automação & IA aplicada",
    d: "Robôs e integrações que tiram o trabalho manual do caminho: orçamento, cobrança, atendimento e relatório.",
  },
  {
    n: "03",
    t: "Lojas e catálogos",
    d: "Cardápio digital, agendamento e e-commerce com painel próprio — no ar, vendendo, com você no controle.",
  },
  {
    n: "04",
    t: "Suporte que responde",
    d: "WhatsApp direto com quem construiu, atualizações e monitoramento. Sem fila, sem ticket, sem contrato mínimo.",
  },
];

const NUMEROS = [
  ["16 dias", "prazo máximo de entrega"],
  ["20–30 min", "consulta que fecha o escopo"],
  ["3 h", "janela típica de suporte"],
  ["100%", "remoto, Brasil inteiro"],
] as const;

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function Home() {
  return (
    <main id="main" className="home-units">
      <HomeChrome />
      <div className="un-shell">
        {/* ── trilho fixo: marca + rotas numeradas ───────────── */}
        <aside className="un-rail" aria-label="Navegação principal">
          <Link href="/" className="un-brand" aria-label="NEOVANGUARD — início">
            <img src="/logo-solid.svg" alt="" aria-hidden="true" width={44} height={32} />
            <span className="un-brand-word">
              neovanguard<b>.</b>
            </span>
            <span className="un-brand-tag">ferramentas para negócios</span>
          </Link>

          <nav className="un-rail-nav">
            {RAIL.map((r) => (
              <Link key={r.href} href={r.href} className={`un-tile un-tile--${r.tone}`}>
                <span className="un-tile-n">{r.n}</span>
                <span className="un-tile-arrow">
                  <Arrow />
                </span>
                <span className="un-tile-label">{r.label}</span>
              </Link>
            ))}
          </nav>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="un-rail-cta"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>
          <div className="un-rail-foot">
            <span>Brasil · 100% remoto</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </aside>

        {/* ── coluna de conteúdo: rolagem normal ─────────────── */}
        <div className="un-stack">
          <section id="inicio" className="un-hero" aria-label="Apresentação da NEOVANGUARD">
            <div className="un-hero-art">
              <NVMark3D />
            </div>
            <div className="un-hero-copy">
              <span className="un-eyebrow">Estúdio de tecnologia · desde 2023</span>
              <h1 className="un-h1">
                A ferramenta certa
                <br />
                para o seu problema.
              </h1>
              <p className="un-lead">
                Sistemas, automações e IA sob medida. Entendemos a dor, fechamos
                o escopo e entregamos funcionando — com prazo definido e sem
                contrato mínimo.
              </p>
              <div className="un-hero-cta">
                <Link href="/solucao" className="un-pill">
                  Quero resolver um problema
                  <Arrow />
                </Link>
                <Link href="/ouro" className="un-pill un-pill--ghost">
                  Conhecer o Ouro
                </Link>
              </div>
            </div>
            <p className="un-hero-note">
              entrega em até 16 dias · escopo fechado antes de começar · suporte
              via WhatsApp
            </p>
          </section>

          {/* ── o que fazemos ── */}
          <section className="un-sec" aria-labelledby="svc-h">
            <header className="un-sec-head">
              <span className="un-eyebrow un-eyebrow--ink">O que fazemos</span>
              <h2 id="svc-h" className="un-h2">
                Quatro frentes, <em>um organismo só.</em>
              </h2>
            </header>
            <div className="un-cards">
              {SERVICOS.map((s) => (
                <article key={s.n} className="un-card">
                  <span className="un-card-n">{s.n}</span>
                  <h3 className="un-card-t">{s.t}</h3>
                  <p className="un-card-d">{s.d}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── números ── */}
          <section className="un-band" aria-label="Como trabalhamos">
            <dl className="un-nums">
              {NUMEROS.map(([n, l]) => (
                <div key={l} className="un-num">
                  <dt>{n}</dt>
                  <dd>{l}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── as duas divisões ── */}
          <section className="un-sec" aria-labelledby="div-h">
            <header className="un-sec-head">
              <span className="un-eyebrow un-eyebrow--ink">As divisões</span>
              <h2 id="div-h" className="un-h2">
                Duas portas. <em>O mesmo DNA.</em>
              </h2>
            </header>
            <div className="un-doors">
              <Link href="/ouro" className="un-door un-door--ouro">
                <span className="un-door-flag">Comece por aqui</span>
                <h3>Ouro</h3>
                <p>
                  O caminho direto: a ferramenta que o negócio precisa, escopo
                  fechado e entrega rápida. Uma consulta objetiva define o plano.
                </p>
                <span className="un-door-cta">
                  Entrar no Ouro
                  <Arrow />
                </span>
              </Link>
              <Link href="/contato" className="un-door un-door--platina">
                <span className="un-door-flag">Vagas limitadas</span>
                <h3>Platina</h3>
                <p>
                  Parceria completa e sob medida, para poucas operações por vez.
                  Você se candidata, nós analisamos e retornamos em até 48h.
                </p>
                <span className="un-door-cta">
                  Candidatar-se
                  <Arrow />
                </span>
              </Link>
            </div>
          </section>

          {/* ── fecho ── */}
          <section className="un-final" aria-label="Fale com a gente">
            <h2 className="un-h2 un-h2--xl">
              Conta o problema.
              <br />
              A gente devolve a ferramenta.
            </h2>
            <div className="un-hero-cta">
              <Link href="/solucao" className="un-pill un-pill--light">
                Fazer a consulta rápida
                <Arrow />
              </Link>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="un-pill un-pill--outline"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
