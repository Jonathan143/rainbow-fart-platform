import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Tag,
  Form,
  Input,
  InputNumber,
  Layout,
  Tooltip,
  Menu,
  message,
  Table,
  Result,
} from 'ant-design-vue'
import { App } from 'vue'

// 防止弹出大量消息
message.config({
  duration: 2,
  maxCount: 1,
})

const appConfig = {
  $message: message,
}

/**
 * @description 手动注册 antd-vue 组件,达到按需加载目的
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */
export default {
  install(app: App) {
    app.config.globalProperties = {
      ...app.config.globalProperties,
      ...appConfig,
    }

    app
      .use(Avatar)
      .use(Button)
      .use(Card)
      .use(Dropdown)
      .use(Tag)
      .use(Form)
      .use(Input)
      .use(InputNumber)
      .use(Layout)
      .use(Menu)
      .use(Tooltip)
      .use(Table)
      .use(Result)
  },
}
