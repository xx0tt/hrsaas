import pageTools from './pageTools'

const components = [pageTools]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  }
}
