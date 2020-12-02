import { RouteRecordRaw } from 'vue-router'

/**
 * 路由扫描自动注册
 */
const routesContext = require.context('./modules', true, /\.ts$/)
const routes: RouteRecordRaw[] = []
routesContext.keys().forEach(router => {
  const routerConfig = routesContext(router)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = routerConfig.default || routerConfig
  routes.push(ctrl)
})

/**
 * 在主框架内显示
 */
const frameIn: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    component: () => import('@/layout/HeaderAside/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  ...routes
]

/**
 * 在主框架之外显示
 */
const frameOut: RouteRecordRaw[] = []

/**
 * 错误页面
 */
const errorPage: RouteRecordRaw[] = []

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
