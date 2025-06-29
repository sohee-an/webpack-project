import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorFallbackProps = {
  error?: Error;
  resetErrorBoundary?: () => void;
};

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const [retryCount, setRetryCount] = useState(() => {
    return Number(localStorage.getItem('retryCount') || '0');
  });

  const isOverRetryLimit = retryCount >= 3;

  const handleClick = () => {
    if (isOverRetryLimit) {
      localStorage.removeItem('retryCount');
      navigate('/');
    } else {
      const nextCount = retryCount + 1;
      localStorage.setItem('retryCount', nextCount.toString());
      setRetryCount(nextCount);
      resetErrorBoundary?.();
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 text-white bg-gray-600 rounded-md">
      <h2 className="text-lg font-bold mb-2">문제가 발생했어요 😢</h2>
      <p className="mb-4">{error?.message || '알 수 없는 오류입니다.'}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-white text-gray-600 font-semibold rounded hover:bg-gray-100"
      >
        {isOverRetryLimit ? '홈으로 이동' : '다시 시도하기'}
      </button>
    </section>
  );
}

export default ErrorFallback;
