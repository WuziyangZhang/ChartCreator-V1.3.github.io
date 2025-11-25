import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 项目在 GitHub Pages 上的子路径
  base: '/ChartCreator-V1.3.github.io/',
  // 让 build 输出到 docs，方便 GitHub Pages 直接用
  build: {
    outDir: 'docs',
  },
})
