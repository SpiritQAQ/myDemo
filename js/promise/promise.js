// 手写promise
// executor是带有 resolve 和 reject 两个参数的函数 。
// Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor
// （executor 函数在Promise构造函数返回所建promise实例对象前被调用）。
// resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。
// executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略。
// Promise特点
// 1，创建时需要传递一个函数，否则会报错
// 2，会给传入的函数设置两个回调函数
// 3，刚创建的Promise对象状态是pending
// 4，状态一旦发生改变就不可再次改变
// 5，可以通过then来监听状态的改变

// 5.1，如果创建监听时，状态已经改变，立即执行监听回调
// 5.2，如果创建监听时，状态未改变，会等状态改变后执行
// 5.3，同一promise对象可以添加多个then监听，状态改变时按照注册顺序依次执行

// 定义常量保存对象的状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    // 成功的值
    this.value = null
    // 失败的原因
    this.reason = null
    // 成功的回调
    this.onResolvedCallbacks = []

    this.onRejectedCallbacks = []

    if (!this._isFunction(executor)) {
      throw new Error('请传入一个函数')
    }

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      reject(e)
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onResolvedCallbacks.forEach((fn) => fn(this.value))
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
    }
  }

  _isFunction(fn) {
    return typeof fn === 'function'
  }

  // then
  then(onResolved, onRejected) {
    return new MyPromise((nextResolve, nextReject) => {
      const resolveHandler = () => {
        let result = onResolved(this.value)
        if (result instanceof MyPromise) {
          result.then(nextResolve, nextReject)
        } else {
          nextResolve(this.value)
        }
      }

      const rejectHandler = () => {
        let result = onRejected(this.reason)
        if (result instanceof MyPromise) {
          result.then(nextResolve, nextReject)
        } else {
          nextResolve(result)
        }
      }
      try {
        switch (this.status) {
          case FULFILLED:
            resolveHandler()
            break
          case REJECTED:
            rejectHandler()
            break
          case PENDING: {
            if (this._isFunction(onResolved)) {
              this.onResolvedCallbacks.push(() => {
                resolveHandler()
              })
            }
            if (this._isFunction(onRejected)) {
              this.onRejectedCallbacks.push(() => {
                rejectHandler()
              })
            }
          }
        }
      } catch (e) {
        nextReject(e)
      }
    })
  }

  catch(e) {
    console.log(e)
    onRejected(this.reason)
  }
}

export default MyPromise
