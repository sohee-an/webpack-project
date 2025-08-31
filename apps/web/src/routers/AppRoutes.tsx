// AppRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from '@packages/shared';
import { ErrorBoundary } from '@packages/shared';
import { ErrorFallback } from '@packages/shared';
import type { FallbackProps } from 'react-error-boundary';
import { NotFoundPage } from '@packages/shared';

import { lazyWithPreload } from '../utils/lazyWithPreload';
const Home = lazyWithPreload(() => import('../pages/Home'));
const Search = lazyWithPreload(() => import('../pages/SearchPage'));
const Detail = lazyWithPreload(() => import('../pages/Detail'));

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      FallbackComponent={(fallbackProps: FallbackProps) => (
        <ErrorFallback {...fallbackProps} onRetryLimitReached={() => navigate('/')} />
      )}
    >
      <Suspense fallback={<div className="text-white p-4">로딩 중...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:mid" element={<Detail />} />
            <Route path="/search/*" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRoutes;
