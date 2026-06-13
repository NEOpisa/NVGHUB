export interface Coach {
  nome: string;
  role: string;
  certs: string[];
  img: string;
}

export const coaches: Coach[] = [
  {
    nome: "Diego Martins",
    role: "Head Coach",
    certs: ["CrossFit Level 3", "CF Gymnastics", "Mobility"],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70",
  },
  {
    nome: "Carla Souza",
    role: "Coach CrossFit",
    certs: ["CrossFit Level 2", "Weightlifting", "Nutrition"],
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=70",
  },
  {
    nome: "Bruno Reis",
    role: "Weightlifting",
    certs: ["CF Weightlifting", "CrossFit Level 1", "Powerlifting"],
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=70",
  },
  {
    nome: "Letícia Gomes",
    role: "Mobility Coach",
    certs: ["CF Gymnastics", "Mobility WOD", "CrossFit Level 1"],
    img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=70",
  },
];
