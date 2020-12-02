import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import plugins from '@/plugins'

createApp(App)
  .use(plugins)
  .use(store)
  .use(router)
  .mount('#app')
