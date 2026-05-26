import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),

    // Compress JS/CSS/HTML for faster first load
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', deleteOriginFile: false }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', deleteOriginFile: false }),

    // Image optimization
    viteImagemin({
      gifsicle: { optimizationLevel: 3, interlaced: false },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.85], speed: 4 },
      svgo: { plugins: [{ removeViewBox: false }, { removeDimensions: true }] },
    }),
    ViteImageOptimizer({
      jpg: { quality: 70 },
      jpeg: { quality: 70 },
      png: { quality: 70 },
      webp: { quality: 70 },
      avif: { quality: 60 },
    }),

    // Bundle analyzer
    visualizer({
      filename: './dist/stats.html',
      template: 'treemap',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'https://strapi.amaryllishealthcare.com',
        changeOrigin: true,
        secure: false,
      },
    },
    fs: { strict: true },
    watch: { usePolling: true },
  },

  assetsInclude: ['**/*.MOV', '**/*.mp4'],

  build: {
    minify: 'esbuild',
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('swiper')) return 'swiper';
            if (id.includes('@tanstack')) return 'react-query';
            if (id.includes('react-router-dom')) return 'react-router';
            if (id.includes('recoil')) return 'recoil';
            if (id.includes('fontawesome')) return 'fontawesome';
            return 'vendor';
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ['recoil'],
    esbuildOptions: { target: 'es2020' },
  },
});
