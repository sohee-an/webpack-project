import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // 외부 워크스페이스 패키지 소스도 Next가 트랜스파일
  transpilePackages: ['@packages/shared'],

  // 모노레포 바깥 디렉토리 읽기 허용
  experimental: { externalDir: true },
};

export default nextConfig;
