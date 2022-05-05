export default class Order {
  constructor(orderData) {
    for (var key in orderData) {
      this[key] = orderData[key]
    }
    this.orderLock = null
    this.orderId = orderData.orderId || performance.now()
  }

  lockOrder() {
    this.orderLock = true
  }
}

export const findOrder = () =>
  new Promise((resolve, reject) => {
    resolve({
      foodName: '某食物',
    })
  })
