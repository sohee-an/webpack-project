import React, { useEffect, useRef, useState } from 'react';

export type MenuTabItem = { key: string | number; name: string; link: string };

export type MenuTabProps = {
  tabs: MenuTabItem[];
  currentPath?: string;
  LinkComponent: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  onActiveChange?: (index: number) => void;
};

export default function MenuTab({
  tabs,
  currentPath = '/',
  LinkComponent,
  onActiveChange,
}: MenuTabProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const idx = tabs.findIndex((t) => t.link === currentPath);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveIndex(idx);
      onActiveChange?.(idx);
    }
  }, [currentPath, tabs, activeIndex, onActiveChange]);

  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[activeIndex];
      const parent = el?.parentElement?.getBoundingClientRect();
      const rect = el?.getBoundingClientRect();
      if (rect && parent) setUnderline({ left: rect.left - parent.left, width: rect.width });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeIndex, tabs.length]);

  return (
    <div className="relative w-fit">
      <div className="flex">
        {tabs.map((t, i) => {
          const active = i === activeIndex;
          return (
            <div
              key={t.key ?? t.link ?? i}
              ref={(el) => {
                if (el) {
                  itemRefs.current[i] = el;
                }
              }}
              className="px-4 py-2"
            >
              <LinkComponent
                href={t.link}
                className={active ? 'text-white' : 'text-gray-400 hover:text-white transition'}
              >
                {t.name}
              </LinkComponent>
            </div>
          );
        })}
      </div>

      <div
        className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 z-10"
        style={{ left: underline.left, width: underline.width }}
      />
    </div>
  );
}
