import MyPromise from './promise.js'
// import MyPromise from './promise2.js'
// import MyPromise from '../6_myPromise.js'
// import MyPromise from './promise_A+.js'
Promise = MyPromise

const log = console.log

function 买菜() {
  log('买菜ing')
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const r = ['西红柿', '鸡蛋', '油菜']
      log('买菜ok', r)
      resolve(r)
    }, 300)
  })
}
function 做饭(data) {
  return new Promise((resolve, reject) => {
    console.log('做饭ing')

    setTimeout(function () {
      if (true) {
        const error = '坏了，米坏了。停'
        reject(error)
        return
      }
      //对做好的饭进行下一步处理。
      const result = {
        主食: '米饭',
        菜: [data[0] + data[1], data[1] + data[2]],
      }

      log('做饭ok', result)

      resolve(result)
    }, 300)
  })
}
function 送饭(data) {
  log('送饭ing')
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const r = JSON.stringify(data)
      log('送到了', r)
      //对做好的饭进行下一步处理。
      resolve('送到的饭是' + r)
    }, 300)
  })
}

function 电话通知我(n) {
  //电话通知我后的下一步处理
  //给保姆加100块钱奖金;
  // log('电话通知' + n)
  return '电话通知' + n
}

买菜()
  //用买好的菜做饭
  .then((买好的菜) => 做饭(买好的菜))
  //把做好的饭送到老婆公司
  .then((做好的饭) => 送饭(做好的饭))
  // 送完饭后打电话通知我
  .then((送饭结果) => 电话通知我(送饭结果))
  .catch((reason) => log('我是最终失败的结果', reason))
