import type { HomeResponse } from '@/pages/api/home'; // 타입 위치는 아래에서 다시 설명
import { getBaseUrl } from '../../../lib/getBaseUrl';

export async function fetchHome(page: number): Promise<HomeResponse> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/home?page=${page}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch /api/home: ${res.status}`);
  }

  return res.json();
}
