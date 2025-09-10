import React from 'react';
// import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useMovieVideosQuery } from '@hooks/movie/detail/useMovieVideosQuery';
import { useDetailQuery } from '@hooks/movie/detail/useDetailQuery';
import { IMAGE_BASE_URL, IMAGE_SIZE } from '@constants/imageBaseUrl';

export default function TrailerSection() {
  // const { mid } = useParams();
  const { query, isReady } = useRouter();

  const mid = typeof query.mid === 'string' ? query.mid : undefined;

  const { data: videoData, isLoading: videoLoading } = useMovieVideosQuery({ mid: mid ?? '' });
  const { data: movieData } = useDetailQuery({ mid: mid ?? '', language: 'ko-KR' });

  const trailer = videoData?.results.find((video) => video.site === 'YouTube');

  if (videoLoading) {
    return null;
  }

  if (!isReady || !mid) return null;
  if (trailer) {
    return (
      <div className="aspect-video w-[400px] max-w-2xl">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allowFullScreen
        />
      </div>
    );
  }

  if (movieData?.posterPath) {
    return (
      <img
        className="w-[300px] h-[400px] object-fit"
        src={`${IMAGE_BASE_URL}${IMAGE_SIZE.medium}${movieData.posterPath}`}
        alt={`${movieData.title} Poster`}
      />
    );
  }

  return;
}
