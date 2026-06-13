/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/arquitetura-engenharia",
  assetPrefix: "/templates/arquitetura-engenharia",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
