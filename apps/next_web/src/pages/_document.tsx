import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://api.themoviedb.org" />
      <link rel="dns-prefetch" href="https://api.themoviedb.org" />
      <link rel="preconnect" href="https://image.tmdb.org" />
      <link rel="dns-prefetch" href="https://image.tmdb.org" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
