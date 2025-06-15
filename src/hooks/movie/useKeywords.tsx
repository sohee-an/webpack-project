import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};

type TMovieResult = {
  results: TMovie[];
};

export const useSearchMovies = ({
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
