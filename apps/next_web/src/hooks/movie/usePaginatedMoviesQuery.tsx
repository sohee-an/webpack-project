import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';
import { ENDPOINT_KEY_MAP, movieKeys } from '@/lib/queyr-keys';

export const usePaginatedMoviesQuery = (
  endpoint: string,
  page: number,
  queryKey: string[],
  params: Record<string, string> = {},
) => {
  const queryParams = { page, language: 'ko-KR', ...params };
  const keyGenerator = ENDPOINT_KEY_MAP[endpoint as keyof typeof ENDPOINT_KEY_MAP];
  const finalQueryKey = keyGenerator ? keyGenerator(queryParams) : [...queryKey, page];

  // const queryParams = new URLSearchParams({ page: String(page), language: 'ko-KR', ...params });
  return useQuery<TMovieResult>({
    queryKey: finalQueryKey,
    queryFn: () => fetcher(`${endpoint}?${queryParams.toString()}`),
    placeholderData: keepPreviousData,
  });
};
// hooks/movie/useMoviePopularQuery.ts
// import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
// import { movieKeys, type MovieListParams } from '@lib/queyr-keys';
// import { clientFetcher } from '@/lib/client-fetcher'; // 정적 export면 공개/프록시만

// import type { TMovieResult } from '@/types/movie';

// export function useMoviePopularQuery(
//   params: MovieListParams, // { language:'ko-KR', page: number }
//   options?: Omit<UseQueryOptions<TMovieResult>, 'queryKey' | 'queryFn'>,
// ) {
//   return useQuery<TMovieResult>({
//     queryKey: movieKeys.popular(params),
//     queryFn: () => clientFetcher<TMovieResult>('movie/popular', params),
//     staleTime: 60_000,
//     refetchOnMount: false,
//     ...options,
//   });
// }
