import { TMovie } from '@/types/movie';
import React from 'react';

type TProps = {
  item: TMovie;
  movieList?: boolean;
  height: 'short' | 'medium' | 'tall';
  onClick: (mid: number) => void;
};

const heightMap = {
  short: 'h-48',
  medium: 'h-72',
  tall: 'h-[620px]',
};

function MovieCard({ item, movieList = false, height, onClick }: TProps) {
  return (
    <div
      onClick={() => onClick(item.id)}
      className={`flex flex-col gap-1 text-white cursor-pointer overflow-hidden ${heightMap[height]}`}
    >
      {!movieList && (
        <div className="flex flex-col px-1 pt-1">
          <div className="text-sm text-gray-400 truncate">{item.title}</div>
          <div className="text-lg text-bold truncate">{item.originalTitle}</div>
        </div>
      )}

      <div className="relative group flex-grow overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w300${item.posterPath}`}
          alt={`${item.title} Poster`}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

export default MovieCard;
