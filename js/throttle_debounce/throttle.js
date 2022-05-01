// 定时器 -- 尾节流： 在离开后最后一个定时器不会清除，依然定时会触发
function throttle1(func, wait) {
  var timeout
  return function () {
    var _this = this
    var arg = arguments
    if (timeout) return
    timeout = setTimeout(function () {
      func.apply(_this, arguments)
      clearTimeout(timeout)
      timeout = null
    }, wait)
  }
}

// 时间戳 -- 首节流, 第一次会直接触发
function throttle2(func, wait) {
  var previous = 0
  return function () {
    var now = +new Date(),
      _this = this,
      args = arguments
    if (now - previous > wait) {
      func(_this, args)
      previous = now
    }
  }
}

// 两个方法：

// 时间戳法会立刻执行，定时器法会在 n 秒后第一次执行
// 时间戳法停止触发后没有办法再执行事件，定时器法停止触发后依然会再执行一次事件

// 合体后
function throttle3(func, wait) {
  var previous = 0
  var timer = null

  return function () {
    var now = +new Date(),
      _this = this,
      args = arguments,
      // 到下一次触发func的剩余时间
      remaining = wait - (now - previous)

    if (remaining <= 0) {
      func(_this, args)
      previous = now
      clearTimeout(timer)
      timer = null
    } else if (!timer) {
      timer = setTimeout(function () {
        func(_this, args)
        timer = null
        previous = +new Date()
      }, remaining)
    }
  }
}

var throttle = throttle3

export default throttle
