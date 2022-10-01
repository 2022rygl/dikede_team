import Layout from '@/layout'

export default {
  path: '/task',
  component: Layout,
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [{
    path: 'business',
    name: 'business',
    component: () => import('@/views/task/components/business.vue'),
    meta: { title: '运营工单' }
  },
  {
    path: 'operation',
    name: 'operation',
    component: () => import('@/views/task/components/operation.vue'),
    meta: { title: '运维工单' }
  }]
}
