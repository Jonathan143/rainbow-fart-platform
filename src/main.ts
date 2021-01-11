import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import router from './router'
import store from './store'

console.log(process.env)
createApp(App).use(router).use(store).use(plugins).mount('#app')
