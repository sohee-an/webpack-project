import { camelizeKeys } from '@packages/shared';

export const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
const VITE_APP_API_TOKEN = import.meta.env.VITE_APP_API_TOKEN;

export async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${VITE_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VITE_APP_API_TOKEN}`,
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
