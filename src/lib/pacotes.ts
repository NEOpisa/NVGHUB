export type PacoteKey =
  | "Vitrine"
  | "Presença"
  | "Sistema"
  | "E-commerce"
  | "SaaS";

export type Pacote = {
  name: PacoteKey;
  tagline: string;
  from: string;
  /** Texto exibido do preço (ex.: "R$ 430" ou "Em breve"). */
  price: string;
  /** Valor numérico em BRL para schema; null quando ainda não há preço. */
  priceNumber: number | null;
  period: string;
  featured: boolean;
  badge?: string;
  badgeVariant?: string;
  features: string[];
  cta: string;
  message: string;
};

export const PACOTES: Pacote[] = [
  {
    name: "Vitrine",
    tagline: "Para quem quer existir online rapidamente",
    from: "A partir de",
    price: "R$ 430",
    priceNumber: 430,
    period: "pagamento único",
    featured: false,
    badge: "Comece por aqui",
    badgeVariant: "alt",
    features: [
      "Página única profissional com foto e descrição do negócio",
      "Horário de funcionamento em destaque",
      "Botão WhatsApp integrado",
      "Links para todas as suas redes sociais",
      "Entrega em até 7 dias úteis",
      "2 meses de suporte",
    ],
    cta: "Começar com Vitrine",
    message: "Olá! Quero contratar o pacote Vitrine (R$ 430, pagamento único).",
  },
  {
    name: "Presença",
    tagline: "Para quem quer ser encontrado no Google",
    from: "A partir de",
    price: "R$ 730",
    priceNumber: 730,
    period: "pagamento único",
    featured: false,
    features: [
      "Landing page completa e responsiva",
      "SEO local básico",
      "Google Meu Negócio configurado",
      "Botão WhatsApp integrado",
      "Entrega em até 16 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Começar com Presença",
    message: "Olá! Quero contratar o pacote Presença (R$ 730, pagamento único).",
  },
  {
    name: "Sistema",
    tagline: "Para quem quer o site funcionando como ferramenta do negócio",
    from: "A partir de",
    price: "R$ 1.460",
    priceNumber: 1460,
    period: "pagamento único",
    featured: true,
    badge: "Mais escolhido",
    features: [
      "Tudo do pacote Presença",
      "Cardápio digital, agendamento ou catálogo",
      "Painel de controle do cliente",
      "Treinamento de uso por vídeo (1h)",
      "Entrega em até 26 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Começar com Sistema",
    message: "Olá! Quero contratar o pacote Sistema (R$ 1.460, pagamento único).",
  },
  {
    name: "E-commerce",
    tagline: "Para quem quer vender online",
    from: "A partir de",
    price: "R$ 3.130",
    priceNumber: 3130,
    period: "pagamento único",
    featured: false,
    features: [
      "Loja virtual completa com carrinho",
      "Pagamento via Pix e Mercado Pago",
      "Gestão básica de estoque",
      "Painel do lojista",
      "Entrega em até 35 dias úteis",
      "5 meses de suporte",
    ],
    cta: "Quero minha loja virtual",
    message: "Olá! Quero contratar o pacote E-commerce (R$ 3.130, pagamento único).",
  },
  {
    name: "SaaS",
    tagline: "Solução escalável em desenvolvimento",
    from: "Assinatura mensal",
    price: "Em breve",
    priceNumber: null,
    period: "Detalhes a confirmar",
    featured: false,
    badge: "Em breve",
    badgeVariant: "alt",
    features: [
      "Plataforma pronta pro seu segmento",
      "Sem desenvolvimento customizado",
      "Atualizações e suporte contínuo inclusos",
      "Preço e detalhes revelados em breve",
    ],
    cta: "Entrar na lista de espera",
    message: "Olá! Quero entrar na lista de espera do pacote SaaS da Neovanguard.",
  },
];
