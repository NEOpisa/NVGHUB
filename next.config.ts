import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
  async redirects() {
    return [
      { source: "/orcamento", destination: "/solucao", permanent: true },
      { source: "/pacotes", destination: "/solucao", permanent: true },
    ];
  },
};

export default nextConfig;
