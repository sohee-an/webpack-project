import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { TMovieResult } from 'types/movie';
type Props = {
  items: ReactNode[];
  onClick: (mid: number) => void;
  data?: TMovieResult;
};

export default function Carousel({ items, onClick, data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);

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
        aria-label="이전 슬라이드로 이동"
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
              onClick={() => onClick(item.id)}
              key={i}
              className="flex-shrink-0 w-full h-full flex items-center justify-center px-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${item.posterPath}`}
                alt={`${item.title} Poster`}
                loading={i === 0 ? 'eager' : 'lazy'} // 이미지를 얼마나 빨리 가져올지~
                fetchPriority={i === 0 ? 'high' : 'auto'} // 리소스 요청 우선순위
                className="h-full w-auto object-fit"
              />
            </div>
          ))}
      </div>

      <button
        aria-label="다음 슬라이드로 이동"
        onClick={() => scrollToIndex(index + 1)}
        disabled={index === items.length - 1}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2  text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
