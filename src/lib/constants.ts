export const SITE_URL = "https://neovanguard.com.br";

/** Onde a distro é feita e conversada. Não há WhatsApp comercial aqui: este
    deixou de ser um site de vendas e passou a ser o site de um sistema
    operacional, e o canal de um sistema operacional é o repositório. */
export const REPO_URL = "https://github.com/NEOpisa/neovanguard";
export const DOCS_URL = `${REPO_URL}/blob/main/documentation`;
export const REPO_PACOTES = "https://neovanguard.com.br/repo/x86_64";

/** A versão que o site descreve. Uma constante, e não um texto solto em cinco
    páginas: quando a 1.1 sair, é aqui que se troca. */
export const VERSAO = "1.1.0";

/** A chave que assina os pacotes e as imagens. Aparece na página de download
    porque conferir a assinatura só é possível para quem sabe qual esperar. */
export const CHAVE_FPR = "9ED7 92DC EA8D 869E CD79  CE72 5F86 3B33 9A1E 5762";

/** Destinos compartilhados entre desktop e mobile. */
export const NAV = [
  { label: "Início", href: "/" },
  { label: "Obter o sistema", href: "/baixar" },
  { label: "Recursos", href: "/recursos" },
  { label: "Instalação", href: "/instalacao" },
  { label: "Documentação", href: "/documentacao" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Sobre", href: "/sobre" },
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
