// 手写promise
// 1.0
var log = (l) => {
  console.log(l)
}

function myPromise(executor) {
  var self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined  // Promise的值
  self.onResolvedCallback = [] // myPromise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // myPromise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.data = value
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }

    }

  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason

      for (var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject) // 执行executor
  } catch (e) {
    reject(e)
  }
}
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
myPromise.prototype.then = function (onFulfilled, onRejected) {

  var self = this
  console.log("myPromise.prototype.then -> self", self)
  var promise2
  console.log("myPromise.prototype.then -> self.status", self.status)

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) { }
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) { }

  const resolvedHandler = function (resolve, reject) {
    try {
      var x = onFulfilled(self.data)

      if (x instanceof myPromise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
        x.then(resolve, reject)
      }
      resolve(x) // 否则，以它的返回值做为promise2的结果
      // console.log("resolvedHandler -> resolve", resolve)
    } catch (e) {
      reject(e) // 如果出错，以捕获到的错误做为promise2的结果
    }
  }

  const rejectedHandler = function (resolve, reject) {
    try {
      var x = onRejected(self.data)
      console.log("rejectedHandler -> self.data", self.data)
      if (x instanceof myPromise) {
        x.then(resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
  }

  if (self.status === 'fulfilled') {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return promise2 = new myPromise(function (resolve, reject) {
      resolvedHandler(resolve, reject)
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new myPromise(function (resolve, reject) {
      rejectedHandler(resolve, reject)
    })
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    promise2 = new myPromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        resolvedHandler(resolve, reject)
      })

      self.onRejectedCallback.push(function (reason) {
        rejectedHandler(resolve, reject)
      })
    })
    console.log("myPromise.prototype.then -> is Pending -> promise2", promise2)

    return promise2

  }
}

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

var a = 1

var p = new myPromise((resolve, reject) => {
  console.log('promise constructor')
  if (a === 1) {
    setTimeout(() => {
      resolve(1)
    }, 1000)

  } else {

    setTimeout(() => {
      reject("It broke")

    }, 1000)
  }
})


p.then((res) => {
  console.log('out', res)
  return new myPromise(resolve => {
    resolve('second')
  })
})
//   .then(second => {
//     console.log(second)
//   })
//   .catch(err => console.log(err))

/**
 * 文字流程：
 * 1. var p = new Promise 调用constructor函数 -> 调用executor执行函数 -> 调用resolve或reject -> 改变实例的status和data callbackArray为空 -> 承诺完成
 * 2. 当调用p实例原型上的then的时候， 开始遵守承诺，走then的逻辑。
 * 首先因为是异步流程，在p的resolve没运行的时候，走then中的pending部分。
 */