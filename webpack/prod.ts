import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Dotenv from 'dotenv-webpack';
import commonConfig from './common';
import TerserPlugin from 'terser-webpack-plugin';

const prodConfig = merge(commonConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new Dotenv({ path: './.env', systemvars: true }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, //  콘솔 로그 제거
            drop_debugger: true, //  디버거 제거
          },
        },
        extractComments: false, // 주석 제거
      }),
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

export default prodConfig;
