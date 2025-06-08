import React from 'react';
import { useDetail } from '@/hooks/movie/detail/useDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/share/Button';
import { useSimilar } from '@/hooks/movie/detail/useSimilar';
import RowCarousel from '@/components/share/Carousel/RowCarousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import { useCredits } from '@/hooks/movie/detail/useCredits';
import TrailerSection from '@/components/share/TrailerSection';

function Detail() {
  const { mid } = useParams();
  const navigate = useNavigate();
  const { data } = useDetail({
    language: 'ko-KR',
    mid: mid ?? '',
  });

  const { data: similarData } = useSimilar({
    language: 'ko-KR',
    mid: mid ?? '',
  });
  const { data: creditsData } = useCredits({
    language: 'ko-KR',
    mid: mid ?? '',
  });

  const handleDetailClick = (mid: number) => {
    navigate(`/${mid}`);
  };

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="text-white">
      <section className=" border-b border-b-gray-500 p-4 mb-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 mb-8 w-[50%]">
            <h1>{data.title}</h1>
            <span>평균: {data.vote_average}</span>
            <div className="flex gap-2 text-gray-300">
              {data.genres.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
            <div>러닝타입: {data.runtime}분</div>
            <div className="flex gap-2">
              <span>번역 : </span>
              <div className="flex gap-2">
                {data.spoken_languages.map((item) => {
                  return <div>{item.name}</div>;
                })}
              </div>
            </div>

            <span className="text-gray-400">{data.overview}</span>
          </div>
          <TrailerSection />
          {/* 
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={`${data.title} Poster`}
            className="w-[20%] h-80 object-cover"
          /> */}
        </div>
        <p className="flex space-between">
          <Button>구독하기</Button>
        </p>
      </section>
      {/* 풀현진들 */}
      <section className="px-4 mb-4">
        <div className="text-white text-[20px] font-bold">출현진들</div>
        <div className="flex gap-4">
          {creditsData &&
            creditsData.cast.slice(0, 7).map((actor) => (
              <div>
                <img
                  className="w-[90px] h-[110px] mb-1"
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                />
                <div key={actor.id}>{actor.name}</div>
              </div>
            ))}
        </div>
      </section>
      {/* 감독들 */}
      <section className="px-4 mb-10">
        <div className="text-white text-[20px] font-bold">감독</div>
        <div className="flex gap-4">
          {creditsData &&
            creditsData.crew.slice(0, 2).map((crew) => (
              <div>
                {crew.profile_path ? (
                  <img
                    className="w-[90px] h-[110px] mb-1"
                    src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                  />
                ) : (
                  <div className="w-20 h-[120px] bg-gray-700" />
                )}
                <div key={crew.id}>{crew.name}</div>
              </div>
            ))}
        </div>
      </section>

      {/* 비슷한 영화들 */}
      <div className="text-white text-[20px] px-8 font-bold">비슷한 콘텐츠들</div>
      <RowCarousel height="medium" itemClassName="w-1/2 sm:w-1/3 md:w-1/6">
        {similarData
          ? similarData.results.map((item) => (
              <MovieCard
                onClick={handleDetailClick}
                height="medium"
                movieList={true}
                key={item.id}
                item={item}
              />
            ))
          : []}
      </RowCarousel>
    </div>
  );
}

export default Detail;
