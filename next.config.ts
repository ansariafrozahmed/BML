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
};

export default nextConfig;
