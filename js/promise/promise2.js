const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export default class MyPromise {
  constructor(handle) {
    this.status = PENDING

    this.value = null
    this.reason = null

    this.resolvedCallbacks = []

    this.rejectedCallback = []

    try {
      handle(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.resolvedCallbacks.forEach((fn) => fn())
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.rejectedCallback.forEach((fn) => fn())
    }
  }

  then(thenResolve, thenReject) {
    return new MyPromise((nextResolve, nextReject) => {
      const resolveHandler = () => {
        const result = thenResolve(this.value)
        if (result instanceof MyPromise) {
          result.then(nextResolve)
        } else {
          nextResolve(result)
        }
      }
      const rejectHandler = () => {
        const result = thenReject(this.reason)
        if (result instanceof MyPromise) {
          result.then(nextResolve)
        } else {
          nextResolve(result)
        }
      }
      try {
        if (this.status === FULFILLED) {
          resolveHandler()
        }
        if (this.status === REJECTED) {
          rejectHandler()
        }
        if (this.status === PENDING) {
          if (typeof thenResolve === 'function') {
            this.resolvedCallbacks.push(() => {
              resolveHandler()
            })
          }
          if (typeof thenReject === 'function') {
            this.rejectedCallback.push(() => {
              rejectHandler()
            })
          }
        }
      } catch (e) {
        this.reject(e)
      }
    })
  }
}
