import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'
import * as filters from '@/filters'
import component from '@/components'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(component)

Vue.config.productionTip = false

// 自定义全局指令 循环注册
for (let key in directives) {
  Vue.directive(key, directives[key])
}

// 过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
