// components/PaginatedCarousel.tsx
import React, { useState } from 'react';
import RowCarousel from './Carousel/RowCarousel';
import MovieCard from './MovieCard/MovieCard';
import { usePaginatedMovies } from '@/hooks/movie/usePaginatedMovies';

type Props = {
  endpoint: string;
  queryKey: string[];
  title?: string;
  params?: Record<string, string>;
};

export default function PaginatedCarousel({ endpoint, queryKey, title, params }: Props) {
  const [page, setPage] = useState(1);
  const { data } = usePaginatedMovies(endpoint, page, queryKey, params);

  const handleDetailClick = (mid: number) => {
    window.scrollTo(0, 0);
    location.href = `/${mid}`;
  };

  return (
    <div>
      {title && <div className="text-white text-[20px] px-8 font-bold">{title}</div>}
      <RowCarousel
        height="medium"
        onNext={() => setPage((p) => p + 1)}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        itemClassName="w-1/2 sm:w-1/3 md:w-1/6"
      >
        {data?.results.map((item) => (
          <MovieCard
            onClick={handleDetailClick}
            height="medium"
            movieList={true}
            key={item.id}
            item={item}
          />
        ))}
      </RowCarousel>
    </div>
  );
}
