import path from 'path';
import { Configuration } from '@rspack/core';
import { rspack } from '@rspack/core';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const commonConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: {
      disableDotRule: true, // ❗ URL에 .js 들어가도 fallback 처리
      index: '/index.html', // ❗ 항상 index.html 제공
    },
  },
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@typings': path.resolve(__dirname, '../typings'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@constants': path.resolve(__dirname, '../src/constants'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../../../packages/shared/src'),
        ],
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: false,
                dynamicImport: false,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: isDev,
                  refresh: isDev,
                },
              },
            },
            env: {
              targets: 'defaults',
            },
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      // CSS 규칙은 dev/prod에서 각각 정의
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),

    new TsCheckerRspackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
  },
};

export default commonConfig;
