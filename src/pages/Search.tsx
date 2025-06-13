import PaginatedCarousel from '@/components/share/PaginatedCarousel';
import { useMoviePopular } from '@/hooks/movie/useMoviePopular';
import React from 'react';

const RankingItem = ({ movie, index }: any) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover: group">
    <span className="text-2xl font-bold text-red-500 w-8 group-hover:scale-110 transition-transform duration-200">
      {index + 1}
    </span>
    <span className="text-white text-lg group-hover:scale-105 group-hover:text-gray-200 transition-all duration-200">
      {movie.title}
    </span>
  </div>
);

function Search() {
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopular({
    language: 'ko-KR',
    page: 1,
  });

  const top10Movies = popularData?.results?.slice(0, 10) || [];
  const leftColumn = top10Movies.slice(0, 5);
  const rightColumn = top10Movies.slice(5, 10);

  if (popularLoading) return <div className="text-white">로딩 중...</div>;
  if (popularError) return <div className="text-red-500">에러가 발생했습니다.</div>;

  return (
    <div className="p-6  min-h-screen">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb- ">인기 검색어 TOP 10</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {leftColumn.map((movie, index) => (
              <RankingItem key={movie.id} movie={movie} index={index} />
            ))}
          </div>

          <div className="space-y-4">
            {rightColumn.map((movie, index) => (
              <RankingItem key={movie.id} movie={movie} index={index + 5} />
            ))}
          </div>
        </div>
      </section>

      <PaginatedCarousel title="인기 콘텐츠" endpoint="movie/popular" queryKey={['popular']} />
    </div>
  );
}

export default Search;
