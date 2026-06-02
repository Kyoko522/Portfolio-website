import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server proxies /api to the Express backend. This makes the SPA and
// the API share an origin (http://localhost:5173) during development, so the
// httpOnly auth cookie is treated as first-party — no CORS/cookie headaches.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
