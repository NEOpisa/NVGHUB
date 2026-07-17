"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import { eco, ecoWheelZone, ECO_PER_WHEEL } from "./ecoState";
import { journey } from "./journeyState";

/* camadas do organismo — cada módulo pertence a uma */
const LAYERS = {
  1: "BASE",
  2: "CONEXÃO",
  3: "INTELIGÊNCIA",
} as const;

type EcoItem = {
  id: string;
  layer: 1 | 2 | 3;
  /** rótulo curto ao lado do nó orbital */
  label: string;
  title: string;
  desc: string;
  chips: string[];
};

/* o catálogo COMPLETO do que a Neovanguard constrói — cada nó da órbita é um
   módulo do ecossistema; clicar abre o detalhe no painel lateral */
const ITEMS: EcoItem[] = [
  {
    id: "site",
    layer: 1,
    label: "Sites",
    title: "Site & Landing Pages",
    desc: "Feito para transformar visitante em cliente — rápido, bonito e pronto para o Google.",
    chips: ["Entrega 16d", "SEO-ready", "Conversão"],
  },
  {
    id: "mercado",
    layer: 1,
    label: "Sistema p/ Mercado",
    title: "Sistema para Mercado & Comércio",
    desc: "PDV, controle de estoque, código de barras e relatórios — a gestão inteira do seu comércio em um painel só.",
    chips: ["PDV", "Estoque", "Relatórios"],
  },
  {
    id: "agenda",
    layer: 1,
    label: "Agenda & Catálogo",
    title: "Agendamento, Cardápio & Catálogo",
    desc: "Seu cliente agenda, pede e compra sozinho — você acompanha tudo pelo painel incluso.",
    chips: ["Painel incluso", "Pedidos", "Reservas"],
  },
  {
    id: "saas",
    layer: 1,
    label: "SaaS",
    title: "SaaS para seu Segmento",
    desc: "Plataforma por assinatura pronta em dias, desenhada para o seu nicho.",
    chips: ["No ar em 5d", "Assinatura"],
  },
  {
    id: "crm",
    layer: 2,
    label: "CRM + WhatsApp",
    title: "CRM + WhatsApp",
    desc: "Nenhum lead se perde: funil organizado, respostas automáticas e follow-up sem esforço.",
    chips: ["Funil", "Automação", "Follow-up"],
  },
  {
    id: "integra",
    layer: 2,
    label: "Integrações",
    title: "Integrações & Pagamentos",
    desc: "Pix, gateways, ERPs e planilhas conversando entre si — dados fluindo sem retrabalho.",
    chips: ["Pix", "APIs", "Webhooks"],
  },
  {
    id: "seo",
    layer: 2,
    label: "SEO Local",
    title: "SEO & Presença Local",
    desc: "Apareça nas buscas do Google da sua região e transforme busca em visita.",
    chips: ["Google Business", "30–60d"],
  },
  {
    id: "ia",
    layer: 3,
    label: "IA & Agentes",
    title: "IA & Agentes de Atendimento",
    desc: "Atendimento, triagem e qualificação funcionando sozinhos, 24 horas por dia.",
    chips: ["Atendente IA", "24/7"],
  },
  {
    id: "lavoura",
    layer: 3,
    label: "Contador de Lavoura",
    title: "Contadores Automáticos para Lavoura",
    desc: "Visão computacional contando plantas, mudas e frutos por imagem — precisão de campo sem contagem manual.",
    chips: ["Visão computacional", "Drone/câmera", "Precisão"],
  },
  {
    id: "bi",
    layer: 3,
    label: "Dashboards",
    title: "Dashboards & BI",
    desc: "Os números do negócio em tempo real, com relatórios que chegam prontos.",
    chips: ["Tempo real", "KPIs"],
  },
  {
    id: "ecommerce",
    layer: 1,
    label: "Loja Virtual",
    title: "Loja Virtual & E-commerce",
    desc: "Vitrine, carrinho, pagamento e gestão de pedidos — a loja inteira rodando sozinha.",
    chips: ["Checkout", "Pix/Cartão", "Pedidos"],
  },
  {
    id: "app",
    layer: 1,
    label: "App / PWA",
    title: "Aplicativo Mobile / PWA",
    desc: "App instalável direto do navegador — sem depender de loja de aplicativos.",
    chips: ["Instalável", "Offline", "Push"],
  },
  {
    id: "landing",
    layer: 1,
    label: "Landing de Campanha",
    title: "Landing Pages de Campanha",
    desc: "Página única e veloz para lançamentos, promoções e captação.",
    chips: ["No ar em 7d", "A/B ready"],
  },
  {
    id: "branding",
    layer: 1,
    label: "Identidade Visual",
    title: "Identidade Visual & Branding",
    desc: "Logo, cores e tipografia — a marca inteira falando a mesma língua.",
    chips: ["Logo", "Guia de marca"],
  },
  {
    id: "portal",
    layer: 1,
    label: "Portal do Cliente",
    title: "Portal do Cliente",
    desc: "Área logada para seus clientes acompanharem pedidos, serviços e histórico.",
    chips: ["Login", "Histórico", "2ª via"],
  },
  {
    id: "trafego",
    layer: 2,
    label: "Tráfego Pago",
    title: "Tráfego Pago — Google & Meta",
    desc: "Campanhas com verba otimizada por dados, não por achismo.",
    chips: ["Google Ads", "Meta Ads", "ROI"],
  },
  {
    id: "funis",
    layer: 2,
    label: "E-mail & Funis",
    title: "E-mail Marketing & Funis",
    desc: "Sequências automáticas que transformam lista em receita recorrente.",
    chips: ["Automação", "Nutrição"],
  },
  {
    id: "rpa",
    layer: 3,
    label: "Automação de Processos",
    title: "Automação de Processos (RPA)",
    desc: "Robôs cuidando do repetitivo: planilhas, boletos, conciliação, relatórios.",
    chips: ["RPA", "Zero retrabalho"],
  },
  {
    id: "dados",
    layer: 3,
    label: "Coleta de Dados",
    title: "Coleta & Enriquecimento de Dados",
    desc: "Raspagem e organização de dados de mercado para decidir com base real.",
    chips: ["Scraping", "Mercado"],
  },
  {
    id: "cro",
    layer: 3,
    label: "Otimização Contínua",
    title: "Otimização Contínua & CRO",
    desc: "Testes e ajustes mensais para o mesmo tráfego converter cada vez mais.",
    chips: ["Testes A/B", "Mensal"],
  },
];

