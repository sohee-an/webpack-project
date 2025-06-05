import Carousel from '@/stories/Carousel';
import React from 'react';

function Home() {
  return (
    <div className=" ">
      <Carousel
        items={Array.from({ length: 10 }, (_, i) => (
          <div className="w-full h-full bg-white p-4 text-center">Item {i + 1}</div>
        ))}
      />
    </div>
  );
}

export default Home;
