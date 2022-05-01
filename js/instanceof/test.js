import myInstanceof from './index.js'

class A {
  constructor() {
    this.a = 'im a'
  }
}

class B extends A {
  constructor() {
    super()
    this.b = 'im b'
  }
}

const c = new B()
const d = {}

console.log('old', c instanceof A)
console.log('new', myInstanceof(c, A))

console.log('old', d instanceof A)
console.log('new', myInstanceof(d, A))
