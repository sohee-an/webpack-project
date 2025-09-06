import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import { visualizer } from 'rollup-plugin-visualizer';

function pkg(id: string) {
  const i = id.indexOf('node_modules/');
  if (i < 0) return '';
  const seg = id.slice(i + 'node_modules/'.length).split('/');
  return seg[0].startsWith('@') ? `${seg[0]}/${seg[1]}` : seg[0];
}

//청크 분리하기
const groups: Record<string, string[]> = {
  'vendor-core': [
    'react',
    'react-dom',
    'scheduler',
    'react-router',
    'react-router-dom',
    '@tanstack/react-query',
    'clsx',
    'class-variance-authority',
    'tailwind-merge',
    'tailwind-variants',
    'lucide-react',
  ],
  'vendor-ui': ['@sohee-an/ui-carousel'],
};

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    checker({ typescript: true }),
    mode === 'production' &&
      visualizer({ open: true, filename: 'stats.html', gzipSize: true, brotliSize: true }),
  ],
  server: { port: 3000, open: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@typings': path.resolve(__dirname, './typings'),
      '@api': path.resolve(__dirname, './src/api'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'production' ? 'hidden' : true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          const name = pkg(id);
          for (const [chunk, list] of Object.entries(groups)) {
            if (list.includes(name)) return chunk; // 지정한 그룹 이름으로 묶기
          }
          return 'vendor'; // 그 외 공통 의존성
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}));
