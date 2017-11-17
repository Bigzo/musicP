(function (doc, win) {
  var docEl = doc.documentElement
  // 判断窗口是否有orientationchange这个方法
  // orientationchange横屏事件 resize窗口缩放
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 770) {
      docEl.style.fontSize = 20 * (770 / 320) + 'px'
    } else {
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'
    }
  }
  if (!doc.addEventListener) return
  // addEventListener() 方法用于向指定元素添加事件句柄。
  win.addEventListener(resizeEvt, recalc, false)
  // DOMContentLoaded 浏览器渲染页面在DOM树构建完成时触发
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
