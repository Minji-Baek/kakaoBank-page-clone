import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  base: '/kakaoBank-page-clone/',
  build: {
    chunkSizeWarningLimit: 1600,
    // outDir: '../dist',
    // emptyOutDir: true,
    },
})
