export interface Coach {
  nome: string;
  role: string;
  certs: string[];
  img: string;
}

export const coaches: Coach[] = [
  {
    nome: "[Nome do Coach 1]",
    role: "Head Coach",
    certs: ["[Certificação]", "[Certificação]", "[Certificação]"],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70",
  },
  {
    nome: "[Nome do Coach 2]",
    role: "Coach CrossFit",
    certs: ["[Certificação]", "[Certificação]", "[Certificação]"],
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=70",
  },
  {
    nome: "[Nome do Coach 3]",
    role: "Weightlifting",
    certs: ["[Certificação]", "[Certificação]", "[Certificação]"],
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=70",
  },
  {
    nome: "[Nome do Coach 4]",
    role: "Mobility Coach",
    certs: ["[Certificação]", "[Certificação]", "[Certificação]"],
    img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=70",
  },
];
