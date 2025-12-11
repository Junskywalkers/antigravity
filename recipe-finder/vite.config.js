import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = '/antigravity/recipe-finder/';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? repoName : '/',
  build: {
    outDir: '../docs/recipe-finder',
    emptyOutDir: true,
  },
})
