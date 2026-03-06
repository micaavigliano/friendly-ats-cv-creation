import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-renderer': ['@react-pdf/renderer'],
          'pdf-viewer': ['pdfjs-dist'],
          'charts': ['recharts'],
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})