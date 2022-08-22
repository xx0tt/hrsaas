import { login, getUserInfoApi, getUserDetailApi } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 获取token
    async getToken(context, payload) {
      const data = await login(payload)
      context.commit('setToken', data)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetailApi(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      return userBaseInfo
    },
    // 退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter() // 清空路由
      // 清空动态路由 {root: true} 找全局
      context.commit('permission/updateRoutes', [], { root: true })
    }
  }
}
