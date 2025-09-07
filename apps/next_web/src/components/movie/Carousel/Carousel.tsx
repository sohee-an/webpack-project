import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { TMovieResult } from 'types/movie';
import { IMAGE_BASE_URL, IMAGE_SIZE } from '@constants/imageBaseUrl';
import Image from 'next/image';
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
              <div className="relative h-[620px] w-full overflow-hidden rounded-lg">
                <Image
                  src={`${IMAGE_BASE_URL}${IMAGE_SIZE.medium}${item.posterPath}`}
                  alt={`${item.title} Poster`}
                  fill
                  sizes="100vw"
                  priority={i === 0} // 첫 장만 프리로드(LCP 개선). 이때 loading은 넣지 않음.
                  className="object-cover" // object-fit 대체
                />
              </div>
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
