import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true, // 隐藏
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]
}
