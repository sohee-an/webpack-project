import React, { useState, useEffect } from 'react';
import { TMovie } from '@/hooks/movie/useKeywords';
import PaginatedCarousel from '@/components/share/PaginatedCarousel';
import { useMoviePopular } from '@/hooks/movie/useMoviePopular';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '@/hooks/movie/useKeywords';

type RankingItemProps = {
  movie: TMovie;
  index: number;
  onClick: () => void;
};

const RankingItem = ({ movie, index, onClick }: RankingItemProps) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover: group"
  >
    <span className="text-2xl font-bold text-red-500 w-8 group-hover:scale-110 transition-transform duration-200">
      {index + 1}
    </span>
    <span className="text-white text-lg group-hover:scale-105 group-hover:text-gray-200 transition-all duration-200">
      {movie.title}
    </span>
  </div>
);

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const queryParam = searchParams.get('query');
    console.log('aa', queryParam);
    if (queryParam) {
      setKeywords(queryParam);
    }
  }, [searchParams]);

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopular({
    language: 'ko-KR',
    page: 1,
  });

  const {
    data: keywordData,
    isLoading: keywordsLoading,
    error: keywordsError,
  } = useSearchMovies({
    language: 'ko-KR',
    page: 1,
    keywords,
  });

  const top10Movies = popularData?.results?.slice(0, 10) || [];
  const leftColumn = top10Movies.slice(0, 5);
  const rightColumn = top10Movies.slice(5, 10);

  const handleRankClick = (mid: number) => {
    navigate(`/${mid}`);
  };

  if (popularLoading) return <div className="text-white">로딩 중...</div>;
  if (popularError) return <div className="text-red-500">에러가 발생했습니다.</div>;

  return (
    <div className="p-6 min-h-screen">
      {keywords && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">"{keywords}" 검색 결과</h2>

          {keywordsLoading && <div className="text-white">검색 중...</div>}

          {keywordsError && <div className="text-red-500">검색 중 에러가 발생했습니다.</div>}

          {keywordData && keywordData.results && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {keywordData.results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleRankClick(movie.id)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-2">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-200 transition-colors">
                    {movie.title}
                  </h3>
                </div>
              ))}
            </div>
          )}

          {keywordData && keywordData.results && keywordData.results.length === 0 && (
            <div className="text-gray-400 text-center py-8">
              "{keywords}"에 대한 검색 결과가 없습니다.
            </div>
          )}
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">인기 검색어 TOP 10</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {leftColumn.map((movie, index) => (
              <RankingItem
                onClick={() => handleRankClick(movie.id)}
                key={movie.id}
                movie={movie}
                index={index}
              />
            ))}
          </div>

          <div className="space-y-4">
            {rightColumn.map((movie, index) => (
              <RankingItem
                onClick={() => handleRankClick(movie.id)}
                key={movie.id}
                movie={movie}
                index={index + 5}
              />
            ))}
          </div>
        </div>
      </section>

      <PaginatedCarousel title="인기 콘텐츠" endpoint="movie/popular" queryKey={['popular']} />
    </div>
  );
}

export default Search;
