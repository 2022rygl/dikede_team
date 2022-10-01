import axios from 'axios'
import store from '@/store'
// import { Message } from 'element-ui'
// import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // if (isCheckTimeOut()) {
    //   store.dispatch('user/logout')
    //   router.push('/login')
    //   return Promise.reject(new Error('token 超时'))
    // }
    config.headers.Authorization = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// // 响应拦截器
// service.interceptors.response.use(response => {
//   console.log(response)
//   const { message, data, success } = response.data
//   if (success) return data
//   Message.error(message)
//   return Promise.reject(new Error(message))
// }, error => {
//   // console.log(error.response)
//   if (error.response?.status === 401) {
//     // token 失效
//     store.dispatch('user/logout')
//     router.push('/login')
//     Message.error('token 失效')
//   } else {
//     Message.error(error.message)
//   }
//   return Promise.reject(Error)
// })

export default service
