// 测试用
function Person(name, age) {
  this.name = name
  this.age = age

  return {
    habit: 'game',
  }
  // return 'habit'
}

Person.prototype.getName = function () {
  console.log(`my name is ${this.name}`)
}

const person = new Person('byf', 26)
console.log('🚀 ~ file: 2_new.js ~ line 30 ~ person.habit', person.habit)
console.log('🚀 ~ file: 2_new.js ~ line 30 ~ person.name', person.name)
// person.getName()

console.log('----')

function myNew() {
  var result = {}

  var constructor = arguments[0]

  // this
  const returnValue = constructor.apply(result, [].slice.call(arguments, 1))

  result.__proto__ = constructor.prototype

  if (typeof returnValue === 'object') {
    return returnValue
  }
  return result
}

const person2 = myNew(Person, 'byf', 26)
console.log('🚀 ~ file: 7_new.js ~ line 31 ~ person2', person2)
person2.getName()
