/* ============================================================
   SITE.CONFIG — o único arquivo que você precisa editar.
   Troque textos, preços, peças e contatos abaixo e a loja
   inteira se atualiza. Nenhum conteúdo vive dentro de componente.
   A geometria das roupas do provador (os desenhos) fica em
   components/Provador.tsx — aqui você controla nome, preço e cor.
   ============================================================ */

const unsplash = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  /** Nome da marca. `destaque` é o trecho pintado de argila no logo. */
  nome: "Ravelle",
  destaque: "elle",
  cidade: "São Paulo",
  bairro: "Vila Madalena",

  /** Só números, com DDI — vira link wa.me e recebe os looks montados. */
  whatsapp: "5511999990000",
  whatsappBonito: "(11) 99999-0000",
  instagram: "ravelle.atelier",
  email: "ola@ravelle.com.br",

  endereco: "Rua Harmonia, 412 — Vila Madalena",
  horario: "Seg–Sáb · 10h às 19h",

  /** Prova social discreta exibida no hero. */
  prova: "Peças em série curta · costura nacional · desde 2018",

  seo: {
    titulo: "Ravelle — Atelier de moda autoral em São Paulo",
    descricao:
      "Boutique de moda autoral na Vila Madalena. Monte seu look no provador virtual, escolha cor e tamanho e finalize direto no WhatsApp — sem app, sem cadastro.",
  },
} as const;

/* ---------- Hero ---------- */

export const hero = {
  tag: "Coleção Luz Difusa · Outono",
  titulo1: "Vista a sua",
  titulo2: "própria luz.",
  lead: "Peças autorais em séries curtas, pensadas para combinar entre si. Monte o look no provador virtual — cor, caimento e tamanho — e nós separamos para você.",
  ctaPrimario: "Abrir o provador",
  ctaSecundario: "Ver a coleção",
  imagem: {
    src: unsplash("1490481651871-ab68de25d43d", 900),
    alt: "Modelo em alfaiataria clara fotografada em luz natural difusa",
  },
} as const;

/* ---------- Marquee (faixa que desliza entre as seções) ---------- */

export const marquee = [
  "Alfaiataria",
  "Tricô",
  "Seda",
  "Linho",
  "Sob medida",
  "Série curta",
] as const;

/* ============================================================
   PROVADOR VIRTUAL — seletor de looks reais
   Cada look é uma foto real de modelo. Trocar o look faz a foto
   trocar em crossfade. `paleta` são os tons do look (bolinhas),
   `pecas` é a composição e `preco` é o total do look.
   Fotos: Pexels (uso comercial livre). Troque pelas suas em `src`.
   ============================================================ */

const pexels = (id: number, w = 760, h = 950) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export type Look = {
  id: string;
  nome: string;
  estilo: string;
  /** Tom principal do look (entra na mensagem do WhatsApp). */
  cor: string;
  /** Tons do look exibidos como bolinhas. */
  paleta: string[];
  /** Composição do look. */
  pecas: string[];
  /** Total do look. */
  preco: number;
  src: string;
  alt: string;
};

export const looks: Look[] = [
  {
    id: "alfaiataria-rose",
    nome: "Alfaiataria Rosé",
    estilo: "Alfaiataria",
    cor: "Rosé",
    paleta: ["#C98B86", "#EAE3D8", "#7A5C5C"],
    pecas: ["Blazer estruturado", "Calça de alfaiataria", "Regata de seda"],
    preco: 1477,
    src: pexels(7203488),
    alt: "Modelo com blazer e calça de alfaiataria rosé sobre regata de seda clara",
  },
  {
    id: "marfim-total",
    nome: "Marfim Total",
    estilo: "Alfaiataria",
    cor: "Marfim",
    paleta: ["#ECE6DA", "#D8CFC0"],
    pecas: ["Blazer marfim", "Calça flare", "Mule de couro"],
    preco: 1398,
    src: pexels(31215272),
    alt: "Modelo em look total marfim com blazer e calça flare claros",
  },
  {
    id: "vestido-po-de-rosa",
    nome: "Vestido Pó-de-rosa",
    estilo: "Vestidos",
    cor: "Pó-de-rosa",
    paleta: ["#C9A6A6", "#7A5C5C"],
    pecas: ["Vestido tubinho", "Cinto fino"],
    preco: 549,
    src: pexels(30246250),
    alt: "Modelo com vestido tubinho pó-de-rosa e cinto fino",
  },
  {
    id: "vestido-coral",
    nome: "Vestido Coral",
    estilo: "Vestidos",
    cor: "Coral",
    paleta: ["#E08A6E", "#D86A52"],
    pecas: ["Vestido slip", "Sandália de tira"],
    preco: 629,
    src: pexels(30381007),
    alt: "Modelo com vestido slip coral fluido",
  },
  {
    id: "animal-print",
    nome: "Onça & Preto",
    estilo: "Camisaria",
    cor: "Onça",
    paleta: ["#B98A52", "#2B2622", "#7A5A36"],
    pecas: ["Camisa estampa onça", "Calça flare preta"],
    preco: 788,
    src: pexels(32166790),
    alt: "Modelo com camisa de estampa onça e calça flare preta",
  },
  {
    id: "off-duty",
    nome: "Off-duty",
    estilo: "Casual",
    cor: "Branco & Jeans",
    paleta: ["#ECE6DA", "#5A6B86"],
    pecas: ["Blusa canelada", "Jeans reto"],
    preco: 718,
    src: pexels(27542891),
    alt: "Modelo com blusa canelada branca e jeans reto",
  },
];

