import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Pre-built WebP copies on the media CDN, see src/lib/imageLoader.ts
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 1280, 1920],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.kudyznudy.cz",
      },
      {
        protocol: "https",
        hostname: "d48-a.sdn.cz",
      },
    ],
  },
};

export default nextConfig;
