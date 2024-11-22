import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      input: ['./src/client.tsx'],
      output: {
        entryFileNames: 'static/client.js',
        chunkFileNames: 'static/assets/[name]-[hash].js',
        assetFileNames: 'static/assets/[name].[ext]',
      },
    },
    minify: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
  plugins: [devServer({
    entry: './src/server.tsx',
    adapter: bunAdapter,
  })],
});