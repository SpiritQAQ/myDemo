import Order, { findOrder } from './Order.js'

// 事件调度器 订单中转
class EventEmitter {
  constructor() {
    // key 是 type
    this.eventMap = {}
  }

  // 订阅者触发订阅
  addEventListener(type, listener) {
    const listenerList = this.eventMap[type] || []
    listenerList.push(listener)
    this.eventMap[type] = listenerList
  }

  // 发布者触发发布
  publish(type, ...arg) {
    let listeners = this.eventMap[type] || []
    listeners.forEach((listener) => listener(...arg))
  }

  // 取消订阅
  removeEventListener(type, listener) {
    const listeners = this.eventMap[type]
    if (!listeners) return
    if (!listener) {
      // 该type下 全部清空
      return (this.eventMap[type] = null)
    }
    this.eventMap[type] = listeners.filter((i, idx) => {
      if (i === listener) console.log('发现需要remove的订阅者', idx)
      return i !== listener
    })
  }

  //  once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
  //   Vue.prototype.$once = function (event, fn) {
  //     var vm = this;
  //     // 先绑定，后删除
  //     function on () {
  //         vm.$off(event, on);
  //         fn.apply(vm, arguments);
  //     }
  //     on.fn = fn;
  //     vm.$on(event, on);
  //     return vm
  // };
  once(type, fn) {
    const _this = this
    function on(...arg) {
      _this.removeEventListener(type, on)
      fn(...arg)
    }
    this.addEventListener(type, on)
    return this
  }
}
let publisherId = 1
// 发布者 订单中心 这一部分可以不要，合到eventEmitter的publish方法里
class Publisher {
  constructor(emitter) {
    this.emitter = emitter
    this.publisherId = publisherId
    publisherId++
  }

  // 发布订单到调度中心
  publish(type, ...arg) {
    this.emitter.publish(type, ...arg)
  }
}
let SubscriberId = 1
// 订阅者 外卖员
class Subscriber {
  constructor() {
    this.id = SubscriberId
    SubscriberId++
  }
}

class Deliverer extends Subscriber {
  constructor() {
    super()
    this.orderStatus = null
    this.orderData = null
  }
  // 我抢到了订单
  getOrder() {
    const { orderData } = this
    if (orderData?.orderLock) return
    if (this.orderStatus)
      return console.log(`我是外卖员${this.id}， 我已经有订单了，不用抢`)
    this.orderStatus = true
    this.orderData.orderLock = true
    console.log(`我是外卖员${this.id}，我抢到了${orderData.orderId}`)
  }

  update(order) {
    console.log(`我是外卖员${this.id}，我被update了，得知了有新订单可以抢`)

    setTimeout(() => {
      this.orderData = order
      this.getOrder()
    }, 1000 * Math.random())
  }

  getSalary(salary) {
    console.log(`我是外卖员${this.id}，我收到了薪水:${salary}`)
  }
}

const eventEmitter = new EventEmitter()

// 外卖员人数
const DELIVERER_NUMBER = 3

const delivererList = [...Array(DELIVERER_NUMBER)].map(() => new Deliverer())
delivererList.forEach((deliverer) => {
  eventEmitter.addEventListener(
    'order',
    (deliverer.update = deliverer.update.bind(deliverer))
  )
  // 直接deliverer.update.bind(deliverer) 不能 remove
})

// 外卖员2离职，不接订单， 发薪水
eventEmitter.removeEventListener('order', delivererList[1].update)

eventEmitter.addEventListener('salary', ({ money }) =>
  delivererList[1].getSalary(money)
)

// 测试once功能， 只发一次薪水
eventEmitter.once('salary', ({ money }) => delivererList[1].getSalary(money))

// 订单发布中心
const orderPublisher = new Publisher(eventEmitter)

// 薪水发布中心
const salaryPublisher = new Publisher(eventEmitter)

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
    orderId: 3,
  })
)

salaryPublisher.publish('salary', {
  money: '$400',
})

salaryPublisher.publish('salary', {
  money: '$300',
})
