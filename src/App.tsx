import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorFallback from './components/ErrorFallback';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/SearchPage'));
const Detail = lazy(() => import('./pages/Detail'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary fallback={<ErrorFallback />}>
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
      </Router>
    </QueryClientProvider>
  );
}

export default App;
