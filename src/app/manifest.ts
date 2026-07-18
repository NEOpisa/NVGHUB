import type { MetadataRoute } from "next";

// #027 · manifest PWA básico — instala como app, cores do Neobsidian.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neovanguard — Ferramentas para o seu negócio",
    short_name: "Neovanguard",
    description:
      "Para cada problema do seu negócio, construímos a ferramenta ideal.",
    start_url: "/",
    display: "standalone",
    background_color: "#040309",
    theme_color: "#040309",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
