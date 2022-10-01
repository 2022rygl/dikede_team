import { loginAPI, getUserInfoAPI } from '@/api'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    detailInfo: {}

  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
    SET_DETAIL_INFO(state, data) {
      state.detailInfo = data
    }

  },
  actions: {
    async LOGIN_ACTION({ commit }, data) {
      const res = await loginAPI(data)
      console.log(res.data)
      commit('SET_TOKEN', res.data.token)
      commit('SET_USER_INFO', res.data)
    },
    async getUserInfo({ commit, state }) {
      // console.log(context)

      const res = await getUserInfoAPI(state.userInfo.userId)
      // console.log(res.data)
      const detailInfo = { ...state.userInfo, ...res.data }
      commit('SET_DETAIL_INFO', detailInfo)
    },
    LOGOUT({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER_INFO', {})
    }
  },
  getters: { }
}

