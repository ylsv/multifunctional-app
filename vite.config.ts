import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
  ],
  resolve: {
    // настройка алиасов для путей импортов
    alias: [
      {find: '@', replacement: '/src'}
    ],
  },
  // настройка глобальных переменных
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('http://localhost:4003'),
    __PROJECT__: JSON.stringify('frontend'),
  }
})
