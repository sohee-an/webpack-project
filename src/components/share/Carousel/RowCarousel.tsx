import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  children: React.ReactNode[];
  itemClassName?: string;
};

export default function RowCarousel({
  children,
  itemClassName = 'w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/3',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full py-4 px-10">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2"
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        className="flex  overflow-x-hidden no-scrollbar scroll-smooth snap-x snap-mandatory gap-4 px-8"
      >
        {children.map((child, i) => (
          <div key={i} className={`snap-start flex-shrink-0 ${itemClassName}`}>
            {child}
          </div>
          // <div key={i} className="snap-start flex-shrink-0 ">
          //   {child}
          // </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
