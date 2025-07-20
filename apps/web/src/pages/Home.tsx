import React, { useState, useEffect } from 'react';
import { Carousel } from '@sohee-an/ui-carousel';
import MovieCard from '@components/movie/MovieCard/MovieCard';
import RowCarousel from '@components/movie/Carousel/RowCarousel';
import { useMoviePopularQuery } from '@hooks/movie/useMoviePopularQuery';
import { MOVIE_GENRES } from '../constants/movie';
import PaginatedCarousel from '@components/movie/PaginatedCarousel';
import LazyCarousel from '@components/movie/LazyCarousel';

import { tv } from 'tailwind-variants';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [generesId, setGeneresId] = useState(0);
  const [page, setPage] = useState(1);
  const { data } = useMoviePopularQuery({ language: 'ko-KR', page });

  const random = Math.floor(Math.random() * 50) + 1;

  /**
   * 유명한 영화들 랜덤하게 나오게
   */
  useEffect(() => {
    setPage(random);
  }, []);

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopularQuery({
    language: 'ko-KR',
    page: 1,
  });

  // const { data: generesData } = useMovieGeneres({
  //   language: 'ko-KR',
  //   page: 1,
  //   generesId,
  // });

  const handleDetailClick = (mid: number) => {
    navigate(`/${mid}`);
  };

  if (popularLoading) return <p>로딩 중...</p>;
  if (popularError) return <p>에러 발생!</p>;

  const handleClick = (id: number) => {
    setGeneresId(id);
  };

  const buttonVariants = tv({
    base: 'py-1 px-3 border rounded-full transition-colors duration-200',
    variants: {
      variant: {
        default: 'bg-white text-black border-white',
        outline: 'text-gray-400 border-gray-400 hover:border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  });
  if (!data?.results) return <div>Loading...</div>;

  return (
    <div>
      <Carousel
        items={data.results}
        containerClassName="bg-black"
        renderItem={(movie, index) => (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.posterPath}`}
            alt={`${movie.title} Poster`}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="h-full w-auto object-cover"
          />
        )}
        height="620px"
        className="bg-black rounded-lg"
      />

      {/* 인기 영화들 */}
      <RowCarousel height="tall">
        {popularData
          ? popularData.results.map((item) => (
              <MovieCard onClick={handleDetailClick} height="tall" key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>

      {/* 전체, 장르별로 영화 필터링 버튼들 */}
      <div className="flex gap-4 px-8 mb-4 ">
        {MOVIE_GENRES.map(({ name, id }) => {
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={buttonVariants({
                variant: generesId === id ? 'default' : 'outline',
              })}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* 전체 및 장르별 영화들 */}
      <PaginatedCarousel endpoint="movie/popular" queryKey={['']} />
      {/* <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {generesData
          ? generesData.results.map((item) => (
              <MovieCard
                onClick={handleDetailClick}
                height="medium"
                movieList={true}
                key={item.id}
                item={item}
              />
            ))
          : []}
      </RowCarousel> */}
      <LazyCarousel title="인기 콘텐츠" endpoint="movie/popular" queryKey={['popular']} />
      <LazyCarousel title="최고 평점" endpoint="movie/top_rated" queryKey={['topRated']} />
      <LazyCarousel title="개봉 예정" endpoint="movie/upcoming" queryKey={['upcoming']} />
      {/* <PaginatedCarousel title="개봉 예정" endpoint="movie/upcoming" queryKey={['upcoming']} /> */}
    </div>
  );
}

export default Home;
