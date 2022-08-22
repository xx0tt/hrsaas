import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta: { id: 'attendances' }, // 路由鉴权
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
