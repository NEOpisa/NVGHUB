import type { MetadataRoute } from "next";

// #027 · manifest PWA básico — instala como app, cores do Neobsidian.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Neovanguard — Agência de Soluções Digitais",
    short_name: "Neovanguard",
    description:
      "Ecossistemas digitais que impulsionam o crescimento da sua empresa.",
    start_url: "/",
    display: "standalone",
    background_color: "#040309",
    theme_color: "#040309",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
