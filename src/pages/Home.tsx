import React, { useState } from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import { useMoviePopular } from '@/hooks/movie/useMoviePopular';
import { useMovieGeneres } from '@/hooks/movie/useMovieGeneres';
import { useTopRated } from '@/hooks/movie/useTopRated';
import { useUpcoming } from '@/hooks/movie/useUpcoming';
import { MOVIE_GENRES } from '@/constants/movie';

import { tv } from 'tailwind-variants';

function Home() {
  const [generesId, setGeneresId] = useState(0);
  const [topRagePage] = useState(1);

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopular({
    language: 'ko-KR',
    page: 1,
  });

  const { data: generesData } = useMovieGeneres({
    language: 'ko-KR',
    page: 1,
    generesId,
  });

  const { data: topRatedData } = useTopRated({
    language: 'ko-KR',
    page: topRagePage,
  });

  const { data: useUpcomingData } = useUpcoming({
    language: 'ko-KR',
    page: topRagePage,
  });

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
        items={Array.from({ length: 10 }, (_, i) => (
          <div className="w-full h-[630px] bg-white p-4 text-center">Item {i + 1}</div>
        ))}
      />
      {/* 인기 영화들 */}
      <RowCarousel height="tall">
        {popularData
          ? popularData.results.map((item) => <MovieCard height="tall" key={item.id} item={item} />)
          : []}
      </RowCarousel>

      {/* 전체, 장르별로 영화들 */}
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
      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {generesData
          ? generesData.results.map((item) => (
              <MovieCard height="medium" movieList={true} key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>

      {/* 인기있는 영화들들 */}
      <div className="text-white text-[20px] px-8 font-bold">인기 있는 콘텐츠</div>
      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {popularData
          ? popularData.results.map((item) => (
              <MovieCard height="medium" movieList={true} key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>

      {/*  최고평점영화*/}
      <div className="text-white text-[20px] px-8 font-bold">최고평점영화</div>
      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {topRatedData
          ? topRatedData.results.map((item) => (
              <MovieCard height="medium" movieList={true} key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>

      <div className="text-white text-[20px] px-8 font-bold">곧 만나게 될 영화화</div>
      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {useUpcomingData
          ? useUpcomingData.results.map((item) => (
              <MovieCard height="medium" movieList={true} key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>
    </div>
  );
}

export default Home;
