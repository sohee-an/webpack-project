import { useQuery, keepPreviousData } from '@tanstack/react-query';
<<<<<<< HEAD:packages/app/src/hooks/movie/usePaginatedMoviesQuery.tsx
import { fetcher } from '@/api/fetcher';
import { TMovieResult } from '@/types/movie';
=======
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
>>>>>>> 177604243b2fea86cf8ff9ef10753661f4c7b92d:apps/web/src/hooks/movie/usePaginatedMoviesQuery.tsx

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
