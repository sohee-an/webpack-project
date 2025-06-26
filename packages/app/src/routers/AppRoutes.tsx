// AppRoutes.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '@shared/components/Layout/Layout';
import ErrorBoundary from '@shared/components/ErrorBoundary';
import ErrorFallback from '@shared/components/ErrorFallback';
import type { FallbackProps } from 'react-error-boundary';
import Home from '@/pages/Home';
// const Home = lazy(() => import('../pages/Home'));
const Search = lazy(() => import('../pages/SearchPage'));
const Detail = lazy(() => import('../pages/Detail'));

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
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AppRoutes;
