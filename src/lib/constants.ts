export const WA = "https://wa.me/5519994425132";
export const IG =
  "https://www.instagram.com/neo_vanguard?utm_source=qr&igsh=MWx5Ym1nZ2J0NW5kMw==";
export const SITE_URL = "https://neovanguard.com.br";

/** Mapa de rotas do site — fonte única do menu overlay e do HUD do header. */
export type SiteRoute = {
  num: string;
  label: string;
  href: string;
  /** false = fora do menu overlay (mas o HUD do header ainda a conhece) */
  menu?: boolean;
};
export const ROUTES: SiteRoute[] = [
  { num: "RT_00", label: "Início", href: "/" },
  { num: "RT_01", label: "Ouro", href: "/ouro" },
  { num: "RT_02", label: "Platina", href: "/platina" },
  { num: "RT_03", label: "Consulta rápida", href: "/solucao" },
  { num: "RT_04", label: "Quem somos", href: "/sobre" },
  { num: "RT_05", label: "Exemplos", href: "/exemplos" },
  { num: "RT_06", label: "Contato", href: "/contato" },
  { num: "RT_07", label: "Metodologia", href: "/metodologia", menu: false },
  { num: "RT_08", label: "FAQ", href: "/faq", menu: false },
];
