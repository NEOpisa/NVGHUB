export type Produto = {
  id: number;
  nome: string;
  cat: "bolo" | "doce" | "salgado" | "bebida";
  veg: boolean;
  gf: boolean;
  novo: boolean;
  preco: number;
  porcoes: string;
  desc: string;
  img: string;
  badges: string[];
};

export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Bolo de Cenoura com Cobertura de Chocolate",
    cat: "bolo",
    veg: true,
    gf: false,
    novo: false,
    preco: 68,
    porcoes: "12–16 porções",
    desc: "Massa fofinha de cenoura com ganache 70% cacau feita na hora.",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=70",
    badges: ["veg"],
  },
  {
    id: 2,
    nome: "Bolo de Morango com Chantilly Artesanal",
    cat: "bolo",
    veg: true,
    gf: false,
    novo: false,
    preco: 85,
    porcoes: "12–16 porções",
    desc: "Pão de ló leve, morangos frescos selecionados e chantilly natural.",
    img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=70",
    badges: ["veg", "hot"],
  },
  {
    id: 3,
    nome: "Brigadeiro Gourmet (caixa c/ 9)",
    cat: "doce",
    veg: true,
    gf: true,
    novo: false,
    preco: 38,
    porcoes: "9 unidades",
    desc: "Brigadeiro artesanal com chocolate belga e granulado crocante.",
    img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=70",
    badges: ["veg", "gf"],
  },
  {
    id: 4,
    nome: "Croissant de Manteiga Artesanal",
    cat: "salgado",
    veg: true,
    gf: false,
    novo: false,
    preco: 14,
    porcoes: "1 unidade",
    desc: "Folhado com manteiga francesa, crocante por fora e macio por dentro.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=70",
    badges: ["veg"],
  },
  {
    id: 5,
    nome: "Bolo Red Velvet com Cream Cheese",
    cat: "bolo",
    veg: true,
    gf: false,
    novo: true,
    preco: 95,
    porcoes: "12–16 porções",
    desc: "O clássico americano com nossa receita especial de cream cheese artesanal.",
    img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=70",
    badges: ["veg", "novo"],
  },
  {
    id: 6,
    nome: "Café Coado Especial com Leite Vaporizado",
    cat: "bebida",
    veg: true,
    gf: true,
    novo: false,
    preco: 12,
    porcoes: "1 unidade",
    desc: "Blend exclusivo da casa, com leite integral vaporizado na hora.",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=70",
    badges: ["veg", "gf"],
  },
  {
    id: 7,
    nome: "Quiche de Queijo e Tomate Seco",
    cat: "salgado",
    veg: true,
    gf: false,
    novo: false,
    preco: 22,
    porcoes: "1 fatia",
    desc: "Massa crocante com recheio cremoso de queijo e tomate seco.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Quiche_lorraine.jpg/960px-Quiche_lorraine.jpg",
    badges: ["veg"],
  },
  {
    id: 8,
    nome: "Pão de Mel Recheado com Doce de Leite",
    cat: "doce",
    veg: true,
    gf: false,
    novo: true,
    preco: 9,
    porcoes: "1 unidade",
    desc: "Pão de mel com especiarias e doce de leite caseiro, coberto com chocolate.",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=70",
    badges: ["veg", "novo"],
  },
];

export const taxas: Record<string, number> = {
  "01": 5,
  "02": 5,
  "03": 10,
  "04": 10,
  "05": 15,
  "06": 15,
  "07": 15,
  "08": 0,
};

export const badgeMap: Record<string, string> = {
  veg: "Vegano",
  gf: "Sem glúten",
  hot: "Mais pedido",
  novo: "Novo",
};
