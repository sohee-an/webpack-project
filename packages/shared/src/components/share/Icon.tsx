import { LucideIcon } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

type Props = {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
};

const Icon = ({ icon: IconComponent, size = 5, color = 'text-gray-700', className }: Props) => {
  return <IconComponent className={clsx(`w-${size} h-${size}`, color, className)} />;
};

export default Icon;
