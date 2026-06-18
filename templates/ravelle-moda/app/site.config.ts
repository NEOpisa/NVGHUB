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
   PROVADOR VIRTUAL
   `cor` aponta para uma chave de `cores` (abaixo). A geometria
   de cada peça (o desenho) é definida pelo `id` em Provador.tsx.
   ============================================================ */

export type Cor = { key: string; nome: string; hex: string };

/** Cartela de cores que recolore as peças no provador. */
export const cores: Cor[] = [
  { key: "osso", nome: "Osso", hex: "#ECE6DA" },
  { key: "argila", nome: "Argila", hex: "#BE7257" },
  { key: "espresso", nome: "Espresso", hex: "#3B332C" },
  { key: "salvia", nome: "Sálvia", hex: "#9AA886" },
  { key: "manteiga", nome: "Manteiga", hex: "#E7C579" },
  { key: "tinta", nome: "Azul tinta", hex: "#3C4A69" },
  { key: "vinho", nome: "Vinho", hex: "#6E2C3B" },
];

export type Peca = {
  id: string;
  nome: string;
  /** "top" e "bottom" formam um conjunto; "vestido" é peça única. */
  tipo: "top" | "bottom" | "vestido";
  preco: number;
  /** Cor inicial (chave em `cores`). */
  cor: string;
};

export const pecas: Peca[] = [
  { id: "blusa", nome: "Blusa de seda", tipo: "top", preco: 329, cor: "osso" },
  { id: "trico", nome: "Tricô gola alta", tipo: "top", preco: 289, cor: "argila" },
  { id: "blazer", nome: "Blazer de alfaiataria", tipo: "top", preco: 689, cor: "espresso" },
  { id: "pantalona", nome: "Calça pantalona", tipo: "bottom", preco: 459, cor: "espresso" },
  { id: "saia", nome: "Saia midi plissada", tipo: "bottom", preco: 379, cor: "salvia" },
  { id: "reta", nome: "Calça reta cropped", tipo: "bottom", preco: 429, cor: "tinta" },
  { id: "slip", nome: "Vestido slip", tipo: "vestido", preco: 549, cor: "vinho" },
  { id: "tubinho", nome: "Vestido midi", tipo: "vestido", preco: 489, cor: "manteiga" },
];

export const provador = {
  titulo: "O provador que abre antes da loja.",
  lead: "Troque as peças, pinte na cor que quiser e escolha o tamanho. Quando o look estiver do seu jeito, ele vai pronto para o nosso WhatsApp.",
  tamanhos: ["PP", "P", "M", "G", "GG"],
  /** Primeira linha da mensagem que chega no seu WhatsApp. */
  saudacao: "Olá, Ravelle! Montei este look no provador virtual:",
  /** Look inicial exibido ao abrir a página. */
  inicial: { modo: "look" as "look" | "vestido", top: "blusa", bottom: "pantalona", vestido: "slip", tamanho: "M" },
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
