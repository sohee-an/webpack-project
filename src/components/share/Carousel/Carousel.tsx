import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

type Props = {
  items: React.ReactNode[];
};

export default function Carousel({ items }: Props) {
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
    <div className="relative w-full overflow-hidden">
      <button
        onClick={() => scrollToIndex(index - 1)}
        disabled={index === 0}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2  "
      >
        <ChevronLeft />
      </button>

      <div
        ref={containerRef}
        className="flex transition-all duration-500 ease-in-out overflow-hidden"
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0 h-full" style={{ width: `${width}px` }}>
            {item}
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
