import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
};

export default nextConfig;
