import path from 'path';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { Configuration as WebpackConfiguration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  name: 'webpack-project',
  mode: isDevelopment ? 'development' : 'production',
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: './src/index.tsx',

  optimization: {
    splitChunks: {
      // 동적 + 정적 import 모두 분리 대상이 된다.기본설정으로 하게 되면 main.js에 다 들어감
      //  all로 하면venders.js로 나뉨
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },

        share: {
          test: /[\\/]components[\\/]share[\\/]/,
          name: 'share',
          chunks: 'all',
          minChunks: 1,
          priority: -5,
          // enforce: true, //강제로 분리
        },
        hooks: {
          test: /[\\/]hooks[\\/]/,
          name: 'hooks',
          chunks: 'all',
          minChunks: 1,
          priority: -5,
        },
      },
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js', // lazy chunk 파일
    clean: true, // dist 폴더 빌드 시 자동 정리
  },
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   clean: true,
  // },
  devtool: isDevelopment ? 'source-map' : 'hidden-source-map',
  devServer: {
    static: './public',
    port: 3000,
    hot: true,
    // open: true, // 브라우저 자동 열기
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      // CSS 로더 수정 - Tailwind CSS 지원 추가
      {
        test: /\.css$/, // .css 파일에 대해
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};

if (config.plugins) {
  if (isDevelopment) {
    config.plugins.push(
      new Dotenv({
        path: './.env',
        systemvars: true, // process.env에서 시스템 변수도 쓸 수 있게
      }),
      new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // 리포트를 static HTML 파일로 생성
        openAnalyzer: true, // 빌드 후 자동으로 브라우저에서 열기
        reportFilename: 'bundle-report.html', // 생성될 리포트 파일 이름
      }),
    );
  }

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: isDevelopment, // 개발 모드에서는 비동기, 프로덕션 모드에서는 동기
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  );
}

export default config;
