import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist/static',
    assetsDir: '_app',
    rollupOptions: {
      input: ['./index.html'],
      output: {
        entryFileNames: 'entry-[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
    minify: true,
    emptyOutDir: true,
    copyPublicDir: true,
  },
  plugins: [
    tsconfigPaths(),
    devServer({
      entry: './src/server.ts',
      adapter: bunAdapter,
    })
  ],
});