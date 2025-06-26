import React, { useState, useRef, useEffect } from 'react';

export default function OverviewSection({ overview }: { overview: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const hiddenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hiddenRef.current) {
      const el = hiddenRef.current;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const totalLineCount = el.clientHeight / lineHeight;

      setShouldShowToggle(totalLineCount > 3);
    }
  }, [overview]);

  return (
    <div className="text-gray-400">
      <div className={`${isExpanded ? '' : 'line-clamp-3'} text-gray-400`}>{overview}</div>

      <div
        ref={hiddenRef}
        className="absolute invisible pointer-events-none h-auto whitespace-pre-wrap w-full"
        style={{ position: 'absolute', zIndex: -9999, visibility: 'hidden' }}
      >
        {overview}
      </div>

      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 text-sm text-blue-400 hover:underline"
        >
          {isExpanded ? '접기 ▲' : '더보기 ▼'}
        </button>
      )}
    </div>
  );
}
