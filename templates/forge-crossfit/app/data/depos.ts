export interface Depoimento {
  nome: string;
  meta: string;
  stars: string;
  txt: string;
  trans: boolean;
  avatar: string;
}

export const depos: Depoimento[] = [
  {
    nome: "[Nome do Aluno 1]",
    meta: "−14kg em 8 meses",
    stars: "★★★★★",
    txt: "Tentei academia 3× antes. No [Nome da Academia] eu fico porque o coach SABE quem eu sou. Quando faltei duas semanas por viagem, recebi mensagem perguntando se tava tudo bem. Isso não existe em academia grande.",
    trans: true,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=70",
  },
  {
    nome: "[Nome do Aluno 2]",
    meta: "+8kg de massa em 6 meses",
    stars: "★★★★★",
    txt: "Vim do mundo corporativo sem nunca ter treinado sério. Achei que ia me matar no primeiro treino. Escalam tudo, você cresce no ritmo certo. 6 meses depois bati PR de back squat.",
    trans: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=70",
  },
  {
    nome: "[Nome do Aluno 3]",
    meta: "Primeira pull-up em 4 meses",
    stars: "★★★★★",
    txt: "A comunidade é o diferencial absurdo. No sábado é Team WOD e a galera fica, toma café, conversa. Minha agenda social agora gira em torno do box. Não é exagero.",
    trans: false,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=70",
  },
];
