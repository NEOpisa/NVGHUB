/* ============================================================
   SITE.CONFIG — o único arquivo que você precisa editar.
   Troque os textos, preços, fotos e contatos abaixo e o site
   inteiro se atualiza. Nenhum conteúdo vive dentro de componente.
   ============================================================ */

const unsplash = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  /** Nome do studio. `destaque` é a palavra pintada de mel no logo. */
  nome: "Studio Aura",
  destaque: "Aura",
  cidade: "São Paulo",
  bairro: "Jardins",

  /** Só números, com DDI — vira link wa.me e recebe os agendamentos. */
  whatsapp: "5511999990000",
  whatsappBonito: "(11) 99999-0000",
  instagram: "studioaura",
  email: "ola@studioaura.com.br",

  endereco: "Rua das Hortênsias, 248 — Jardins",
  horario: "Ter–Sáb · 9h às 20h",

  /** Prova social exibida discretamente no hero. */
  prova: "4,9 ★ no Google · +3.200 clientes · desde 2019",

  seo: {
    titulo: "Studio Aura — Estética & Beleza em São Paulo",
    descricao:
      "Studio de estética nos Jardins. Sobrancelhas, cílios, skincare e nails — reserve online e confirme direto no WhatsApp, sem taxas.",
  },
} as const;

/* ---------- Hero ---------- */

export const hero = {
  titulo1: "Beleza é ritual,",
  titulo2: "não rotina.",
  lead: "Sobrancelhas, cílios, skincare e nails em um studio desenhado para o seu tempo. Reserve online, confirme no WhatsApp e chegue só para relaxar.",
  ctaPrimario: "Reservar meu horário",
  ctaSecundario: "Conhecer os rituais",
  imagem: {
    src: unsplash("1570172619644-dfd03ed5d881", 900),
    alt: "Cliente de olhos fechados durante aplicação de máscara facial, à meia-luz do studio",
  },
} as const;

/* ---------- Marquee (faixa que desliza entre as seções) ---------- */

export const marquee = [
  "Sobrancelhas",
  "Cílios",
  "Skincare",
  "Nails",
  "Lash lifting",
  "Spa day",
] as const;

/* ---------- Menu de rituais ---------- */

export type Ritual = {
  nome: string;
  desc: string;
  duracao: string;
  preco: string;
  imagem: string;
  alt: string;
};

export const rituais: Ritual[] = [
  {
    nome: "Design de sobrancelhas",
    desc: "Mapeamento facial e design fio a fio na medida do seu rosto, com ou sem henna.",
    duracao: "45 min",
    preco: "R$ 90",
    imagem: unsplash("1487412947147-5cebf100ffc2", 700),
    alt: "Closeup do olhar com sobrancelhas desenhadas e sombra em tons rosados",
  },
  {
    nome: "Extensão de cílios",
    desc: "Volume brasileiro, híbrido ou egípcio com fios de seda premium.",
    duracao: "2h",
    preco: "R$ 220",
    imagem: unsplash("1512290923902-8a9f81dc236c", 700),
    alt: "Atendimento em andamento na maca do studio, à luz quente",
  },
  {
    nome: "Limpeza de pele",
    desc: "Protocolo completo: extração, máscara calmante e proteção final.",
    duracao: "1h30",
    preco: "R$ 180",
    imagem: unsplash("1596755389378-c31d21fd1273", 700),
    alt: "Máscara facial calmante aplicada durante protocolo de skincare",
  },
  {
    nome: "Nails design",
    desc: "Alongamento em gel, banho de gel e nail art autoral.",
    duracao: "1h40",
    preco: "R$ 140",
    imagem: unsplash("1519014816548-bf5fe059798b", 700),
    alt: "Nail art em esmalte vermelho com lettering delicado",
  },
  {
    nome: "Lash lifting",
    desc: "A curvatura dos seus próprios cílios, com efeito de até 8 semanas.",
    duracao: "1h",
    preco: "R$ 160",
    imagem: unsplash("1616394584738-fc6e612e71b9", 700),
    alt: "Pincel aplicando máscara no rosto de cliente relaxada",
  },
  {
    nome: "Aura Day",
    desc: "Sobrancelha, pele e nails no mesmo dia — com mimo de boas-vindas.",
    duracao: "3h30",
    preco: "R$ 360",
    imagem: unsplash("1519823551278-64ac92734fb1", 700),
    alt: "Massagem relaxante em maca clara durante o pacote spa",
  },
];

