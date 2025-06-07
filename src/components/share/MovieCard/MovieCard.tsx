import React from 'react';
import { TMovie } from '@/hooks/movie/useMoviePopular';

type TProps = {
  item: TMovie;
  movieList?: boolean;
  height: 'short' | 'medium' | 'tall';
};

const heightMap = {
  short: 'h-48',
  medium: 'h-72',
  tall: 'h-[620px]',
};

function MovieCard({ item, movieList = false, height }: TProps) {
  return (
    <div
      className={`flex flex-col gap-1 text-white cursor-pointer overflow-hidden ${heightMap[height]}`}
    >
      {/* 텍스트 영역 */}
      {!movieList && (
        <div className="flex flex-col px-1 pt-1">
          <div className="text-sm text-gray-400 truncate">{item.title}</div>
          <div className="text-xs truncate">{item.original_title}</div>
        </div>
      )}

      {/* 이미지 영역: 남은 높이를 모두 차지하도록 flex-grow 사용 */}
      <div className="relative group flex-grow overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={`${item.title} Poster`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

export default MovieCard;
