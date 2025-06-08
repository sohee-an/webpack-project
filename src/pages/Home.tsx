import React, { useState } from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import { useMoviePopular } from '@/hooks/movie/useMoviePopular';
import { MOVIE_GENRES } from '@/constants/movie';
import PaginatedCarousel from '@/components/share/PaginatedCarousel';

import { tv } from 'tailwind-variants';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [generesId, setGeneresId] = useState(0);

  const navigate = useNavigate();

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopular({
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

  return (
    <div>
      <Carousel
        onClick={handleDetailClick}
        items={Array.from({ length: 10 }, (_, i) => (
          <div className="w-full h-[630px] bg-white p-4 text-center"> {i + 1}</div>
        ))}
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

      <PaginatedCarousel title="인기 콘텐츠" endpoint="movie/popular" queryKey={['popular']} />
      <PaginatedCarousel title="최고 평점" endpoint="movie/top_rated" queryKey={['topRated']} />
      <PaginatedCarousel title="개봉 예정" endpoint="movie/upcoming" queryKey={['upcoming']} />
    </div>
  );
}

export default Home;
