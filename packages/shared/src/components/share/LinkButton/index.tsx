import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base:
    'inline-flex items-center justify-center rounded font-medium transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    variant: {
      primary: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'bg-transparent text-white hover:bg-gray-600',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export type LinkButtonProps = VariantProps<typeof button> & {
  LinkComponent: React.ComponentType<LinkProps>;
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
};

export function LinkButton({
  LinkComponent,
  href,
  children,
  variant,
  size,
  icon,
  className,
  target,
  rel,
}: LinkButtonProps) {
  return (
    <LinkComponent
      href={href}
      target={target}
      rel={rel}
      className={button({ variant, size, class: className })}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
    </LinkComponent>
  );
}

export default LinkButton;
