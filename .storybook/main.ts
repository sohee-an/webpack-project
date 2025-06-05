import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-webpack5-compiler-swc',
      options: {
        swcLoaderOptions: {
          jsc: {
            transform: {
              react: {
                runtime: 'automatic', // React 17+ 자동 JSX 변환
              },
            },
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
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
    // CSS 처리는 Storybook 기본 설정에 맡기고, 별도 처리하지 않음

    // 경로 별칭 설정만 추가
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
