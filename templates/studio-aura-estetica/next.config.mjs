/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/studio-aura-estetica",
  assetPrefix: "/templates/studio-aura-estetica",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
