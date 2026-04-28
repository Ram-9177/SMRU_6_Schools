import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
    // Optimize for smooth navigation
    experimental: {
      optimizePackageImports: ["react-icons"],
    },
    // Compress and optimize build
    compress: true,
  // Keep dev/build artifacts isolated to avoid missing-chunk runtime errors
  // when `next dev` and `next build` are run in parallel.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias["react-router-dom"] = path.resolve(process.cwd(), "src/lib/router.tsx");
    return config;
  },
};

export default nextConfig;
