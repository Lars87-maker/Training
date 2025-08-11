
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use env var for GitHub Pages subpath (e.g., /my-repo/). Defaults to '/'
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base
})
