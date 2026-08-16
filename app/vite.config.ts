import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/gifties-for-you/',
  plugins: [react(), tailwindcss()],
  // Prevents Vite from walking up to the repo-root postcss.config.mjs
  // (belongs to a different project's Next.js/Tailwind setup).
  css: { postcss: { plugins: [] } },
})
