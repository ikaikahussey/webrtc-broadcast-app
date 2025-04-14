import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/new': 'http://localhost:3000',
      '/room': 'http://localhost:3000',
      '/ws': 'ws://localhost:3000'
    }
  }
})
