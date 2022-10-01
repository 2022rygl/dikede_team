import Layout from '@/layout'

export default {
  path: '/sku',
  component: Layout,
  meta: { title: '商品管理', icon: 'shangpin' },
  children: [{
    path: 'sku-class',
    name: 'sku-class',
    component: () => import('@/views/sku/components/skuClass.vue'),
    meta: { title: '商品类型' }
  },
  {
    path: 'sku',
    name: 'sku',
    component: () => import('@/views/sku/components/sku.vue'),
    meta: { title: '商品管理' }
  }]
}
