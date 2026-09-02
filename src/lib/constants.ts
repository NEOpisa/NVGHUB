export const SITE_URL = "https://neovanguard.com.br";

/** Onde a distro é feita e conversada. Não há WhatsApp comercial aqui: este
    deixou de ser um site de vendas e passou a ser o site de um sistema
    operacional, e o canal de um sistema operacional é o repositório. */
export const REPO_URL = "https://github.com/NEOpisa/neovanguard";
export const REPO_PACOTES = "https://neovanguard.com.br/repo/x86_64";

/** A versão que o site descreve. Uma constante, e não um texto solto em cinco
    páginas: quando a 1.1 sair, é aqui que se troca. */
export const VERSAO = "1.1.0";

/** A chave que assina os pacotes e as imagens. Aparece na página de download
    porque conferir a assinatura só é possível para quem sabe qual esperar. */
export const CHAVE_FPR = "9ED7 92DC EA8D 869E CD79  CE72 5F86 3B33 9A1E 5762";

/** NAVEGAÇÃO — o trilho esquerdo é só isto: para onde ir.

    A ordem é a de quem chega sem saber o que é isto: o que é (Início), como
    pegar (Baixar), o que tem dentro (Recursos), como pôr no disco (Instalação),
    onde ler mais (Documentação), o que costuma travar (Perguntas), e por que
    existe (Sobre). */
export const NAV = [
  { n: "01", label: "Início", href: "/", tone: "a" },
  { n: "02", label: "Baixar", href: "/baixar", tone: "b" },
  { n: "03", label: "Recursos", href: "/recursos", tone: "c" },
  { n: "04", label: "Instalação", href: "/instalacao", tone: "c" },
  { n: "05", label: "Documentação", href: "/documentacao", tone: "d" },
  { n: "06", label: "Perguntas frequentes", href: "/faq", tone: "d" },
  { n: "07", label: "Sobre", href: "/sobre", tone: "b" },
] as const;

/** AS IMAGENS. A fonte é `documentation/as-isos.md` da distro, e os tamanhos são
    os medidos na build — não estimativas.

    Eram três até a 1.1. A MYO — que montava o sistema pela rede, escolhendo cada
    peça — saiu: servia a um público que já tem um Arch e quer da gente os
    pacotes, não a imagem, e os pacotes agora chegam pelo repositório. */
export const IMAGENS = [
  {
    id: "live",
    nome: "MBN Live",
    arquivo: "NeovanguardOS-Live",
    tamanho: "3,6 GB",
    para: "Experimentar sem instalar",
    boot: "Plasma",
    rede: "não precisa",
    d: "O sistema inteiro, rodando do pendrive. Sem instalador dentro, de propósito: é a mídia para olhar, mexer e decidir. Quem decidir instalar usa a Install.",
  },
  {
    id: "install",
    nome: "MBN Install",
    arquivo: "NeovanguardOS-Install",
    tamanho: "4,7 GB",
    para: "Instalar o sistema pronto",
    boot: "terminal",
    rede: "não precisa",
    d: "O mesmo sistema da Live viaja dentro dela e é copiado para o disco — literalmente o mesmo arquivo, então não há diferença entre o que você experimentou e o que foi instalado. Sete etapas.",
  },
] as const;

/** O TRILHO DIREITO — fatos da distro com um número que dá o que pensar.
    Cada um vale por si: se o link sumisse, o cartão continuava de pé. */
export const ASSUNTOS = [
  {
    k: "Identidade",
    n: "0",
    nl: "cadastros",
    t: "A sua chave é a sua conta",
    d: "Na instalação você informa a chave Nostr, e a conta de usuário nasce dela, cifrada pela sua senha. Formatou ou trocou de máquina? Digita a chave e as configurações voltam.",
    cta: "Como funciona",
    href: "/recursos",
  },
  {
    k: "Soberania",
    n: "55",
    nl: "comandos neo-*",
    t: "A pilha inteira é sua",
    d: "Nó Bitcoin, Lightning e relay Nostr rodam na sua máquina — você não é cliente da infraestrutura de ninguém. Os comandos existem para operar isso sem decorar flag.",
    cta: "Ver os comandos",
    href: "/recursos",
  },
  {
    k: "Mídias",
    n: "2",
    nl: "imagens, duas perguntas",
    t: "Experimentar e instalar são coisas diferentes",
    d: "A Live roda do pendrive e não instala nada — é para olhar antes de decidir. A Install leva o mesmo sistema dentro dela e o copia para o disco, sem rede. A mídia que você grava já decide o que vai acontecer.",
    cta: "Ver as duas",
    href: "/baixar",
  },
  {
    k: "Base",
    n: "1",
    nl: "distro embaixo: Arch",
    t: "Arch, sem esconder que é Arch",
    d: "Os repositórios são os do Arch e o pacman é o pacman. O que a distro acrescenta vem num repositório próprio, assinado, e dá para desinstalar.",
    cta: "O que é acrescentado",
    href: "/recursos",
  },
  {
    k: "Registro",
    n: "100%",
    nl: "do log em RAM",
    t: "O que a máquina fez não fica no disco",
    d: "O journald grava em memória e o /var/log é tmpfs. Desligou, foi embora — que é o que significa não deixar rastro, em vez de prometer privacidade e escrever tudo.",
    cta: "Ver a camada",
    href: "/recursos",
  },
] as const;

/** Uma linha cada. Vive só no menu mobile — no desktop quem carrega esse peso
    é o deck de assuntos, e o trilho não tem altura para os dois. */
export const FATOS = [
  ["Base", "Arch Linux, com pacman"],
  ["Licença", "GPL-3.0, código aberto"],
  ["Custo", "gratuito, sem edição paga"],
] as const;

/** Rodapé compacto que assina toda página. */
export const RODAPE = [
  { label: "Início", href: "/" },
  { label: "Baixar", href: "/baixar" },
  { label: "Recursos", href: "/recursos" },
  { label: "Instalação", href: "/instalacao" },
  { label: "Documentação", href: "/documentacao" },
  { label: "Sobre", href: "/sobre" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
] as const;
