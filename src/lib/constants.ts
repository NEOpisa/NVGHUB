export const WA = "https://wa.me/5519994425132";
export const SITE_URL = "https://neovanguard.com.br";

/** NAVEGAÇÃO — o trilho esquerdo é só isto e nada mais: para onde ir. Todos
    os destinos do site moram aqui, inclusive os três que antes ficavam no
    trilho direito fingindo ser leitura. Nenhum deles se repete lá.

    Os rótulos são curtos porque o trilho tem ~200px: "Parceria" no menu, e
    a frase inteira ("Seja nosso parceiro ou parceira") no título da página,
    na porta da home e na OG, onde há espaço para ela respirar. */
export const NAV = [
  { n: "01", label: "Início", href: "/", tone: "a" },
  { n: "02", label: "Parceria", href: "/parceria", tone: "b" },
  { n: "03", label: "Exemplos", href: "/exemplos", tone: "c" },
  { n: "04", label: "Metodologia", href: "/metodologia", tone: "c" },
  { n: "05", label: "Quem somos", href: "/sobre", tone: "d" },
  { n: "06", label: "Perguntas frequentes", href: "/faq", tone: "d" },
  { n: "07", label: "Contato", href: "/contato", tone: "b" },
] as const;

/** ASSUNTOS DA CASA — a matéria do trilho direito, que o leitor percorre
    com a roda do mouse. Não é menu e não é lista de links: cada verbete é
    uma posição da Neovanguard sobre o próprio trabalho, ancorada num
    número que dá o que discutir. Se o link sumisse, o cartão continuava
    valendo por si — é esse o teste que um item precisa passar para entrar
    aqui. Ordem importa: o primeiro é o que mais se pergunta. */
export const ASSUNTOS = [
  {
    k: "Prazo",
    n: "16",
    nl: "dias, no teto",
    t: "Prazo é teto, não meta",
    d: "O número entra no contrato como limite — o que vale contra nós, não a favor. Quase toda entrega sai antes.",
    cta: "Como o prazo é medido",
    href: "/metodologia",
  },
  {
    k: "Escopo",
    n: "0",
    nl: "surpresa no meio",
    t: "O que não entra também é escrito",
    d: "A lista do que fica de fora é combinada junto com a do que entra. É ela que evita a conversa difícil no dia 12.",
    cta: "Ver como fechamos escopo",
    href: "/metodologia",
  },
  {
    k: "IA",
    n: "4",
    nl: "frentes de automação",
    t: "Automação com dono",
    d: "IA aqui tira trabalho manual do caminho: orçamento, cobrança, triagem e relatório. Nada que só sirva de enfeite na home.",
    cta: "Ver o que já construímos",
    href: "/exemplos",
  },
  {
    k: "Bastidor",
    n: "1",
    nl: "interlocutor, sempre",
    t: "Quem constrói é quem responde",
    d: "Não existe camada de atendimento no meio. O WhatsApp que você usa é o de quem escreveu o código.",
    cta: "Conhecer a casa",
    href: "/sobre",
  },
  {
    k: "Posse",
    n: "100%",
    nl: "seu, desde o dia 1",
    t: "O código sai no seu nome",
    d: "Domínio, repositório, dados e acessos ficam com você — inclusive no dia em que decidir seguir com outra pessoa.",
    cta: "Perguntas frequentes",
    href: "/faq",
  },
] as const;

/** Compromissos em uma linha. Vive só no menu mobile: no desktop quem
    carrega esse peso é o deck de assuntos, e o trilho não tinha altura
    para os dois (ver o comentário em RailRight). */
export const FATOS = [
  ["Prazo", "até 16 dias, por escrito"],
  ["Suporte", "incluso, no WhatsApp"],
  ["Contrato", "sem mínimo, sem fidelidade"],
] as const;

/** Rodapé compacto que assina toda página. */
export const RODAPE = [
  { label: "Início", href: "/" },
  { label: "Parceria", href: "/parceria" },
  { label: "Exemplos", href: "/exemplos" },
  { label: "Quem somos", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
] as const;
