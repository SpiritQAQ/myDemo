let person = {
  name: 'zegel',
  age: 25,
}

function say(job, sex) {
  const { name, age } = this
  // console.log(`name: ${name}, age: ${age}, job: ${job}, ${sex}`)
  return `name: ${name}, age: ${age}, job: ${job}, ${sex}`
}

Function.prototype.apply2 = function (contextParam, args) {
  var context = contextParam || window

  context.fn = this

  var returnValue
  if (!args) {
    returnValue = context.fn()
  } else {
    var readArguments = []
    for (let i = 0; i < args.length; i++) {
      readArguments.push('args[' + i + ']')
      // 把 'arguments[1]' 传进 eval 才正确
    }

    returnValue = eval('context.fn(' + readArguments.toString() + ')')
  }

  delete context.fn

  return returnValue
}

console.log(say.apply2(person, ['dog', 'male']))
