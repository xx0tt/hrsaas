import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true, // 隐藏
  meta: { id: 'import' },
  children: [
    {
      path: '',
      component: () => import('@/views/import')
    }
  ]
}
