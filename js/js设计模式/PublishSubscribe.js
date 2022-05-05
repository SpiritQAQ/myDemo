import Order, { findOrder } from './Order.js'

// 事件调度器 订单中转
class EventEmitter {
  constructor() {
    // key 是 type
    this.eventMap = {}
  }

  addEventListener(type, listener) {
    const listenerList = this.eventMap[type] || []
    listenerList.push(listener)
    this.eventMap[type] = listenerList
  }

  publish(type, orderData) {
    let listeners = this.eventMap[type] || []
    listeners.forEach((fn) => fn(orderData))
  }
}
let publisherId = 1
// 发布者 订单中心
class Publisher {
  constructor(emitter) {
    this.emitter = emitter
    this.publisherId = publisherId
    publisherId++
  }

  // 发布订单到调度中心
  publish(type, orderData) {
    this.emitter.publish(type, orderData)
  }
}
let SubscriberId = 1
// 订阅者 外卖员
class Subscriber {
  constructor() {
    this.id = SubscriberId
    this.orderStatus = null
    this.orderData = null
    // this.callback = callback
    SubscriberId++
  }

  // 我抢到了订单
  getOrder() {
    const { orderData } = this
    if (orderData?.orderLock) return
    this.orderStatus = true
    this.orderData.orderLock = true
    console.log(`我是外卖员${this.id}，我抢到了${orderData.orderId}`)
  }

  update(order) {
    if (this.orderStatus)
      return console.log(`我是外卖员${this.id}， 我已经有订单了，不用抢`)
    console.log(`我是外卖员${this.id}，我被update了，得知了有新订单可以抢`)

    setTimeout(() => {
      this.orderData = order
      this.getOrder()
    }, 1000 * Math.random())
  }
}

const eventEmitter = new EventEmitter()

// 外卖员人数
const DELIVERER_NUMBER = 3

const delivererList = [...Array(DELIVERER_NUMBER)].map(() => new Subscriber())
delivererList.forEach((deliverer) => {
  eventEmitter.addEventListener('order', deliverer.update.bind(deliverer))
})

// 订单发布中心
const orderPublisher = new Publisher(eventEmitter)

// const orderInterval = () => {
//   if (delivererList.every((item) => item.orderStatus))
//     return clearInterval(orderInterval)
//   findOrder().then((orderData) => {
//     const order = new Order(orderData)
//     orderPublisher.publish('order', order)
//   })
// }
// setInterval(orderInterval, 1000)

orderPublisher.publish(
  'order',
  new Order({
    orderId: 1,
  })
)
orderPublisher.publish(
  'order',
  new Order({
    orderId: 2,
  })
)

orderPublisher.publish(
  'order',
  new Order({
    orderId: 4,
  })
)
