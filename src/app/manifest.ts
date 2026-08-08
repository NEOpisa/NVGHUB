import type { MetadataRoute } from "next";

// manifest PWA básico — instala como app, nas cores do site.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neovanguard — Ferramentas para o seu negócio",
    short_name: "Neovanguard",
    description:
      "Para cada problema do seu negócio, construímos a ferramenta ideal.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070b",
    theme_color: "#06070b",
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/perfil.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
