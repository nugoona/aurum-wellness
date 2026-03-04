import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable persistent filesystem cache to prevent stale cache errors
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
