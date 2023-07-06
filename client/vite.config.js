import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // needed for the Docker Container port mapping to work
    port: 5173, // you can replace this port with any port
  },
});
