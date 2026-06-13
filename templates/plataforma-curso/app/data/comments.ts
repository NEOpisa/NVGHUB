export interface Comment {
  id: string;
  initials: string;
  author: string;
  text: string;
  time: string;
}

export const initialComments: Comment[] = [
  {
    id: "c1",
    initials: "A1",
    author: "[Nome do Aluno 1]",
    text:
      "A parte sobre gestão de energia mudou completamente como eu organizo minha semana. Finalmente faz sentido por que algumas horas são mais produtivas que outras.",
    time: "há 2 dias · 12 curtidas",
  },
  {
    id: "c2",
    initials: "A2",
    author: "[Nome do Aluno 2]",
    text:
      "Alguém conseguiu aplicar o framework do tempo em blocos com filhos pequenos em casa? Quero entender se tem adaptação para esse cenário.",
    time: "há 4 dias · 7 curtidas",
  },
];
