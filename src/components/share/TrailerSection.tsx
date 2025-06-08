import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieVideos } from '@/hooks/movie/detail/useMovieVideos';
import { useDetail } from '@/hooks/movie/detail/useDetail';

export default function TrailerSection() {
  const { mid } = useParams();
  const { data: videoData } = useMovieVideos({ mid: mid ?? '' });
  const { data: movieData } = useDetail({ mid: mid ?? '', language: 'ko-KR' });

  const trailer = videoData?.results.find((video) => video.site === 'YouTube');

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

  if (movieData?.poster_path) {
    return (
      <img
        className="w-[300px] h-[400px] object-fit"
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={`${movieData.title} Poster`}
      />
    );
  }

  return;
}
