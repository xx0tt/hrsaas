import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: { id: 'employees' }, // 路由鉴权
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      hidden: true,
      path: 'detail/:id',
      props: true, // 路由开启prop，组件也能通过props接受
      component: () => import('@/views/employees/detail')
    },
    {
      hidden: true,
      path: 'print/:id',
      component: () => import('@/views/employees/print')
    }
  ]
}
