import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees', // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' },
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      props: true,
      hidden: true,
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true,
    },
  ],
}
