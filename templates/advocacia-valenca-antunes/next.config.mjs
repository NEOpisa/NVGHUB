/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/advocacia-valenca-antunes",
  assetPrefix: "/templates/advocacia-valenca-antunes",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
