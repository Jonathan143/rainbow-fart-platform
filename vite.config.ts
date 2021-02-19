import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/css.js`
          },
        },
      ],
    }),
  ],
  alias: {
    '@/': path.resolve(__dirname, './src') + '/',
  },
  optimizeDeps: {
    include: ['lodash', 'axios', '@ant-design/icons-vue'],
  },
  css: {
    preprocessorOptions: {
      //这里注意，键名是scss不是sass！一字之差能让你折腾好久
      scss: {
        //这里写你想导入全局scss变量的路径
        //这里注意只能写相对路径，alias貌似在css中不会生效
        additionalData: "@import './src/theme/variables.scss';",
      },
    },
  },
})
