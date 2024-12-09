import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    FRONTEND: process.env.FRONTEND,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/,
      use: ['file-loader'], // Make sure you have file-loader or url-loader configured
    });
    return config;
  },
};

export default nextConfig;
