import React, { useState } from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import { useMoviePopular } from '@/hooks/useMoviePopular';
import { useMovieGeneres } from '@/hooks/useMovieGeneres';

import { tv } from 'tailwind-variants';

export const MOVIE_GENRES = [
  { id: 0, name: '전체' },
  { id: 28, name: '액션' },
  // { id: 12, name: '모험' },
  { id: 16, name: '애니메이션' },
  { id: 35, name: '코미디' },
  // { id: 80, name: '범죄' },
  { id: 99, name: '다큐멘터리' },
  { id: 18, name: '드라마' },
  { id: 10751, name: '가족' },
  { id: 14, name: '판타지' },
  // { id: 36, name: '역사' },
  // { id: 27, name: '공포' },
  // { id: 10402, name: '음악' },
  // { id: 9648, name: '미스터리' },
  // { id: 10749, name: '로맨스' },
  { id: 878, name: 'SF' },
  // { id: 10770, name: 'TV 영화' },
  // { id: 53, name: '스릴러' },
  // { id: 10752, name: '전쟁' },
  // { id: 37, name: '서부' },
];

function Home() {
  const [generesId, setGeneresId] = useState(0);

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopular({
    language: 'ko-KR',
    page: 1,
  });

  const { data: similarData } = useMovieGeneres({
    language: 'ko-KR',
    page: 1,
    generesId,
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

      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {similarData
          ? similarData.results.map((item) => (
              <MovieCard height="medium" movieList={true} key={item.id} item={item} />
            ))
          : []}
      </RowCarousel>
    </div>
  );
}

export default Home;
