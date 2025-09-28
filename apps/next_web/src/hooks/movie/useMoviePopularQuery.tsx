/**
 * page나 키가 바뀌지 않는 한 기존데이터 캐시된걸 사용함
 *  */
import { useQuery } from '@tanstack/react-query';
import { movieKeys, type MovieListParams } from '@/lib/queyr-keys';
import { clientFetcher } from '@/lib/client-fetcher';
import type { TMovieResult } from '@/types/movie';

export const useMoviePopularQuery = (params: MovieListParams) =>
  useQuery<TMovieResult>({
    queryKey: movieKeys.popular(params),
    queryFn: () => clientFetcher<TMovieResult>('movie/popular', params),
    refetchOnMount: false, // 초기 재요청 방지 ( 이유: ssg를 위해)
    staleTime: 60_000,
  });
