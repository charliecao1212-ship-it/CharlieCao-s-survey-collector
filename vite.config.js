import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CharlieCao-s_survey-attempt-collector/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    historyApiFallback: true
}})
