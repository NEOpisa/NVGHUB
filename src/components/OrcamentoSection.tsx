"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import {
  CheckIcon,
  WhatsAppIcon,
  StoreIcon,
  MapPinIcon,
  CartIcon,
  GlobeIcon,
  EditIcon,
  BarChartIcon,
  BotIcon,
  PaletteIcon,
  FileTextIcon,
  ZapIcon,
  ShieldIcon,
} from "@/components/icons";
import LeadModal from "@/components/LeadModal";

const OPCOES = [
  { id: "site",       label: "+ Site Profissional",          desc: "Página única apresentando a empresa, descrição e botão WhatsApp", price: 530,  icon: <StoreIcon size={18} /> },
  { id: "pagina",     label: "+ Página Extra",             desc: "Adicione uma página ao site (Sobre, Serviços, Blog, Portfólio)", price: 150, icon: <FileTextIcon size={18} /> },
  { id: "dominio",    label: "+ Domínio & E-mail Profissional", desc: "Registro do domínio (.com.br) por 1 ano + e-mails com seu nome", price: 380, icon: <GlobeIcon size={18} /> },
  { id: "presenca",   label: "+ SEO Local & Google",       desc: "SEO local básico + Google Meu Negócio configurado",           price: 305,  icon: <MapPinIcon size={18} /> },
  { id: "identidade", label: "+ Identidade Visual",        desc: "Logo, paleta de cores e manual básico de marca",              price: 365,  icon: <PaletteIcon size={18} /> },
  { id: "blog",       label: "+ Blog / Área de Conteúdo",  desc: "Página de blog para publicar novidades e melhorar seu SEO",  price: 240,  icon: <EditIcon size={18} /> },
  { id: "analytics",  label: "+ Análise de Tráfego",       desc: "Google Analytics e Meta Pixel configurados para acompanhar visitantes", price: 250, icon: <BarChartIcon size={18} /> },
  { id: "loja",       label: "+ Loja Virtual Simples",     desc: "Catálogo com carrinho e pagamento via Pix ou cartão (até 20 produtos)", price: 1350, icon: <CartIcon size={18} /> },
  { id: "whatsapp",   label: "+ Catálogo no WhatsApp",     desc: "Configuração do catálogo de produtos e respostas automáticas", price: 380,  icon: <WhatsAppIcon size={18} /> },
  { id: "chatbot",    label: "+ Chatbot no Site",          desc: "Assistente automático para responder perguntas frequentes dos visitantes", price: 1280, icon: <BotIcon size={18} /> },
  { id: "velocidade", label: "+ Otimização de Performance", desc: "Ajustes técnicos para o site carregar mais rápido e pontuar melhor no Google", price: 200, icon: <ZapIcon size={18} /> },
  { id: "manutencao", label: "+ Suporte Estendido",        desc: "Mais 5 meses de suporte além do período incluso nos pacotes", price: 425,  icon: <ShieldIcon size={18} /> },
];

const CATEGORIAS = [
  { name: "Para começar", ids: ["site", "pagina", "dominio", "presenca"] },
  { name: "Conteúdo & Marca", ids: ["identidade", "blog", "analytics"] },
  { name: "Sistemas & Vendas", ids: ["loja", "whatsapp", "chatbot"] },
  { name: "Suporte & Performance", ids: ["velocidade", "manutencao"] },
];

function useAnimatedTotal(total: number) {
  const [display, setDisplay] = useState(total);
  const prevRef = useRef(total);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = total;
    if (from === total) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(total);
      return;
    }
    const start = performance.now();
    const DURATION = 520;
    let raf: number;
    const tick = (now: number) => {
      const linear = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      setDisplay(Math.round(from + (total - from) * eased));
      if (linear < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  return display;
}

export default function OrcamentoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  const toggle = (id: string) =>
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const itens = OPCOES.filter((o) => selecionados.includes(o.id));
  const total = itens.reduce((s, o) => s + o.price, 0);
  const totalAnimado = useAnimatedTotal(total);

  return (
    <div id="orcamento" className="comprar-part" aria-label="Monte seu orçamento">
      <div className="inner">
        <div ref={headerRef} className="comprar-part-head">
          <h3 className="comprar-part-title">Monte o seu orçamento</h3>
          <p className="section-sub">
            Adicione serviços avulsos um de cada vez e veja o preço atualizar na hora. Sem enrolação.
          </p>
        </div>

        <div className="orcamento-layout">
          <div className="orcamento-cats">
            {CATEGORIAS.map((categoria) => (
              <div className="orcamento-categoria" key={categoria.name}>
                <h4 className="orcamento-categoria-title">{categoria.name}</h4>
                <div className="orcamento-grid">
                  {categoria.ids.map((id) => {
                    const opcao = OPCOES.find((o) => o.id === id)!;
                    const ativo = selecionados.includes(opcao.id);
                    return (
                      <button
                        key={opcao.id}
                        className={`orcamento-item${ativo ? " ativo" : ""}`}
                        onClick={() => toggle(opcao.id)}
                        aria-pressed={ativo}
                      >
                        <span className="orcamento-burst" aria-hidden="true" />
                        <div className="orcamento-icon" aria-hidden="true">{opcao.icon}</div>
                        <div className="orcamento-info">
                          <div className="orcamento-label">{opcao.label}</div>
                          <div className="orcamento-desc">{opcao.desc}</div>
                        </div>
                        <div className="orcamento-price">
                          + R$ {opcao.price.toLocaleString("pt-BR")}
                        </div>
                        <div className="orcamento-check" aria-hidden="true">
                          {ativo && <CheckIcon size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="orcamento-summary">
            <div className="orcamento-footer">
              <span className="orcamento-shine" key={total} aria-hidden="true" />
              <div className="orcamento-total">
                <span className="orcamento-total-label">
                  Total estimado
                  {selecionados.length > 0 && (
                    <span className="orcamento-count-badge">
                      {selecionados.length} {selecionados.length === 1 ? "item" : "itens"}
                    </span>
                  )}
                </span>
                <span className="orcamento-total-value" key={total}>
                  {selecionados.length === 0
                    ? "—"
                    : `R$ ${totalAnimado.toLocaleString("pt-BR")}`}
                </span>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setModalAberto(true)}
              >
                {selecionados.length === 0 ? "Falar com a equipe" : "Solicitar este orçamento"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </aside>
        </div>

        <div className="comprar-crosslink">
          <p>Prefere algo pronto, com preço fechado?</p>
          <Link href="/pacotes" className="btn-ghost">
            Ver pacotes prontos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      <LeadModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        origem="orcamento"
        tipo="Orçamento sob medida"
        itens={itens.map((o) => ({ label: o.label, price: o.price }))}
        valor={selecionados.length > 0 ? total : null}
      />
    </div>
  );
}

