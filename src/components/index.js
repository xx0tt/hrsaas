import pageTools from './pageTools'
import updateExecl from './update-execl'

const components = [pageTools, updateExecl]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  }
}
