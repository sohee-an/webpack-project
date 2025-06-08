import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/api/fetcher';

export type TCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};
type TCrew = {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
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
