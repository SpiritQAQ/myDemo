class Subject {
  constructor() {
    this.fns = []
  }

  add(fn) {
    this.fns.push(fn)
  }

  notify(...arg) {
    this.fns.forEach((fn) => fn(...arg))
  }
}

class Observer {
  constructor() {}

  update(data) {
    console.log('Subject -> notify -> 我update', data)
  }
}

const subject = new Subject()

const observer1 = new Observer()
const observer2 = new Observer()

subject.add(observer1.update)
subject.add(observer2.update)

subject.notify({ update: true })
