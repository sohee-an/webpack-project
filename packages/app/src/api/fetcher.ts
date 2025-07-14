import { camelizeKeys } from '@shared/utiles';

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL || '';
const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN || '';

export async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${REACT_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
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
