/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/clinica-lumen",
  assetPrefix: "/templates/clinica-lumen",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
