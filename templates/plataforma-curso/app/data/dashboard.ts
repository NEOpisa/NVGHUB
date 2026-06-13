export interface DashCard {
  label: string;
  value: string;
  sub: string;
}

export const dashCards: DashCard[] = [
  { label: "Aulas concluídas", value: "18", sub: "de 48 no total" },
  { label: "Horas assistidas", value: "9,4h", sub: "esta semana: 2,1h" },
  { label: "Dias consecutivos", value: "7", sub: "sequência ativa" },
  { label: "Posição na turma", value: "Top 48%", sub: "entre 1.240 alunos" },
];

export const weeklyChartData: number[] = [2, 4, 3, 6, 5, 8, 7, 9];
export const weeklyChartLabels: string[] = [
  "Sem 1",
  "Sem 2",
  "Sem 3",
  "Sem 4",
  "Sem 5",
  "Sem 6",
  "Sem 7",
  "Sem 8",
];

export interface Badge {
  label: string;
  unlocked: boolean;
}

export const badges: Badge[] = [
  { label: "Primeira aula", unlocked: true },
  { label: "7 dias seguidos", unlocked: true },
  { label: "Módulo 1 completo", unlocked: true },
  { label: "50% do curso", unlocked: false },
  { label: "Conclusão", unlocked: false },
  { label: "10 comentários", unlocked: false },
];
