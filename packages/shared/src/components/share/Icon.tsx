import { LucideIcon } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';

type IconProps = {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({ icon: IconComponent, size = 5, color = 'text-gray-700', className }: IconProps) => {
  return <IconComponent className={clsx(`w-${size} h-${size}`, color, className)} />;
};