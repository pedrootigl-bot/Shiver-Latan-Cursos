import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 40, 48, 64, 96, 128, 256],
  },
  compress: true,
};

export default nextConfig;
