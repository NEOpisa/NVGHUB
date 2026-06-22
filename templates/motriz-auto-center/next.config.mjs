/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/motriz-auto-center",
  assetPrefix: "/templates/motriz-auto-center",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
