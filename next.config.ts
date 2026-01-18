import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Vercel deployment
  output: "standalone",
  // Ensure images work correctly
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
