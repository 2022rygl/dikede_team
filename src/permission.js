import router from './router'
import store from './store'
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 判断token 是否存在
  // 存在 处于登录状态  是否去往登录页面 处于 则去首页 否则 放行
  // 不存在 不处于登录状态 去往页面 是否处于白名单 处于 则放行 否则登录页
  if (store.getters.token) {
    // if (!store.getters.userInfo.userId) {
    //   store.dispatch('user/getUserInfo', store.getters.userInfo.userId)
    // }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
