import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { logError } from './logger';
//ssr 쪽 에러로그 담당
type GsspHandler<P> = (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>;

type GsspErrorOptions = {
  /**
   * 에러 발생 시 notFound 대신 redirect 하고 싶거나,
   * 커스텀 props를 내려주고 싶으면 여기에서 정의
   */
  fallback?: (ctx: GetServerSidePropsContext, error: unknown) => GetServerSidePropsResult<any>;
};

export function withGsspErrorLogging<P>(
  gssp: GsspHandler<P>,
  options?: GsspErrorOptions,
): GetServerSideProps<P> {
  return async (ctx) => {
    try {
      const result = await gssp(ctx);
      return result;
    } catch (error) {
      logError({
        layer: 'gssp',
        path: ctx.resolvedUrl,
        message: 'GSSP execution failed',
        error,
        extra: {
          query: ctx.query,
          params: ctx.params,
        },
      });

      if (options?.fallback) {
        return options.fallback(ctx, error);
      }

      //  SSR 에러나면 404로 보내기
      return { notFound: true };
    }
  };
}
