export const WA = "https://wa.me/5519994425132";
export const SITE_URL = "https://neovanguard.com.br";

/** Mapa de rotas do site — fonte única do menu overlay e do HUD do header. */
type SiteRoute = {
  label: string;
  href: string;
  /** false = fora do menu overlay */
  menu?: boolean;
};
/* a Platina não tem mais página própria: é acesso seletivo, via
   candidatura no fim da jornada da home (/?tier=platina) */
export const ROUTES: SiteRoute[] = [
  { label: "Início", href: "/" },
  { label: "Ouro", href: "/ouro" },
  { label: "Consulta rápida", href: "/solucao" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Exemplos", href: "/exemplos" },
  { label: "Contato", href: "/contato" },
  { label: "Metodologia", href: "/metodologia", menu: false },
  { label: "FAQ", href: "/faq", menu: false },
];

/* #041/#073 · Hero versionável — troque a headline aqui (ou por env no
   deploy p/ teste A/B) sem tocar no componente. parts: antes/depois do
   trecho em gradiente. */
export const HERO_HEADLINE = {
  before: process.env.NEXT_PUBLIC_HERO_BEFORE ?? "Para cada problema do seu negócio, construímos ",
  accent: process.env.NEXT_PUBLIC_HERO_ACCENT ?? "a ferramenta ideal",
} as const;
