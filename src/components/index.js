import pageTools from './pageTools'
import updateExecl from './update-execl'
import UploadImg from './UploadImg'

const components = [pageTools, updateExecl, UploadImg]
export default {
  install(Vue) {
    components.forEach((components) => {
      Vue.component(components.name, components)
    })
  }
}
