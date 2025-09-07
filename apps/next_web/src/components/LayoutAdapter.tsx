import React, { type ReactNode } from 'react';
import { Layout } from '@packages/shared';
import HeaderAdapter from './HeaderAdapter';
import { Footer } from '@packages/shared'; // 예시

export default function LayoutAdapter({ children }: { children?: ReactNode }) {
  return (
    <Layout header={<HeaderAdapter />} footer={<Footer />}>
      {children}
    </Layout>
  );
}
