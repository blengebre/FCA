import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/E-Commerce-Website/',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // listen on all interfaces
    port: 5173,      // default port
  },
})
