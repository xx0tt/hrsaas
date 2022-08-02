import router from '@/router'
import store from '@/store'

const writeList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  const token = store.state.user.token

  // 已登录
  if (token) return to.path === '/login' ? next('/') : next()

  // 未登录
  writeList.includes(to.path) ? next() : next('/login')
})
