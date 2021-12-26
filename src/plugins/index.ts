import { App } from 'vue'
import echarts from './echarts'
import '@arco-design/web-vue/lib/message/style/index.css'

export default {
  install(app: App) {
    app.use(echarts)
  },
}
