export type MovieListParams = {
  language: string;
  page: number;
} & Record<string, string | number | boolean | null | undefined>;

export const movieKeys = {
  all: ['movies'] as const,

  // 리스트 계열
  popular: (p: MovieListParams) => [...movieKeys.all, 'popular', p] as const,
  topRated: (p: MovieListParams) => [...movieKeys.all, 'topRated', p] as const,
  upcoming: (p: MovieListParams) => [...movieKeys.all, 'upcoming', p] as const,

  // 상세
  detail: (id: number | string, extra?: Record<string, unknown>) =>
    [...movieKeys.all, 'detail', { id, ...(extra ?? {}) }] as const,
};
