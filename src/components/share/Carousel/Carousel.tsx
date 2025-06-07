import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useMoviePopular } from '@/hooks/movie/useMoviePopular';

type Props = {
  items: React.ReactNode[];
};

export default function Carousel({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(1);
  const { data } = useMoviePopular({ language: 'ko-KR', page });

  const random = Math.floor(Math.random() * 50) + 1;

  /**
   * 랜덤하게 나오게
   */
  useEffect(() => {
    setPage(random);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToIndex = (i: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.scrollTo({ left: width * i, behavior: 'smooth' });
    setIndex(i);
  };

  return (
    <div className="relative w-full overflow-hidden h-[620px]">
      <button
        onClick={() => scrollToIndex(index - 1)}
        disabled={index === 0}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2  text-white "
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        className="flex transition-all duration-500 ease-in-out overflow-hidden cursor-pointer "
      >
        {data &&
          data.results.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full h-full flex items-center justify-center px-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={`${item.title} Poster`}
                className="h-full w-auto object-cover "
              />
            </div>
          ))}
      </div>

      <button
        onClick={() => scrollToIndex(index + 1)}
        disabled={index === items.length - 1}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2  text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
