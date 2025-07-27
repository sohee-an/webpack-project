import { Configuration } from '@rspack/core';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import commonConfig from './common';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

const devConfig: Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [new ReactRefreshPlugin(), new Dotenv({ path: './.env', systemvars: true })],
  devServer: {
    static: './public',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'javascript/auto',
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
});

export default devConfig;
