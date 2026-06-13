export interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: "A1",
    quote:
      "Depois de 3 meses aplicando o método, dobrei meu faturamento como consultora independente. Não é exagero — tenho os números aqui.",
    name: "Rafael Lima",
    role: "Consultora de Marketing, SP",
  },
  {
    initials: "A2",
    quote:
      "O que me surpreendeu não foi o volume de conteúdo — foi a precisão. Cada módulo resolve exatamente o que prometeu. Sem enrolação.",
    name: "Juliana Alves",
    role: "Designer UX, RJ",
  },
  {
    initials: "A3",
    quote:
      "Estava travada há 2 anos com o mesmo patamar. Em 6 semanas, tive clareza suficiente para fechar um contrato que jamais teria coragem de propor antes.",
    name: "Pedro Santos",
    role: "Fotógrafa e Diretora Criativa",
  },
];
