import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    'design-showcase-poc.cluster-2.preview.emergentcf.cloud',
    'design-showcase-poc.preview.emergentagent.com',
    'localhost',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'static.prod-images.emergentagent.com' },
    ],
  },
};

export default nextConfig;
