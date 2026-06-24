import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Sanity image CDN (CMS-managed assets).
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Behold (https://behold.so) CDN hosts for the Instagram feed.
      {
        protocol: "https",
        hostname: "behold.pictures",
      },
      {
        protocol: "https",
        hostname: "cdn.behold.pictures",
      },
      // Instagram CDN hosts (used by the direct-endpoint fallback in local dev).
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
