import Order, { findOrder } from './Order.js'

/**
 * 观察者模式
 * 优势
    1. 目标者与观察者，功能耦合度降低，专注自身功能逻辑；
    2. 观察者被动接收更新，时间上解耦，实时接收目标者更新状态。
 *
    用分发外卖订单举例子
 * @class Subject
 */
class Subject {
  constructor() {
    this.observerlist = []
  }

  add(observer) {
    this.observerlist.push(observer)
  }

  remove(observer) {
    this.observerlist = this.observerlist.filter(
      (item) => item.id !== observer.id
    )
  }

  notify(order) {
    this.observerlist.forEach((observer) => observer.update(order))
  }
}

var observerId = 1
class Observer {
  constructor() {
    this.id = observerId
    this.orderStatus = null
    this.orderData = null
    // this.callback = callback
    observerId++
  }

  // 我抢到了订单
  getOrder() {
    const { orderData } = this
    if (orderData?.orderLock)
      return console.log(
        `我是外卖员${this.id}, order${orderData.orderId}已经被预定了,不能抢了`
      )
    this.orderStatus = true
    this.orderData.orderLock = true
    console.log(`我是外卖员${this.id}，我抢到了${orderData.orderId}`)
  }

  update(order) {
    if (this.orderStatus)
      return console.log(`我是外卖员${this.id}， 我已经有订单了，不用抢`)
    this.orderData = order
    console.log(`我是外卖员${this.id}，我被update了，得知了有新订单可以抢`)

    setTimeout(() => {
      this.getOrder()
    }, 1000 * Math.random())
  }
}

const subject = new Subject()

const DELIVERER_NUMBER = 3

const delivererList = [...Array(DELIVERER_NUMBER)].map(() => new Observer())
delivererList.forEach((deliverer) => {
  subject.add(deliverer)
})

const orderInterval = () => {
  if (delivererList.every((item) => item.orderStatus))
    return clearInterval(orderInterval)
  findOrder().then((orderData) => {
    const order = new Order(orderData)
    subject.notify(order)
  })
}
setInterval(orderInterval, 1000)
