// vite.config.js
import { defineConfig } from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/vite/dist/node/index.js";
import react from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/@vitejs/plugin-react/dist/index.js";
import viteCompression from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/vite-plugin-compression/dist/index.mjs";
import viteImagemin from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { visualizer } from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { ViteImageOptimizer } from "file:///D:/projects-by-rn/amaryllishealthcare/node_modules/vite-plugin-image-optimizer/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    // Compress JS/CSS/HTML for faster first load
    viteCompression({ algorithm: "brotliCompress", ext: ".br", deleteOriginFile: false }),
    viteCompression({ algorithm: "gzip", ext: ".gz", deleteOriginFile: false }),
    // Image optimization
    viteImagemin({
      gifsicle: { optimizationLevel: 3, interlaced: false },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.85], speed: 4 },
      svgo: { plugins: [{ removeViewBox: false }, { removeDimensions: true }] }
    }),
    ViteImageOptimizer({
      jpg: { quality: 70 },
      jpeg: { quality: 70 },
      png: { quality: 70 },
      webp: { quality: 70 },
      avif: { quality: 60 }
    }),
    // Bundle analyzer
    visualizer({
      filename: "./dist/stats.html",
      template: "treemap",
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "https://admin.amaryllishealthcare.com",
        changeOrigin: true,
        secure: false
      }
    },
    fs: { strict: true },
    watch: { usePolling: true }
  },
  assetsInclude: ["**/*.MOV", "**/*.mp4"],
  build: {
    minify: "esbuild",
    target: "es2020",
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("swiper")) return "swiper";
            if (id.includes("@tanstack")) return "react-query";
            if (id.includes("react-router-dom")) return "react-router";
            if (id.includes("recoil")) return "recoil";
            if (id.includes("fontawesome")) return "fontawesome";
            return "vendor";
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ["recoil"],
    esbuildOptions: { target: "es2020" }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0cy1ieS1yblxcXFxhbWFyeWxsaXNoZWFsdGhjYXJlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0cy1ieS1yblxcXFxhbWFyeWxsaXNoZWFsdGhjYXJlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0cy1ieS1ybi9hbWFyeWxsaXNoZWFsdGhjYXJlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2Utb3B0aW1pemVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG5cbiAgICAvLyBDb21wcmVzcyBKUy9DU1MvSFRNTCBmb3IgZmFzdGVyIGZpcnN0IGxvYWRcbiAgICB2aXRlQ29tcHJlc3Npb24oeyBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsIGV4dDogJy5icicsIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbih7IGFsZ29yaXRobTogJ2d6aXAnLCBleHQ6ICcuZ3onLCBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSB9KSxcblxuICAgIC8vIEltYWdlIG9wdGltaXphdGlvblxuICAgIHZpdGVJbWFnZW1pbih7XG4gICAgICBnaWZzaWNsZTogeyBvcHRpbWl6YXRpb25MZXZlbDogMywgaW50ZXJsYWNlZDogZmFsc2UgfSxcbiAgICAgIG1vempwZWc6IHsgcXVhbGl0eTogNzUgfSxcbiAgICAgIHBuZ3F1YW50OiB7IHF1YWxpdHk6IFswLjcsIDAuODVdLCBzcGVlZDogNCB9LFxuICAgICAgc3ZnbzogeyBwbHVnaW5zOiBbeyByZW1vdmVWaWV3Qm94OiBmYWxzZSB9LCB7IHJlbW92ZURpbWVuc2lvbnM6IHRydWUgfV0gfSxcbiAgICB9KSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAganBnOiB7IHF1YWxpdHk6IDcwIH0sXG4gICAgICBqcGVnOiB7IHF1YWxpdHk6IDcwIH0sXG4gICAgICBwbmc6IHsgcXVhbGl0eTogNzAgfSxcbiAgICAgIHdlYnA6IHsgcXVhbGl0eTogNzAgfSxcbiAgICAgIGF2aWY6IHsgcXVhbGl0eTogNjAgfSxcbiAgICB9KSxcblxuICAgIC8vIEJ1bmRsZSBhbmFseXplclxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgZmlsZW5hbWU6ICcuL2Rpc3Qvc3RhdHMuaHRtbCcsXG4gICAgICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLFxuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgfSksXG4gIF0sXG5cbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMixcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYWRtaW4uYW1hcnlsbGlzaGVhbHRoY2FyZS5jb20nLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZnM6IHsgc3RyaWN0OiB0cnVlIH0sXG4gICAgd2F0Y2g6IHsgdXNlUG9sbGluZzogdHJ1ZSB9LFxuICB9LFxuXG4gIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5NT1YnLCAnKiovKi5tcDQnXSxcblxuICBidWlsZDoge1xuICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxuICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3N3aXBlcicpKSByZXR1cm4gJ3N3aXBlcic7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0B0YW5zdGFjaycpKSByZXR1cm4gJ3JlYWN0LXF1ZXJ5JztcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyLWRvbScpKSByZXR1cm4gJ3JlYWN0LXJvdXRlcic7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlY29pbCcpKSByZXR1cm4gJ3JlY29pbCc7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2ZvbnRhd2Vzb21lJykpIHJldHVybiAnZm9udGF3ZXNvbWUnO1xuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlY29pbCddLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7IHRhcmdldDogJ2VzMjAyMCcgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjog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
