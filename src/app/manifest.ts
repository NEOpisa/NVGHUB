import type { MetadataRoute } from "next";

// manifest PWA básico — instala como app, nas cores do site.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neovanguard OS",
    short_name: "Neovanguard OS",
    description:
      "Distribuição Linux onde a sua chave Nostr é a conta do sistema, e o nó Bitcoin, o Lightning e o relay rodam na sua máquina.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1422",
    theme_color: "#0c1422",
    /* Campo azul cheio, não o avatar escuro: na tela inicial o ícone fica
       sobre o papel de parede do usuário, e quadrado escuro com marca clara
       desaparece em metade dos papéis de parede.

       O mesmo arquivo entra como `any` e como `maskable` — ele sangra até a
       borda e o V cabe no círculo seguro de 80%, então serve aos dois casos.
       O tipo do Next só aceita um propósito por entrada, daí a repetição. */
    icons: [
      { src: "/icone-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icone-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icone-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icone-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
