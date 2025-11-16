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
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { CarouselSkeleton } from '@/components/skeleton/CarouselSkeleton';
import { fetchHome } from '@/featcher/home/apihelper/fetchHome';
import { HomeResponse } from './api/home';

//ssr로 하기
// export const getServerSideProps: GetServerSideProps = async () => {
//   const baseUrl = process.env.PUBLIC_API_URL || 'http://localhost:3000';
//   const res = await fetch(`${baseUrl}/api/home?page=1`);
//   const homeData = await res.json();
//   return { props: { initialData: homeData } };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  // SSR 시점에 ['home', 1] 데이터를 미리 캐시에 채워둔다
  await queryClient.prefetchQuery({
    queryKey: ['home', 1],
    queryFn: () => fetchHome(1),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // Hydrate 용 데이터
      initialPage: 1, // 페이지 상태 초기값 정도만 넘겨둠
    },
  };
};

export default function Home({ initialPage = 1 }: { initialPage?: number }) {
  const router = useRouter();
  const [generesId, setGeneresId] = useState(0);

  const [page, setPage] = useState(initialPage);

  const { data, isFetching } = useQuery<HomeResponse>({
    queryKey: ['home', page],
    queryFn: () => fetchHome(page),
    // keepPreviousData: true, // 나중에 페이지네이션 부드럽게 하고 싶으면 켜도 됨
  });

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

  const handleNext = async () => {
    setPage((pre) => pre + 1);
  };

  if (isFetching) return <p>로딩 중...</p>;
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
          {data?.popular?.results && data.popular.results.length > 0 ? (
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

        {/* 인기 영화들 중크기 */}
        <RowCarousel onNext={handleNext} height="tall" containerClassName="mt-10 mb-10">
          {data?.popular?.results
            ? data?.popular.results.map((item) => (
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
