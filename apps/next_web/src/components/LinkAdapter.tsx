import Link from 'next/link';
import type { LinkProps as SharedLinkProps } from '@packages/shared';

export default function LinkAdapter({ href, children, className, target, rel }: SharedLinkProps) {
  return (
    <Link href={href} className={className} target={target} rel={rel}>
      {children}
    </Link>
  );
}
