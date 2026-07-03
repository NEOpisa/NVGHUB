export type PacoteKey =
  | "Vitrine"
  | "Presença"
  | "Sistema"
  | "E-commerce"
  | "SaaS";

export type Pacote = {
  name: PacoteKey;
  tagline: string;
  featured: boolean;
  badge?: string;
  badgeVariant?: string;
  features: string[];
  cta: string;
};

export const PACOTES: Pacote[] = [
  {
    name: "Vitrine",
    tagline: "Para quem quer existir online rapidamente",
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
  },
  {
    name: "Presença",
    tagline: "Para quem quer ser encontrado no Google",
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
  },
  {
    name: "Sistema",
    tagline: "Para quem quer o site funcionando como ferramenta do negócio",
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
  },
  {
    name: "E-commerce",
    tagline: "Para quem quer vender online",
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
  },
  {
    name: "SaaS",
    tagline: "Plataforma pronta pro seu segmento, por assinatura",
    featured: false,
    badge: "Novo",
    features: [
      "Plataforma pronta para clínicas e restaurantes",
      "No ar em até 5 dias úteis",
      "Atualizações e suporte contínuo inclusos",
      "Sem desenvolvimento customizado",
      "Cancele quando quiser",
    ],
    cta: "Ativar meu SaaS",
  },
];
