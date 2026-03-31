import { defineConfig, defaultExclude } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    exclude: [...defaultExclude, '**/vitest-delegation.bun.test.ts'],
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