/**
 * Rótulos do SISTEMA PLANETÁRIO do ecossistema: cada botão é o rótulo de um
 * micro planeta real do canvas — um rAF cola cada rótulo na posição projetada
 * publicada pelo 3D em `eco.screen`. Clicar num planeta abre o detalhe no
 * painel lateral e destaca o planeta na cena. No mobile/estático, os rótulos
 * viram uma lista de chips (sem tracking).
 */
export default function EcoNodes({ staticMode = false }: { staticMode?: boolean }) {
  const [active, setActive] = useState(0);
  // direção da última troca: o conteúdo do painel desliza acompanhando o gesto
  const [dir, setDir] = useState<1 | -1>(1);
  const nodesRef = useRef<HTMLDivElement>(null);
  const item = ITEMS[active];

  /* seleciona um módulo (chip, seta, swipe) e gira a roda 3D correspondente */
  const select = (i: number, d?: 1 | -1) => {
    // sem direção explícita: o caminho mais curto no anel decide
    setDir(
      d ?? (((i - active + ITEMS.length) % ITEMS.length) <= ITEMS.length / 2 ? 1 : -1),
    );
    setActive(i);
    eco.active = i;
    eco.wheelIdx[Math.floor(i / ECO_PER_WHEEL)] = i % ECO_PER_WHEEL;
    eco.touched = true;
    navigator.vibrate?.(6); // tick háptico: a troca "encaixa" (no-op sem hw)
  };
  // swipe horizontal sobre o painel = próximo/anterior (gesto de carrossel)
  const swipe = useRef({ x: 0, y: 0 });
  const step = (d: 1 | -1) => {
    const next = (active + d + ITEMS.length) % ITEMS.length;
    select(next, d);
    track("eco_node", { id: ITEMS[next].id });
  };

  // mobile: a fita de chips acompanha a seleção (o ativo fica sempre à vista)
  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px)").matches) return;
    const btn =
      nodesRef.current?.querySelectorAll<HTMLElement>(".eco-node")[active];
    btn?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  // tracking DOM→planeta (só no modo GL desktop; mobile usa lista via CSS)
  useEffect(() => {
    if (staticMode) return;
    const root = nodesRef.current;
    if (!root) return;
    const btns = Array.from(root.querySelectorAll<HTMLElement>(".eco-node"));
    const mq = window.matchMedia("(max-width: 900px)");
    let wasTracking = false;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (mq.matches) {
        // virou mobile: limpa estilos inline uma vez e deixa o CSS mandar
        if (wasTracking) {
          wasTracking = false;
          root.classList.remove("is-tracking");
          for (const b of btns) {
            b.style.transform = "";
            b.style.opacity = "";
            b.style.width = "";
            b.style.height = "";
            b.style.pointerEvents = "";
          }
        }
        return;
      }
      if (!wasTracking) {
        wasTracking = true;
        root.classList.add("is-tracking");
      }
      for (let i = 0; i < btns.length; i++) {
        const s = eco.screen[i];
        if (!s) continue;
        // o botão É o retículo: quadrado do diâmetro projetado do planeta
        // (+ folga), centrado nele — o rótulo sai pela direita via CSS
        const d = Math.max(26, s.r * 2 + 14);
        btns[i].style.width = `${d.toFixed(1)}px`;
        btns[i].style.height = `${d.toFixed(1)}px`;
        btns[i].style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        btns[i].style.opacity = s.vis.toFixed(3);
        // placas de trás (esmaecidas) continuam clicáveis — o carrossel gira
        btns[i].style.pointerEvents = s.vis > 0.15 ? "auto" : "none";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [staticMode]);

  // GIRO POR SCROLL: com o ponteiro sobre uma roda, a rolagem gira a roda em
  // vez de navegar (o ChapterSnap cede a vez pela mesma ecoWheelZone).
  // Captura na janela: pega o gesto antes do Lenis, sobre qualquer elemento.
  useEffect(() => {
    if (staticMode) return;
    const mq = window.matchMedia("(max-width: 900px)");
    let acc = 0;
    let lastStep = 0;
    const onWheel = (e: WheelEvent) => {
      if (mq.matches) return;
      const b = ecoWheelZone(e.clientX, e.clientY);
      if (b < 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      eco.touched = true; // o visitante entendeu — a demonstração para
      acc += e.deltaY;
      const now = performance.now();
      if (Math.abs(acc) < 70 || now - lastStep < 150) return;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      lastStep = now;
      const idx = (eco.wheelIdx[b] + dir + ECO_PER_WHEEL) % ECO_PER_WHEEL;
      eco.wheelIdx[b] = idx;
      eco.active = b * ECO_PER_WHEEL + idx;
      setDir(dir); // o painel desliza acompanhando o giro
      setActive(eco.active);
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", onWheel, { capture: true });
  }, [staticMode]);

  // DEMONSTRAÇÃO: até a primeira interação, as rodas giram sozinhas de
  // tempos em tempos (alternando os lados) — os desatentos VEEM que roda.
  useEffect(() => {
    if (staticMode) return;
    let b = 1;
    const id = window.setInterval(() => {
      if (eco.touched) {
        window.clearInterval(id);
        return;
      }
      if (journey.progress < 0.22 || journey.progress > 0.48) return;
      if (document.hidden) return;
      b = 1 - b;
      const idx = (eco.wheelIdx[b] + 1) % ECO_PER_WHEEL;
      eco.wheelIdx[b] = idx;
      eco.active = b * ECO_PER_WHEEL + idx;
      setActive(eco.active);
    }, 4200);
    return () => window.clearInterval(id);
  }, [staticMode]);

  return (
    <div className="eco-map">
      <div
        ref={nodesRef}
        className="eco-nodes"
        role="group"
        aria-label="Módulos do ecossistema"
      >
        {ITEMS.map((it, i) => (
          <button
            key={it.id}
            type="button"
            className={`eco-node${i >= ECO_PER_WHEEL ? " eco-node--rw" : ""}${
              i === active ? " is-active" : ""
            }`}
            data-layer={it.layer}
            aria-pressed={i === active}
            onClick={() => {
              select(i);
              track("eco_node", { id: it.id });
            }}
          >
            <span className="eco-node-ring" aria-hidden="true">
              <i />
            </span>
            <span className="eco-node-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="eco-node-label">{it.label}</span>
          </button>
        ))}
      </div>

      <div
        className="eco-panel"
        data-layer={item.layer}
        data-dir={dir}
        role="region"
        aria-live="polite"
        aria-label="Detalhe do módulo selecionado"
        onTouchStart={(e) => {
          swipe.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - swipe.current.x;
          const dy = e.changedTouches[0].clientY - swipe.current.y;
          if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4)
            step(dx < 0 ? 1 : -1);
        }}
      >
        {/* barra da camada: a assinatura colorida do módulo ativo */}
        <span className="eco-panel-bar" aria-hidden="true" />
        <div className="eco-panel-head">
          <span className="eco-panel-tag">
            <i aria-hidden="true" />
            {LAYERS[item.layer]}
          </span>
          {/* navegação por toque (só mobile via CSS): o carrossel funciona
              mesmo sem rolar a fita de chips */}
          <span className="eco-panel-nav" role="group" aria-label="Navegar módulos">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Módulo anterior"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próximo módulo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </span>
        </div>
        {/* fio de coleção: quanto do catálogo você já percorreu */}
        <span className="eco-progress" aria-hidden="true">
          <i
            style={{ transform: `scaleX(${(active + 1) / ITEMS.length})` }}
          />
        </span>
        {/* key={active}: remonta e a entrada desliza na direção do gesto */}
        <div className="eco-panel-body" key={active}>
          <h3 className="eco-panel-title">{item.title}</h3>
          <p className="eco-panel-desc">{item.desc}</p>
          <ul className="eco-panel-chips">
            {item.chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="eco-panel-cta"
        >
          <WhatsAppIcon />
          Falar sobre este módulo
        </a>
      </div>
    </div>
  );
}
