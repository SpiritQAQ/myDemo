import './promise_all.js'
var log = console.log

function 买菜() {
  return new Promise((resolve, reject) => {
    log('买菜ing')
    setTimeout(function () {
      const r = ['西红柿', '鸡蛋', '油菜']
      log('买菜ok', r)
      resolve(r)
    }, 1000)
  })
}

function 买肉() {
  return new Promise((resolve, reject) => {
    log('买肉ing')
    setTimeout(function () {
      // if (true) {
      //   reject('买肉失败')
      //   return
      // }
      const r = ['猪肉', '牛肉']
      log('买肉ok', r)
      resolve(r)
    }, 2)
  })
}

function 买水() {
  return new Promise((resolve, reject) => {
    log('买水ing')
    setTimeout(function () {
      const r = ['雪碧', '可乐']
      log('买水ok', r)
      resolve(r)
    }, 5000)
  })
}

Promise.myRace([买菜(), 买肉(), 买水()])
  .then((values) => {
    console.log('最终结果', values) //
  })
  .catch((e) => console.log('失败原因', e))
