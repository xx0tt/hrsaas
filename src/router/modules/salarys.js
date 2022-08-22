import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: { id: 'salarys' }, // 路由鉴权
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
