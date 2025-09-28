export const CarouselSkeleton = () => (
  <div className="h-[620px] bg-black rounded-lg relative overflow-hidden">
    <div className="absolute inset-0 bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    </div>
  </div>
);
