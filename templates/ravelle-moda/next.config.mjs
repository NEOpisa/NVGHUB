/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/ravelle-moda",
  assetPrefix: "/templates/ravelle-moda",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BP: "/templates/ravelle-moda" },
};
export default nextConfig;
