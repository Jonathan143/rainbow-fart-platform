import { App } from 'vue'
import antd from './antd'
import api from './api'

export default {
  install(app: App) {
    app.use(antd)
    app.use(api)
  },
}
