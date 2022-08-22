import router, { constantRoutes, asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], // 自己维护的该用户所有路由规则
    points: [] // 权限点
  },
  mutations: {
    updateRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    },
    updatePoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    // 路由鉴权
    getRoutes(context, roles) {
      // 拿到有权限的动态路由
      const newArr = asyncRoutes.filter((item) =>
        roles.menus.includes(item.meta.id)
      )
      context.commit('updateRoutes', newArr)
      context.commit('updatePoints', roles.points)
      // 添加到路由规则
      router.addRoutes([
        ...newArr,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
