import React from 'react';
import { TMovie } from '@/hooks/useMoviePopular';

function MovieCard({ item }: { item: TMovie }) {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="text-sm text-gray-400">{item.title}</div>
      <div>{item.original_title}</div>
      <div className="text-gray-400">{item.overview}</div>
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="${movie.title} Poster" />
    </div>
  );
}

export default MovieCard;
