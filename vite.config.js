import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // Any request starting with /api is forwarded to the Express backend (so no CORS is needed)
    proxy: { '/api': 'http://localhost:5000' },
  },
})
