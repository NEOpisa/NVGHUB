import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimização de imagem LIGADA (estava unoptimized: os 17MB de
  // public/templates eram servidos brutos, anulando o next/image do #002).
  // Em produção o Next serve AVIF/WebP redimensionado por device.
  // Se o host de deploy não tiver otimizador de imagem, reverta para
  // `images: { unoptimized: true }` — uma linha.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias: thumbnails mudam raramente
  },
  experimental: {
    // tree-shake dos barrels pesados do 3D (menos JS analisado/empacotado)
    optimizePackageImports: ["@react-three/drei"],
  },
  devIndicators: false,
  async redirects() {
    // O site deixou de ser comercial, e estes endereços já circularam em link,
    // conversa e busca. Link que morre é a pior forma de comunicar uma mudança
    // de rumo: manda para a home, que explica o que o site virou.
    //
    // `permanent: false` (307) e não 308 **de propósito**: o 308 fica gravado no
    // navegador de quem visitou e não sai de lá. Se a operação comercial voltar
    // a ter endereço próprio, um 307 se desfaz e um 308 não.
    const idos = [
      "/parceria",
      "/solucao",
      "/exemplos",
      "/metodologia",
      "/contato",
      "/obrigado",
      "/orcamento",
      "/pacotes",
      "/ouro",
      "/platina",
    ];
    return idos.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
