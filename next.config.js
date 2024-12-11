/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    FRONTEND: process.env.FRONTEND,
    GALLERYURL: process.env.GALLERYURL,
  },
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
      use: ["file-loader"], // Ensure 'file-loader' is installed
    });
    return config;
  },
};

module.exports = nextConfig;
