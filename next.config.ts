import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    'design-showcase-poc.cluster-2.preview.emergentcf.cloud',
    'design-showcase-poc.preview.emergentagent.com',
    '4e479c22-e284-4266-b222-4e3d21e9dc86.preview.emergentagent.com',
    'bhmr-poc-refined.preview.emergentagent.com',
    'bhmr-poc-refined.cluster-12.preview.emergentcf.cloud',
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
