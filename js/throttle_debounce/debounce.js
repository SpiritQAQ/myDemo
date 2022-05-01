/**
 *
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate 我不希望非要等到事件停止触发后才执行，
 *            我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
 * @return {*}
 */
function debounce(func, wait, immediate) {
  // 步骤：
  // 1. 只要触发就timeout设定清除
  // 2. 绑this，透传参数
  // 3. immediate 参数相关

  // 防抖就是「回城被打断」
  var timeout

  return function () {
    var _this = this
    var arg = arguments
    if (timeout) {
      clearTimeout(timeout) // 「打断回城」
    }
    if (immediate) {
      // 曾经被设置为null，或者是第一次为undefined触发
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(_this, arg)
    } else {
      // 「重新回城」
      timeout = setTimeout(function () {
        func.apply(_this, arg) // 「回城成功」
      }, wait)
    }
  }
}

export default debounce
