import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vite configuration – ensure dev server is reachable on localhost and network
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // listen on all IPv4 interfaces, includes localhost
    // port: 5173, // default
  },
});
