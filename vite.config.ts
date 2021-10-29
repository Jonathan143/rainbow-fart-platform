import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

const ArcodComponentsNames = [
  'Affix',
  'Alert',
  'Anchor',
  'ArcoVue',
  'AutoComplete',
  'Avatar',
  'BackTop',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'Carousel',
  'Cascader',
  'Checkbox',
  'Collapse',
  'Comment',
  'ConfigProvider',
  'DatePicker',
  'Descriptions',
  'Divider',
  'Drawer',
  'Dropdown',
  'Empty',
  'Form',
  'Grid',
  'Image',
  'Input',
  'InputNumber',
  'InputTag',
  'Layout',
  'Link',
  'List',
  'Mention',
  'Menu',
  'Message',
  'Modal',
  'Notification',
  'PageHeader',
  'Pagination',
  'Popconfirm',
  'Popover',
  'Progress',
  'Radio',
  'Rate',
  'ResizeBox',
  'Result',
  'Select',
  'Skeleton',
  'Slider',
  'Space',
  'Spin',
  'Split',
  'Statistic',
  'Steps',
  'Switch',
  'Table',
  'Tabs',
  'Tag',
  'Textarea',
  'TimePicker',
  'Timeline',
  'Tooltip',
  'Transfer',
  'Tree',
  'TreeSelect',
  'Trigger',
  'Typography',
  'Upload',
  'addI18nMessages',
  'getLocale',
  'useLocale',
]

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: false,
      resolvers: [
        (name) => {
          if (ArcodComponentsNames.includes(name.slice(1)))
            return {
              importName: name.slice(1),
              path: '@arco-design/web-vue/es',
              sideEffects: `@arco-design/web-vue/es/${name.replace(
                /[A-Z]/g,
                (w, i) => (i ? `${i === 1 ? '' : '-'}${w.toLowerCase()}` : '')
              )}/style/css`,
            }
          else if (name.startsWith('Icon')) {
            return {
              importName: name,
              path: '@arco-design/web-vue/es/icon',
            }
          }
        },
      ],
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
