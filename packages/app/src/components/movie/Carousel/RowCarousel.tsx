import React, { useRef, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  children: ReactNode;
  itemClassName?: string;
  height?: 'short' | 'medium' | 'tall';
  onNext?: () => void;
  onPrev?: () => void;
};

const heightMap = {
  short: 'h-48',
  medium: 'h-72',
  tall: 'h-[620px]',
};

export default function RowCarousel({
  children,
  itemClassName = 'w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/3',
  height,
  onNext,
  onPrev,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    if (dir === 'left') onPrev?.();
    else onNext?.();
  };

  return (
    <div className={`mb-4 mt-2 relative w-full  px-10 ${heightMap[height ?? 'medium']} `}>
      <button
        aria-label="이전 슬라이드로 이동"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2"
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        className="flex  overflow-x-hidden no-scrollbar scroll-smooth snap-x snap-mandatory gap-4 px-8"
      >
        {React.Children.toArray(children).map((child, i) => (
          <div key={i} className={`snap-start flex-shrink-0 ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      <button
        aria-label="다음 슬라이드로 이동"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
