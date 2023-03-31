import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src/components'),
      '^': path.resolve(__dirname, 'src/pages'),
      '@@': path.resolve(__dirname, 'src/services'),
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'img'
          } else if (/woff|woff2|ttf|eot/.test(extType)) {
            extType = 'fonts'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
})
