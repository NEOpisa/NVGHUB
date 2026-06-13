/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/doce-arte",
  assetPrefix: "/templates/doce-arte",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
