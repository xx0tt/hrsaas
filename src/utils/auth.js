import Cookies from 'js-cookie'
// 封装了操作cookie的方法
// 操作cookie的原生方法比较麻烦
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}

export function getTokenTime() {
  return Cookies.get('tokenTime')
}
