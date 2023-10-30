/// <reference types="vitest" />
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import { run } from 'vite-plugin-run';
import * as path from 'path'

const isTest = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      i18n: path.resolve(__dirname, './i18n')
    },
    conditions: isTest ? ['browser'] : []
  },
  plugins: [
    svelte({hot: !process.env.VITEST}),
    run({
      silent: !!process.env.VITEST,
      input: [
        {
          name: 'typecheck',
          run: ['npm', 'run', 'check'],
          pattern: ['src/**/*.ts', 'src/**/*.svelte'],
        }
      ]
    })
  ],
  server: {
    port: isTest ? 8678 : 8000,
    proxy: isTest ? undefined : {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: false
      }
    }
  },
  build: {
    outDir: 'build',
    target: 'es2020',
    cssCodeSplit: false
  },
  optimizeDeps: {
    include: isTest ? ['@testing-library/svelte', 'chai'] : undefined
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setup-tests.ts'
  }
})
