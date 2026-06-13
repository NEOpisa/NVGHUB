/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/imobiliaria-alto-padrao",
  assetPrefix: "/templates/imobiliaria-alto-padrao",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
