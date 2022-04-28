let person = {
  name: 'zegel',
  age: 25,
}

function say(job, sex) {
  const { name, age } = this
  // console.log(`name: ${name}, age: ${age}, job: ${job}, ${sex}`)
  return `name: ${name}, age: ${age}, job: ${job}, ${sex}`
}

// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
// fun.call(thisArg, arg1, arg2, ...)
Function.prototype.call2 = function () {
  // 传空或null绑定到window
  let context = arguments[0] || window

  const readArguments = []
  for (let i = 1; i < arguments.length; i++) {
    readArguments.push('arguments[' + i + ']')
    // 把 'arguments[1]' 传进 eval 才正确
  }

  context.fn = this
  // context.fn(...readArguments) ES6写法
  const returnValue = eval('context.fn(' + readArguments.toString() + ')')

  delete context.fn

  return returnValue
}

console.log(say.call2(person, 'dog', 'male'))
