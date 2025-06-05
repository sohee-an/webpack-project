import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    // Tailwind CSS를 위한 PostCSS 로더 추가
    config.module?.rules?.push({
      test: /\.css$/,
      use: [
        'style-loader',
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
      include: path.resolve(__dirname, '../'),
    });

    // 경로 별칭 설정 (메인 webpack 설정과 동일하게)
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@hooks': path.resolve(__dirname, '../hooks'),
        '@components': path.resolve(__dirname, '../components'),
        '@layouts': path.resolve(__dirname, '../layouts'),
        '@pages': path.resolve(__dirname, '../pages'),
        '@utils': path.resolve(__dirname, '../utils'),
        '@typings': path.resolve(__dirname, '../typings'),
      };
    }

    return config;
  },
};

export default config;
