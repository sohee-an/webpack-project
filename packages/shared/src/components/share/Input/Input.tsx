import React, { forwardRef, ReactNode } from 'react';

type Tprops = {
  icon?: ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Tprops>(({ icon, ...props }, ref) => {
  return (
    <div className="flex items-center bg-gray-600 rounded-md p-1.5">
      {icon}
      <input
        ref={ref}
        {...props}
        type="text"
        className="bg-transparent outline-none text-white placeholder-white flex-1 text-sm"
      />
    </div>
  );
});
