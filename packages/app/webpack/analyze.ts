import { merge } from 'webpack-merge';
import prodConfig from './prod';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration } from 'webpack';

const analyzeConfig: Configuration = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: true,
    }),
  ],
};

export default merge(prodConfig, analyzeConfig);
