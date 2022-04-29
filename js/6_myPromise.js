// 手写promise

function MyPromise(executor) {
  var self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined // Promise的值
  self.onResolvedCallback = [] // MyPromise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // MyPromise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    // if (value instanceof MyPromise) {
    //   return value.then(resolve, reject)
    // }
    // setTimeout(() => {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.data = value
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
    // })
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

  try {
    // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject) // 执行executor
  } catch (e) {
    reject(e)
  }
}
// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var self = this
  var promise2
  // console.log("MyPromise.prototype.then -> self.status", self.status)

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function (value) {
          return value
        } // 如果不是function就把传进来的值再传出去，让promise的值得以穿透
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (reason) {
          return reason
        }

  const resolvedHandler = function (resolve, reject) {
    // setTimeout(() => {
    // handler异步调用回调，此处没有考虑microTaskQueue，promise本应是microTask。
    // 在此处setTimeout会造成 10000个callback生成10000个setTimeout，是为了省事
    // 可以将setTimeout写在if判断内和callBackArray外，这样就不会生成大量setTimeout，意思到了。

    try {
      var x = onFulfilled(self.data)

      if (x instanceof MyPromise) {
        // 如果onFulfilled的返回值是一个Promise对象，直接取它的结果做为promise2的结果
        x.then(resolve, reject)
      } else {
        resolve(x) // 否则，以它的返回值做为promise2的结果
      }
    } catch (e) {
      // 因为考虑到有可能throw，所以我们将其包在try/catch块里
      reject(e) // 如果出错，以捕获到的错误做为promise2的结果
    }
    // })
  }

  const rejectedHandler = function (resolve, reject) {
    // setTimeout(() => {
    try {
      var x = onRejected(self.data)

      if (x instanceof MyPromise) {
        x.then(resolve, reject)
      }
    } catch (e) {
      reject(e)
    }
    // })
  }

  if (self.status === 'fulfilled') {
    return (promise2 = new MyPromise(function (resolve, reject) {
      resolvedHandler(resolve, reject)
    }))
  }

  if (self.status === 'rejected') {
    return (promise2 = new MyPromise(function (resolve, reject) {
      rejectedHandler(resolve, reject)
    }))
  }

  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    promise2 = new MyPromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        resolvedHandler(resolve, reject)
      })

      self.onRejectedCallback.push(function (reason) {
        rejectedHandler(resolve, reject)
      })
    })
    // console.log("MyPromise.prototype.then -> self.onResolvedCallback", self.onResolvedCallback)

    // console.log("MyPromise.prototype.then -> is Pending -> promise2", promise2)

    return promise2
  }
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// var a = 1

// var p = new MyPromise((resolve, reject) => {
//   if (a === 1) {
//     setTimeout(() => {
//       resolve(1)
//     }, 1000)
//   } else {
//     setTimeout(() => {
//       reject('It broke')
//     }, 1000)
//   }
// })

// p.then((res) => {
//   console.log('out', res)
//   return new MyPromise((resolve) => {
//     resolve('second')
//   })
// })
//   .then((second) => {
//     return second + 1
//   })
//   .then((third) => {
//     console.log(third + 1)
//   })
//   .catch((err) => console.log(err))

/**
 * 文字流程： (resolve和reject都用resolve表示行为，一个意思)
 * 1. var p = new Promise 调用constructor函数 -> 调用executor执行函数 -> 调用resolve或reject -> 改变实例的status和data callbackArray为空 -> 说出承诺
 * 2. 当调用p实例原型上的then的时候， 开始遵守承诺，走then的逻辑。then的返回值是一个promise对象。
 * if 调用then的时候，状态已经是fulfilled的话，就直接new一个新的promise对象。这是调用构造函数会走处理handler函数。
 * else 因为是异步流程，在p的resolve没运行的时候，走then中的pending部分。将处理resolve的函数推入实例的callBackArray中等待调用。
 * 3. 继续else的流程，当resolve调用之时，状态改变，并且依次调用储存的callBack(handler)函数，在handler中会调用then的第一个参数就是(res)=>{}这部分。
 * 4. handler/ 处理resolve / callBack函数 都指的同一个函数。 作用是如果then的第一个参数onFulfilled执行后的返回值是一个Promise对象，直接取他的结果作为pomise2的结果(then传递)，否则以他的返回值作为结果
 *
 */

export default MyPromise
