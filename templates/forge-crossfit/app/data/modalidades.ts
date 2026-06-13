export interface Modalidade {
  id: string;
  label: string;
  img: string;
  title: string;
  paragraphs: string[];
  tags: string[];
}

export const modalidades: Modalidade[] = [
  {
    id: "crossfit",
    label: "CrossFit",
    img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=900&q=80",
    title: "CrossFit",
    paragraphs: [
      "Movimentos funcionais de alta intensidade, variados a cada dia. Trabalha força, potência, resistência, agilidade e coordenação — tudo no mesmo treino. Aulas de 60 min com aquecimento, skill, WOD e alongamento.",
      "Adequado para iniciantes até atletas avançados. Escalagem individual garantida.",
    ],
    tags: ["Força", "Condicionamento", "Ginástica", "Levantamento olímpico", "Cardio"],
  },
  {
    id: "weightlifting",
    label: "Weightlifting",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80",
    title: "Weightlifting",
    paragraphs: [
      "Foco nos dois levantamentos olímpicos — Snatch e Clean & Jerk. Técnica detalhada, periodização específica. Para quem quer competir ou dominar os movimentos olímpicos.",
    ],
    tags: ["Arranco", "Arremesso", "Técnica", "Potência"],
  },
  {
    id: "open",
    label: "Open Gym",
    img: "https://images.unsplash.com/photo-1534368786749-b63e05c90863?w=900&q=80",
    title: "Open Gym",
    paragraphs: [
      "Box aberto para você treinar com seu próprio programa ou complementar o treino do dia. Acesso a todo o equipamento e coaches disponíveis para tirar dúvidas pontuais.",
    ],
    tags: ["Livre", "Equipamento completo", "Coaches de plantão"],
  },
  {
    id: "mobility",
    label: "Mobilidade",
    img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=900&q=80",
    title: "Mobilidade & Recuperação",
    paragraphs: [
      "Pré-ativação e recuperação ativa. Trabalho de tecido mole, amplitude de movimento e estabilidade articular para você treinar mais e se machucar menos.",
    ],
    tags: ["Flexibilidade", "Recuperação", "Prevenção"],
  },
];
