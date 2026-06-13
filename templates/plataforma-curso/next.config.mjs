/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/plataforma-curso",
  assetPrefix: "/templates/plataforma-curso",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
