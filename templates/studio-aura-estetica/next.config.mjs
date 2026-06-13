/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/studio-aura-estetica",
  assetPrefix: "/templates/studio-aura-estetica",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BP: "/templates/studio-aura-estetica" },
};
export default nextConfig;
