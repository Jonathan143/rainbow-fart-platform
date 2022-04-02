import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import jsCookie from 'js-cookie'

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
})

const WhiteRouterNameList = ['login', 'uaStatistics']
/**
 * 全局路由守卫
 * 判断 access_token 是否过期 过期跳转登录页
 */
router.beforeEach((to, from) => {
  if (to.name && !WhiteRouterNameList.includes(to.name as string)) {
    const token = jsCookie.get('geekadmin-token')
    if (!token) {
      return {
        name: 'login',
        query: { redirect: encodeURIComponent(to.fullPath) },
      }
    }
  }
})

export default router
