import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logInfo } from '@/lib/logger';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 정적 리소스 등은 제외하고 싶으면 matcher로 거르거나 여기서 조건 걸기
  logInfo({
    layer: 'middleware',
    path: pathname,
    method: req.method,
    message: 'Incoming request',
    extra: {
      ua: req.headers.get('user-agent'),
    },
  });

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
