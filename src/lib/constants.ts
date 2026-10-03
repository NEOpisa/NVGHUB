export const SITE_URL = "https://neovanguard.com.br";

/** Repositório do sistema operacional e da documentação. */
export const REPO_URL = "https://github.com/NEOpisa/neovanguard-os-dev";
export const SITE_REPO_URL = "https://github.com/NEOpisa/NVGHUB";
export const CONTACT_EMAIL = "mizael.neovanguard@gmail.com";
export const DOCS_URL = `${REPO_URL}/blob/main/documentation`;
export const REPO_PACOTES = "https://neovanguard.com.br/repo/x86_64";
export const MIZAEL_LINKEDIN =
  "https://www.linkedin.com/in/mizael-ribeiro-neovanguard";
export const JOAO_LINKEDIN =
  "https://www.linkedin.com/in/jo%C3%A3o-ant%C3%B4nio-rodrigues-884093303";

/** Versão de desenvolvimento; não implica ISO publicada. */
export const VERSAO = "1.2.1";

/** Vire para `true` só depois de conferir que as ISOs e as assinaturas estão
    publicadas: o botão do cabeçalho passa de "Disponibilidade" a "Baixar". */
export const ISOS_PUBLICADAS: boolean = false;

/** A chave que assina os pacotes e as imagens. Aparece na página de download
    porque conferir a assinatura só é possível para quem sabe qual esperar. */
export const CHAVE_FPR = "9ED7 92DC EA8D 869E CD79  CE72 5F86 3B33 9A1E 5762";

/** Imagens descritas em documentation/as-isos.md. Os textos de cada uma ficam
    em `images`, nos dicionários de `src/messages/`. */
export const IMAGENS = [
  { id: "live", nome: "NVG Live", arquivo: "NeovanguardOS-Live" },
  { id: "install", nome: "NVG Install", arquivo: "NeovanguardOS-Install" },
] as const;
