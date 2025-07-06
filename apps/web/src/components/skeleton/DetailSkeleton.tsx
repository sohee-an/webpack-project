import React from 'react';

export function DetailSkeleton() {
  return (
    <div className="text-white animate-pulse">
      <section className="border-b border-gray-500 p-4 mb-4">
        <div className="flex justify-between">
          <div className="w-[50%] space-y-3">
            <div className="h-6 bg-gray-700 rounded w-1/2" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-700 rounded w-1/4" />
            <div className="h-20 bg-gray-700 rounded" />
          </div>
          <div className="w-[400px] aspect-video bg-gray-700 rounded" />
        </div>
        <div className="mt-4">
          <div className="w-24 h-10 bg-gray-700 rounded" />
        </div>
      </section>
    </div>
  );
}
