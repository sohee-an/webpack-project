import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TTopRated = {
  results: TMovie[];
};
export const usePaginatedMovies = (
  endpoint: string,
  page: number,
  queryKey: string[],
  params: Record<string, string> = {},
) => {
  const queryParams = new URLSearchParams({ page: String(page), language: 'ko-KR', ...params });
  return useQuery<TTopRated>({
    queryKey: [...queryKey, page],
    queryFn: () => fetcher(`${endpoint}?${queryParams.toString()}`),
    // keepPreviousData: true,
  });
};
