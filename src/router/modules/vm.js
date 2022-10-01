import Layout from '@/layout'

export default {
  path: '/vm',
  component: Layout,
  meta: { title: '设备管理', icon: 'shebei' },
  children: [{
    path: 'manage',
    name: 'manage',
    component: () => import('@/views/vm/components/manage.vue'),
    meta: { title: '设备管理' }
  },
  {
    path: 'status',
    name: 'status',
    component: () => import('@/views/vm/components/status.vue'),
    meta: { title: '设备状态 ' }
  }, {
    path: 'type',
    name: 'type',
    component: () => import('@/views/vm/components/type.vue'),
    meta: { title: '设备类型管理' }
  }]
}
