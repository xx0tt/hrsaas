import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true,
  meta: {
    id: 'import' // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
      name: 'import',
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
