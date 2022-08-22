import router from '@/router'
import store from '@/store'

const writeList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token

  // 已登录
  if (token) {
    // 获取用户信息
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息 的返回值时promise
      const { roles } = await store.dispatch('user/getUserInfo')
      // 路由鉴权
      await store.dispatch('permission/getRoutes', roles)
      next(to.path)
    }

    return to.path === '/login' ? next('/') : next()
  }

  // 未登录
  writeList.includes(to.path) ? next() : next('/login')
})
