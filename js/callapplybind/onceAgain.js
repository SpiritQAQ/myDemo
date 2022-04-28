let person = {
  name: 'zegel',
  age: 25,
}

function say(job, sex) {
  const { name, age } = this
  // console.log(`name: ${name}, age: ${age}, job: ${job}, ${sex}`)
  return `name: ${name}, age: ${age}, job: ${job}, ${sex}`
}

Function.prototype.call2 = function () {
  var context = arguments[0] || window

  var realArguments = []
  for (var i = 1; i < arguments.length; i++) {
    realArguments.push('arguments[' + i + ']')
  }

  context.fn = this

  const result = eval('context.fn(' + realArguments.toString() + ')')

  delete context.fn

  return result
}

console.log(say.call2(person, 'dog', 'male'))
