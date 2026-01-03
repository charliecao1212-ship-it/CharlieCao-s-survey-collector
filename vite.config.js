import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CharlieCao-s-survey-collector/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    historyApiFallback: true
}})
