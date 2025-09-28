import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  type DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/styles/globals.css';
import LayoutAdapter from '@/components/LayoutAdapter';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState?: DehydratedState }>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <LayoutAdapter>
          <Component {...pageProps} />
        </LayoutAdapter>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
