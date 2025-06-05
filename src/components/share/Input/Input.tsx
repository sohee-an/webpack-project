import React from 'react';

type Tprops = {
  icon?: React.ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
function Input({ icon, ...props }: Tprops) {
  return (
    <div className="flex items-center bg-gray-600 rounded-md p-1.5">
      {icon}
      <input
        {...props}
        type="text"
        className="bg-transparent outline-none text-white placeholder-white flex-1"
      />
    </div>
  );
}

export default Input;
