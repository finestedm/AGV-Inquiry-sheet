import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import reactRefresh from "eslint-plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  reactRefresh.configs.vite,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    }
  },
})

