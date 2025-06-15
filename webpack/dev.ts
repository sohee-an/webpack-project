import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';
import commonConfig from './common';

const devConfig: Configuration & { devServer?: DevServerConfig } = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new ReactRefreshWebpackPlugin(), new Dotenv({ path: './.env', systemvars: true })],
  devServer: {
    static: './public',
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
});

export default devConfig;
