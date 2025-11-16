import type { MovieDetailResponse } from '@/pages/api/movieDetail'; // 타입 위치는 아래에서 다시 설명
import { getBaseUrl } from '../../../lib/getBaseUrl';

export async function fetchDetail(mid: string): Promise<MovieDetailResponse> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/movie/${mid}/aggregate`);

  if (!res.ok) {
    throw new Error(`Failed to fetch /api/movie/aggregate: ${res.status}`);
  }

  return res.json();
}
