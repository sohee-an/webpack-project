import React, { useState, useRef, useEffect } from 'react';

export default function OverviewSection({ overview }: { overview: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const visibleLineCount = el.clientHeight / lineHeight;

      setShouldShowToggle(visibleLineCount > 5);
    }
  }, [overview]);

  return (
    <div className="text-gray-400">
      <div
        ref={contentRef}
        className={`relative transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px]' : 'max-h-[360px] overflow-hidden'
        }`}
        style={{ lineHeight: '24px' }}
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
