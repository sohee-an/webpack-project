import React, { ReactNode } from 'react';

export type LayoutProps = {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export default function Layout({ children, header, footer }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black">
      {header ?? null}
      <main className="flex-1 text-white">{children}</main>
      {footer ?? null}
    </div>
  );
}
