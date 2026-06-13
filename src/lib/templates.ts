export type TemplateItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  accent: string;
};

// Cada slug corresponde a uma pasta em /public/templates/<slug>/ (export estático)
// e a uma imagem em /public/exemplos/<slug>.png (thumbnail).
export const TEMPLATES: TemplateItem[] = [
  {
    slug: "casa-braseiro-delivery",
    name: "Casa Braseiro",
    category: "Restaurante & Delivery",
    description: "Cardápio, carrinho e pedido — estética neo-brutalista de churrasco no fogo.",
    accent: "#ff4d06",
  },
  {
    slug: "doce-arte",
    name: "Doce Arte",
    category: "Confeitaria",
    description: "Confeitaria artesanal foto-led, editorial creme & berry com pedido online.",
    accent: "#a82e50",
  },
  {
    slug: "clinica-lumen",
    name: "Clínica Lumen",
    category: "Odontologia & Saúde",
    description: "Clínica premium minimalista, agendamento e especialidades em layout clean.",
    accent: "#0e8a7e",
  },
  {
    slug: "arquitetura-engenharia",
    name: "Atelier Arq+Eng",
    category: "Arquitetura & Engenharia",
    description: "Escritório editorial em concreto, índice de projetos e processo de obra.",
    accent: "#a8854f",
  },
  {
    slug: "imobiliaria-alto-padrao",
    name: "Imobiliária Alto Padrão",
    category: "Imobiliária",
    description: "Curadoria de imóveis de luxo, busca, cards com preço e agendamento de visita.",
    accent: "#b08a4a",
  },
  {
    slug: "plataforma-curso",
    name: "Plataforma de Curso",
    category: "Curso & Plataforma",
    description: "Página de vendas + área de membros, estética dark terminal/dev neon.",
    accent: "#3ef08a",
  },
  {
    slug: "advocacia-valenca-antunes",
    name: "Advocacia",
    category: "Advocacia & Jurídico",
    description: "Escritório de advocacia: áreas de atuação, sócios e captação de leads.",
    accent: "#b08d57",
  },
  {
    slug: "forge-crossfit",
    name: "Forge CrossFit",
    category: "Academia & CrossFit",
    description: "Box de CrossFit: planos, horários, área do aluno e aula experimental.",
    accent: "#e7352b",
  },
  {
    slug: "studio-aura-estetica",
    name: "Studio Aura",
    category: "Estética & Beleza",
    description: "Estúdio de estética: serviços, galeria, fidelidade e agendamento.",
    accent: "#c08bb0",
  },
];
