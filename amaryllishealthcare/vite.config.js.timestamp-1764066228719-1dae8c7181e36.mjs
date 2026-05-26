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
        target: "https://strapi.amaryllishealthcare.com",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0cy1ieS1yblxcXFxhbWFyeWxsaXNoZWFsdGhjYXJlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0cy1ieS1yblxcXFxhbWFyeWxsaXNoZWFsdGhjYXJlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0cy1ieS1ybi9hbWFyeWxsaXNoZWFsdGhjYXJlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XHJcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcblxyXG4gICAgLy8gQ29tcHJlc3MgSlMvQ1NTL0hUTUwgZm9yIGZhc3RlciBmaXJzdCBsb2FkXHJcbiAgICB2aXRlQ29tcHJlc3Npb24oeyBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsIGV4dDogJy5icicsIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlIH0pLFxyXG4gICAgdml0ZUNvbXByZXNzaW9uKHsgYWxnb3JpdGhtOiAnZ3ppcCcsIGV4dDogJy5neicsIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlIH0pLFxyXG5cclxuICAgIC8vIEltYWdlIG9wdGltaXphdGlvblxyXG4gICAgdml0ZUltYWdlbWluKHtcclxuICAgICAgZ2lmc2ljbGU6IHsgb3B0aW1pemF0aW9uTGV2ZWw6IDMsIGludGVybGFjZWQ6IGZhbHNlIH0sXHJcbiAgICAgIG1vempwZWc6IHsgcXVhbGl0eTogNzUgfSxcclxuICAgICAgcG5ncXVhbnQ6IHsgcXVhbGl0eTogWzAuNywgMC44NV0sIHNwZWVkOiA0IH0sXHJcbiAgICAgIHN2Z286IHsgcGx1Z2luczogW3sgcmVtb3ZlVmlld0JveDogZmFsc2UgfSwgeyByZW1vdmVEaW1lbnNpb25zOiB0cnVlIH1dIH0sXHJcbiAgICB9KSxcclxuICAgIFZpdGVJbWFnZU9wdGltaXplcih7XHJcbiAgICAgIGpwZzogeyBxdWFsaXR5OiA3MCB9LFxyXG4gICAgICBqcGVnOiB7IHF1YWxpdHk6IDcwIH0sXHJcbiAgICAgIHBuZzogeyBxdWFsaXR5OiA3MCB9LFxyXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDcwIH0sXHJcbiAgICAgIGF2aWY6IHsgcXVhbGl0eTogNjAgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIEJ1bmRsZSBhbmFseXplclxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGZpbGVuYW1lOiAnLi9kaXN0L3N0YXRzLmh0bWwnLFxyXG4gICAgICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLFxyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDIsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3N0cmFwaS5hbWFyeWxsaXNoZWFsdGhjYXJlLmNvbScsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZnM6IHsgc3RyaWN0OiB0cnVlIH0sXHJcbiAgICB3YXRjaDogeyB1c2VQb2xsaW5nOiB0cnVlIH0sXHJcbiAgfSxcclxuXHJcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLk1PVicsICcqKi8qLm1wNCddLFxyXG5cclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICB0YXJnZXQ6ICdlczIwMjAnLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG5cclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3dpcGVyJykpIHJldHVybiAnc3dpcGVyJztcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAdGFuc3RhY2snKSkgcmV0dXJuICdyZWFjdC1xdWVyeSc7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyLWRvbScpKSByZXR1cm4gJ3JlYWN0LXJvdXRlcic7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVjb2lsJykpIHJldHVybiAncmVjb2lsJztcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdmb250YXdlc29tZScpKSByZXR1cm4gJ2ZvbnRhd2Vzb21lJztcclxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWydyZWNvaWwnXSxcclxuICAgIGVzYnVpbGRPcHRpb25zOiB7IHRhcmdldDogJ2VzMjAyMCcgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxTQUFTLG9CQUFvQjtBQUNwVSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUywwQkFBMEI7QUFFbkMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsSUFHTixnQkFBZ0IsRUFBRSxXQUFXLGtCQUFrQixLQUFLLE9BQU8sa0JBQWtCLE1BQU0sQ0FBQztBQUFBLElBQ3BGLGdCQUFnQixFQUFFLFdBQVcsUUFBUSxLQUFLLE9BQU8sa0JBQWtCLE1BQU0sQ0FBQztBQUFBO0FBQUEsSUFHMUUsYUFBYTtBQUFBLE1BQ1gsVUFBVSxFQUFFLG1CQUFtQixHQUFHLFlBQVksTUFBTTtBQUFBLE1BQ3BELFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUN2QixVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssSUFBSSxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzNDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFlLE1BQU0sR0FBRyxFQUFFLGtCQUFrQixLQUFLLENBQUMsRUFBRTtBQUFBLElBQzFFLENBQUM7QUFBQSxJQUNELG1CQUFtQjtBQUFBLE1BQ2pCLEtBQUssRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNuQixNQUFNLEVBQUUsU0FBUyxHQUFHO0FBQUEsTUFDcEIsS0FBSyxFQUFFLFNBQVMsR0FBRztBQUFBLE1BQ25CLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNwQixNQUFNLEVBQUUsU0FBUyxHQUFHO0FBQUEsSUFDdEIsQ0FBQztBQUFBO0FBQUEsSUFHRCxXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxJQUFJLEVBQUUsUUFBUSxLQUFLO0FBQUEsSUFDbkIsT0FBTyxFQUFFLFlBQVksS0FBSztBQUFBLEVBQzVCO0FBQUEsRUFFQSxlQUFlLENBQUMsWUFBWSxVQUFVO0FBQUEsRUFFdEMsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsdUJBQXVCO0FBQUEsSUFDdkIsV0FBVztBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGdCQUFJLEdBQUcsU0FBUyxRQUFRLEVBQUcsUUFBTztBQUNsQyxnQkFBSSxHQUFHLFNBQVMsV0FBVyxFQUFHLFFBQU87QUFDckMsZ0JBQUksR0FBRyxTQUFTLGtCQUFrQixFQUFHLFFBQU87QUFDNUMsZ0JBQUksR0FBRyxTQUFTLFFBQVEsRUFBRyxRQUFPO0FBQ2xDLGdCQUFJLEdBQUcsU0FBUyxhQUFhLEVBQUcsUUFBTztBQUN2QyxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsUUFBUTtBQUFBLElBQ2xCLGdCQUFnQixFQUFFLFFBQVEsU0FBUztBQUFBLEVBQ3JDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
