import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

const placeholders = [
  '검색해보세요!',
  '영화를 찾아보세요!',
  '배우 이름도 좋아요!',
  '장르로 검색해볼까요?',
];

type Tprops = {
  icon?: ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Tprops>(({ icon, ...props }, ref) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setAnimating(false);
      }, 200);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center bg-gray-600 rounded-md p-1.5">
      {icon}
      <input
        ref={ref}
        {...props}
        type="text"
        placeholder=""
        className="bg-transparent outline-none text-white placeholder-white flex-1 text-sm relative z-10"
      />
      <span
        className={`absolute left-[40px] text-white text-sm pointer-events-none transition-all duration-200 ease-in-out ${
          animating ? 'opacity-0 -translate-y-2' : 'opacity-50 translate-y-0'
        }`}
      >
        {placeholders[index]}
      </span>
    </div>
  );
});
