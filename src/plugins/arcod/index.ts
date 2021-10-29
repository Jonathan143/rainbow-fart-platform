import { Form, Layout, Menu, Breadcrumb } from '@arco-design/web-vue'
import { App } from 'vue'

/**
 * @description 手动注册 antd-vue 组件,达到按需加载目的
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */
export default {
  install(app: App) {
    // app.config.globalProperties = {
    //   ...app.config.globalProperties,
    // }

    app.use(Form).use(Layout).use(Menu).use(Breadcrumb)
  },
}