export const provador = {
  titulo: "O provador que abre antes da loja.",
  lead: "Navegue pelos looks da estação, veja como cada um cai e escolha o seu tamanho. Quando achar o seu, ele vai pronto para o nosso WhatsApp.",
  tamanhos: ["PP", "P", "M", "G", "GG"],
  /** Primeira linha da mensagem que chega no seu WhatsApp. */
  saudacao: "Olá, Ravelle! Gostei deste look no provador virtual:",
} as const;

/* ---------- Vitrine (grade de produtos) ---------- */

export type Produto = {
  nome: string;
  categoria: string;
  preco: string;
  imagem: string;
  alt: string;
  /** "Novo", "Última peça"… deixe "" para não exibir selo. */
  selo?: string;
};

export const vitrineHead = {
  titulo: "A coleção",
  intro: "Séries curtas, tecidos naturais e modelagem que sobrevive à estação. Toda peça da vitrine entra no provador.",
} as const;

export const vitrine: Produto[] = [
  {
    nome: "Blazer Difusa",
    categoria: "Alfaiataria",
    preco: "R$ 689",
    imagem: unsplash("1591047139829-d91aecb6caea", 700),
    alt: "Blazer de alfaiataria claro sobre fundo neutro",
    selo: "Novo",
  },
  {
    nome: "Vestido Bias",
    categoria: "Vestidos",
    preco: "R$ 549",
    imagem: unsplash("1572804013309-59a88b7e92f1", 700),
    alt: "Vestido slip fluido em tom acetinado",
  },
  {
    nome: "Tricô Âmbar",
    categoria: "Malhas",
    preco: "R$ 289",
    imagem: unsplash("1576566588028-4147f3842f27", 700),
    alt: "Tricô de gola alta em tom terroso dobrado",
    selo: "Última peça",
  },
  {
    nome: "Pantalona Linho",
    categoria: "Calças",
    preco: "R$ 459",
    imagem: unsplash("1594633312681-425c7b97ccd1", 700),
    alt: "Calça pantalona de linho com caimento amplo",
  },
  {
    nome: "Saia Plissê",
    categoria: "Saias",
    preco: "R$ 379",
    imagem: unsplash("1551489186-cf8726f514f8", 700),
    alt: "Saia midi plissada em movimento",
  },
  {
    nome: "Camisa Seda",
    categoria: "Camisaria",
    preco: "R$ 329",
    imagem: unsplash("1564257631407-4deb1f99d992", 700),
    alt: "Camisa de seda clara pendurada em cabide de madeira",
  },
] as const;

/* ---------- Lookbook (galeria editorial horizontal) ---------- */

export const lookbook = {
  titulo: "Lookbook Luz Difusa",
  legenda: "Fotografado em luz natural, sem retoque de cor.",
  fotos: [
    { src: unsplash("1485968579580-b6d095142e6e", 900), alt: "Look de alfaiataria fotografado em parede clara" },
    { src: unsplash("1539109136881-3be0616acf4b", 900), alt: "Detalhe de tecido de linho em movimento" },
    { src: unsplash("1487222477894-8943e31ef7b2", 900), alt: "Modelo de costas com vestido fluido" },
    { src: unsplash("1496747611176-843222e1e57c", 900), alt: "Composição de peças neutras sobre fundo bege" },
    { src: unsplash("1483985988355-763728e1935b", 900), alt: "Bolsa e acessórios sobre tecido dobrado" },
  ],
} as const;

/* ---------- Manifesto ---------- */

export const manifesto = {
  titulo: "Menos coleções. Mais coleção.",
  paragrafos: [
    "A Ravelle nasceu de uma teimosia: roupa boa não precisa correr atrás de tendência. Cada peça é desenhada para conversar com as outras — você compra uma e ganha cinco combinações.",
    "Produzimos em série curta, com costureiras parceiras aqui em São Paulo. Sem estoque gigante, sem queima, sem pressa. O que você veste hoje continua fazendo sentido na próxima estação.",
  ],
  numeros: [
    { valor: "série curta", rotulo: "até 40 peças por modelo" },
    { valor: "100%", rotulo: "costura nacional" },
    { valor: "7 anos", rotulo: "vestindo São Paulo" },
  ],
} as const;

/* ---------- Depoimentos ---------- */

export const depoimentos = [
  {
    texto:
      "Montei o look no provador às onze da noite, mandei pelo WhatsApp e no dia seguinte estava separado pra provar. Comprei os dois.",
    autora: "Helena R.",
    peca: "Blazer + Pantalona",
  },
  {
    texto:
      "Sou difícil com caimento e a modelagem da Ravelle é a única que veste meu corpo sem ajuste. Virou meu uniforme.",
    autora: "Tatiana M.",
    peca: "Vestido slip",
  },
  {
    texto:
      "Comprei uma camisa há três anos e ela continua impecável. Isso é raro — e é o que me fez voltar pra coleção inteira.",
    autora: "Júlia P.",
    peca: "Camisa de seda",
  },
] as const;

/* ---------- Rodapé ---------- */

export const rodape = {
  assinatura: "Template por Neovanguard",
  lgpd: "Política de privacidade · LGPD",
} as const;
