// 自定义指令
export const imgError = {
  inserted(dom, { value }) {
    dom.addEventListener('error', function () {
      dom.src = value
    })
  }
}

export const aa = {
  inserted() {}
}
