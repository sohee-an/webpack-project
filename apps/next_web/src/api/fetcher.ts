import { camelizeKeys } from '@packages/shared';

export const NEXT_APP_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${NEXT_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${NEXT_PUBLIC_TMDB_API_KEY}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'API Error');
  }

  const data = await res.json();
  return camelizeKeys(data) as T;
}
