/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/pousada-vista-serra",
  assetPrefix: "/templates/pousada-vista-serra",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
