export interface Bonus {
  title: string;
  description: string;
  value: string;
}

export const bonuses: Bonus[] = [
  {
    title: "Biblioteca de Templates",
    description: "40+ modelos prontos de propostas, contratos, roteiros e apresentações.",
    value: "Valor: R$ 297",
  },
  {
    title: "Masterclass ao Vivo",
    description: "Sessão exclusiva de Q&A com o mentor para tirar dúvidas da sua realidade específica.",
    value: "Valor: R$ 497",
  },
  {
    title: "Comunidade Vitalícia",
    description: "Acesso permanente à rede de alunos, troca de experiências e suporte entre pares.",
    value: "Valor: R$ 197/ano",
  },
  {
    title: "Certificado de Conclusão",
    description: "Certificado digital validado e personalizável para seu portfólio e LinkedIn.",
    value: "Incluído",
  },
];
