import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // 정적베포는 이미지 최적화를 할 수 없으므로 끈다
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },

  //  모노레포(shared) 소스도 함께 트랜스파일
  transpilePackages: ['@packages/shared', '@sohee-an/ui-carousel'],

  // 모노레포 외부 디렉토리 read 허용
  experimental: { externalDir: true },
};

export default withBundleAnalyzer(nextConfig);
