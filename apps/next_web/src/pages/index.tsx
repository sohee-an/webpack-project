import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import MovieCard from '@components/movie/MovieCard/MovieCard';
import RowCarousel from '@components/movie/Carousel/RowCarousel';
import { useMoviePopularQuery } from '@hooks/movie/useMoviePopularQuery';
import { MOVIE_GENRES } from '@constants/movie';
import LazyCarousel from '@components/movie/LazyCarousel';
import { tv } from 'tailwind-variants';
import { IMAGE_BASE_URL, IMAGE_SIZE } from '@constants/imageBaseUrl';
import { TMovieResult } from '@/types/movie';
import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';
import { CarouselSkeleton } from '@/components/skeleton/CarouselSkeleton';

//ssr로 하기
// export const getServerSideProps: GetServerSideProps = async () => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//   const res = await fetch(`${baseUrl}/api/home?page=1`);
//   console.log('res11', res);
//   const homeData = await res.json();
//   return { props: { initialData: homeData } };
// };

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // 배포 환경에서도 동작하도록 host와 protocol을 감지
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  // 서버 내부에서 자기 자신에게 요청 (Token은 API Route에서 처리됨)
  const res = await fetch(`${baseUrl}/api/home?page=1`);

  if (!res.ok) {
    console.error('❌ SSR Fetch Error:', res.status, res.statusText);
    return { notFound: true };
  }

  const homeData = await res.json();

  return { props: { initialData: homeData } };
};

export default function Home({
  initialData,
}: {
  initialData: { popular: TMovieResult; topRated: TMovieResult; upcoming: TMovieResult };
}) {
  const router = useRouter();
  const [generesId, setGeneresId] = useState(0);

  const [page, setPage] = useState(1);

  // 랜덤 페이지
  // useEffect(() => {

  //   setPage(random);
  // }, []);
  const random = Math.floor(Math.random() * 50) + 1;
  // 상단 랜덤으로 보여주는 캐러샐용
  const { data: randomMovie } = useMoviePopularQuery({ language: 'ko-KR', page: random });

  const handleDetailClick = (mid: number) => {
    router.push(`/${mid}`);
  };

  const handleClick = (id: number) => setGeneresId(id);

  const buttonVariants = tv({
    base: 'py-1 px-3 border rounded-full transition-colors duration-200 text-lg',
    variants: {
      variant: {
        default: 'bg-white text-black border-white',
        outline: 'text-gray-500 border-gray-500 hover:border-gray-200',
      },
    },
    defaultVariants: { variant: 'outline' },
  });
  const Carousel = dynamic(
    () => import('@sohee-an/ui-carousel').then((m) => ({ default: m.Carousel })),
    { ssr: false },
  );
  const { data, isFetching } = useQuery({
    queryKey: ['home', page],
    queryFn: async () => {
      const res = await fetch(`/api/home?page=${page}`);
      return res.json();
    },
    initialData: page === 1 ? initialData : undefined,
    // keepPreviousData: true,
  });
  const { data: popularData } = useMoviePopularQuery({ language: 'ko-KR', page: 1 });

  // if (popularLoading) return <p>로딩 중...</p>;
  // if (popularError) return <p>에러 발생!</p>;

  return (
    <>
      <Head>
        <title>홈 | Movie</title>
        <meta name="description" content="인기 영화, 장르 필터, 추천 영화" />
      </Head>

      <section>
        {/* 상단 캐러셀 */}
        <div className="h-[620px] bg-black rounded-lg">
          {data.popular?.results && data.popular.results.length > 0 ? (
            <div className="animate-fade-in">
              <Carousel
                items={data.popular.results}
                containerClassName="bg-black "
                renderItem={(movie, index) => (
                  <Image
                    src={`${IMAGE_BASE_URL}${IMAGE_SIZE.medium}${movie.posterPath}`}
                    alt={`${movie.title} Poster`}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-contain object-center"
                  />
                )}
                height="620px"
                className="bg-black rounded-lg"
              />
            </div>
          ) : (
            <CarouselSkeleton />
          )}
        </div>

        {/* 인기 영화들 */}
        <RowCarousel height="tall" containerClassName="mt-10 mb-10">
          {data.popular?.results
            ? data.popular.results.map((item) => (
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
        <LazyCarousel endpoint="movie/popular" queryKey={['popular']} />

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
