import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  children: [{
    path: 'policy',
    name: 'policy',
    component: () => import('@/views/policy/index.vue'),
    meta: { title: '策略管理', icon: 'celue' }
  }]
}
