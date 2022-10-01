import Layout from '@/layout'

export default {
  path: '/order',
  component: Layout,
  redirect: '/order',
  children: [{
    path: 'order',
    name: 'order',
    component: () => import('@/views/order/index.vue'),
    meta: { title: '订单管理', icon: 'dingdan' }
  }]
}
