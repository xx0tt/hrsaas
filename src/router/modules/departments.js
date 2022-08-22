import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: {
    id: 'departments', // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' },
    },
  ],
}
