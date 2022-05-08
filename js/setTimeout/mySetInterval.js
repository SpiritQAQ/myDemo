/**
 * 用setTimeout模拟setInterval
 * setTimeout 不管上次异步任务是否完成，它都会将当前异步任务推入队列，
 * 而 setInterval 则会在任务推入异步队列时判断上次异步任务是否被执行。
 * @param {*} fn
 * @param {*} timeout
 */
function mySetInterval(fn, timeout) {
  let timer = null

  function run() {
    timer = setTimeout(run, timeout)
  }

  timer = setTimeout(run, timeout)

  return timer
}

mySetInterval(() => console.log(performance.now()), 1000)
