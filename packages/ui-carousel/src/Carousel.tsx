import React, { useRef, useState, useEffect } from 'react';
import { CarouselProps, CarouselItem } from './types';

const DefaultLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DefaultRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Carousel<T extends CarouselItem>({
  items,
  renderItem,
  onItemClick,
  className = '',
  height = '620px',
  leftIcon = <DefaultLeftIcon />,
  rightIcon = <DefaultRightIcon />,
  showArrows = true,
  containerClassName = '',
  itemClassName = '',
  arrowClassName = '',
  loop = false,
}: CarouselProps<T>) {
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

    let newIndex = i;

    if (loop) {
      if (i < 0) newIndex = items.length - 1;
      if (i >= items.length) newIndex = 0;
    } else {
      if (i < 0) newIndex = 0;
      if (i >= items.length) newIndex = items.length - 1;
    }

    const container = containerRef.current;
    container.scrollTo({ left: width * newIndex, behavior: 'smooth' });
    setIndex(newIndex);
  };

  const canGoPrev = loop || index > 0;
  const canGoNext = loop || index < items.length - 1;

  return (
    <div
      className={`carousel-container relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {showArrows && (
        <button
          aria-label="이전 슬라이드로 이동"
          onClick={() => scrollToIndex(index - 1)}
          disabled={!canGoPrev}
          className={`carousel-arrow carousel-arrow-left absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed ${arrowClassName}`}
        >
          {leftIcon}
        </button>
      )}

      <div
        ref={containerRef}
        className={`carousel-track flex transition-all duration-500 ease-in-out overflow-hidden ${containerClassName}`}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item, i)}
            className={`carousel-item flex-shrink-0 w-full h-full flex items-center justify-center px-2 ${onItemClick ? 'cursor-pointer' : ''} ${itemClassName}`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {showArrows && (
        <button
          aria-label="다음 슬라이드로 이동"
          onClick={() => scrollToIndex(index + 1)}
          disabled={!canGoNext}
          className={`carousel-arrow carousel-arrow-right absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed ${arrowClassName}`}
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}
