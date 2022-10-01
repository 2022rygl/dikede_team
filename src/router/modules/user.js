import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  meta: { title: '人员管理', icon: 'renyuan' },
  children: [{
    path: 'list',
    name: 'list',
    component: () => import('@/views/user/components/userList.vue'),
    meta: { title: '人员列表 ' }
  },
  {
    path: 'user-task-stats',
    name: 'user-task-stats',
    component: () => import('@/views/user/components/userTaskStats.vue'),
    meta: { title: '人效统计 ' }
  }, {
    path: 'user-work',
    name: 'user-work',
    component: () => import('@/views/user/components/userWork.vue'),
    meta: { title: '工作量列表 ' }
  }]
}
