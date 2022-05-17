// 请用ES5实现fangjike.ts的效果

export function Animal() {
  // this.name = ''

  this.getUltimateAnswer = function () {
    return 42
  }

  this.getName = function () {
    return this.name
  }

  this.setName = function (name) {
    this.name = name
  }
}

window.Animal = Animal

function Cat() {
  Animal.call(this)

  // Object.defineProperty(this, 'name', {
  //   get: function () {
  //     return undefined
  //   },
  //   set: function (newValue) {
  //     return newValue
  //   },
  // })

  var _this = this
  const getName = this.getName
  this.getName = function () {
    return '[Cat]' + getName.call(this)
  }
}

export { Cat }
