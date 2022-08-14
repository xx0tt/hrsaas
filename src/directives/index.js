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
