import { camelizeKeys } from '@packages/shared';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.themoviedb.org/3';
// ⚠️ 클라이언트에서는 비밀키(TMDB_API_TOKEN) 절대 쓰지 말고,
// 꼭 공개용 API 키(NEXT_PUBLIC_TMDB_API_KEY)나 프록시 서버 사용
const PUBLIC_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export type Query = Record<string, string | number | boolean | null | undefined>;

function withQuery(path: string, q?: Query) {
  const url = new URL(path.startsWith('/') ? path.slice(1) : path, BASE_URL);
  if (q) {
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  if (PUBLIC_KEY) {
    url.searchParams.set('api_key', PUBLIC_KEY);
  }
  return url.toString();
}

/** 브라우저에서만 실행할 fetcher */
export async function clientFetcher<T>(
  path: string,
  query?: Query,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(withQuery(path, query), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Client fetch error: ${res.status} ${res.statusText} :: ${body}`);
  }

  const json = await res.json();
  return camelizeKeys<T>(json);
}
