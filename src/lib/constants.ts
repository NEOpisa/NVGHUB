export const WA = "https://wa.me/5519994425132";
export const SITE_URL = "https://neovanguard.com.br";

/** MAPA do site — os tiles numerados do trilho esquerdo. São destinos:
    para onde ir. Nada aqui se repete no trilho direito. */
export const ROTAS = [
  { n: "01", label: "Início", href: "/", tone: "a" },
  { n: "02", label: "Ouro", href: "/ouro", tone: "b" },
  { n: "03", label: "Exemplos", href: "/exemplos", tone: "c" },
  { n: "04", label: "Contato", href: "/contato", tone: "d" },
] as const;

/** Leitura institucional — a lista do trilho direito. Nenhuma delas é
    tile no esquerdo: aqui é o que se lê, lá é para onde se vai. */
export const UTEIS = [
  { label: "Quem somos", href: "/sobre" },
  { label: "Metodologia · Plano Noxz", href: "/metodologia" },
  { label: "Perguntas frequentes", href: "/faq" },
] as const;

/** Compromissos em uma linha — o cartão de fatos do trilho direito. */
export const FATOS = [
  ["Prazo", "até 16 dias, por escrito"],
  ["Suporte", "incluso, no WhatsApp"],
  ["Contrato", "sem mínimo, sem fidelidade"],
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
