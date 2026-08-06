export const WA = "https://wa.me/5519994425132";
export const SITE_URL = "https://neovanguard.com.br";

/** Rotas principais — os tiles numerados do trilho esquerdo. */
export const ROTAS = [
  { n: "01", label: "Ouro", href: "/ouro", tone: "a" },
  { n: "02", label: "Consulta rápida", href: "/solucao", tone: "b" },
  { n: "03", label: "Exemplos", href: "/exemplos", tone: "c" },
  { n: "04", label: "Contato", href: "/contato", tone: "d" },
] as const;

/** Atalhos utilitários — a lista do trilho direito. */
export const UTEIS = [
  { label: "Quem somos", href: "/sobre" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Perguntas frequentes", href: "/faq" },
] as const;

/** Rodapé compacto que assina toda página. */
export const RODAPE = [
  { label: "Início", href: "/" },
  { label: "Ouro", href: "/ouro" },
  { label: "Exemplos", href: "/exemplos" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
] as const;
