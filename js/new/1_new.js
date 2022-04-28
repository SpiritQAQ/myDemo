// 测试用
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.game = 'csgo'
Person.prototype.getName = function () {
  console.log(`my name is ${this.name}`)
}

function myNew() {
  var result = new Object()

  var constructor = arguments[0]

  constructor.apply(result, [].slice.call(arguments, 1))

  result.__proto__ = constructor.prototype

  return result
}

const person = new Person('byf', 26)
console.log(person.name)
person.getName()

console.log('----')

const person2 = myNew(Person, 'byf', 26)
console.log('🚀 ~ file: 7_new.js ~ line 31 ~ person2', person2)
console.log(person2.name)
person2.getName()
