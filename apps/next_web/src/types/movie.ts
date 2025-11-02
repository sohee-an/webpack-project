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

export type TMovieDetail = {
  title: string;
  genres: { id: number; name: string }[];
  voteAverage: number;
  overview: string;
  posterPath: string;
  runtime: number;
  spokenLanguages: { englishName: string; iso_639_1: string; name: string }[];
};
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
export type TCrew = {
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
export type TCredits = {
  cast: TCast[];
  crew: TCrew[];
};
