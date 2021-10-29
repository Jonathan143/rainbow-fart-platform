import { App } from 'vue'
import arcod from './arcod'

export default {
  install(app: App) {
    app.use(arcod)
  },
}
