import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TProps = {
  tabs: { name: string; link: string; key: number }[];
};

function MenuTab({ tabs }: TProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const updateUnderline = () => {
      const currentTab = tabRefs.current[activeIndex];
      const containerRect = currentTab?.parentElement?.getBoundingClientRect();
      if (currentTab && containerRect) {
        const rect = currentTab.getBoundingClientRect();
        setUnderlineStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
        });
      }
    };

    updateUnderline(); // 초기 위치 계산
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeIndex]);

  useEffect(() => {
    const currentPath = location.pathname;
    const index = tabs.findIndex((tab) => tab.link === currentPath);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [location.pathname, tabs]);

  const handleNavClick = (link: string, index: number) => {
    setActiveIndex(index);
    navigate(link);
  };

  return (
    <div className="relative w-fit ">
      <div className="flex">
        {tabs.map(({ name, link, key }) => (
          <button
            key={name}
            ref={(el) => {
              tabRefs.current[key] = el;
            }}
            onClick={() => handleNavClick(link, key)}
            className={`px-4 py-2 text-sm ${activeIndex === key ? 'text-white' : 'text-gray-400 '}`}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 z-10"
        style={{
          left: underlineStyle.left,
          width: underlineStyle.width,
        }}
      />
    </div>
  );
}

export default MenuTab;
