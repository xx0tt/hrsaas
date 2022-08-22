import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// 注册全局组件 svg-icon
Vue.component('svg-icon', SvgIcon)

// 一次性加载所有的/svg目录下的所有svg文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
