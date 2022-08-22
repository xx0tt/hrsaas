import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: { id: 'approvals' }, // 路由鉴权
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
