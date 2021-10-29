import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver({ resolveIcons: true })],
    }),
  ],

  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src') + '/',
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://10.10.10.114:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  optimizeDeps: {
    include: ['@ant-design/icons-vue'],
  },

  css: {
    preprocessorOptions: {
      //这里注意，键名是scss不是sass！一字之差能让你折腾好久
      scss: {
        //这里写你想导入全局scss变量的路径
        additionalData: "@import '@/theme/variables.scss';",
      },
    },
  },
})
