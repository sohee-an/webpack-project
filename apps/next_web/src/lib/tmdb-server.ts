import { camelizeKeys } from '@packages/shared';

const BASE_URL = process.env.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';
const TOKEN = process.env.TMDB_API_TOKEN; // 서버 전용

if (!TOKEN) {
  throw new Error('Missing TMDB_API_TOKEN (server env)');
}

type Query = Record<string, string | number | boolean | null | undefined>;

/**
 * BASE_URL +path 합쳐서 URL 객체 생성
 * @param path /movie/popular
 * @param q {page:1,language:"KR"}
 * @returns
 */
function withQuery(path: string, q?: Query) {
  const url = new URL(path.startsWith('/') ? path.slice(1) : path, BASE_URL);
  if (q) {
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

/** getStaticProps/getServerSideProps에서만 사용
 *
 */
export async function tmdbGetServer<T>(
  path: string,
  query?: Query,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(withQuery(path, query), {
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
