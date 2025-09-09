// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import { fetcher } from '@api/fetcher';
// import { TMovieResult } from '../../types/movie';

// export const usePaginatedMoviesQuery = (
//   endpoint: string,
//   page: number,
//   queryKey: string[],
//   params: Record<string, string> = {},
// ) => {
//   const queryParams = new URLSearchParams({ page: String(page), language: 'ko-KR', ...params });
//   return useQuery<TMovieResult>({
//     queryKey: [...queryKey, page],
//     queryFn: () => fetcher(`${endpoint}?${queryParams.toString()}`),
//     placeholderData: keepPreviousData,
//   });
// };
// hooks/movie/useMoviePopularQuery.ts
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { movieKeys, type MovieListParams } from '@lib/queyr-keys';
import { clientFetcher } from '@/lib/client-fetcher'; // 정적 export면 공개/프록시만

import type { TMovieResult } from '@/types/movie';

export function useMoviePopularQuery(
  params: MovieListParams, // { language:'ko-KR', page: number }
  options?: Omit<UseQueryOptions<TMovieResult>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TMovieResult>({
    queryKey: movieKeys.popular(params), // ✅ 프리패치 키와 동일
    queryFn: () => clientFetcher<TMovieResult>('movie/popular', params),
    staleTime: 60_000,
    refetchOnMount: false,
    ...options,
  });
}
