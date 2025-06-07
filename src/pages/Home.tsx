import React from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import { useMoviePopular } from '@/hooks/useMoviePopular';

function Home() {
  const { data, isLoading, error } = useMoviePopular({ language: 'ko-KR', page: 1 });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  console.log('data', data);
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
    </div>
  );
}

export default Home;
