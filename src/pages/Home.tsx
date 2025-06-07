import React, { useState } from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import { useMoviePopular } from '@/hooks/useMoviePopular';

import { tv } from 'tailwind-variants';

const FilterButtons = [
  { id: 0, label: '전체' },
  { id: 1, label: '로맨스' },
  { id: 2, label: '공포' },
  { id: 3, label: '기타' },
];

function Home() {
  const [filterState, setFilterState] = useState(0);
  const { data, isLoading, error } = useMoviePopular({ language: 'ko-KR', page: 1 });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  const handleClick = (id: number) => {
    setFilterState(id);
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
    <div className=" ">
      <Carousel
        items={Array.from({ length: 10 }, (_, i) => (
          <div className="w-full h-[630px] bg-white p-4 text-center">Item {i + 1}</div>
        ))}
      />
      <section>
        <RowCarousel>
          {data ? data.results.map((item) => <MovieCard key={item.id} item={item} />) : []}
        </RowCarousel>
      </section>
      {/* 전체, 장르별로 영화들 */}
      <div className="flex gap-4 px-8 mb-2">
        {FilterButtons.map(({ label, id }) => {
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={buttonVariants({
                variant: filterState === id ? 'default' : 'outline',
              })}
            >
              {label}
            </button>
          );
        })}
      </div>
      <section>
        <RowCarousel itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
          {data ? data.results.map((item) => <MovieCard key={item.id} item={item} />) : []}
        </RowCarousel>
      </section>
    </div>
  );
}

export default Home;
