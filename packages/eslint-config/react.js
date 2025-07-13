import baseConfig from './base.js';
import storybook from 'eslint-plugin-storybook';

export default [...baseConfig, ...storybook.configs['flat/recommended']];
