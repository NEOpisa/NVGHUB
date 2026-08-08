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
    return [
      { source: "/orcamento", destination: "/solucao", permanent: true },
      { source: "/pacotes", destination: "/solucao", permanent: true },
      // A divisão Ouro virou "Seja nosso parceiro ou parceira" e o endereço
      // acompanhou. O redirecionamento não é apego ao nome antigo: /ouro já
      // circulou em conversa e em link, e link que morre é cliente perdido.
      { source: "/ouro", destination: "/parceria", permanent: true },
      // O Platina saiu do site por inteiro.
      { source: "/platina", destination: "/parceria", permanent: true },
    ];
  },
};

export default nextConfig;
