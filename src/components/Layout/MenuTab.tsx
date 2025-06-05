import React, { useRef, useState, useEffect } from 'react';

type TProps = {
  tabs: string[];
};

function MenuTab({ tabs }: TProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    if (currentTab) {
      const rect = currentTab.getBoundingClientRect();
      const containerRect = currentTab.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setUnderlineStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="relative w-fit border-b border-gray-700 ">
      <button className="flex">
        {tabs.map((label, index) => (
          <button
            key={label}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm ${
              activeIndex === index ? 'text-white' : 'text-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </button>

      <div
        className="absolute bottom-0 h-[2px] bg-white transition-all duration-300"
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  );
}

export default MenuTab;
