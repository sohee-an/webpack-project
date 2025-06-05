import React from 'react';
import Carousel from '@/components/share/Carousel/Carousel';
import MovieCard from '@/components/share/MovieCard/MovieCard';
import RowCarousel from '@/components/share/Carousel/RowCarousel';

export const dummydata = [
  {
    id: 1,
    label: '베스트 셀렉션',
    label2: '오직 왓챠에서',
    title: '만나는 오리지널 & 익스클루시브 콘텐츠',
    img: 'https://image.wat.ch/media/contents/2023/10/04/202310041606_0.jpg',
  },
  {
    id: 2,
    label: '화제의 작품',
    label2: '지금 바로 감상',
    title: '전 세계가 주목한 그 작품',
    img: 'https://image.wat.ch/media/contents/2023/08/21/202308211512_1.jpg',
  },
  {
    id: 3,
    label: '새로 올라온',
    label2: '따끈한 신작',
    title: '놓치면 후회할 최신 영화',
    img: 'https://image.wat.ch/media/contents/2023/09/18/202309181235_2.jpg',
  },
  {
    id: 4,
    label: '왓챠 익스클루시브',
    label2: '오직 여기서만',
    title: '다른 플랫폼에서는 볼 수 없는 콘텐츠',
    img: 'https://image.wat.ch/media/contents/2023/10/02/202310021130_3.jpg',
  },
  {
    id: 5,
    label: '감성 무비',
    label2: '힐링이 필요할 때',
    title: '마음을 울리는 따뜻한 이야기',
    img: 'https://image.wat.ch/media/contents/2023/07/12/202307121205_4.jpg',
  },
  {
    id: 6,
    label: '왓챠 시리즈',
    label2: '중독성 있는 전개',
    title: '정주행 각! 빠져드는 드라마',
    img: 'https://image.wat.ch/media/contents/2023/09/10/202309101222_5.jpg',
  },
  {
    id: 7,
    label: 'TOP 10',
    label2: '인기 급상승',
    title: '지금 왓챠에서 가장 많이 본 콘텐츠',
    img: 'https://image.wat.ch/media/contents/2023/10/01/202310011543_6.jpg',
  },
  {
    id: 8,
    label: '왓챠 오리지널',
    label2: 'ONLY WATCHA',
    title: '왓챠가 만든 독점 콘텐츠',
    img: 'https://image.wat.ch/media/contents/2023/08/11/202308111101_7.jpg',
  },
  {
    id: 9,
    label: '감상 후 강력 추천',
    label2: '왓챠 유저가 뽑은 작품',
    title: '평점 높은 콘텐츠 모음',
    img: 'https://image.wat.ch/media/contents/2023/07/25/202307251317_8.jpg',
  },
  {
    id: 10,
    label: '장르 파괴',
    label2: '신선한 시도',
    title: '기존의 틀을 깬 실험적 콘텐츠',
    img: 'https://image.wat.ch/media/contents/2023/09/30/202309301133_9.jpg',
  },
];
function Home() {
  return (
    <div className=" ">
      <Carousel
        items={Array.from({ length: 10 }, (_, i) => (
          <div className="w-full h-[630px] bg-white p-4 text-center">Item {i + 1}</div>
        ))}
      />
      <section>
        <RowCarousel>
          {dummydata.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </RowCarousel>
      </section>
    </div>
  );
}

export default Home;
