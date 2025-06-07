import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TPopularMiviePrameter = {
  language: string;
  page: number;
  generesId: number;
};
export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_title: string;
};
type TPopularMovie = {
  results: TMovie[];
};

export const useMovieGeneres = ({ language = 'ko-KR', page, generesId }: TPopularMiviePrameter) => {
  const queryString = new URLSearchParams({
    language,
    page: String(page),
  });

  if (generesId !== 0) {
    queryString.append('with_genres', String(generesId));
  }

  return useQuery<TPopularMovie>({
    queryKey: ['movieGeneres', language, page, generesId],
    queryFn: () => fetcher(`discover/movie?${queryString.toString()}`),
  });
};
