import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/WebSite/',
  define: {
    'process.env': process.env
  },
  plugins: [react()],
})
