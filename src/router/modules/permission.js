import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: { id: 'permissions' }, // 路由鉴权
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
