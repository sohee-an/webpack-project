import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { movieKeys, type MovieListParams } from '@lib/queyr-keys';
import { clientFetcher } from '@/lib/client-fetcher';

import type { TMovieResult } from '@/types/movie';
/**
 *  유명한 영화들 ㄴ{ language:'ko-KR', page: number }
 * @param params
 * @param options
 * @returns
 */
export function useMoviePopularQuery(
  params: MovieListParams,
  options?: Omit<UseQueryOptions<TMovieResult>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TMovieResult>({
    queryKey: movieKeys.popular(params),
    queryFn: () => clientFetcher<TMovieResult>('movie/popular', params),
    staleTime: 60_000,
    refetchOnMount: false,
    ...options,
  });
}
