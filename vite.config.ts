import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  cacheDir: '.vite',
  base: '/picsum-gallery',
  build: {
    outDir: './dist/picsum-gallery',
  },
  server: {
    proxy: {
      '/download': {
        target: 'http://picsum.photos/',
        secure: true,
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/download/, ''),
      },
    },
  },
});
