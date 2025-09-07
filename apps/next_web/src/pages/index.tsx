import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Carousel } from '@sohee-an/ui-carousel';
import MovieCard from '@components/movie/MovieCard/MovieCard';
import RowCarousel from '@components/movie/Carousel/RowCarousel';
import { useMoviePopularQuery } from '@hooks/movie/useMoviePopularQuery';
import { MOVIE_GENRES } from '@constants/movie';
import PaginatedCarousel from '@components/movie/PaginatedCarousel';
import LazyCarousel from '@components/movie/LazyCarousel';
import { tv } from 'tailwind-variants';
import { IMAGE_BASE_URL, IMAGE_SIZE } from '@constants/imageBaseUrl';

export default function Home() {
  const router = useRouter();
  const [generesId, setGeneresId] = useState(0);
  const [page, setPage] = useState(1);

  // 랜덤 페이지
  useEffect(() => {
    const random = Math.floor(Math.random() * 50) + 1;
    setPage(random);
  }, []);

  // 상단 캐러셀용
  const { data } = useMoviePopularQuery({ language: 'ko-KR', page });

  // 인기영화 리스트용
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useMoviePopularQuery({ language: 'ko-KR', page: 1 });

  const handleDetailClick = (mid: number) => {
    router.push(`/${mid}`);
  };

  const handleClick = (id: number) => setGeneresId(id);

  const buttonVariants = tv({
    base: 'py-1 px-3 border rounded-full transition-colors duration-200',
    variants: {
      variant: {
        default: 'bg-white text-black border-white',
        outline: 'text-gray-400 border-gray-400 hover:border-gray-200',
      },
    },
    defaultVariants: { variant: 'outline' },
  });
  const Carousel = dynamic(
    () => import('@sohee-an/ui-carousel').then((m) => m.Carousel ?? m.default),
    { ssr: false },
  );

  if (popularLoading) return <p>로딩 중...</p>;
  if (popularError) return <p>에러 발생!</p>;

  return (
    <>
      <Head>
        <title>홈 | Movie</title>
        <meta name="description" content="인기 영화, 장르 필터, 추천 영화" />
      </Head>

      <section>
        {/* 상단 캐러셀 */}
        {data?.results && data.results.length > 0 && (
          <Carousel
            items={data.results}
            containerClassName="bg-black"
            renderItem={(movie, index) => (
              <img
                src={`${IMAGE_BASE_URL}${IMAGE_SIZE.medium}${movie.posterPath}`}
                alt={`${movie.title} Poster`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="h-full w-auto object-cover"
              />
            )}
            height="620px"
            className="bg-black rounded-lg"
          />
        )}

        {/* 인기 영화들 */}
        <RowCarousel height="tall">
          {popularData
            ? popularData.results.map((item) => (
                <MovieCard onClick={handleDetailClick} height="tall" key={item.id} item={item} />
              ))
            : null}
        </RowCarousel>

        {/* 장르 필터 버튼 */}
        <div className="flex gap-4 px-8 mb-4">
          {MOVIE_GENRES.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={buttonVariants({ variant: generesId === id ? 'default' : 'outline' })}
            >
              {name}
            </button>
          ))}
        </div>

        <PaginatedCarousel endpoint="movie/popular" queryKey={['']} />
        <LazyCarousel title="최고 평점" endpoint="movie/top_rated" queryKey={['topRated']} />
        <LazyCarousel
          title="오늘은 이 영화 어때?"
          endpoint="movie/popular"
          queryKey={['popular']}
        />
        <LazyCarousel title="개봉 예정" endpoint="movie/upcoming" queryKey={['upcoming']} />
      </section>
    </>
  );
}
