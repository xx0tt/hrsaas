import store from '@/store'
// 自定义指令
export const imgError = {
  // 插入dom时
  inserted(dom, { value }) {
    if (!dom.src) {
      dom.src = value
    }
    dom.addEventListener('error', function () {
      dom.src = value
    })
  },

  // 更新dom时
  update(dom, { value }) {
    if (!dom.src) {
      dom.src = value
    }
  }
}

export const isHas = {
  // bind : 绑定时
  // inserted ：插入节点时
  // update： 更新时
  inserted(el, { value }) {
    const has = store.state.permission.points.includes(value)
    if (!has) el.remove() // 删除自身节点
  }
}
