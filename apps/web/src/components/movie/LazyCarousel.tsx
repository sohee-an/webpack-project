import React, { useEffect, useRef, useState } from 'react';
import PaginatedCarousel from '@components/movie/PaginatedCarousel';

export default function LazyCarousel({
  title,
  endpoint,
  queryKey,
}: {
  title: string;
  endpoint: string;
  queryKey: string[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.unobserve(entry.target); // 한 번만 감지
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.1,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {isVisible && <PaginatedCarousel title={title} endpoint={endpoint} queryKey={queryKey} />}
    </div>
  );
}
