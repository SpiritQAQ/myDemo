// 默写

class EventEmitter {
  constructor() {
    this.fns = {}
  }

  on(type, fn) {
    this.fns[type] = this.fns[type] || []
    this.fns[type].push(fn)
  }

  off(type, fn) {
    const fns = this.fns[type] || []
    if (!fn) return (this.fns[type] = null)
    this.fns[type] = fns.filter((_fn) => _fn !== fn)
  }

  emit(type, ...arg) {
    const fns = this.fns[type] || []
    fns.forEach((fn) => fn(...arg))
  }
}

class Subscriber {
  constructor() {}

  update(data) {
    console.log('更新咯', data)
  }
}

const eventEmitter = new EventEmitter()

const subscribe1 = new Subscriber()

eventEmitter.on('click', subscribe1.update)

eventEmitter.emit('click', {
  name: 'im data',
})
