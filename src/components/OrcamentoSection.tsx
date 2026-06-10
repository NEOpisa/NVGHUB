"use client";

import { useState, useRef } from "react";
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
import { WA } from "@/lib/constants";

const OPCOES = [
  { id: "site",       label: "Site Profissional",          desc: "Página única apresentando a empresa, descrição e botão WhatsApp", price: 530,  icon: <StoreIcon size={18} /> },
  { id: "pagina",     label: "+ Página Extra",             desc: "Adicione uma página ao site (Sobre, Serviços, Blog, Portfólio)", price: 150, icon: <FileTextIcon size={18} /> },
  { id: "dominio",    label: "+ Domínio & E-mail Profissional", desc: "Registro do domínio (.com.br) por 1 ano + e-mails com seu nome", price: 380, icon: <GlobeIcon size={18} /> },
  { id: "presenca",   label: "+ SEO Local & Google",       desc: "SEO local básico + Google Meu Negócio configurado",           price: 305,  icon: <MapPinIcon size={18} /> },
  { id: "identidade", label: "+ Identidade Visual",        desc: "Logo, paleta de cores e manual básico de marca",              price: 365,  icon: <PaletteIcon size={18} /> },
  { id: "blog",       label: "+ Blog / Área de Conteúdo",  desc: "Página de blog para publicar novidades e melhorar seu SEO",  price: 240,  icon: <EditIcon size={18} /> },
  { id: "analytics",  label: "+ Análise de Tráfego",       desc: "Google Analytics e Meta Pixel configurados para acompanhar visitantes", price: 250, icon: <BarChartIcon size={18} /> },
  { id: "loja",       label: "+ Loja Virtual Simples",     desc: "Catálogo com carrinho e pagamento via Pix ou cartão (até 20 produtos)", price: 1350, icon: <CartIcon size={18} /> },
  { id: "whatsapp",   label: "+ Catálogo no WhatsApp",     desc: "Configuração do catálogo de produtos e respostas automáticas", price: 280,  icon: <WhatsAppIcon size={18} /> },
  { id: "chatbot",    label: "+ Chatbot no Site",          desc: "Assistente automático para responder perguntas frequentes dos visitantes", price: 380, icon: <BotIcon size={18} /> },
  { id: "velocidade", label: "+ Otimização de Performance", desc: "Ajustes técnicos para o site carregar mais rápido e pontuar melhor no Google", price: 200, icon: <ZapIcon size={18} /> },
  { id: "manutencao", label: "+ Suporte Estendido",        desc: "Mais 5 meses de suporte além do período incluso nos pacotes", price: 425,  icon: <ShieldIcon size={18} /> },
];

const CATEGORIAS = [
  { name: "Para começar", ids: ["site", "dominio", "presenca"] },
  { name: "Conteúdo & Marca", ids: ["identidade", "blog", "pagina", "analytics"] },
  { name: "Sistemas & Vendas", ids: ["loja", "whatsapp", "chatbot"] },
  { name: "Suporte & Performance", ids: ["velocidade", "manutencao"] },
];

export default function OrcamentoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);

  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const itens = OPCOES.filter((o) => selecionados.includes(o.id));
  const total = itens.reduce((s, o) => s + o.price, 0);

  const msg =
    itens.length > 0
      ? `Olá! Quero um orçamento para: ${itens.map((o) => o.label).join(", ")}. Total estimado: R$ ${total.toLocaleString("pt-BR")}.`
      : "Olá! Quero um orçamento da Neovanguard.";

  return (
    <section id="orcamento" aria-label="Monte seu orçamento">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Orçamento</span>
          <h2 className="section-heading">
            Monte o seu <span className="text-accent-nvg">pacote</span>
          </h2>
          <p className="section-sub">
            Adicione serviços avulsos um de cada vez e veja o preço atualizar na hora. Sem enrolação.
          </p>
        </div>

        {CATEGORIAS.map((categoria) => (
          <div className="orcamento-categoria" key={categoria.name}>
            <h3 className="orcamento-categoria-title">{categoria.name}</h3>
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

        <div className="orcamento-footer">
          <div className="orcamento-total">
            <span className="orcamento-total-label">Total estimado</span>
            <span className="orcamento-total-value" key={total}>
              {selecionados.length === 0 ? "—" : `R$ ${total.toLocaleString("pt-BR")}`}
            </span>
          </div>
          <a
            href={`${WA}?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon size={15} />
            {selecionados.length === 0 ? "Falar com a equipe" : "Solicitar este orçamento"}
          </a>
        </div>
      </div>
    </section>
  );
}