/* ---------- Antes & depois ----------
   Fotos reais da mesma cliente (Pexels, livre para uso comercial):
   natural durante a preparação × produção completa de maquiagem.
   Troque pelos seus próprios resultados em public/antes-depois/. */

export const antesDepois = {
  titulo: "O resultado fala baixo. E convence.",
  legenda: "Arraste para comparar — a mesma cliente, no mesmo dia.",
  antes: {
    src: "/antes-depois/antes.png",
    alt: "Cliente de rosto natural, sem maquiagem, durante a preparação no studio",
  },
  depois: {
    src: "/antes-depois/depois_aligned.jpg",
    alt: "A mesma cliente com maquiagem completa — delineador, blush e lábios gloss",
  },
} as const;

/* ---------- Clube de fidelidade ---------- */

export const clube = {
  nome: "Clube Aura",
  titulo: "Fidelidade que vira presente.",
  texto:
    "A cada atendimento, um selo no seu cartão digital. Complete cinco e o sexto ritual é por nossa conta — sem cartãozinho de papel para perder.",
  dica: "O cartão é de verdade: incline, toque nos selos.",
  selos: 5,
  recompensa: "Cartão completo! O próximo ritual é por nossa conta.",
} as const;

/* ---------- Equipe ---------- */

export type Profissional = {
  nome: string;
  especialidade: string;
  /** Deixe "" para exibir o monograma elegante no lugar da foto. */
  foto: string;
};

export const equipe: Profissional[] = [
  { nome: "Marina Couto", especialidade: "Brow & Lash Designer", foto: "" },
  { nome: "Letícia Alves", especialidade: "Esteticista Facial", foto: "" },
  { nome: "Bianca Rocha", especialidade: "Nail Artist", foto: "" },
  { nome: "Sofia Mendes", especialidade: "Lash Expert", foto: "" },
];

/* ---------- Agendamento ---------- */

export const agenda = {
  horarios: ["9:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"],
  /** Primeira linha da mensagem que chega no seu WhatsApp. */
  saudacao: "Olá! Vim pelo site e quero reservar:",
} as const;

/* ---------- Galeria ---------- */

export const galeria = [
  {
    src: unsplash("1522335789203-aabd1fc54bc9", 900),
    alt: "Produtos de maquiagem premium dispostos sobre mármore",
  },
  {
    src: unsplash("1607779097040-26e80aa78e66", 900),
    alt: "Unhas em tom nude acinzentado com detalhe glitter",
  },
  {
    src: unsplash("1560066984-138dadb4c035", 900),
    alt: "Interior do studio com espelhos iluminados e poltronas",
  },
  {
    src: unsplash("1515688594390-b649af70d282", 900),
    alt: "Pós e pincéis de maquiagem em tons de pele",
  },
  {
    src: unsplash("1512290923902-8a9f81dc236c", 900),
    alt: "Atendimento facial em andamento na maca do studio",
  },
  {
    src: unsplash("1596755389378-c31d21fd1273", 900),
    alt: "Máscara facial calmante durante protocolo de skincare",
  },
] as const;

/* ---------- Depoimentos ---------- */

export const depoimentos = [
  {
    texto:
      "Agendei pelo site em um minuto, sem mandar mensagem e ficar esperando resposta. Atendimento pontual e impecável.",
    autora: "Carolina F.",
    ritual: "Extensão de cílios",
  },
  {
    texto:
      "O cartão fidelidade digital é genial — ganhei minha limpeza de pele de presente no mês passado.",
    autora: "Priscila M.",
    ritual: "Clube Aura",
  },
  {
    texto:
      "Melhor design de sobrancelha da cidade. O studio é lindo e o cuidado com cada detalhe se nota na hora.",
    autora: "Renata D.",
    ritual: "Design de sobrancelhas",
  },
] as const;

/* ---------- Rodapé ---------- */

export const rodape = {
  assinatura: "Template por Neovanguard",
  lgpd: "Política de privacidade · LGPD",
} as const;
