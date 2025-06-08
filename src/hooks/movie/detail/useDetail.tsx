import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

type TMovieDetail = {
  title: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  overview: string;
  poster_path: string;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
};

type TParmas = {
  language: string;
  mid: string;
};

export const useDetail = ({ language = 'ko-KR', mid }: TParmas) => {
  return useQuery<TMovieDetail>({
    queryKey: ['movieDetail', language, mid],
    queryFn: () => fetcher(`movie/${mid}?language=${language}`),
    enabled: !!mid,
  });
};
