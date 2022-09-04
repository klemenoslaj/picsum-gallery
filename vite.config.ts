import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  cacheDir: '.vite',
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
