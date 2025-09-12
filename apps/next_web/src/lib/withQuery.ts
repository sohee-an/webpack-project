export type Query = Record<string, string | number | boolean | null | undefined>;
/**
 * BASE_URL +path 합쳐서 URL 객체 생성
 * @param path /movie/popular
 * @param q {page:1,language:"KR"}
 * @returns
 */
export function withQuery(path: string, BASE_URL: string, q?: Query) {
  const url = new URL(path.startsWith('/') ? path.slice(1) : path, BASE_URL);
  if (q) {
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }

  return url.toString();
}
