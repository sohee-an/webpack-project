import React from 'react';
import { TMovie } from '@/hooks/useMoviePopular';

function MovieCard({ item }: { item: TMovie }) {
  return (
    <div className="flex flex-col gap-1 text-white cursor-pointer">
      <div className="text-sm text-gray-400">{item.title}</div>
      <div>{item.original_title}</div>
      {/* <div className="text-gray-400">{item.overview}</div> */}

      <div className="relative group">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={`${item.title} Poster`}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

export default MovieCard;
