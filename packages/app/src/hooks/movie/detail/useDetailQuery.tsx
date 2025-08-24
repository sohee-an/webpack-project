import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@api/fetcher';

type TMovieDetail = {
  title: string;
  genres: { id: number; name: string }[];
  voteAverage: number;
  overview: string;
  posterPath: string;
  runtime: number;
  spokenLanguages: { englishName: string; iso_639_1: string; name: string }[];
};

type TParmas = {
  language: string;
  mid: string;
};

export const useDetailQuery = ({ language = 'ko-KR', mid }: TParmas) => {
  return useQuery<TMovieDetail>({
    queryKey: ['movieDetail', language, mid],
    queryFn: () => fetcher(`movie/${mid}?language=${language}`),
    enabled: !!mid,
  });
};
