import { ReactNode } from 'react';

export interface CarouselItem {
  id: string | number;
  [key: string]: any;
}

export interface CarouselProps<T extends CarouselItem> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onItemClick?: (item: T, index: number) => void;
  className?: string;
  height?: string | number;
  // 아이콘 커스터마이징
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showArrows?: boolean;
  // 스타일링
  containerClassName?: string;
  itemClassName?: string;
  arrowClassName?: string;
  // 기능
  loop?: boolean;
}
