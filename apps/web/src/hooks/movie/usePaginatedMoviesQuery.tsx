import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';

export const usePaginatedMoviesQuery = (
  endpoint: string,
  page: number,
  queryKey: string[],
  params: Record<string, string> = {},
) => {
  const queryParams = new URLSearchParams({ page: String(page), language: 'ko-KR', ...params });
  return useQuery<TMovieResult>({
    queryKey: [...queryKey, page],
    queryFn: () => fetcher(`${endpoint}?${queryParams.toString()}`),
    placeholderData: keepPreviousData,
  });
};
