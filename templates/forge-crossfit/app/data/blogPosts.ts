export interface BlogPost {
  cat: string;
  title: string;
  data: string;
  img: string;
}

export const blogPosts: BlogPost[] = [
  {
    cat: "Treino",
    title: "Como escalar o WOD corretamente sem comprometer a intensidade",
    data: "3 jun 2025",
    img: "https://images.unsplash.com/photo-1623200216581-5f4e1f9c4a1c?w=600&q=70",
  },
  {
    cat: "Nutrição",
    title: "Carboidratos no CrossFit: quando, quanto e quais fontes usar",
    data: "28 mai 2025",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=70",
  },
  {
    cat: "Comunidade",
    title:
      "Por que turmas pequenas produzem resultados maiores — a ciência por trás",
    data: "22 mai 2025",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=70",
  },
];
