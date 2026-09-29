export const SITE_URL = "https://neovanguard.com.br";
export const SITE_TITLE = "Neovanguard OS · Linux para Bitcoin, Lightning e Nostr";
export const SITE_DESCRIPTION =
  "Distribuição baseada em Arch Linux, com KDE Plasma e ferramentas para Bitcoin, Lightning e Nostr. Software livre sob a GPL-3.0.";

/** Repositório do sistema operacional e da documentação. */
export const REPO_URL = "https://github.com/NEOpisa/neovanguard";
export const DOCS_URL = `${REPO_URL}/blob/main/documentation`;
export const REPO_PACOTES = "https://neovanguard.com.br/repo/x86_64";
export const MIZAEL_LINKEDIN =
  "https://www.linkedin.com/in/mizael-ribeiro-8a3b42385";
export const JOAO_LINKEDIN =
  "https://www.linkedin.com/in/jo%C3%A3o-ant%C3%B4nio-rodrigues-884093303";

/** Versão do sistema descrita no site. */
export const VERSAO = "1.1.0";

/** A chave que assina os pacotes e as imagens. Aparece na página de download
    porque conferir a assinatura só é possível para quem sabe qual esperar. */
export const CHAVE_FPR = "9ED7 92DC EA8D 869E CD79  CE72 5F86 3B33 9A1E 5762";

/** Destinos compartilhados entre desktop e mobile. */
export const NAV = [
  { label: "Início", href: "/" },
  { label: "Imagens ISO", href: "/baixar" },
  { label: "Recursos", href: "/recursos" },
  { label: "Instalação", href: "/instalacao" },
  { label: "Documentação", href: "/documentacao" },
  { label: "Perguntas frequentes", href: "/faq" },
  { label: "Sobre", href: "/sobre" },
] as const;

/** Imagens descritas em documentation/as-isos.md, com tamanhos medidos na build. */
export const IMAGENS = [
  {
    id: "live",
    nome: "MBN Live",
    arquivo: "NeovanguardOS-Live",
    tamanho: "3,6 GB",
    para: "Experimentar sem instalar",
    boot: "Plasma",
    rede: "opcional",
    d: "Executa o sistema pelo pendrive, com KDE Plasma. Não inclui instalador e não exige conexão com a internet.",
  },
  {
    id: "install",
    nome: "MBN Install",
    arquivo: "NeovanguardOS-Install",
    tamanho: "4,7 GB",
    para: "Instalar no disco",
    boot: "terminal",
    rede: "opcional",
    d: "Inclui o sistema da Live e um instalador de sete etapas no terminal. A instalação no disco não exige conexão com a internet.",
  },
] as const;
