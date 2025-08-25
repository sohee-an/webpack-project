import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    checker({ typescript: true }),
    mode === 'production' && visualizer({ open: true }), // 번들 분석기
  ],
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'production' ? 'hidden' : true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  resolve: {
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
}));
