import React from 'react';

function MovieCard({ item }: any) {
  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="text-sm text-gray-400">{item.label}</div>
      <div>{item.label2}</div>
      <div className="text-gray-400">{item.title}</div>
      {/* <div>{item.img}</div> */}
    </div>
  );
}

export default MovieCard;
