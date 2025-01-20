import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
