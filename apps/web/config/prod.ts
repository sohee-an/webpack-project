import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';
import commonConfig from './common';
import { rspack } from '@rspack/core';

const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new Dotenv({ path: './.env', systemvars: true }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // TerserPlugin → SwcJsMinimizerRspackPlugin (훨씬 빠르다고 한다)
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            drop_console: true, // 콘솔 로그 제거
            drop_debugger: true, // 디버거 제거
            dead_code: true, // 데드 코드 제거
            unused: true, // 사용하지 않는 변수 제거
          },
          mangle: true, // 변수명 단축
        },
      }),

      //  CSS 압축 추가 (선택사항)
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
    splitChunks: {
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
});
console.log('[entry check]', prodConfig.entry);
export default prodConfig;
