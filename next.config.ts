import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
  // URL "bonita" /orcamento serve a home; o scroll até a seção é feito
  // no cliente (ScrollToSection), sem deixar #orcamento na barra.
  async rewrites() {
    return [{ source: "/orcamento", destination: "/" }];
  },
};

export default nextConfig;
