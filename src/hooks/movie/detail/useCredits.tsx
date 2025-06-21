import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

export type TCast = {
  adult: boolean;
  castId: number;
  character: string;
  creditId: string;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  order: number;
  originalName: string;
  popularity: number;
  profilePath: string;
};
type TCrew = {
  creditId: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
};
type TCredits = {
  cast: TCast[];
  crew: TCrew[];
};

type TParmas = {
  language: string;
  mid: string;
};

export const useCredits = ({ language = 'ko-KR', mid }: TParmas) => {
  return useQuery<TCredits>({
    queryKey: ['movieCredits', language, mid],
    queryFn: () => fetcher(`movie/${mid}/credits?language=${language}`),
    enabled: !!mid,
  });
};
