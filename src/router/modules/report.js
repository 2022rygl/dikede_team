import Layout from '@/layout'

export default {
  path: '/report',
  component: Layout,
  children: [{
    path: 'report',
    name: 'report',
    component: () => import('@/views/report/index.vue'),
    meta: { title: '对账统计', icon: 'zhangdan' }
  }]
}

