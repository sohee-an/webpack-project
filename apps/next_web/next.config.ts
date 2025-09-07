// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Next/Image 최적화: 원격 이미지 도메인 허용 + 포맷
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // TMDB 이미지 서버
        pathname: '/t/p/**',
      },
    ],
  },

  // ✅ 모노레포(shared) 소스도 함께 트랜스파일
  transpilePackages: ['@packages/shared'],

  // ✅ 모노레포 외부 디렉토리 read 허용
  experimental: { externalDir: true },
};

export default nextConfig;
