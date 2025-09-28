import { camelizeKeys } from '@packages/shared';
import { Query, withQuery } from './withQuery';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.themoviedb.org/3';
// 꼭 공개용 API 키(NEXT_PUBLIC_TMDB_API_KEY)나 프록시 서버 사용
const PUBLIC_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/** 브라우저에서만 실행할 fetcher */
export async function clientFetcher<T>(
  path: string,
  query?: Query,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(withQuery(path, BASE_URL, query), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PUBLIC_KEY}`,
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
