/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/templates/forge-crossfit",
  assetPrefix: "/templates/forge-crossfit",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
