import { camelizeKeys } from '@packages/shared';
import { Query, withQuery } from './withQuery';

const BASE_URL = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';
const TOKEN = process.env.TMDB_API_TOKEN; // 서버 전용

if (!TOKEN) {
  throw new Error('Missing TMDB_API_TOKEN (server env)');
}

/** getStaticProps/getServerSideProps에서만 사용
 *
 */
export async function tmdbGetServer<T>(
  path: string,
  query?: Query,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(withQuery(path, BASE_URL, query), {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`TMDB ${res.status} ${res.statusText} :: ${body}`);
  }

  const json = await res.json();
  return camelizeKeys<T>(json);
}
