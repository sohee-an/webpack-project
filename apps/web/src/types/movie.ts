export type TMovie = {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  originalTitle: string;
};

export type TMovieResult = {
  results: TMovie[];
};
