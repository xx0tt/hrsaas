import Vue from 'vue'
import Router from 'vue-router'
import employees from './modules/employees'
import approvals from './modules/approvals'
import attendances from './modules/attendances'
import departments from './modules/departments'
import permission from './modules/permission'
import salarys from './modules/salarys'
import setting from './modules/setting'
import social from './modules/social'
import importModule from './modules/import'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },
]

// 动态路由: 准备好项目所有动态路由, 基于后端返回的用户权限对动态路由进行筛选
export const asyncRoutes = [
  employees,
  approvals,
  departments,
  attendances,
  permission,
  salarys,
  setting,
  social,
  importModule,
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes], // 路由规则
  })
// vueRouter实例
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
