/** @type {import('next').NextConfig} */

// Quando publicado no GitHub Pages (workflow define GITHUB_PAGES=true), o site fica
// num subcaminho (/empresa-jefiber) e precisa de export estático.
const isPages = process.env.GITHUB_PAGES === "true";
const base = isPages ? "/empresa-jefiber" : "";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  devIndicators: false,
  trailingSlash: true,
  basePath: base || undefined,
  assetPrefix: base || undefined,
  output: isPages ? "export" : undefined,
  images: { loader: "custom", loaderFile: "./image-loader.js" },
  env: { NEXT_PUBLIC_BASE_PATH: base },
};
export default nextConfig;
