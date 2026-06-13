/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/casa-braseiro-delivery",
  assetPrefix: "/templates/casa-braseiro-delivery",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
