export const WA = "https://wa.me/5519994425132";
export const SITE_URL = "https://neovanguard.com.br";

/** NAVEGAÇÃO — o trilho esquerdo é só isto e nada mais: para onde ir. Todos
    os destinos do site moram aqui, inclusive os três que antes ficavam no
    trilho direito fingindo ser leitura. Nenhum deles se repete lá. */
export const NAV = [
  { n: "01", label: "Início", href: "/", tone: "a" },
  { n: "02", label: "Ouro", href: "/ouro", tone: "b" },
  { n: "03", label: "Exemplos", href: "/exemplos", tone: "c" },
  { n: "04", label: "Metodologia", href: "/metodologia", tone: "c" },
  { n: "05", label: "Quem somos", href: "/sobre", tone: "d" },
  { n: "06", label: "Perguntas frequentes", href: "/faq", tone: "d" },
  { n: "07", label: "Contato", href: "/contato", tone: "b" },
] as const;

/** ASSUNTOS DA CASA — a matéria do trilho direito. Não é menu: cada item
    conta uma coisa que a Neovanguard pensa sobre o próprio trabalho, e o
    destino é só a consequência de ter ficado curioso. */
export const ASSUNTOS = [
  {
    k: "Prazo",
    t: "16 dias é teto, não meta",
    d: "O prazo entra no papel como limite máximo. Quase toda entrega sai antes dele.",
    href: "/metodologia",
  },
  {
    k: "IA",
    t: "Automação com dono",
    d: "IA aqui tira trabalho manual do caminho — orçamento, cobrança, triagem. Não é enfeite de home.",
    href: "/exemplos",
  },
  {
    k: "Bastidor",
    t: "Quem constrói é quem responde",
    d: "Sem camada de atendimento no meio: o WhatsApp é de quem escreveu o código.",
    href: "/sobre",
  },
  {
    k: "Posse",
    t: "O código sai no seu nome",
    d: "Domínio, repositório e dados são seus desde o primeiro dia — inclusive se você for embora.",
    href: "/faq",
  },
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
