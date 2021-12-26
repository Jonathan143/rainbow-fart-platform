import { RouteRecordRaw } from 'vue-router'
import { projectRouters } from './modules/project'

/**
 * 路由注册
 */
const routes: RouteRecordRaw[] = [...projectRouters]

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
        component: () => import('@/views/Home.vue'),
      },
      ...routes,
    ],
  },
]

/**
 * 在主框架之外显示
 */
const frameOut: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
  },
  {
    path: '/ua',
    name: 'uaStatistics',
    component: () => import('@/views/project/uaStatistics.vue'),
  },
]

/**
 * 错误页面
 */
const errorPage: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/user/resultPage.vue'),
  },
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
