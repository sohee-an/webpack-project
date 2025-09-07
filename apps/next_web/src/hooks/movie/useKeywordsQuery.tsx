import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@api/fetcher';
import { TMovieResult } from '../../types/movie';

export const useSearchMoviesQuery = ({
  language = 'ko-KR',
  page,
  keywords,
}: {
  language: string;
  page: number;
  keywords: string;
}) => {
  return useQuery<TMovieResult>({
    queryKey: ['searchMovie', language, page, keywords],
    enabled: !!keywords,
    queryFn: () =>
      fetcher<TMovieResult>(
        `search/movie?query=${encodeURIComponent(keywords)}&language=${language}&page=${page}`,
      ),
  });
};
