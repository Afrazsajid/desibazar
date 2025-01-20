import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',   // Allow HTTPS images
        hostname: '**',      // Allow all domains (wildcard)
      },
    ],
  },
};

export default nextConfig;
